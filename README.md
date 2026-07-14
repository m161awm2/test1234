# test1234

GitHub Pages 정적 사이트입니다. Velog 글과 GitHub pinned 저장소는 GitHub Actions가 정적 JSON으로 변환해 페이지에 반영합니다.

## GitHub pinned 저장소 갱신 구조

- GitHub ID: `m161awm2`
- 생성 파일: `/projects.json`
- 생성 스크립트: `scripts/fetch-github-pins.js`
- 자동 실행: `.github/workflows/update-github-pins.yml` (5분 간격, GitHub Actions 상황에 따라 지연될 수 있음)
- GitHub GraphQL 인증: Actions 기본 `GITHUB_TOKEN` 사용

## Velog 글 갱신 구조

- Velog ID: `m161awm`
- RSS URL: `https://v2.velog.io/rss/m161awm`
- 생성 파일: `/posts.json`
- 생성 스크립트: `scripts/fetch-velog.js`
- 자동 실행: `.github/workflows/update-velog-posts.yml`

## 로컬 실행

```bash
npm install
npm run fetch:velog
GITHUB_TOKEN=... npm run fetch:github-pins
```

정적 파일 서버로 확인하려면 아래처럼 실행할 수 있습니다.

```bash
npx serve .
```

## GitHub Actions 수동 실행

GitHub 저장소의 `Actions` 탭에서 `Update Velog posts` 워크플로를 선택한 뒤 `Run workflow`를 누르면 즉시 `posts.json`을 갱신할 수 있습니다.

Pinned 저장소를 즉시 반영하려면 `Update GitHub pinned repositories` 워크플로를 수동 실행하면 됩니다.
