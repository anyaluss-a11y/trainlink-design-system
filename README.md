# TrainLink design system

A design system for the TrainLink marketplace, built from the TrainLink Figma file with AI assistance (Claude Code + the Figma MCP server).

- **Design tokens** — colors (primitives and semantic), sizing and typography, exported from Figma variables into `tokens/figma-export.json` and compiled to CSS variables and Tailwind v4 theme values.
- **Components** — Button, Badge and Input, built on the tokens in React + TypeScript.
- **Storybook** — documents every token and component. **[View it live](https://anyaluss-a11y.github.io/trainlink-design-system/)**.

## Getting started

```bash
npm install
npm run storybook   # component and token docs on http://localhost:6006
npm run dev         # demo page on http://localhost:5173
```

## How the tokens work

`tokens/figma-export.json` is the source of truth. `npm run tokens` generates `src/styles/tokens.css` from it (this also runs before `dev` and `build`). Semantic tokens such as `bg-bg-subtle` or `text-text-brand` alias primitives, the same way they do in Figma, and each Figma text style becomes a utility class such as `type-body-sm`.

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, Storybook, Lucide icons, Manrope.
