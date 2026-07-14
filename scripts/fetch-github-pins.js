const fs = require("fs/promises");
const path = require("path");

const GITHUB_API_URL = "https://api.github.com/graphql";
const GITHUB_USER = "m161awm2";
const OUTPUT_PATH = path.join(__dirname, "..", "projects.json");

const query = `
  query PinnedRepositories($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            url
            description
            stargazerCount
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

async function fetchPinnedRepositories() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN is required to fetch pinned repositories.");
  }

  const response = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "m161awm2-test1234-github-pages/1.0"
    },
    body: JSON.stringify({
      query,
      variables: { login: GITHUB_USER }
    })
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(`GitHub GraphQL error: ${payload.errors.map((error) => error.message).join(", ")}`);
  }

  if (!payload.data?.user) {
    throw new Error(`GitHub user not found: ${GITHUB_USER}`);
  }

  return payload.data.user.pinnedItems.nodes
    .filter(Boolean)
    .map((repository) => ({
      name: repository.name,
      url: repository.url,
      description: repository.description || "GitHub에서 프로젝트 내용을 확인해보세요.",
      language: repository.primaryLanguage?.name || "GitHub",
      stars: repository.stargazerCount || 0
    }));
}

async function main() {
  const repositories = await fetchPinnedRepositories();
  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(repositories, null, 2)}\n`, "utf8");
  console.log(`Wrote ${repositories.length} pinned repositories to ${OUTPUT_PATH}`);
}

module.exports = { fetchPinnedRepositories };

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
