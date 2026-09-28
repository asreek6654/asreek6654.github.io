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

Keep heading and tab text lowercase to match the current design. The shared layout, photo, links, theme toggle, and phone styling apply automatically.

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
