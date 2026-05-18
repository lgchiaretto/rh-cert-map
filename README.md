# Red Hat Certification Map

A client-side web app that helps Red Hat certified professionals visualize their certification progress across five product lines: OpenShift, Enterprise Linux, Ansible, Cloud-Native Applications, and AI.

## Live Website

Access the webapp at [https://rh-cert-map.wasmer.app/](https://rh-cert-map.wasmer.app/) or clone it and open `index.html` locally on your machine.

## Features

- **Interactive certification map** with five horizontal arrow tracks showing levels from Technologist/Developer up to Architect
- **Automatic verification** -- enter your Red Hat Certification ID to auto-detect your passed exams and certifications from [rhtapps.redhat.com/verify](https://rhtapps.redhat.com/verify)
- **Other Exams section** -- exams from your transcript that don't map to the known certification tracks are displayed in a separate table with date badges (green if less than 3 years old, red if older)
- **Manual exam selection** -- check exams individually with a searchable, grouped checklist
- **Partial progress indicators** -- levels that are partially completed show as orange "(in progress)" on the map
- **Hover/tap tooltips** showing the requirements to reach each level
- **Light and dark mode** with Red Hat brand colors
- **Persistent state** saved in your browser's localStorage
- **Fully responsive** -- works on desktop, tablet, and phone
- **Auto-update** -- the app automatically reloads when a new version is deployed

## Usage

Open `index.html` in any browser. No build step or server required.

### Auto-detect certifications

1. Enter your Certification ID (format: `###-###-###`) in the input field
2. Click **Verify**
3. The app reads your **Current Credentials** to populate the certification map, and reads your **Exam Transcript** to populate the "Other Exams" table with any exams not in the known certification tracks
4. Your name and matched exams will appear, and the map updates automatically

### Manual selection

Check or uncheck exams in the left panel. The certification map on the right updates in real time. Use the search box to filter exams by code or name. Click **Clear All** to reset all selections.

## Deploying a New Version

On each deploy, update the version number in two places to trigger automatic browser refresh for returning users:

1. Update the number in `version.txt`
2. Update the `APP_VERSION` variable in the inline `<script>` in `index.html` to match

## Tech Stack

Vanilla HTML, CSS, and JavaScript -- no frameworks, no dependencies.
