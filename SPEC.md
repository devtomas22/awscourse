# awscourse — Day-page Template SPEC

This file specifies the exact template every day page on
https://devtomas22.github.io/awscourse/ must follow. When a page diverges,
either fix the page or change this spec deliberately — never drift silently.

## 1. Files & URL conventions

```
awscourse/
├── index.html        # landing page (manifest-driven, see §2)
├── days.json         # day manifest — the ONLY place daycards grow
├── style.css         # palette variables (dark :root + light [data-theme])
├── theme.js          # theme toggle, persists to localStorage
├── SPEC.md           # this file
├── <YYYY-MM-DD>/     # one folder per study day
│   └── index.html    # the day page
└── .nojekyll         # skip Jekyll on Pages
```

- A day page is `<date>/index.html` and serves at
  `https://devtomas22.github.io/awscourse/<date>/`.
- Adding a day = create its folder + append ONE entry to `days.json`
  (`date`, `title`, `summary`, `url: "<date>/"`). Never hardcode day cards
  into the landing `index.html`; JS sorts entries newest-first.
- No build step: plain HTML + CSS + vanilla JS, zero dependencies.

## 2. Day-page anatomy

Tabs stay in this order, each a `<section class="tabpanel" id="tab-*">`:

| Tab | Contents |
|-----|----------|
| Summary | 3-5 distilled bullets of the day |
| Main concepts | expandable concept cards (`<details>`) |
| Flashcards | 40 flip cards (§4) |
| True / False | 40 quick-round statements (§4) |
| Quizzes | one or more quiz sets (sub-tabs when >1 set); pop quiz always present |
| Resources | links from the note's `## References` |

Tab mechanics: sticky `.tabbar`; panels hidden only under a `.js` root class
set by script — with scripts off, all panels render visible and stacked
(no-JS fallback). Quiz sets use `.subtabs` + `.quizpanel` the same way.

## 3. Content rules (always)

- Distill, never quote: transcript text from the note never appears on the
  page — only summaries, concept cards, drills built from it.
- Traceability: every factual claim traces to the day's note or official AWS
  docs; scenario framing is the only decoration you may add.
- Everything is answerable: answers are one click deep (see widget patterns),
  never removed, never shown straight away.
- Styling uses `style.css` variables only — grep for hardcoded hex before
  pushing; a page-inherited dark value turns invisible in light mode.

## 4. Mandatory counts (user rules, 2026-10-22)

| Widget | Count | Rule |
|--------|-------|------|
| Flashcards | **40** | every day page grows to exactly 40 flip cards |
| True / False | **40** | every day page grows to exactly 40 `data-correct="true|false"` statements |

Quiz sets keep prior days' counts unless the spec changes.

## 5. Widget markup patterns (vanilla JS only)

Flashcard (flip on click):

```html
<div class="flip" onclick="this.classList.toggle('flipped')">
  <div class="inner"><div class="face front"><div><span class="term">TERM</span></div></div>
  <div class="face back">ANSWER TEXT</div></div></div>
```

True/false round — correctness lives in the MARKUP, never only in handler
arguments; both outcomes must be visible (wrong pick red, correct option
green with a check); the card stays re-answerable:

```html
<div class="tf" data-correct="true">
  <p class="stmt">STATEMENT</p>
  <div class="row"><button data-val="true" onclick="tfTry(this,this.parentElement.parentElement)">True</button>
  <button data-val="false" onclick="tfTry(this,this.parentElement.parentElement)">False</button></div>
  <p class="why">True — WHY IT'S CORRECT.</p>
</div>
```

Quiz answer reveal (zero JS):

```html
<details class="ans"><summary>Show answer</summary><div>ANSWER</div></details>
```

Click-to-explain: elements carrying `data-info` write their explanation into
a status box on click.

## 6. Theming

- `style.css` holds the palette: dark `:root` variables +
  `[data-theme="light"]` overrides; `theme.js` toggles and persists the
  choice to `localStorage`.
- The theme button is labeled with the ACTION ("Switch to light" /
  "Switch to dark") — plain text, no emoji (they render as tofu).
- In light mode `--btn-bg` must differ from `--panel` or buttons vanish
  into their cards.

## 7. Deploy & verification

1. Push `main` over SSH (identity Tomas <tomas@example.com>).
2. Force the Pages build via the API (`POST /pages/builds`, needs
   `GITHUB_TOKEN` from `~/.hermes/.env`); SSH never reaches Pages config.
3. Trust `built` only when `builds/latest` commit equals the pushed HEAD.
4. Verify delivery: the day URL, `style.css`, and `days.json` each return
   200; the served HTML carries the page's signature markers, including the
   standing counts — grep `40` flip cards and `40` true/false cards.
5. Any NEW widget pattern gets clicked through in a real browser with a
   screenshot before it's called done.

## 8. Page-acceptance checklist

- [ ] Both standing counts hit: 40 flashcards, 40 true/false.
- [ ] Section order per §2; sub-tabs render stacked without JS.
- [ ] Every question answerable in one click; T/F marks both outcomes.
- [ ] Variable-only styling (no stray hex values, light-mode safe).
- [ ] `days.json` gains exactly one entry; landing renders it.
- [ ] Build commit == HEAD; live URL 200 with counters verified in the served HTML.