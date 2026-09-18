# Media workflow

This repository keeps two separate layers:

- `../media-inbox/` — shared Visa source files for review and processing. It lives outside this repository.
- `public/media/` — approved, optimized files that the deployed site is allowed to serve.

## Where to put a new file

Put an original photo, video, or GIF into the matching folder:

```text
../media-inbox/images/
../media-inbox/videos/
../media-inbox/gifs/
```

Then tell Codex which Visa page and block it belongs to. Do not place personal
originals in `public/` or commit them. If a source contains personal data,
keep it outside Git even when the public derivative has been redacted.

## Final asset layout

```text
public/media/
├── shared/       # used by more than one Visa page in this repository
├── pages/        # new page-specific assets, e.g. pages/safe-case/
├── videos/
└── gifs/
```

The existing `public/media/safe-case/` folder remains canonical for the current
Safe Case article. Existing folders and links are not moved automatically.
Do not create `mobile/` and `desktop/` folders by default. Use responsive
variants such as `safe-case-hero-800.webp` and `safe-case-hero-1600.webp`.
Add `-mobile` or `-desktop` only when the composition is genuinely different.

## Naming examples

Use lowercase Latin characters, hyphens, a semantic role, and a stable name:

```text
shared-irina-portrait-1600.webp
pages/safe-case/hero-1600.avif
pages/safe-case/testimonial-elena-800.webp
ui/doodle-star.svg
ui/icon-telegram.svg
videos/visa-consultation-1080.mp4
gifs/visa-process.gif
```

Avoid `IMG_1234`, spaces, Cyrillic names, `final-final-2`, and names based
only on the current visual crop. Codex may rename files after checking every
usage and showing an old-to-new mapping first.

## Processing and review

Codex can resize, convert to WebP/AVIF, strip EXIF metadata, update references,
and run the Visa mobile/desktop QA. The original is not overwritten by default.
Commit, push, and deployment require the owner's separate confirmation.
