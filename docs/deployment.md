# Deployment

Read before any deploy conversation. Deploying requires explicit human approval every time; see [../AGENTS.md](../AGENTS.md).

Everything on this page is carried over from the predecessor primer and **was not re-verified** in the pass that produced this file. Confirm each step against the live host before relying on it.

## Target

| Fact | Value |
| --- | --- |
| Public URL | <https://harvest.feralcreative.co> |
| Host, SSH port, username, remote path | `.vscode/sftp.json` (gitignored) |
| Auth | SSH agent, key-based; no password is stored anywhere in the repo |
| Process manager | PM2, app name `harvest-sync` |
| Port | 8118, same as development |

## Release

1. Confirm the working tree is clean and the [definition of done](../AGENTS.md#definition-of-done) passed locally.
2. Upload. The VS Code SFTP extension reads `.vscode/sftp.json` directly ("SFTP: Upload Folder"). For a command-line release, `rsync` over SSH using the host, port, and remote path from that same file, excluding `node_modules`, `.git`, `.env`, and `_*`.
3. If `package.json` changed, run `npm install --omit=dev` on the host.
4. `pm2 restart harvest-sync`.
5. `pm2 status` and `pm2 logs harvest-sync --lines 50`.
6. Load the public URL and confirm both status cards read connected.

`.env` is never uploaded. The host keeps its own copy; changing a credential means editing it there and restarting PM2.

## First-time PM2 setup

```bash
pm2 start server.js --name harvest-sync
pm2 save
```

Set `NODE_ENV=production` in the host environment. Without it, `server.js` shells out to `open` on every boot, which is meaningless on a headless host and logs an error.

## Rollback

There is no build artifact and no release history on the host. Roll back by checking out the previous commit locally and re-running the release, then `pm2 restart harvest-sync`. Confirm the target commit predates the problem before uploading.

## Docker

`Dockerfile.dev` builds a `node:18-alpine` image, runs `npm ci`, exposes 8118, and starts `npm start`. It is a development convenience and is not the production path. Note that the `preview:month` and `sync:month` npm scripts use BSD `date` flags and fail inside this image.
