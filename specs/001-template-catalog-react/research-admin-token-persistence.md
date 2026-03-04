# Research: Admin Panel GitHub Token Persistence

**Feature**: Admin panel token persistence fix
**Date**: 2026-03-04
**Status**: Complete

## Problem

The GitHub Personal Access Token (PAT) required by the admin panel to commit changes via the GitHub API is currently stored in `sessionStorage`. This clears every time the browser tab is closed, a new tab is opened, or the browser restarts — forcing the user to re-enter the token on every session.

A previous attempt to hardcode the token in the source code (commits 56ee410, 33d46df, 33d46df) was automatically revoked by GitHub's secret scanning system, making that approach permanently blocked.

## Decision: localStorage for Token, sessionStorage for Auth

### Chosen approach

- **Auth session** (`admindev_auth`): Keep in `sessionStorage`. Requires login per browser session (security).
- **GitHub token** (`admindev_github_token`): Move to `localStorage`. Persists across browser sessions on the same device.

### Why localStorage is correct here

| Criterion | sessionStorage | localStorage | Hardcoded in code |
|-----------|---------------|--------------|-------------------|
| Persists across sessions | ❌ | ✅ | ✅ |
| Survives GitHub secret scanning | ✅ | ✅ | ❌ (auto-revoked) |
| User-controlled (can clear/update) | ✅ | ✅ | ❌ |
| Works in static HTML with no backend | ✅ | ✅ | ✅ |
| Scoped to same origin | ✅ | ✅ | ✅ |

### Alternatives considered

1. **Environment variable / build-time injection**: Requires a build step or CI/CD secret injection. This project is a single static HTML file with no build pipeline. Not viable.
2. **Backend proxy**: Would require a server to forward API calls without exposing the token to the browser. Adds significant complexity, contradicts zero-dependency constraint.
3. **Netlify/Vercel environment functions**: Would require restructuring from single-file to framework project. Out of scope.
4. **Re-enter on every login (current)**: Poor UX; user has to find and paste the token every session.
5. **localStorage (chosen)**: Zero complexity, works offline, never appears in source code, user can clear it anytime via DevTools.

### Security considerations

- The token is stored at `localStorage['admindev_github_token']` scoped to the same origin
- The admin panel is not publicly linked — access requires knowing the `/adminpanelx` route + username + password
- localStorage is accessible to any JS on the same origin — acceptable since this is a personal admin tool, not a multi-user app
- If the token needs to be rotated, the user enters a new one in the login form and it overwrites the stored value

## Implementation Changes Required

| Location | Change |
|----------|--------|
| `handleAdminLogin()` | Save token to `localStorage` instead of `sessionStorage` |
| `AdminLoginForm()` | Pre-fill token field from `localStorage` if available; make field optional when pre-filled |
| `adminAuth.logout()` | Clear token from `localStorage` |
| `commitToGitHub()` | Read token from `localStorage` instead of `sessionStorage` |

## Token Field UX After Fix

- **First login on new device**: Token field shown as required (empty). User enters token once.
- **Subsequent logins on same device**: Token field pre-filled (masked). User only enters username + password.
- **Token expired/revoked**: User clears the field and enters new token. New token overwrites stored one.
- **Logout**: Auth session clears (sessionStorage). Token remains in localStorage (intentional — user doesn't need to re-enter it next login).
