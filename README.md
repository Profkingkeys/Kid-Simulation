# KidSim

A friendly 3D home adventure about everyday health choices.

[Download the offline game](https://github.com/Profkingkeys/Kid-Simulation/releases/latest/download/Kid-Simulation.html) · [Build status](https://github.com/Profkingkeys/Kid-Simulation/actions/workflows/ci.yml) · [Collection](https://github.com/Profkingkeys/Simulation-Games)

## Play without a server

Download **Kid-Simulation.html** from [Releases](https://github.com/Profkingkeys/Kid-Simulation/releases), save it on your device, and open it in a modern browser. Three.js, game code and styling are bundled inside that one file. There is no account, API key, backend, CDN, font download or multiplayer service. If a mobile file manager only previews the document, use its “Open with browser” option or the hosted version after Pages is enabled.

The `index.html` at the repository root is the **development template**. Downloading that file alone will not run the game. The release file is the self-contained playable build.

## One continuous campaign

**Clean hands → medicine safety → cough care → safe drinking water → hot cookware.** Complete a mission and continue inside the same game. Make decisions using touch-friendly buttons or keyboard Tab/Enter. Every gameplay decision is available outside the canvas. The scene includes recognizable furniture/equipment, labels and an animated character. Reduced motion, pause, a teaching card, retry and downloadable attempt reports are built in. Completed missions are saved locally; no data is uploaded.

The explorer walks automatically through the home. Eating before handwashing produces a gentle retry. The washing activity requires twenty active seconds of scrubbing before rinse and dry unlock. Pausing or switching away from the page pauses that timer. Later missions teach asking an adult about medicines, cough etiquette, safe water and avoiding hot cookware.

## Build from source

Install Node.js 22 LTS or later and npm. From this directory:

```bash
npm ci
npm test
npm run build
```

Open **dist/index.html** directly in your browser. Alternatively:

```bash
npm start
```

Then open http://localhost:4174. This optional local HTTP server only serves files. It does not calculate gameplay, store patient records or run AI. A future multiplayer or securely authenticated AI service would need a backend; this release does not.

## Put the game online with GitHub Pages

1. Open [this repository’s Pages settings](https://github.com/Profkingkeys/Kid-Simulation/settings/pages), not your personal profile settings.
2. Under **Build and deployment**, choose **GitHub Actions** as Source.
3. Open Actions → **Deploy game to Pages** → **Run workflow**.
4. Use the URL reported by the deployment job. The expected project path is `https://profkingkeys.github.io/Kid-Simulation/` unless you configure a custom domain.

Pages serves the exact static bundle. No application server is required. See [GitHub’s publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## What has been checked

The CI gate runs the domain tests, JavaScript syntax checks and production bundling. Tests cover campaign completion, blocked invalid transitions, retry behavior and duplicate-scoring prevention plus the full timed handwashing sequence. A successful build produces an offline artifact and a versioned downloadable release.

This is an educational prototype. Family/educator review and child usability testing remain necessary before curriculum adoption. No claims of measured learning efficacy are made. Graphics use original procedural geometry. Three.js is MIT licensed; its license is retained in the distribution.

See [architecture](ARCHITECTURE.md), [teacher notes](TEACHER_NOTES.md) and [contributing](CONTRIBUTING.md).

If this has impacted you in any way, follow [Kingsley on GitHub](https://github.com/Profkingkeys), [X (Twitter)](https://x.com/Profkingkeys), and [LinkedIn](https://www.linkedin.com/in/prof-king-keys-110a24229).
