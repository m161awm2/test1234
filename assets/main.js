const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const cursorGlow = document.getElementById("cursorGlow");
window.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    link.classList.remove("is-clicked");
    window.setTimeout(() => link.classList.add("is-clicked"), 0);
    window.setTimeout(() => link.classList.remove("is-clicked"), 450);
  });
});

const githubProfile = document.getElementById("github");
const githubProfilePanel = document.getElementById("githubProfilePanel");
const velogProfile = document.getElementById("velogProfile");
const profileSwitchButton = document.getElementById("profileSwitchButton");
const brandAvatar = document.getElementById("brandAvatar");
const githubUser = "m161awm2";
const canTiltGithubProfile = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
const velogUser = "m161awm";
const fallbackGithubProfile = {
  login: githubUser,
  name: "m161awm",
  avatar_url: "https://github.com/m161awm2.png",
  html_url: "https://github.com/m161awm2",
  bio: "Cloud / DevOps / Backend를 직접 구축하며 배우는 중.",
  public_repos: 0,
  followers: 0,
  following: 0,
  location: "",
  blog: ""
};
const fallbackVelogProfile = {
  username: velogUser,
  title: "m161awm.log",
  description: "Velog에 기록한 개발 학습 로그입니다.",
  url: "https://velog.io/@m161awm",
  postCount: 0,
  totalLikes: 0,
  latestPost: {
    title: "최근 Velog 글을 불러오는 중입니다.",
    link: "https://velog.io/@m161awm/posts",
    pubDate: ""
  },
  updatedAt: ""
};

function renderGithubProfile(profile) {
  if (!githubProfilePanel) return;

  const avatar = profile.avatar_url || fallbackGithubProfile.avatar_url;
  const name = profile.name || profile.login || "m161awm";
  const login = profile.login || githubUser;
  const url = profile.html_url || fallbackGithubProfile.html_url;
  const bio = profile.bio || fallbackGithubProfile.bio;
  const location = profile.location ? `<span>📍 ${escapeHtml(profile.location)}</span>` : "";
  const blogUrl = getSafeUrl(profile.blog);
  const blog = blogUrl ? `<span>🔗 ${escapeHtml(blogUrl)}</span>` : "";

  if (brandAvatar) {
    brandAvatar.src = avatar;
  }

  githubProfilePanel.innerHTML = `
    <div class="github-profile-body">
      <div class="github-head">
        <img class="github-avatar" src="${escapeHtml(avatar)}" alt="${escapeHtml(login)} GitHub avatar" />
        <div>
          <div class="github-title-row">
            <span class="github-badge" aria-hidden="true">
              <svg class="github-icon" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.6 7.6 0 0 1 8 3.86c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
            </span>
            <b class="github-name">${escapeHtml(name)}</b>
          </div>
          <span class="github-login">@${escapeHtml(login)}</span>
        </div>
      </div>
      <p class="github-bio">${escapeHtml(bio)}</p>
      <div class="github-stats" aria-label="GitHub profile stats">
        <div class="github-stat">
          <b>${Number(profile.public_repos || 0).toLocaleString()}</b>
          <span>Repositories</span>
        </div>
        <div class="github-stat">
          <b>${Number(profile.followers || 0).toLocaleString()}</b>
          <span>Followers</span>
        </div>
        <div class="github-stat">
          <b>${Number(profile.following || 0).toLocaleString()}</b>
          <span>Following</span>
        </div>
      </div>
      <div class="github-meta">
        ${location}
        ${blog}
        <span>Updated from GitHub API</span>
      </div>
      <a class="btn main github-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
    </div>
  `;
}

function resetGithubProfileTilt() {
  if (!githubProfile) return;

  githubProfile.classList.remove("is-tilting");
  githubProfile.style.setProperty("--github-card-rotate-x", "0deg");
  githubProfile.style.setProperty("--github-card-rotate-y", "0deg");
  githubProfile.style.setProperty("--github-card-glare-x", "50%");
  githubProfile.style.setProperty("--github-card-glare-y", "0%");
}

function handleGithubProfileTilt(event) {
  if (!githubProfile || !canTiltGithubProfile) return;

  const rect = githubProfile.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  const rotateY = (x - 0.5) * 14;
  const rotateX = (0.5 - y) * 12;

  githubProfile.classList.add("is-tilting");
  githubProfile.style.setProperty("--github-card-rotate-x", `${rotateX.toFixed(2)}deg`);
  githubProfile.style.setProperty("--github-card-rotate-y", `${rotateY.toFixed(2)}deg`);
  githubProfile.style.setProperty("--github-card-glare-x", `${Math.round(x * 100)}%`);
  githubProfile.style.setProperty("--github-card-glare-y", `${Math.round(y * 100)}%`);
}

