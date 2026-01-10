# Chromatic Setup Guide

## Overview

Chromatic provides automated visual regression testing for Storybook. It captures screenshots of all stories and compares them against baseline images to detect unintended visual changes.

## Initial Setup

### 1. Create a Chromatic Project

1. Go to [chromatic.com](https://www.chromatic.com/) and sign in with your GitHub account
2. Click "Add project" and select your `bible-graph` repository
3. Chromatic will generate a project token (e.g., `chpt_xxxxxxxxx`)

### 2. Configure the Project Token

**For local testing:**

```bash
cd frontend
export CHROMATIC_PROJECT_TOKEN=your_token_here
npm run chromatic
```

**For CI/CD (GitHub Actions):**

1. Go to your GitHub repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `CHROMATIC_PROJECT_TOKEN`
5. Value: Paste your Chromatic project token
6. Click "Add secret"

### 3. Run Your First Build

**Local:**

```bash
cd frontend
npm run chromatic
```

**CI/CD:**
The GitHub Actions workflow (`.github/workflows/chromatic.yml`) will automatically run on:

- Every push to `main`
- Every pull request

## Daily Workflow

### Running Visual Tests

```bash
# Run Chromatic and upload to cloud
npm run chromatic

# Build Storybook only (no Chromatic upload)
npm run build-storybook
```

### Reviewing Changes

1. After running `npm run chromatic`, you'll get a link to review changes
2. Chromatic will show you:
   - **New stories**: First-time captures (auto-accepted)
   - **Changed stories**: Visual diffs for review
   - **Unchanged stories**: No visual changes detected

3. Review each change:
   - ✅ **Accept**: If the change is intentional (new feature, bug fix)
   - ❌ **Reject**: If the change is unintended (visual regression)

### Pull Request Workflow

1. Create a branch and make UI changes
2. Push to GitHub
3. Chromatic will:
   - Build your Storybook
   - Capture screenshots
   - Compare against baseline (main branch)
   - Post a status check to your PR with visual diff summary
4. Review the visual diffs in Chromatic UI
5. Accept or reject changes
6. Once accepted, merge PR → new baseline is set

## Scripts

| Command                   | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `npm run storybook`       | Start Storybook dev server (http://localhost:6006) |
| `npm run build-storybook` | Build static Storybook for deployment              |
| `npm run chromatic`       | Run Chromatic visual tests (requires token)        |

## Configuration

### Chromatic Options

The `chromatic` script in `package.json` uses:

- `--exit-zero-on-changes`: Don't fail CI build on visual changes (review them in Chromatic UI instead)

### GitHub Actions

The workflow (`.github/workflows/chromatic.yml`) runs on:

- Push to `main` → Establishes new baseline
- Pull requests → Compares against `main` baseline

## Ignoring Stories

To exclude specific stories from Chromatic:

```typescript
// In your story file
export const MyStory = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
```

## Troubleshooting

### "Project token not found"

- Ensure `CHROMATIC_PROJECT_TOKEN` is set in environment or GitHub Secrets
- Verify token is correct (starts with `chpt_`)

### "Build failed: Unable to connect"

- Check network connectivity
- Ensure firewall allows outbound HTTPS to chromatic.com

### "No stories found"

- Verify Storybook builds successfully: `npm run build-storybook`
- Check `.storybook/main.ts` stories glob patterns

## Resources

- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Chromatic + GitHub Actions](https://www.chromatic.com/docs/github-actions)
- [Storybook Best Practices](https://storybook.js.org/docs/react/writing-stories/introduction)
