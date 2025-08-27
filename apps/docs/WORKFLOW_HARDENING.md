
# Workflow Hardening Checklist (CI/CD)

## 1) Permissions & Security
- Default **read-only** token in every workflow:
  ```yaml
  permissions: { contents: read }
  ```
- Grant writes **only** where needed at the *job* level (artifacts, deployments, id-token, attestations):
  ```yaml
  jobs.<job>.permissions:
    contents: read
    actions: write
    deployments: write
    id-token: write
    attestations: write
  ```
- Never echo secrets. Use `${{ secrets.* }}` only in `with:` / `env:` where necessary.
- Use **pinned actions** (`@vX.Y.Z` or commit SHA) for all third-party actions.

## 2) Triggers & Path Filters
- Keep triggers tight so CI runs only when relevant:
  ```yaml
  on:
    pull_request:
      branches: [main]
      paths:
        - 'apps/core/jiode/sesame.jiode.one/**'
        - '.github/workflows/sesame-*.yml'
        - 'pnpm-lock.yaml'
  ```
- Add a CI-only guard workflow to **short-circuit** non-app changes (docs/CI only) and mark Preview as “success” via deployment status.

## 3) Reusable Workflows & Stable Check Names
- Use **reusable** `_worker-ci.yml` / `_worker-promote.yml` with typed `inputs:`; don’t rely on top-level `env` leaking into called files.
- Keep **job names stable** (e.g., `sesame / verify`) so required status checks don’t break if filenames move.
- Pin callers to a specific commit of your internal CI repo if you externalize shared workflows.

## 4) Matrix vs env
- Use **matrix** for per-app constants you want to reference everywhere:
  ```yaml
  strategy:
    matrix:
      app:
        - id: sesame
          path: apps/core/jiode/sesame.jiode.one
          wrangler: apps/core/jiode/sesame.jiode.one/sesame-meta-worker/wrangler.toml
  ```
  Access via `matrix.app.path` (not `env.`) in the called jobs/steps.

## 5) Concurrency & Idempotency
- Prevent duplicate runs and artifact collisions:
  ```yaml
  concurrency:
    group: ${{ github.workflow }}-${{ github.ref }}
    cancel-in-progress: true
  ```
- Give artifacts unique names (include `sha` or PR number). If a name can repeat, allow overwrite:
  ```yaml
  with:
    name: my-artifact-${{ github.run_id }}
    overwrite: true
  ```

## 6) Artifacts & Attestations (Supply Chain)
- Upload build outputs as artifacts from CI; **promote** by downloading the artifact in a separate job/workflow.
- Generate and **verify** SLSA provenance/attestations before prod deploy.
- Fail promote if attestation or checksum doesn’t match.

## 7) Preview / Staging / Prod
- **Preview (PR)**: deploy on PRs that touch app paths; skip (but mark success) on CI-only edits.
- **Staging (post-merge)**: rebuild from `main` and deploy; make staging a **required** deployment for protected merges.
- **Prod (promote)**: pull the exact CI artifact + verified attestation; require approval and protected environment.

## 8) Branch Protection & Rules
- Require PRs for `main`, no direct pushes.
- Required checks: semantic title, labeler, app-specific `verify` job(s), staging deployment success.
- Optionally require **signed commits** and dismiss stale approvals on new commits.

## 9) Labeling & Semantics
- Auto-label by path (area:*), size labels, and semantic-PR title check (`type(scope): subject`).
- Whitelist bots (Dependabot) or auto-map Dependabot PRs to `chore(deps): …`.

## 10) Dependabot & Code Scanning
- Dependabot weekly for `npm` + `github-actions`; auto-merge patch/minor for dev-only if you like.
- Enable **CodeQL** for JS/TS on `push`/`PR`/weekly schedule.

## 11) Token Scope & Environments
- Store deploy tokens per **environment** (Preview/Staging/Prod), not globally.
- Use environment protection rules (required reviewers, secrets isolation).
- If prod lives in a separate account, keep prod tokens *only* in that account’s environment.

## 12) Caching & Speed
- Use `actions/setup-node` + `cache: 'pnpm'` and `pnpm/action-setup`.
- Avoid `npm` installs in workflows that already use pnpm.
- Keep path filters narrow to limit unnecessary builds.

## 13) Local Validation & Smoke
- Add **actionlint** on PRs to validate YAML early.
- Keep a minimal **smoke test** per app (e.g., Miniflare worker GET / returns 200) in the shared “verify” job.

## 14) Observability
- Consistent `core.startGroup`/`endGroup` around key steps.
- Worker logs: enable Logpush in staging when debugging; keep prod lean.
- Post preview/staging URLs as PR comments for quick review.

## 15) Docs & Badges
- Pin check names and add badges to README (PR checks, staging, prod).
- Short “How CI Works” section linking to your reusable workflows and promotion flow.

---

### Tiny Snippets You’ll Reuse

**Pinned action example**
```yaml
- uses: actions/checkout@v4
- uses: pnpm/action-setup@v4
  with: { version: 10 }
- uses: actions/setup-node@v4
  with: { node-version: 20, cache: 'pnpm' }
```

**Job-level permissions (example for promote)**
```yaml
permissions:
  contents: read
  actions: read
  deployments: write
  id-token: write
  attestations: write
```

**Preview “CI-only” marker (no deploy)**
```yaml
- name: Mark Preview success (CI-only change)
  uses: actions/github-script@v7
  with:
    script: |
      const { owner, repo } = context.repo;
      const ref = context.payload.pull_request.head.sha;
      const dep = await github.rest.repos.createDeployment({
        owner, repo, ref,
        auto_merge: false,
        required_contexts: [],
        environment: 'Preview',
        description: 'CI-only change: no preview deploy needed',
        transient_environment: true
      });
      await github.rest.repos.createDeploymentStatus({
        owner, repo, deployment_id: dep.data.id,
        state: 'success',
        environment: 'Preview',
        environment_url: 'https://example.com/ci-only'
      });
```

**Actionlint gate**
```yaml
name: actionlint
on: [pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: reviewdog/action-actionlint@v1
```