if (githubProfile && canTiltGithubProfile) {
  githubProfile.addEventListener("pointermove", handleGithubProfileTilt);
  githubProfile.addEventListener("pointerleave", resetGithubProfileTilt);
  githubProfile.addEventListener("pointercancel", resetGithubProfileTilt);
}

function renderVelogProfile(profile) {
  if (!velogProfile) return;

  const data = profile || fallbackVelogProfile;
  const title = escapeHtml(data.title || fallbackVelogProfile.title);
  const description = escapeHtml(data.description || fallbackVelogProfile.description);
  const url = getSafeUrl(data.url) || fallbackVelogProfile.url;
  const postsUrl = `${fallbackVelogProfile.url}/posts`;
  const latestPost = data.latestPost || fallbackVelogProfile.latestPost;
  const latestTitle = escapeHtml(latestPost.title || fallbackVelogProfile.latestPost.title);
  const latestLink = getSafeUrl(latestPost.link) || postsUrl;
  const latestDate = formatPostDate(latestPost.pubDate);
  const updatedDate = formatPostDate(data.updatedAt);
  const postCount = Number.isFinite(Number(data.postCount)) ? Number(data.postCount) : 0;
  const totalLikes = Number.isFinite(Number(data.totalLikes)) ? Number(data.totalLikes) : 0;

  velogProfile.innerHTML = `
    <div class="velog-profile-body">
      <div class="velog-top">
        <div>
          <span class="velog-kicker">@${escapeHtml(data.username || velogUser)} Velog</span>
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
        <span class="velog-mark" aria-hidden="true">V</span>
      </div>
      <div class="velog-stats" aria-label="Velog profile stats">
        <div class="velog-stat">
          <b>${postCount.toLocaleString()}</b>
          <span>Posts</span>
        </div>
        <div class="velog-stat">
          <b>${totalLikes.toLocaleString()}</b>
          <span>Likes</span>
        </div>
        <div class="velog-stat">
          <b>${escapeHtml(latestDate || "Live")}</b>
          <span>Latest</span>
        </div>
      </div>
      <a class="velog-latest" href="${escapeHtml(latestLink)}" target="_blank" rel="noopener noreferrer">
        최근 글: ${latestTitle}
      </a>
      <a class="btn main github-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Velog Profile</a>
      ${updatedDate ? `<p class="velog-state">마지막 갱신: ${escapeHtml(updatedDate)}</p>` : ""}
    </div>
  `;
}

function setProfileView(view, animate = false) {
  const nextView = view === "velog" ? "velog" : "github";

  if (animate) {
    githubProfile.classList.remove("is-switching");
    void githubProfile.offsetWidth;
    githubProfile.classList.add("is-switching");
    window.setTimeout(() => githubProfile.classList.remove("is-switching"), 360);
  }

  githubProfile.dataset.profileView = nextView;
  githubProfilePanel.classList.toggle("active", nextView === "github");
  velogProfile.classList.toggle("active", nextView === "velog");

  if (profileSwitchButton) {
    profileSwitchButton.textContent = nextView === "github" ? "→" : "←";
    profileSwitchButton.setAttribute("aria-label", nextView === "github" ? "Velog 프로필 보기" : "GitHub 프로필 보기");
  }
}

if (profileSwitchButton) {
  profileSwitchButton.addEventListener("click", () => {
    const currentView = githubProfile.dataset.profileView || "github";
    setProfileView(currentView === "github" ? "velog" : "github", true);
  });
}

renderGithubProfile(fallbackGithubProfile);
renderVelogProfile(fallbackVelogProfile);
setProfileView("github");

fetch(`https://api.github.com/users/${githubUser}`, { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error("GitHub profile request failed");
    return response.json();
  })
  .then(renderGithubProfile)
  .catch(() => {
    renderGithubProfile(fallbackGithubProfile);
  });

fetch("velog-profile.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error("velog-profile.json request failed");
    return response.json();
  })
  .then(renderVelogProfile)
  .catch(() => {
    renderVelogProfile(fallbackVelogProfile);
  });

const githubActivityCard = document.getElementById("githubActivityCard");
const githubContributionGraph = document.getElementById("githubContributionGraph");

if (githubContributionGraph && githubActivityCard) {
  githubContributionGraph.addEventListener("error", () => {
    githubActivityCard.classList.add("is-error");
  });
}

