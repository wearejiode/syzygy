# GitHub Workflows Overview

This folder contains automation for CI/CD, security, and repository hygiene.

---

## 📜 Workflows

| Workflow                                  | Purpose                                                                                      |
| ----------------------------------------- | -------------------------------------------------------------------------------------------- |
| `__diff-env-variables-nightly.yml`        | Detects drift between `.yml` environment var files and GitHub Environments (daily + manual). |
| `__sync-env-vars.yml`                     | Syncs `.yml` env vars into GitHub Environments (manual with confirmation).                   |
| `sesame-pr.yml`                           | Builds/tests `sesame.jiode.one` app on PRs, deploys preview Worker, comments link.           |
| `sesame-release-staging.yml`              | Deploys `sesame.jiode.one` to staging on merge to `main`. Seeds R2 assets.                   |
| `sesame-promote-prod.yml`                 | Manual promotion of staging build to production (with preflight, post-sync, smoke tests).    |
| `_worker-ci.yml`                          | Reusable worker CI for build/test/deploy to preview or staging.                              |
| `_worker-promote.yml`                     | Reusable promotion workflow for production deployments.                                      |
| `__cleanup-pr.yml`                        | Deletes preview Worker when a PR is closed.                                                  |
| `__pr-preview-meta-status.yml`            | Creates a dummy Preview deployment for non-app PRs so required checks pass.                  |
| `__ci-sweep-full-nightly.yml`             | Nightly lint/test/build sweep across all projects.                                           |
| `__ci-sweep-post-merge.yml`               | Runs full CI after staging deploys succeed on `main`.                                        |
| `__ci-guard.yml`                          | Requires `ci-ok` label for CI workflow changes.                                              |
| `__lint-workflows.yml`                    | Lints workflow YAMLs + shell scripts in `.github`.                                           |
| `__codeql.yml`                            | Runs CodeQL analysis on pushes/PRs to `main`.                                                |
| `__labels-apply-by-path.yml`              | Auto-labels PRs based on changed paths.                                                      |
| `__labels-apply-diff-size.yml`            | Labels PRs with size (XS–XL) based on diff.                                                  |
| `__labels-every-issue.yml`                | Adds default `near-term` label on new issues.                                                |
| `__labels-project-priority-auto.yml`      | Syncs P0–PZ labels to Project priority field.                                                |
| `__labels-validate-pr-title.yml`          | Ensures semantic PR titles + scope ↔ area labels.                                            |
| `__labels-validate-pr-title-semantic.yml` | Alternate stricter semantic PR title validator.                                              |

---

## 🌍 Environment Variables

- Managed under `.github/env/*.vars.yml` and synced with workflows above.
- Use `__diff-env-variables-nightly` to detect drift, and `__sync-env-vars` to apply updates.
- Secrets (tokens, keys) are **not** tracked in these files.

### Tracking Table (fill in as you add/update)

| Variable                | Preview                   | Staging                   | Production         | Notes                 |
| ----------------------- | ------------------------- | ------------------------- | ------------------ | --------------------- |
| `CLOUDFLARE_API_TOKEN`  | :white_check_mark:        | :white_check_mark:        | :white_check_mark: | Scoped tokens per env |
| `CLOUDFLARE_ACCOUNT_ID` | :white_check_mark:        | :white_check_mark:        | :white_check_mark: | CF account identifier |
| `PREVIEW_HOST`          | preview.jiode.workers.dev | staging.jiode.workers.dev | sesame.jiode.one   | Worker hostname       |
| `R2_BUCKET`             | sesame-data-preview       | sesame-data-staging       | sesame-data        | Storage bucket        |
| _(add more rows here)_  |                           |                           |                    |                       |

---

### 🔑 Tip

When you introduce a new variable:

1. Update the table above for visibility.
