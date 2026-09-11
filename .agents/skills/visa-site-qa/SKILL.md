---
name: visa-site-qa
description: Audit the Soboleva Visa React site after copy, layout, responsive, or interaction changes. Use when accepting UI work, checking approved marketing text, testing mobile and desktop layouts, verifying tariff swipe, sliders, modals, routes, or CTA links. Do not use for drafting articles, generating images, deployment, or Git release work.
---

# Visa Site QA

## Overview

Act as an independent acceptance reviewer for this Visa site. A change passes only when the approved wording is preserved, the affected blocks work at representative viewport sizes, and the user interaction succeeds in the browser.

## Preconditions

Before reviewing:

1. Read the latest user request and identify every approved phrase and requested visual behavior.
2. Identify the affected route and component files.
3. Start or reuse the local HTTP development server. Do not use `file://` for React pages.
4. Keep new placeholders visibly honest. Never invent client proof, post links, dates, or guarantees.

## Step 1: Make an acceptance map

Create a compact checklist with one row per requirement:

- exact text or content that must be present;
- route and block where it belongs;
- desktop expectation;
- mobile expectation;
- interaction expectation, when relevant.

Treat the approved source copy as canonical. Flag any missing paragraph, shortened CTA block, changed number, altered name, or stronger promise that was not separately approved.

## Step 2: Run structural checks

Run the project build and inspect changed files. At minimum:

```bash
npm run build
git diff --check
```

Build success proves only that the code compiles. It does not prove visual or behavioral acceptance.

## Step 3: Review responsive layouts

Check the affected route at these viewport sizes:

- mobile: 390 x 844;
- tablet: 768 x 1024 when the breakpoint is relevant;
- desktop: 1440 x 900.

At each size verify:

- no page-level horizontal overflow;
- headings remain readable and do not become needlessly tall;
- numbers such as `2 000+` do not wrap;
- text is vertically and horizontally aligned as requested;
- mobile-only and desktop-only images appear in the correct mode;
- grids have the requested column count;
- the page does not merely reuse the mobile list on desktop.

For this project, use the detailed checks in [acceptance-matrix.md](references/acceptance-matrix.md).

## Step 4: Exercise interactions

Do not infer behavior from class names. Perform the action in the browser and observe state or geometry before and after.

- Tariffs: drag horizontally and confirm the container scroll position and active tariff change. Also test arrows and dots.
- CTA: click it and confirm the intended section or external destination.
- Success stories and reviews: open an image, close the modal, then confirm automatic movement resumes.
- Blog and legal routes: open the route directly and return through the visible navigation.
- Mobile menu: open, choose a destination, and confirm it closes.

If browser automation cannot reproduce touch gestures, use pointer dragging and verify the before/after `scrollLeft` value. A positive `scrollWidth - clientWidth` by itself is not a pass.

## Step 5: Report the verdict

Return a short acceptance table with `PASS`, `FAIL`, or `NOT TESTED` for each requested item. Include the viewport and evidence for failures.

Any failed requested item means the change is not accepted. If implementation was requested, fix the failure and rerun the relevant checks. If only review was requested, report the failure without editing.

## Common failure patterns

- checking only one viewport;
- confirming swipe because the row technically overflows;
- rewriting sales copy while migrating markup;
- hiding missing material instead of using an honest placeholder;
- declaring success after build without using the page;
- checking a modal but not verifying that motion resumes after it closes.
