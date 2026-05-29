const fs = require("fs/promises");
const path = require("path");
const { XMLParser } = require("fast-xml-parser");

const VELOG_RSS_URL = "https://v2.velog.io/rss/m161awm";
const OUTPUT_PATH = path.join(__dirname, "..", "posts.json");

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function cleanText(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFirstImage(value) {
  const html = String(value || "");
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1].trim() : "";
}

function truncateText(value, maxLength = 220) {
  const text = cleanText(value);
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
}

async function fetchVelogPosts() {
  const response = await fetch(VELOG_RSS_URL, {
    headers: {
      "User-Agent": "m161awm2-test1234-github-pages/1.0"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Velog RSS: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true
  });
  const feed = parser.parse(xml);
  const items = asArray(feed?.rss?.channel?.item);

  return items.map((item) => ({
    title: cleanText(item.title),
    link: String(item.link || "").trim(),
    pubDate: String(item.pubDate || "").trim(),
    description: truncateText(item.description),
    thumbnail: extractFirstImage(item.description)
  }));
}

async function main() {
  const posts = await fetchVelogPosts();
  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
  console.log(`Wrote ${posts.length} Velog posts to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