const nodeMap = document.getElementById("nodeMap");
const graphViewport = document.getElementById("graphViewport");
const nodeLines = document.getElementById("nodeLines");
const nodeDetail = document.getElementById("nodeDetail");
const resetGraphViewButton = document.getElementById("resetGraphView");
const nodeZoom = document.getElementById("nodeZoom");
let activeGraphNodeId = "m161awm";
let graphView = { x: 0, y: 0, scale: 1 };
let isGraphPanning = false;
let graphPanStart = { x: 0, y: 0, viewX: 0, viewY: 0 };
let draggingGraphNode = null;
let hasDraggedGraphNode = false;
let suppressGraphClick = false;
const graphDragThreshold = 5;
const graphNodes = [
  {
    id: "m161awm",
    label: "m161awm",
    category: "Center",
    description: "클라우드 인프라와 DevOps를 중심으로 AWS, Linux, Kubernetes, CI/CD를 실습하며 성장하는 포트폴리오입니다.",
    tags: ["Cloud", "DevOps", "AWS"],
    related: ["cloud", "devops", "backend", "projects", "learning"],
    type: "center",
    x: 50,
    y: 50
  },
  {
    id: "cloud",
    label: "Cloud",
    category: "Category",
    description: "클라우드 기반 배포 흐름을 실습한 영역입니다.",
    tags: ["AWS", "Deploy", "Infra"],
    related: ["m161awm", "aws"],
    type: "category",
    x: 50,
    y: 18
  },
  {
    id: "devops",
    label: "DevOps",
    category: "Category",
    description: "배포 자동화, 리버스 프록시, 서버 운영을 연결하는 영역입니다.",
    tags: ["CI/CD", "Linux", "Nginx"],
    related: ["m161awm", "github-actions", "nginx", "linux", "docker"],
    type: "category",
    x: 18,
    y: 37
  },
  {
    id: "backend",
    label: "Backend",
    category: "Category",
    description: "API 서버, 세션, 데이터베이스 연결을 구현하며 운영 환경에 배포한 경험입니다.",
    tags: ["NestJS", "Node.js", "MySQL"],
    related: ["m161awm", "nodejs", "nestjs", "flask", "mysql", "rest-api", "session"],
    type: "category",
    x: 82,
    y: 37
  },
  {
    id: "projects",
    label: "Projects",
    category: "Category",
    description: "학습한 기술을 실제 프로젝트와 배포 경험으로 연결한 영역입니다.",
    tags: ["Portfolio", "Dogsori", "NestCal"],
    related: ["m161awm", "portfolio", "dogsori", "nestcal", "aws-deploy-lab"],
    type: "category",
    x: 28,
    y: 75
  },
  {
    id: "learning",
    label: "Learning",
    category: "Category",
    description: "Kubernetes와 GitOps, IaC 기반 인프라 운영 흐름을 학습 중인 영역입니다.",
    tags: ["Kubernetes", "GitOps", "Terraform"],
    related: ["m161awm", "kubernetes", "argo-cd", "terraform"],
    type: "category",
    x: 72,
    y: 75
  },
  { id: "aws", label: "AWS", category: "Cloud", description: "클라우드 인프라와 배포 흐름을 실습했습니다.", tags: ["Cloud", "Infra", "Deploy"], related: ["cloud"], x: 28, y: 10 },
  { id: "github-actions", label: "GitHub Actions", category: "DevOps", description: "push 이벤트를 기반으로 자동 배포하는 CI/CD 파이프라인을 구성했습니다.", tags: ["CI/CD", "Push", "Deploy"], related: ["devops", "github"], x: 8, y: 28 },
  { id: "nginx", label: "Nginx", category: "DevOps", description: "Reverse Proxy와 포트 연결 구조를 실습했습니다.", tags: ["Reverse Proxy", "HTTP", "Port"], related: ["devops", "linux", "nestjs"], x: 10, y: 45 },
  { id: "linux", label: "Linux", category: "DevOps", description: "서버 로그, 프로세스, 권한, 서비스 운영을 직접 다루며 배포 기반을 익혔습니다.", tags: ["Logs", "Process", "Shell"], related: ["devops", "nginx"], x: 8, y: 61 },
  { id: "docker", label: "Docker", category: "DevOps", description: "컨테이너 이미지와 실행 환경 분리 개념을 배포 흐름과 연결해 학습했습니다.", tags: ["Container", "Image", "Runtime"], related: ["devops", "kubernetes"], x: 34, y: 37 },
  { id: "nodejs", label: "Node.js", category: "Backend", description: "JavaScript 런타임 기반으로 서버 애플리케이션을 실행하고 배포했습니다.", tags: ["Runtime", "Server", "Backend"], related: ["backend", "nestjs"], x: 66, y: 28 },
  { id: "nestjs", label: "NestJS", category: "Backend", description: "모듈 기반 API 서버와 세션, 환경변수, DB 연결 구조를 학습했습니다.", tags: ["API", "TypeScript", "Server"], related: ["backend", "nodejs", "mysql", "session", "rest-api"], x: 90, y: 45 },
  { id: "flask", label: "Flask", category: "Backend", description: "Python 기반 게시판 API 경험을 통해 백엔드 구조를 익혔습니다.", tags: ["Python", "API", "Web"], related: ["backend", "rest-api"], x: 76, y: 54 },
  { id: "mysql", label: "MySQL", category: "Backend", description: "서버 애플리케이션의 데이터 저장과 연결 구조를 실습했습니다.", tags: ["DB", "Query", "Schema"], related: ["backend", "nestjs"], x: 92, y: 61 },
  { id: "rest-api", label: "REST API", category: "Backend", description: "클라이언트와 서버가 HTTP로 데이터를 주고받는 API 구조를 구현했습니다.", tags: ["HTTP", "JSON", "Endpoint"], related: ["backend", "nestjs", "flask"], x: 75, y: 28 },
  { id: "session", label: "Session", category: "Backend", description: "로그인 상태 유지와 서버 세션 처리 흐름을 학습했습니다.", tags: ["Auth", "Cookie", "Login"], related: ["backend", "nestjs", "mysql"], x: 90, y: 28 },
  { id: "portfolio", label: "Portfolio", category: "Projects", description: "GitHub Pages 기반 개인 포트폴리오이며, 학습 기록과 프로젝트를 정리하는 공간입니다.", tags: ["GitHub Pages", "Static", "Profile"], related: ["projects", "github-actions"], x: 12, y: 78 },
  { id: "dogsori", label: "Dogsori", category: "Projects", description: "직접 만든 프로젝트 중 하나로, 배포와 운영 실습 경험을 연결하는 프로젝트입니다.", tags: ["Project", "Deploy", "JavaScript"], related: ["projects", "backend", "devops"], x: 24, y: 88 },
  { id: "nestcal", label: "NestCal", category: "Projects", description: "NestJS와 TypeScript 학습 경험을 프로젝트 형태로 연결한 저장소입니다.", tags: ["NestJS", "TypeScript", "Calendar"], related: ["projects", "nestjs", "mysql"], x: 38, y: 82 },
  { id: "aws-deploy-lab", label: "AWS Deploy Lab", category: "Projects", description: "AWS 배포와 프록시 설정을 반복 실습하는 배포 학습 흐름입니다.", tags: ["AWS", "Deploy", "Nginx"], related: ["projects", "aws", "nginx"], x: 44, y: 92 },
  { id: "kubernetes", label: "Kubernetes", category: "Learning", description: "컨테이너 오케스트레이션 구조와 배포 흐름을 학습 중입니다.", tags: ["Cluster", "Pod", "Service"], related: ["learning", "docker", "argo-cd"], x: 58, y: 82 },
  { id: "argo-cd", label: "Argo CD", category: "Learning", description: "GitOps 방식으로 Kubernetes 매니페스트를 동기화하는 흐름을 학습 중입니다.", tags: ["GitOps", "Kubernetes", "Sync"], related: ["learning", "kubernetes", "terraform"], x: 86, y: 78 },
  { id: "terraform", label: "Terraform", category: "Learning", description: "코드로 인프라를 선언하고 재현 가능한 환경을 만드는 방식을 학습 중입니다.", tags: ["IaC", "Plan", "Automation"], related: ["learning", "argo-cd"], x: 62, y: 94 }
];
const graphLinks = [
  ["m161awm", "cloud"],
  ["m161awm", "devops"],
  ["m161awm", "backend"],
  ["m161awm", "projects"],
  ["m161awm", "learning"],
  ["cloud", "aws"],
  ["devops", "github-actions"],
  ["devops", "nginx"],
  ["devops", "linux"],
  ["devops", "docker"],
  ["backend", "nodejs"],
  ["backend", "nestjs"],
  ["backend", "flask"],
  ["backend", "mysql"],
  ["backend", "rest-api"],
  ["backend", "session"],
  ["projects", "portfolio"],
  ["projects", "dogsori"],
  ["projects", "nestcal"],
  ["projects", "aws-deploy-lab"],
  ["learning", "kubernetes"],
  ["learning", "argo-cd"],
  ["learning", "terraform"],
  ["nestjs", "mysql"],
  ["argo-cd", "kubernetes"]
];

