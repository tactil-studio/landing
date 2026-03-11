# Táctil – Web & Digital Design Studio

Welcome to the codebase of **Táctil**, our official landing page and portfolio.
Táctil is a creative studio offering **custom design and development** for ambitious brands seeking **fast**, **scalable**, and **unique** digital experiences. Our work aims to break away from the world of generic templates—because **templates are for slideshows, not your website**.

---

## ✨ Vision

Modern websites often fall into two extremes: overdesigned yet underperforming templates, or fast but visually soulless themes. At Táctil, we bridge that gap by delivering handcrafted interfaces, subtle interactions, and performant codebases—all tailored to the brand’s DNA.

We build websites that:

* Convert better by being intentional
* Scale with your business
* Load blazingly fast
* Feel alive thanks to motion and detail

Our tagline sums it up:

> "Custom **design & development** for ambitious brands.
> Fast🚀, unique🦄 and scalable📈 digital experiences."

---

## 🧠 Why Astro?

The web doesn’t need more megabytes of JS just to render static content.

We use **[Astro](https://astro.build)** as our foundation to keep shipping:

* **Zero-JS by default**, great for landing pages and SEO
* **Island architecture**, enabling selective interactivity
* **Fast build times** and optimizations out-of-the-box

Combined with **React Islands** and **TailwindCSS**, Astro gives us the power to deliver real-time performance *and* expressive interfaces.

---

## 🛠 Tech Stack

| Tool / Library       | Purpose                               |
| -------------------- | ------------------------------------- |
| `Astro`              | Static site generator                 |
| `React`              | Interactive UI islands                |
| `TailwindCSS`        | Utility-first styling                 |
| `@astrojs/mdx`       | Rich content with Markdown & JSX      |
| `@astrojs/rss`       | RSS support for future blog/posts     |
| `@astrojs/sitemap`   | SEO-ready sitemap generation          |
| `@astrojs/react`     | React integration for Astro           |
| `@polgubau/animated` | Our own animation component library   |
| `astro-meta-tags`    | Dynamic meta tag generation           |
| `oxlint`             | Fast linter for modern JS/TS projects |
| `sharp`              | Image processing & optimization       |

---

## 🧪 Linting

We use [`oxlint`](https://oxlint.com/) for ultrafast linting, and it's integrated both manually and via Git hooks (`lint-staged`).

### Run lint:

```bash
pnpm lint
```

### Fix lint errors:

```bash
pnpm lint:fix
```

---

## 🚀 Scripts

| Command         | Description                 |
| --------------- | --------------------------- |
| `pnpm dev`      | Start local dev server      |
| `pnpm build`    | Build the production bundle |
| `pnpm preview`  | Preview the built app       |
| `pnpm lint`     | Run static analysis         |
| `pnpm lint:fix` | Auto-fix lint issues        |

---

## 🌍 i18n & Translations

The website is built with internationalization in mind. Text content is abstracted into language-specific files (`en.ts`, etc). Here's a preview of our English content:

```ts
{
  title: "Templates are for slideshows.",
  subtitle: "Not your website.",
  summary: "Custom <strong>design & development</strong> for ambitious brands.<br>Fast🚀, unique🦄 and scalable📈 digital experiences.",
  getInTouch: "Get in touch"
}
```

This allows easy expansion to other locales and supports dynamic UI rendering per language.

---

## 📁 Project Structure

A simplified overview:

```
/src
 ├─ /pages             → Astro route-based pages
 ├─ /components        → Reusable UI components
 ├─ /features          → Sections and layouts
 ├─ /translations      → i18n text per language
 ├─ /types             → Global TypeScript definitions
 ├─ /assets            → Static files, images, icons
```

---

## 🔍 SEO, Performance & Best Practices

* Fully static by default
* `<meta>` tags auto-generated via `astro-meta-tags`
* Sitemap via `@astrojs/sitemap`
* Optimized fonts, images (`sharp`)
* Zero client JS unless required

---

## 📬 Contact

Interested in working with us?
Let's talk: **[Get in touch](mailto:hello@tactil.studio)**

---

## 🧪 Coming Soon

We're planning:

* Blog section for design/dev topics
* More case studies
* Full multilingual support
* More animations & presets in `@polgubau/animated`

---

## 💬 License

This repo is private. All rights reserved by Táctil.
 