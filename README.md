# Red Hat Certification Map

A client-side web app that helps Red Hat certified professionals visualize their certification progress across five product lines: OpenShift, Enterprise Linux, Ansible, Cloud-Native Applications, and AI.

## Features

- **Interactive certification map** with five horizontal arrow tracks showing levels from Technologist/Developer up to Architect
- **Automatic verification** -- enter your Red Hat Certification ID to auto-detect your passed exams from [rhtapps.redhat.com/verify](https://rhtapps.redhat.com/verify)
- **Manual exam selection** -- check exams individually with a searchable, grouped checklist
- **Hover/tap tooltips** showing the requirements to reach each level
- **Light and dark mode** with Red Hat brand colors
- **Persistent state** saved in your browser's localStorage
- **Fully responsive** -- works on desktop, tablet, and phone

## Usage

Open `index.html` in any browser. No build step or server required.

### Auto-detect certifications

1. Enter your Certification ID (format: `###-###-###`) in the input at the top
2. Click **Verify** to match from your current credentials, or **Read from Exam Transcripts** to match from your full exam history
3. Your name and matched exams will appear, and the map updates automatically

### Manual selection

Check or uncheck exams in the left panel. The certification map on the right updates in real time. Use the search box to filter exams by code or name.

## Tech Stack

Vanilla HTML, CSS, and JavaScript -- no frameworks, no dependencies.