function getGraphNode(id) {
  return graphNodes.find((node) => node.id === id);
}

function renderNodeGraph() {
  if (!nodeMap || !graphViewport || !nodeLines || !nodeDetail) return;

  nodeLines.innerHTML = graphLinks.map(([fromId, toId]) => {
    const from = getGraphNode(fromId);
    const to = getGraphNode(toId);

    return `<line class="node-line" data-from="${fromId}" data-to="${toId}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" />`;
  }).join("");

  graphNodes.forEach((node) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `graph-node ${node.type || "child"}`;
    button.dataset.nodeId = node.id;
    button.style.left = `${node.x}%`;
    button.style.top = `${node.y}%`;
    button.textContent = node.label;
    enableGraphNodeDrag(button);
    button.addEventListener("click", (event) => {
      if (suppressGraphClick) {
        event.preventDefault();
        suppressGraphClick = false;
        return;
      }

      setActiveGraphNode(node.id);
    });
    graphViewport.appendChild(button);
  });

  applyGraphTransform();
  setActiveGraphNode("m161awm");
}

function applyGraphTransform(animate = false) {
  if (!graphViewport) return;

  graphViewport.classList.toggle("is-resetting", animate);
  graphViewport.style.transform = `translate(${graphView.x}px, ${graphView.y}px) scale(${graphView.scale})`;

  if (nodeZoom) {
    nodeZoom.textContent = `${Math.round(graphView.scale * 100)}%`;
  }

  if (animate) {
    window.setTimeout(() => {
      graphViewport.classList.remove("is-resetting");
    }, 240);
  }
}

