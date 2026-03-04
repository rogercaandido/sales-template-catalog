# Contract: Admin Panel Token Storage

**Version**: 1.0 | **Date**: 2026-03-04

## Storage Keys

| Key | Storage | Type | Description |
|-----|---------|------|-------------|
| `admindev_auth` | `sessionStorage` | `"1"` | Auth session flag. Cleared on tab close. |
| `admindev_github_token` | `localStorage` | `string` | GitHub PAT. Persists across sessions. |

## Behavior Contract

### `handleAdminLogin(event)`

**Before**: Token saved to `sessionStorage`
**After**: Token saved to `localStorage`

```
IF token field is non-empty:
  localStorage.setItem('admindev_github_token', token)
IF credentials valid:
  sessionStorage.setItem('admindev_auth', '1')
```

### `AdminLoginForm()`

**Before**: Token field always empty, always required
**After**: Token field pre-filled from `localStorage` if present; still editable

```
storedToken = localStorage.getItem('admindev_github_token') || ''
render input[type=password, value=storedToken]
IF storedToken present: field is optional (not required)
IF storedToken absent:  field is required
```

### `adminAuth.logout()`

**Before**: Clears both `sessionStorage` keys
**After**: Clears only `admindev_auth` from `sessionStorage`; token stays in `localStorage`

```
sessionStorage.removeItem('admindev_auth')
// token intentionally NOT cleared — persists for next login
```

### `commitToGitHub()`

**Before**: `sessionStorage.getItem('admindev_github_token')`
**After**: `localStorage.getItem('admindev_github_token')`

## Error States

| Condition | Error message |
|-----------|--------------|
| `localStorage` token is null/empty | "Token GitHub não encontrado. Faça login novamente." |
| GitHub API returns 401 | "Bad credentials" → user must re-enter token |
| GitHub API returns 403 | Token lacks `contents: write` permission |
