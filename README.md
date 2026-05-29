# test1234

GitHub Pages 정적 사이트입니다. Velog RSS는 브라우저에서 직접 요청하지 않고, GitHub Actions가 하루 한 번 `posts.json`으로 변환합니다.

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
```

정적 파일 서버로 확인하려면 아래처럼 실행할 수 있습니다.

```bash
npx serve .
```

## GitHub Actions 수동 실행

GitHub 저장소의 `Actions` 탭에서 `Update Velog posts` 워크플로를 선택한 뒤 `Run workflow`를 누르면 즉시 `posts.json`을 갱신할 수 있습니다.