function updateGraphLines() {
  if (!nodeLines) return;

  nodeLines.querySelectorAll(".node-line").forEach((line) => {
    const from = getGraphNode(line.dataset.from);
    const to = getGraphNode(line.dataset.to);
    if (!from || !to) return;

    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y);
  });
}

function updateGraphNodePosition(nodeId, clientX, clientY, offsetX = 0, offsetY = 0) {
  const node = getGraphNode(nodeId);
  if (!node || !nodeMap) return;

  const rect = nodeMap.getBoundingClientRect();
  const localX = (clientX - rect.left - graphView.x) / graphView.scale - offsetX;
  const localY = (clientY - rect.top - graphView.y) / graphView.scale - offsetY;

  node.x = Math.min(96, Math.max(4, (localX / rect.width) * 100));
  node.y = Math.min(96, Math.max(4, (localY / rect.height) * 100));

  const element = graphViewport.querySelector(`[data-node-id="${CSS.escape(nodeId)}"]`);
  if (element) {
    element.style.left = `${node.x}%`;
    element.style.top = `${node.y}%`;
  }

  updateGraphLines();
}

function enableGraphNodeDrag(button) {
  button.addEventListener("pointerdown", (event) => {
    const node = getGraphNode(button.dataset.nodeId);
    if (!node) return;

    const rect = nodeMap.getBoundingClientRect();
    const localX = (event.clientX - rect.left - graphView.x) / graphView.scale;
    const localY = (event.clientY - rect.top - graphView.y) / graphView.scale;
    const nodeX = (node.x / 100) * rect.width;
    const nodeY = (node.y / 100) * rect.height;

    event.preventDefault();
    event.stopPropagation();
    button.setPointerCapture(event.pointerId);
    draggingGraphNode = {
      id: node.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: localX - nodeX,
      offsetY: localY - nodeY
    };
    hasDraggedGraphNode = false;
    button.classList.add("dragging");
  });

  button.addEventListener("pointermove", (event) => {
    if (!draggingGraphNode || draggingGraphNode.id !== button.dataset.nodeId) return;

    const distance = Math.hypot(event.clientX - draggingGraphNode.startX, event.clientY - draggingGraphNode.startY);
    if (distance > graphDragThreshold) {
      hasDraggedGraphNode = true;
    }

    updateGraphNodePosition(draggingGraphNode.id, event.clientX, event.clientY, draggingGraphNode.offsetX, draggingGraphNode.offsetY);
  });

  function finishDrag(event) {
    if (!draggingGraphNode || draggingGraphNode.id !== button.dataset.nodeId) return;

    button.classList.remove("dragging");

    if (button.hasPointerCapture(event.pointerId)) {
      button.releasePointerCapture(event.pointerId);
    }

    const nodeId = draggingGraphNode.id;
    const shouldSelect = !hasDraggedGraphNode;
    draggingGraphNode = null;

    if (shouldSelect) {
      setActiveGraphNode(nodeId);
    } else {
      suppressGraphClick = true;
    }
  }

  button.addEventListener("pointerup", finishDrag);
  button.addEventListener("pointercancel", finishDrag);
}

