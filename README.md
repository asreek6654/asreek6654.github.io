# Akshay's website

A small academic website built with [Eleventy](https://www.11ty.dev/). Edit the content below; Eleventy combines it with the shared layout and produces plain HTML in `dist/`. The only browser JavaScript is the light/dark toggle. Pages and publications work without JavaScript.

## Where to make changes

| Change | Edit |
| --- | --- |
| Bio wording | `src/index.md` |
| Papers, authors, years, paper/code/slides links | `src/_data/publications.yaml` |
| Name, email, Scholar, GitHub | `src/_data/site.yaml` |
| Photo | Replace `src/assets/portrait.jpg` |
| New tab | Add a Markdown file in `src/`, as shown below |
| Colors, spacing, font sizes | `src/assets/style.css` |

Most changes only touch the first three files. Avoid editing `dist/`: it is recreated on every build. The earlier mockups are outside this site's folder.

## Style experiment and restoring the previous design

The current style uses IBM Plex Sans for body text and IBM Plex Mono for uppercase section headings and years, with blue links and a divider above selected publications. Colors and font names are defined in `:root` in `src/assets/style.css`. The font files and their licenses live in `src/assets/fonts/` and are served by the site itself; there is no external font service or new build dependency. Keep writing headings normally: CSS makes section headings uppercase while navigation labels stay lowercase.

The previous design is saved in Git at commit `8081cbdf9094dfb0cf45afeb418f631261297947` (also tagged locally as `design-before-editorial-2026-09-28`). To restore just its appearance while keeping your content and layout, run:

```sh
git restore --source=8081cbdf9094dfb0cf45afeb418f631261297947 -- src/assets/style.css src/assets/favicon.svg
npm run build
```

To restore the intermediate serif-and-burgundy design instead, use commit `0c25432e05faa163266a5cfd8ff56bd6d05f9925` in that command (also tagged locally as `design-editorial-2026-09-28`). Preview the result, then commit and publish as usual. These style changes leave bio wording, publications, and navigation unchanged.

The entire about-page name is blue, with larger, upright bold serif initials inspired by journal drop caps. They are derived automatically from `name` in `site.yaml`, with styling in `.site-name`, `.name-word`, and `.name-initial`. To remove only this name treatment and keep the blue technical design, restore `src/_includes/base.njk` and `src/assets/style.css` from commit `40755de1eb21a09752b146f40f8a9173690c1e55` (local tag `design-before-name-initials-2026-09-29`).

The blue italic initials are saved at commit `ddc570c417346b96fcd6f5d9f405f57015e534af` (local tag `design-blue-initials-2026-09-29`). The monochrome italic initials are saved at commit `7fb134c240a232e09f5617ac17d399713b5b882a` (local tag `design-monochrome-italic-initials-2026-09-29`). The bold monochrome initials are saved at commit `9be15311b257f36ca9c66974245a284884e135c3` (local tag `design-bold-monochrome-initials-2026-09-29`). The version with only the bold initials in blue is saved at commit `04e54f7c2d62c5ed936fd53fc5cc22a6b4223424` (local tag `design-bold-blue-initials-2026-09-29`). Restore only `src/assets/style.css` from the corresponding commit to return to that treatment. For a fully monochrome name with the current shapes, remove `color: var(--link);` from both `.site-name` and `.name-initial`.

## Preview on your computer

Install [Node.js](https://nodejs.org/) 24 LTS, then run these commands from this folder:

```sh
npm ci
npm start
```

Open the address printed in the terminal. Edits refresh the preview automatically. Press Control-C to stop. Run `npm run build` to make the static site in `dist/`.

## Add a publication

Copy an existing entry in `src/_data/publications.yaml`, or use this shape:

```yaml
- title: "Your paper title: subtitle"
  authors:
    - Akshay Sreekumar
    - Coauthor Name
  year: 2027
  venue: Conference or journal name
  selected: true
  links:
    paper: https://example.com/paper
    code: https://github.com/you/project
    slides: /assets/slides/my-talk.pdf
```

Replace the example URLs before publishing. Use spaces, not tabs, for indentation. Quote a title if it contains a colon followed by a space, as above.

- Years are grouped automatically, newest first. Within a year, entries keep their order in this file.
- `selected: true` also puts the paper on the home page. Remove that line or set it to `false` to list it only under publications.
- Your name is highlighted automatically when an author matches `name` in `site.yaml`.
- Add or remove any link line. Labels can be `paper`, `code`, `slides`, `poster`, `video`, `project`, or any other short text. Missing links create no buttons. A paper without links is fine.
- To host a PDF yourself, put it under `src/assets/`, for example `src/assets/slides/my-talk.pdf`, then link to `/assets/slides/my-talk.pdf`.

Only list materials you are ready to make public. This site does not scrape Google Scholar; you control the entries.

## Change the bio or add a tab

The bio in `src/index.md` is ordinary Markdown. This is also where you update your role and affiliation. Blank lines separate paragraphs. Write a link as `[link text](https://example.com)`.

To add a page such as teaching later, create `src/teaching.md`:

```markdown
---
layout: page.njk
title: teaching
nav: teaching
order: 3
---

Your text goes here.

## courses

- Course name, year. [Materials](/assets/course-notes.pdf)
```

The `nav` line adds the tab automatically. `order` sets its position. The filename creates `/teaching/`; to choose another address, add `permalink: /another-name/` above the second `---`. Remove `nav` to keep a page available by URL without putting it in the menu. Remove the file to remove the page.

Keep tab text lowercase to match the current navigation. Page and section headings display in uppercase automatically. New pages use a single reading column with the shared header, navigation, theme toggle, and phone styling. The photo and contact icons appear only on the about page.

## Publish on GitHub Pages

The intended free address is **https://asreek6654.github.io/**. This address uses your existing username; a separate domain is optional. The files are ready for GitHub Pages, but creating the repository and enabling Pages are one-time account setup steps.

1. Create an empty repository named exactly **`asreek6654.github.io`** under your GitHub account. A public repository works with GitHub Free. If that repository already exists, preserve its contents and merge this site deliberately rather than overwriting it.
2. Push the **contents of this `site/` folder** to the repository's `main` branch. `package.json`, `src/`, and `.github/` must be at the repository root. Do not upload the outer `website/` folder or `node_modules/`.
3. In the repository, open **Settings → Pages → Build and deployment**, and choose **GitHub Actions** as the source.
4. In **Actions → Publish website**, run the workflow if the initial push happened before Pages was enabled. Once it succeeds, GitHub shows the live URL.

After this setup, you can edit your Markdown or YAML files directly on GitHub with the pencil button and commit the change. The included workflow rebuilds and publishes automatically. If a build fails, GitHub keeps the last successful site online; check the failed Actions run for the file and error.

For a project repository such as `website`, GitHub uses `/website/` in the address. The workflow handles that prefix for the shared templates. For links you type in Markdown, use the URL filter when they need to work under a project prefix:

```markdown
[Materials]({{ '/assets/course-notes.pdf' | url }})
```

A custom domain can be added later in GitHub Pages settings without redesigning anything. It must be a domain you own. The `.openai/hosting.json` file only identifies the separate Sites preview; GitHub Pages and the website do not depend on it.

Official guides: [GitHub Pages site addresses](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [publishing with Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages).

## How the files fit together

```text
src/
  index.md                 home page and bio
  publications.njk         publications page (uses the list below)
  _data/
    site.yaml              profile and contact links
    publications.yaml      all papers and resource links
  _includes/
    base.njk               shared page structure and navigation
    home.njk               bio + selected publications
    page.njk               layout for any new Markdown page
    paper.njk              one publication, reused everywhere
    icons.njk              small button icons
  assets/
    portrait.jpg
    style.css              all styling
    theme.js               theme preference only
    favicon.svg
```

There is no database, server application, tracking, external font service, or client-side framework. The build has two direct dependencies: Eleventy and a YAML reader. `package-lock.json` records the installed versions so builds are repeatable.
