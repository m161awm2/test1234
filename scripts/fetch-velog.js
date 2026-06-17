const fs = require("fs/promises");
const path = require("path");
const { XMLParser } = require("fast-xml-parser");

const VELOG_RSS_URL = "https://v2.velog.io/rss/m161awm";
const OUTPUT_PATH = path.join(__dirname, "..", "posts.json");
const PROFILE_OUTPUT_PATH = path.join(__dirname, "..", "velog-profile.json");
const VELOG_PROFILE_URL = "https://velog.io/@m161awm";

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

async function fetchPostLikes(link) {
  if (!link) return 0;

  try {
    const response = await fetch(link, {
      headers: {
        "User-Agent": "m161awm2-test1234-github-pages/1.0"
      }
    });

    if (!response.ok) return 0;

    const html = await response.text();
    const match = html.match(/"likes"\s*:\s*(\d+)/);
    return match ? Number(match[1]) : 0;
  } catch {
    return 0;
  }
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
  const channel = feed?.rss?.channel || {};
  const items = asArray(channel.item);

  const posts = items.map((item) => ({
    title: cleanText(item.title),
    link: String(item.link || "").trim(),
    pubDate: String(item.pubDate || "").trim(),
    description: truncateText(item.description),
    thumbnail: extractFirstImage(item.description),
    likes: 0
  }));

  return {
    channel,
    posts: await Promise.all(posts.map(async (post) => ({
      ...post,
      likes: await fetchPostLikes(post.link)
    })))
  };
}

function buildVelogProfile(channel, posts) {
  const latestPost = posts[0] || {};
  const totalLikes = posts.reduce((sum, post) => sum + (Number(post.likes) || 0), 0);

  return {
    username: "m161awm",
    title: cleanText(channel.title) || "m161awm.log",
    description: cleanText(channel.description) || "Velog에 기록한 개발 학습 로그입니다.",
    url: VELOG_PROFILE_URL,
    rssUrl: VELOG_RSS_URL,
    postCount: posts.length,
    totalLikes,
    latestPost: {
      title: latestPost.title || "",
      link: latestPost.link || VELOG_PROFILE_URL,
      pubDate: latestPost.pubDate || ""
    },
    updatedAt: latestPost.pubDate || cleanText(channel.lastBuildDate) || ""
  };
}

async function main() {
  const { channel, posts } = await fetchVelogPosts();
  const profile = buildVelogProfile(channel, posts);

  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
  await fs.writeFile(PROFILE_OUTPUT_PATH, `${JSON.stringify(profile, null, 2)}\n`, "utf8");

  console.log(`Wrote ${posts.length} Velog posts to ${OUTPUT_PATH}`);
  console.log(`Wrote Velog profile to ${PROFILE_OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
