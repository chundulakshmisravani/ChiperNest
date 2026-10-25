# CipherNest — Secure Document Access Management

A responsive frontend-only cybersecurity dashboard built with React, Vite, JavaScript, React Router, Lucide React, Recharts, CSS, and browser `localStorage`.

> **Academic demo only:** there is no backend. Login, roles, sharing, revocation, audit records, and uploaded document metadata are simulated in the browser. This does not provide server-side authentication, encrypted storage, enforceable recipient restrictions, or network-level access revocation.

## Features

- Demo login with validation and show/hide password.
- Dashboard metrics, activity chart, recent documents, and quick actions.
- Document Vault with search, filters, sorting, upload metadata, details, and browser preview for supported text/image/PDF files.
- Share workflow with Viewer / Editor / Admin roles, permission toggles, and optional expiration.
- Access Management with permission editing and explicit revoke confirmation.
- Persistent audit trail with search, action/date filters, document-specific history, sorting, and CSV export.
- User and Role Management with demo role switching and UI-level permission checks.
- Settings for profile, theme, notifications, and logout.
- Responsive sidebar, mobile navigation, reusable dialogs, and toast notifications.
- Seed data is loaded on first run; updates persist to `localStorage`.

## Run locally

1. Extract `CipherNest-Frontend.zip`.
2. Open the `CipherNest-Frontend` folder in VS Code.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal (usually `http://localhost:5173`).

Create a production build with:

```bash
npm run build
```

## Demo credentials

- Email: `admin@ciphernest.demo`
- Password: `CipherNest123!`

The sign-in form accepts any valid email and a password of at least 6 characters; the listed credentials are provided for convenience. The session is a browser demo, not authentication.

## Demo roles

Use **User & Roles** to switch the current demo role:
- **Admin:** all demo management actions.
- **Editor:** upload and share documents; edit permissions.
- **Viewer:** view dashboard/documents and audit trail, but cannot upload, share, revoke, or manage users.

These checks only hide/disable interface actions. They can be bypassed through browser tools and are not security controls.

## Upload and preview behavior

Uploads are not sent to a server. The app stores document metadata and a small local preview payload for text and images when practical. Browser storage has size limits; large files may fail to persist. PDFs can be previewed from the current browser session via a temporary object URL, but object URLs do not persist across reloads. Avoid uploading confidential documents.

## Project structure

```text
CipherNest-Frontend/
├── index.html
├── package.json
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data/
    │   └── seed.js
    ├── hooks/
    │   └── useLocalStorage.js
    ├── layouts/
    │   └── AppLayout.jsx
    ├── components/
    │   ├── UI.jsx
    │   └── DocumentModal.jsx
    ├── pages/
    │   ├── Login.jsx
    │   ├── Dashboard.jsx
    │   ├── Documents.jsx
    │   ├── Share.jsx
    │   ├── Access.jsx
    │   ├── Audit.jsx
    │   ├── Users.jsx
    │   └── Settings.jsx
    ├── utils/
    │   └── helpers.js
    └── styles/
        └── global.css
```

## GitHub upload

Create an empty repository on GitHub, then open a terminal inside the extracted project folder and run:

```bash
git init
git add .
git commit -m "Initial CipherNest frontend"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository's HTTPS or SSH URL. Do not commit `node_modules`.

## Screenshots

Add your own screenshots here after running the app:

- `screenshots/dashboard.png` — Dashboard
- `screenshots/vault.png` — Document Vault
- `screenshots/access.png` — Access Management
- `screenshots/audit.png` — Audit Trail

## Security and privacy limitations

- No server, database, or real identity provider is used.
- Browser localStorage is not encrypted and may be readable by scripts running in the same origin.
- Role checks are demonstration-only and can be bypassed.
- Sharing records do not grant or enforce actual external access.
- Revocation updates this browser's mock records and audit log only; it cannot revoke downloaded copies or access on another server.
- Do not use this project to store sensitive or confidential data.
