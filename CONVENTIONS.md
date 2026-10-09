# Conventions

Terse lookup reference for the project's recurring patterns, so you don't have to
read the source to find them. `CONTRIBUTING.md` is the friendly walkthrough;
`Docs.md` covers design decisions (TikZ, performance, hosting policy).

Source of truth for anything here: `frontend/apps/web/src/components/markdown-content.tsx`
(notes), `frontend/apps/web/src/pages/module.tsx` (module page), `app.py` (serving).

## Where things live

| Path | What |
|---|---|
| `Data/Resources/Notes/*.md` | Note content. **Flat, no subdirectories** — modules share files. |
| `Data/Resources/Solutions/*.md` | Solutions, named `<Code>-<Year>.md`. |
| `Data/Resources/Images/` | Images, referenced as `/Resources/Images/<file>`. |
| `Data/YearData/year<N>.json` | All module metadata and resource links. |
| `Data/Quizzes/*.json` | Quizzes, id-prefixed by module (`cs130-sets.json`). |
| `frontend/apps/web/src/pages/` | One file per route. |
| `frontend/apps/web/src/components/` | Shared UI (`cards.tsx`, `markdown-content.tsx`). |

## Callouts (in notes)

Obsidian syntax. No space between `>` and `[!type]`:

````markdown
>[!info]- Optional title with $math$ and **bold**
> Body. Blank `>` line for a paragraph break.
>
> Tables, lists, `$$display math$$` and ```tikz blocks all work inside.
````

Fold marker goes straight after `]`:

| Marker | Behaviour |
|---|---|
| *(none)* | Not collapsible, always open. |
| `-` | Collapsible, starts **closed**. The default across these notes. |
| `+` | Collapsible, starts **open**. |

Types — pick by meaning. Aliases on a row share colour and icon; only the
fallback label (used when you give no title) differs.

| Type (and aliases) | Colour | Used here for |
|---|---|---|
| `note` | blue | Neutral aside. |
| `info` | cyan | Derivations and worked reasoning. |
| `abstract` · `summary` · `tldr` | cyan | Recaps. |
| `tip` · `hint` | teal | Mnemonics, exam tips. |
| `check` · `success` · `done` | green | Answers to a question posed in the title. |
| `question` · `help` · `faq` | amber | Open questions. |
| `warning` · `caution` | amber | Common traps and misreadings. |
| `failure` · `fail` · `missing` | red | Counterexamples, invalid cases. |
| `danger` · `error` | red | Things that are outright wrong. |
| `definition` · `def` | indigo | Formal definitions. |
| `example` | purple | Worked examples. |
| `important` | purple | Emphasis. |
| `quote` · `cite` | grey | Quotations. |
| `todo` | blue | Placeholders. |

Gotchas:

- An unrecognised type silently falls back to `note` styling.
- An empty title renders the type's default label ("Info", "Tip", …).
- Body is always in the DOM, just `hidden` when closed — TikZ inside a collapsed
  callout still renders on page load.
- The established pattern for an exercise is a **collapsible callout whose title
  is the question** and whose body is the answer.

## Maths in notes

- `$inline$` and `$$display$$`, rendered by KaTeX (`strict: "warn"`, so
  non-standard input warns in the console but still renders).
- **Words in maths need `\text{}`** — `$\{\text{Coke}\}$`, not `$\{Coke\}$`,
  which renders as italic variables with no spacing.
- Set braces are `\{` and `\}`. Bare `{` `}` are grouping characters and render
  **nothing**.
- A literal `|` inside maths **inside a markdown table** must be `\|`, or it
  splits the cell.
- Emoji in maths warn (no font metrics) but render.

## Badges

Amber `Construction` = unfinished, green `BadgeCheck` = verified. Two places:

**1. Resource entries** in `year<N>.json` — set either flag on the entry, or
inside a nested `solution` object to mark only the solution:

```json
{"title": "Relations", "url": "/resources/Notes/CS130/Relations", "unfinished": true}
```

| Array | Badges? |
|---|---|
| `notes`, `quizzes`, `extras` | Yes |
| `past_papers`, `exercise_solutions` | Yes, plus on nested `solution` |
| `external_resources`, `reading_list`, `assessments` | No — not supported |

Rendered by `Badges` in `module.tsx`, absolutely positioned, so **the parent card
needs `relative`**.

**2. Guide cards** on `/resources` — set `unfinished: true` on the `GUIDES` entry
in `pages/resources.tsx`. `GuideCard` then shows "In construction" in the footer.

## `year<N>.json` module schema

Keys the frontend actually reads (anything else is **silently ignored** — see
`ModuleData` in `module.tsx`):

| Key | Shape |
|---|---|
| `name`, `tagline`, `description` | string. Tagline is a one-liner/shitpost; description is real info. |
| `Term`, `CATS` | string or number. |
| `notes`, `quizzes`, `extras` | `{title, url, verified?, unfinished?}[]` |
| `past_papers`, `exercise_solutions` | as above, plus `solution?: {url?, verified?, unfinished?}` |
| `external_resources` | `{name, description, url?}[]` — no `url` renders a non-clickable card. |
| `reading_list` | `{title, author?, url?, description?}[]` |
| `assessments` | `{title, weighting, submission_deadline?, eligible_for_self_certification}[]` |

`code`, `year` and `review_summary` are injected by `app.py` when it serves a
module — don't put them in the JSON.

Known dead keys present in the data: `authors` (credits come from
`Data/Credits/`) and `seminar_exercises` (nothing renders it).

Use `_` not `-` in key names. A typo'd key fails silently.

## Resource URLs

`/resources/<Category>/<ModuleCode>/<FilenameWithoutExtension>`, e.g.
`/resources/Notes/CS130/Relations`.

The module code is for display and breadcrumbs only. `app.py` resolves the file
by looking up `ResourceMap.json[category][module][filename]`, then falling back
to a tree search of `Data/Resources/<Category>/` for a matching name. So a flat
note needs **no** `ResourceMap.json` entry; only nested paths do. Categories are
`Notes` and `Solutions`; extensions tried are `md`, `tex`, `typ`, `pdf`.

Filenames are therefore globally unique per category — two notes called
`Functions.md` would collide.

## Adding a guide page

1. `pages/<slug>.tsx` exporting `<Name>Page`, built from `Page` + `PageHeader` +
   `PageSection`.
2. `App.tsx`: a `lazy()` import and a `<Route>`. Every route except `Welcome` is
   code-split.
3. Link it: an entry in `GUIDES` in `pages/resources.tsx` (or `careers.tsx`).
4. Breadcrumbs need nothing if the slug humanises correctly
   (`reading-notes` → "Reading Notes"); otherwise add it to `LABELS` in
   `components/breadcrumbs.tsx`. Pages whose URL parent isn't their logical
   parent go in `PARENT`.

## Verifying a change

From `frontend/apps/web/`, using the repo's own toolchain (`npx tsc` resolves to
an unrelated stub package and exits 0 — don't trust it):

```bash
node ../../node_modules/typescript/bin/tsc --noEmit -p .   # types
./node_modules/.bin/vite build                             # full build
```

For data edits, `python -c "import json; json.load(open('Data/YearData/year1.json', encoding='utf-8'))"`.
