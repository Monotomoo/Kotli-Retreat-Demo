<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Session backup rule

At the end of every working session (or when the user says "done", "kraj", "spremi", "backup", or otherwise signals the session is over), create a timestamped backup of the code to:

`C:\Users\Darko\Dropbox\HeRc Files\Firma\Kotli - Prava Croatia\Code\Kotli - Soil & Soul, backup\`

Backup steps:
1. Create folder `backup-YYYY-MM-DD_HH-mm/` inside the target path
2. Copy `src/`, `public/`, `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `AGENTS.md`, `CLAUDE.md`, `README.md`
3. Do NOT copy `node_modules/` or `.next/`
4. Confirm to the user that backup is done and show the folder name