function handleGraphPointerDown(event) {
  if (!nodeMap || event.target.closest(".graph-node") || event.target.closest(".node-toolbar")) return;

  event.preventDefault();
  nodeMap.setPointerCapture(event.pointerId);
  isGraphPanning = true;
  graphPanStart = {
    x: event.clientX,
    y: event.clientY,
    viewX: graphView.x,
    viewY: graphView.y
  };
  nodeMap.classList.add("is-panning");
}

function handleGraphPointerMove(event) {
  if (!isGraphPanning) return;

  graphView.x = graphPanStart.viewX + event.clientX - graphPanStart.x;
  graphView.y = graphPanStart.viewY + event.clientY - graphPanStart.y;
  applyGraphTransform();
}

function handleGraphPointerUp(event) {
  if (!isGraphPanning) return;

  isGraphPanning = false;
  nodeMap.classList.remove("is-panning");

  if (nodeMap.hasPointerCapture(event.pointerId)) {
    nodeMap.releasePointerCapture(event.pointerId);
  }
}

function handleGraphWheel(event) {
  if (!nodeMap) return;

  event.preventDefault();
  const rect = nodeMap.getBoundingClientRect();
  const pointerX = event.clientX - rect.left;
  const pointerY = event.clientY - rect.top;
  const previousScale = graphView.scale;
  const zoomFactor = event.deltaY < 0 ? 1.03 : 0.97;
  const nextScale = Math.min(2, Math.max(0.6, previousScale * zoomFactor));

  if (nextScale === previousScale) return;

  const worldX = (pointerX - graphView.x) / previousScale;
  const worldY = (pointerY - graphView.y) / previousScale;

  graphView.scale = nextScale;
  graphView.x = pointerX - worldX * nextScale;
  graphView.y = pointerY - worldY * nextScale;
  applyGraphTransform();
}

function resetGraphView() {
  graphView = { x: 0, y: 0, scale: 1 };
  applyGraphTransform(true);
}

function setActiveGraphNode(nodeId) {
  const activeNode = getGraphNode(nodeId) || getGraphNode("m161awm");
  activeGraphNodeId = activeNode.id;
  const related = new Set([activeNode.id, ...activeNode.related]);

  nodeMap.classList.add("has-active");
  graphViewport.querySelectorAll(".graph-node").forEach((button) => {
    const id = button.dataset.nodeId;
    button.classList.toggle("active", id === activeNode.id);
    button.classList.toggle("related", id !== activeNode.id && related.has(id));
  });

  nodeLines.querySelectorAll(".node-line").forEach((line) => {
    const from = line.dataset.from;
    const to = line.dataset.to;
    line.classList.toggle("related", from === activeNode.id || to === activeNode.id);
  });

  nodeDetail.innerHTML = `
    <p class="detail-kicker">Selected Node</p>
    <h3>${escapeHtml(activeNode.label)}</h3>
    <p class="detail-category">${escapeHtml(activeNode.category)}</p>
    <p class="detail-description">${escapeHtml(activeNode.description)}</p>
    <div class="detail-tags" aria-label="Related keywords">
      <span class="detail-tags-label">Related keywords</span>
      ${activeNode.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
    </div>
  `;
}

renderNodeGraph();

if (nodeMap) {
  nodeMap.addEventListener("pointerdown", handleGraphPointerDown);
  nodeMap.addEventListener("pointermove", handleGraphPointerMove);
  nodeMap.addEventListener("pointerup", handleGraphPointerUp);
  nodeMap.addEventListener("pointercancel", handleGraphPointerUp);
  nodeMap.addEventListener("wheel", handleGraphWheel, { passive: false });
}

if (resetGraphViewButton) {
  resetGraphViewButton.addEventListener("click", resetGraphView);
}

const journeyList = document.getElementById("journeyList");
const defaultJourney = [
  {
    date: "2026.03.03",
    title: "세명컴퓨터고등학교 입학",
    description: "보안과에서 개발, 인프라, 클라우드를 공부하기 시작했습니다."
  }
];

function renderJourney(items) {
  const journey = Array.isArray(items) && items.length > 0 ? items : defaultJourney;

  journeyList.innerHTML = journey.map((item) => {
    const date = escapeHtml(item.date || "");
    const title = escapeHtml(item.title || "기록을 준비 중입니다.");
    const description = item.description || "";

    return `
      <div class="journey-item">
        <span class="journey-date">${date || "Now"}</span>
        <div>
          <b>${title}</b>
          ${description ? `<p>${escapeHtml(description)}</p>` : ""}
        </div>
      </div>
    `;
  }).join("");
}

