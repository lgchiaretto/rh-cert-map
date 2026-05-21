# Red Hat Certification Map

A client-side web app that helps Red Hat certified professionals visualize their certification progress across five product lines: OpenShift, Enterprise Linux, Ansible, Cloud-Native Applications, and AI.

## Live Website

Access the webapp at [https://rh-cert-map.wasmer.app/](https://rh-cert-map.wasmer.app/) or clone it and open `index.html` locally on your machine.

## Features

- **Interactive certification map** with five horizontal arrow tracks showing levels from Technologist/Developer up to Architect
- **Automatic verification** -- enter your Red Hat Certification ID to auto-detect your passed exams and certifications from [rhtapps.redhat.com/verify](https://rhtapps.redhat.com/verify)
- **Other Exams section** -- exams from your transcript that don't map to the known certification tracks are displayed in a separate table with date badges
- **Manual exam selection** -- check exams individually with a searchable, grouped checklist in the sidebar
- **Partial progress indicators** -- levels that are partially completed show as orange "(in progress)" on the map
- **Hover/tap tooltips** showing the requirements to reach each level
- **Light and dark mode** with automatic detection and manual toggle
- **Collapsible sidebar** with exam list, search, view modes (by product, by level, flat), and sort toggle
- **Persistent state** saved in your browser's localStorage (exams, theme, sidebar)
- **Fully responsive** -- works on desktop, tablet, and phone
- **Auto-update** -- the app automatically reloads when a new version is deployed

## Tech Stack

- **UI framework**: [PatternFly v6](https://www.patternfly.org/) (CDN) -- semantic tokens for colors, spacing, typography, and dark/light theme support
- **Icons**: Font Awesome 6 (CDN)
- **Fonts**: Red Hat Text and Red Hat Mono (Google Fonts)
- **Runtime**: Vanilla JavaScript -- no build step, no bundler, no frameworks

### Layout

The page follows a PatternFly v6 page component structure:

- **Masthead** (`pf-v6-c-masthead`) -- Red Hat logo, app title, theme toggle
- **Sidebar** (`pf-v6-c-page__sidebar`) -- Certification ID input, exam checklist with expandable groups
- **Main content** (`pf-v6-c-page__main`) -- Certification map SVG, supplementary tables

All colors use PF6 semantic tokens (`--pf-t--global--*`), which automatically switch between light and dark themes when `pf-v6-theme-dark` is toggled on the `<html>` element.

## Usage

Open `index.html` in any browser. No build step or server required.

### Auto-detect certifications

1. Enter your Certification ID (format: `###-###-###`) in the sidebar input field
2. Click **Verify**
3. The app reads your **Current Credentials** to populate the certification map, and reads your **Exam Transcript** to populate the "Other Exams" table with any exams not in the known certification tracks
4. Your name and matched exams will appear, and the map updates automatically

### Manual selection

Check or uncheck exams in the sidebar. The certification map in the main content area updates in real time. Use the search box to filter exams by code or name. Switch between product view, level view, or flat list using the toolbar buttons.

## Deploying a New Version

On each deploy, bump the number in `version.txt` to trigger automatic browser refresh for returning users. No other changes needed -- the app compares the fetched version against `sessionStorage` and reloads if they differ.

## File Structure

```
index.html        # Single-page app (PF6 page layout)
style.css          # PF6-based styles with semantic tokens
app.js             # Application logic (exam data, map rendering, verification)
redhat-favicon.png # Red Hat logo (masthead and favicon)
version.txt        # Version number for auto-update detection
```
