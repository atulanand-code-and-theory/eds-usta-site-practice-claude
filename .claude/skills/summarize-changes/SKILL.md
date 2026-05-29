---
name: summarize-changes
description: Summarize the changes done in the current working tree or branch into a PR-ready summary. Use when the user asks to summarize changes, describe what changed, draft a PR description, or recap recent work.
---

# Summarize Changes

Produce a concise, PR-ready summary of the changes done in this repository. The
summary should be clear enough to paste directly into a pull request description,
consistent with the Publishing Process in `AGENTS.md`.

## 1. Determine scope (auto-detect)

Run read-only git commands to decide what to summarize:

1. Check for uncommitted work: `git status --porcelain`
2. **If the working tree has changes** → summarize the working tree:
   - `git diff --stat` for a high-level file overview
   - `git diff` for unstaged changes
   - `git diff --staged` for staged changes
   - Note any untracked files shown by `git status`
3. **If the working tree is clean** → summarize the current branch vs `main`:
   - `git diff main...HEAD --stat` then `git diff main...HEAD` for details
   - `git log main..HEAD --oneline` for the commit list
4. **Edge case — already on `main` with a clean tree**: there is no branch diff.
   Summarize the most recent commit(s) (`git log -3 --stat`) and tell the user
   that the tree is clean and no branch diff exists.

Always run `git diff --stat` (or `--stat` variants) first to scope the work
before reading full diffs.

## 2. Analyze

Group the changes by area, consistent with the project structure in `AGENTS.md`:

- **Blocks** — `blocks/<name>/` (JS and CSS per block)
- **Global scripts** — `scripts/`
- **Styles** — `styles/`
- **Config / tooling** — eslint, stylelint, package.json, `.github/`, etc.
- **Content / drafts** — `drafts/`, `*.html`
- **Docs** — markdown files

## 3. Output — PR-ready summary

Present the result in this structure:

```
## Summary
<1–3 sentence overview of what changed and why>

## Changes
- **blocks/<name>**: <concrete change>
- **scripts/scripts.js**: <concrete change>
- ...(grouped by file/block)

## Notes / follow-ups (optional)
- <anything a reviewer should know: new test content needed, perf considerations, etc.>
```

## Guardrails

- **Read-only.** Only run read-only git commands. Never commit, push, stage, or
  modify files as part of this skill.
- **Be factual.** Describe what the diff actually shows. Do not invent rationale
  beyond what is evident from the code — if the intent behind a change is
  unclear, ask the user rather than guessing.
- Reference files as `path:line` where it helps the reviewer locate a change.
- Reminder (do not fabricate): per `AGENTS.md`, a PR must include a preview URL
  with a path that demonstrates the change
  (`https://{branch}--{repo}--{owner}.aem.page/{path}`). Prompt the user to add
  one if relevant — do not invent the URL or path.