if (journeyList) {
  renderJourney(defaultJourney);

  fetch("journey.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("journey.json request failed");
      return response.json();
    })
    .then(renderJourney)
    .catch(() => {
      renderJourney(defaultJourney);
    });
}

const heroLinks = document.getElementById("heroLinks");
const linksList = document.getElementById("linksList");
const defaultLinks = [
  {
    title: "✍️ Velog Tech Blog",
    shortTitle: "✍️ Velog",
    url: "https://velog.io/@m161awm/posts",
    description: "https://velog.io/@m161awm/posts"
  },
  {
    title: "🧩 GitHub Profile",
    shortTitle: "🧩 GitHub",
    url: "https://github.com/m161awm2",
    description: "https://github.com/m161awm2"
  }
];

function getLinkLabel(value) {
  return String(value || "Link").replace(/\s+(Server|Blog|Profile)$/i, "");
}

function getSafeUrl(value) {
  try {
    const url = new URL(value || "");
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function renderHeroLinks(links) {
  if (!heroLinks) return;

  const markup = links.map((item, index) => {
    const url = getSafeUrl(item.url);
    if (!url) return "";

    const label = item.shortTitle || getLinkLabel(item.title);
    const title = escapeHtml(label);
    const className = index === 0 ? "btn main" : "btn";

    return `<a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${title}</a>`;
  }).join("");

  if (markup) heroLinks.innerHTML = markup;
}

function renderLinksList(links) {
  if (!linksList) return;

  const markup = links.map((item) => {
    const url = getSafeUrl(item.url);
    if (!url) return "";

    const title = escapeHtml(item.title || "Link");
    const description = escapeHtml(item.description || url);

    return `
      <a class="big-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
        <div>
          <b>${title}</b>
          <span>${description}</span>
        </div>
        <strong class="arrow">→</strong>
      </a>
    `;
  }).join("");

  linksList.innerHTML = markup || '<div class="link-state">표시할 링크가 없습니다.</div>';
}

function renderLinks(items) {
  const links = Array.isArray(items) && items.length > 0 ? items : defaultLinks;
  renderHeroLinks(links);
  renderLinksList(links);
}

renderLinks(defaultLinks);

fetch("links.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error("links.json request failed");
    return response.json();
  })
  .then(renderLinks)
  .catch(() => {
    renderLinks(defaultLinks);
  });

const projectsGrid = document.getElementById("projectsGrid");
const defaultProjects = [
  {
    name: "Nginx-Starter",
    url: "https://github.com/m161awm2/Nginx-Starter",
    description: "Nginx 설정과 서버 운영을 연습하기 위한 저장소입니다.",
    language: "Shell",
    stars: 1
  },
  {
    name: "NestCal",
    url: "https://github.com/m161awm2/NestCal",
    description: "모두의 캘린더인것이다!",
    language: "TypeScript",
    stars: 1
  },
  {
    name: "Dogsori",
    url: "https://github.com/m161awm2/Dogsori",
    description: "JavaScript 기반 프로젝트 저장소입니다.",
    language: "JavaScript",
    stars: 1
  },
  {
    name: "SQLi_ClientBypass_wargame",
    url: "https://github.com/m161awm2/SQLi_ClientBypass_wargame",
    description: "해당 사이트에 출제되었습니다",
    language: "TypeScript",
    stars: 1
  }
];

function renderProjects(items) {
  if (!projectsGrid) return;

  const projects = Array.isArray(items) && items.length > 0 ? items : defaultProjects;
  const markup = projects.map((project) => {
    const url = getSafeUrl(project.url);
    if (!url) return "";

    const name = escapeHtml(project.name || "Untitled Project");
    const description = escapeHtml(project.description || "GitHub에서 프로젝트 내용을 확인해보세요.");
    const language = escapeHtml(project.language || "GitHub");
    const stars = Number.isFinite(Number(project.stars)) ? Number(project.stars) : 0;

    return `
      <a class="project-card" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
        <div>
          <div class="project-top">
            <h3>${name}</h3>
            <span class="project-arrow">→</span>
          </div>
          <p>${description}</p>
        </div>
        <div class="project-meta">
          <span>${language}</span>
          <span>★ ${stars}</span>
        </div>
      </a>
    `;
  }).join("");

  projectsGrid.innerHTML = markup || '<div class="post-state">표시할 프로젝트가 없습니다.</div>';
}

renderProjects(defaultProjects);

fetch("projects.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error("projects.json request failed");
    return response.json();
  })
  .then(renderProjects)
  .catch(() => {
    renderProjects(defaultProjects);
  });

