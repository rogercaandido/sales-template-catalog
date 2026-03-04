# Quickstart: Admin Panel Token Persistence

## What changed

The GitHub token is now stored in `localStorage` (persists across browser sessions) instead of `sessionStorage` (cleared on tab close). The auth session (username/password) still uses `sessionStorage` for security.

## First use on a new device

1. Open the admin panel at `index.html#/adminpanelx`
2. Enter username, password, and your GitHub PAT
3. Click **Entrar**
4. The token is saved to `localStorage` — you won't need to enter it again on this device

## Subsequent logins

1. Open the admin panel
2. Enter username and password only (token field is pre-filled)
3. Click **Entrar**

## If the token expires or is revoked

1. Open the admin panel
2. Clear the pre-filled token field and paste your new GitHub PAT
3. Click **Entrar** — new token is saved, overwriting the old one

## Manually clearing the stored token

Open browser DevTools → Application → Local Storage → find `admindev_github_token` → delete.

## How to generate a GitHub PAT

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens](https://github.com/settings/tokens)
2. Generate new token with:
   - Repository access: `rogercaandido/sales-template-catalog` (single repo)
   - Permissions: **Contents → Read and write**
3. Copy the token and paste it into the admin login form