const velogPosts = document.getElementById("velogPosts");
const postSort = document.getElementById("postSort");
let loadedVelogPosts = [];
let currentPostSort = "latest";

function stripHtml(value) {
  const element = document.createElement("div");
  element.innerHTML = value || "";
  return (element.textContent || element.innerText || "").replace(/\s+/g, " ").trim();
}

function formatPostDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getPostLink(value) {
  const fallback = "https://velog.io/@m161awm/posts";

  try {
    const url = new URL(value || fallback);
    return url.protocol === "https:" ? url.href : fallback;
  } catch {
    return fallback;
  }
}

function getPostThumbnail(value) {
  try {
    const url = new URL(value || "");
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function getPostTime(post) {
  const time = new Date(post.pubDate || "").getTime();
  return Number.isNaN(time) ? 0 : time;
}

function getPostLikes(post) {
  return Number.isFinite(Number(post.likes)) ? Number(post.likes) : 0;
}

function sortVelogPosts(posts, sortType) {
  return [...posts].sort((a, b) => {
    if (sortType === "oldest") return getPostTime(a) - getPostTime(b);
    if (sortType === "likes") {
      const likeDiff = getPostLikes(b) - getPostLikes(a);
      return likeDiff || getPostTime(b) - getPostTime(a);
    }

    return getPostTime(b) - getPostTime(a);
  });
}

function setActivePostSort(sortType) {
  if (!postSort) return;

  postSort.querySelectorAll(".sort-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.sort === sortType);
  });
}

function renderVelogPosts(posts, sortType = currentPostSort) {
  if (!Array.isArray(posts) || posts.length === 0) {
    velogPosts.innerHTML = '<div class="post-state">아직 표시할 글이 없습니다.</div>';
    return;
  }

  currentPostSort = sortType;
  setActivePostSort(sortType);

  velogPosts.innerHTML = sortVelogPosts(posts, sortType).slice(0, 6).map((post) => {
    const title = stripHtml(post.title) || "제목 없는 글";
    const description = stripHtml(post.description) || "Velog에서 글 내용을 확인해보세요.";
    const date = formatPostDate(post.pubDate);
    const link = getPostLink(post.link);
    const thumbnail = getPostThumbnail(post.thumbnail);
    const likes = Number.isFinite(Number(post.likes)) ? Number(post.likes) : 0;
    const thumbMarkup = thumbnail
      ? `<img class="post-thumb" src="${escapeHtml(thumbnail)}" alt="" loading="lazy">`
      : "";
    const thumbClass = thumbnail ? "" : " no-thumb";

    return `
      <a class="post-card${thumbClass}" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">
        <div>
          ${thumbMarkup}
          <div class="post-date">${escapeHtml(date || "Velog")}</div>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(description)}</p>
        </div>
        <span class="post-more">
          <span class="post-likes">♥ ${likes}</span>
          <span>원문 보러가기 <strong>→</strong></span>
        </span>
      </a>
    `;
  }).join("");
}

if (postSort) {
  postSort.addEventListener("click", (event) => {
    const button = event.target.closest(".sort-btn");
    if (!button) return;

    renderVelogPosts(loadedVelogPosts, button.dataset.sort || "latest");
  });
}

fetch("posts.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error("posts.json request failed");
    return response.json();
  })
  .then((posts) => {
    loadedVelogPosts = Array.isArray(posts) ? posts : [];
    renderVelogPosts(loadedVelogPosts);
  })
  .catch(() => {
    velogPosts.innerHTML = '<div class="post-state">글을 불러오지 못했습니다.</div>';
  });

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, { threshold: 0.16 });

reveals.forEach((el) => observer.observe(el));

const hero = document.querySelector(".hero");
let heroFrame = null;

function updateHeroHeight() {
  heroFrame = null;

  if (!hero) return;

  const maxExtraHeight = window.innerWidth <= 560 ? 64 : 96;
  const collapseDistance = window.innerWidth <= 560 ? 120 : 160;
  const scrollProgress = Math.min(window.scrollY / collapseDistance, 1);
  const extraHeight = Math.round(maxExtraHeight * (1 - scrollProgress));

  document.documentElement.style.setProperty("--hero-extra-height", `${extraHeight}px`);
}

function requestHeroHeightUpdate() {
  if (heroFrame) return;
  heroFrame = requestAnimationFrame(updateHeroHeight);
}

updateHeroHeight();
window.addEventListener("scroll", requestHeroHeightUpdate, { passive: true });
window.addEventListener("resize", requestHeroHeightUpdate);
