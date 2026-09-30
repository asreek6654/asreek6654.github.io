# Akshay's website

This `site/` folder is the entire website. Content is Markdown and YAML; [Eleventy](https://www.11ty.dev/) turns it into static HTML. You do not need AI to edit or publish it.

The approved design is the all-blue name with larger bold A/S initials. Earlier options are recorded separately in [DESIGN-HISTORY.md](DESIGN-HISTORY.md).

**Current status:** the Sites preview is published separately. The GitHub Pages workflow is ready, but the GitHub repository and Pages setup below have not been performed for you. Once set up, GitHub can build and host the site independently of Codex or Sites.

## 1. Where to edit

Paths below are relative to this `site/` folder.

| What you want to change | File |
| --- | --- |
| Bio and affiliation wording | `src/index.md` |
| Publications, authors, years, selected papers, and resource links | `src/_data/publications.yaml` |
| Name, email, Scholar, GitHub, description, photo filename | `src/_data/site.yaml` |
| Portrait | `src/assets/portrait.jpg` |
| Add a tab | A new Markdown file in `src/`; example below |
| Heading above selected papers | `src/_includes/home.njk` |
| Publications-page heading / Scholar label | `src/publications.njk` |
| Colors, fonts, sizes, spacing | `src/assets/style.css` |

Edit `src/`, not `dist/`. `dist/` is generated again on each build. Old mockups in the outer `design-exploration/` folder are not part of this website.

### Bio and basic links

Open `src/index.md`. Keep the settings between the opening `---` lines; edit the paragraphs underneath them. Blank lines start new paragraphs. Examples:

```markdown
I work on optimization and control.

Previously, I worked at Apple and Gridmatic.

[My lab](https://example.com)
```

Keep site-wide contact information in `src/_data/site.yaml`. Removing or emptying `email`, `scholar`, or `github` hides the corresponding icon. Changing `name` also changes the main heading, its styled initials, page titles, and author-name highlighting.

### Add or update a publication

Open `src/_data/publications.yaml`. Copy a whole existing entry, including its leading `-`, or use:

```yaml
- title: "A new paper: descriptive subtitle"
  authors:
    - Akshay Sreekumar
    - Coauthor Name
  year: 2027
  venue: Preprint
  selected: true
  links:
    paper: https://example.com/paper
    code: https://github.com/you/project
    slides: /assets/slides/my-talk.pdf
```

Replace the example text and links with your actual material.

- Use spaces, not tabs, and keep indentation aligned with the existing entries. Quote titles containing `: ` or ` #`.
- Years are grouped automatically, newest first. Papers within a year keep their order in this file.
- `selected: true` adds the paper to the about page too. Remove that line or set `selected: false` to show it only on publications.
- Add/remove individual resource lines as available: `paper`, `code`, `slides`, `poster`, `video`, `project`, or any short label. Remove the whole `links:` block if there are no resources yet.
- Use your name exactly as it appears in `site.yaml` to highlight it among the authors.
- Remove an entire entry to remove a paper. Google Scholar does not synchronize automatically.

### Add an award box

Add `award` alongside `venue`, `year`, and `selected` (not inside `links`):

```yaml
- title: "Your paper title"
  authors:
    - Akshay Sreekumar
    - Coauthor Name
  year: 2026
  venue: Your conference name
  selected: true
  award: "Best Paper"
  links:
    paper: https://example.com/your-paper
    slides: /assets/slides/my-talk.pdf
```

The award appears as a box beside the paper/code/slides links. Without a URL it is a non-clickable label. If you have an official award announcement, optionally add `award_url: https://example.com/awards` at the same indentation as `award`. Leave `award_url` out when there is no useful destination. You can use any award wording, such as `"Best Paper Finalist"`. Remove `award` to hide the box; an award also works on an entry with no resource links.

### Upload a PDF or replace the photo

Put downloadable files inside `src/assets/`, for example `src/assets/slides/my-talk.pdf`. A publication link then uses `/assets/slides/my-talk.pdf`. Use simple filenames without spaces; filename capitalization must match exactly.

In ordinary Markdown, use this form for a local file so it also works if you later host the site in a repository subdirectory:

```markdown
[Slides]({{ '/assets/slides/my-talk.pdf' | url }})
```

Replace `src/assets/portrait.jpg` to change the photo. Use a portrait-oriented image with a similar crop. If you use a different filename or extension, update `photo` in `site.yaml`. The photo and contact icons appear only on about.

### Add, rename, reorder, or remove a tab

Create `src/teaching.md` with:

```markdown
---
layout: page.njk
title: teaching
nav: teaching
order: 3
---

A short introduction to my teaching.

## courses

- Course name, year. [Notes]({{ '/assets/course-notes.pdf' | url }}).
```

The page appears at `/teaching/` and the shared menu updates automatically.

- `title` is the page heading; `nav` is the tab label. Keep tab labels lowercase. Headings display uppercase through CSS.
- `order` controls menu order; about is 1 and publications is 2.
- The filename controls the URL. Keep the filename if you only want to rename the displayed label.
- For a different URL, add `permalink: /another-name/` above the closing `---`.
- Remove `nav` to hide a page from the menu while keeping its URL. Delete the file to remove the page.

New tabs inherit the same header, typography, theme toggle, and responsive layout.

## 2. Preview locally

Node.js 24 is already being used for this project. On another computer, install Node.js 24 from [nodejs.org](https://nodejs.org/) first.

Open Terminal and run:

```sh
cd /Users/akshaysreekumar/Documents/Stanford/S3L/website/site
npm ci
npm start
```

Open `http://localhost:8080/`. Saving edits refreshes the local preview. Press Control-C to stop. Run `npm ci` on a fresh checkout or after changing the lockfile; it is not needed for each content edit.

Before publishing local changes:

```sh
npm run build
```

A successful build creates `dist/`. Building locally does not publish anything. You can check this site's content and layout entirely without a GitHub account or AI.

## 3. Publish to GitHub Pages once

Use **`https://asreek6654.github.io/`** as the free default address. It comes from your GitHub username, so your full name does not need to be available as a domain. [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)

### Create the repository

On [GitHub's new repository page](https://github.com/new), choose owner **asreek6654**, name **asreek6654.github.io**, and visibility **Public**. Leave the README, .gitignore, and license initialization options off: those files already exist locally where needed. If that repository already exists, inspect its contents and integrate this site rather than overwriting it.

This method publishes the site's source as well as the rendered pages. The website folder contains the profile and publication material intended for the site.

### Sign in for pushing from your Mac

If you already have working GitHub Git authentication, skip this subsection. Otherwise, use [GitHub CLI](https://cli.github.com/) (the `gh` command):

```sh
brew install gh
gh auth login --hostname github.com --git-protocol https --web --scopes workflow
gh auth setup-git --hostname github.com
```

Complete the browser login as **asreek6654**. Homebrew is already present on the Mac used for this project. On another computer, use the platform installer from the GitHub CLI page. [Login instructions](https://cli.github.com/manual/gh_auth_login), [Git credential setup](https://cli.github.com/manual/gh_auth_setup-git).

### Push this website

Run from the `site/` folder:

```sh
cd /Users/akshaysreekumar/Documents/Stanford/S3L/website/site
git remote add github https://github.com/asreek6654/asreek6654.github.io.git
git push github HEAD:main
```

The handoff is already committed. If you edit files before this first push, commit them first using the everyday workflow below. If `github` already exists as a remote, check `git remote get-url github` and skip the add command when it already points to the repository above. A rejected push to a nonempty repository needs the histories reconciled; do not force-push over existing work.

This keeps the existing preview remote (`origin`) separate. Future publishing commands below explicitly use `github`. A later clone from GitHub calls that same remote `origin`; use `origin` instead of `github` in those commands if you work from such a clone.

The repository root must contain `package.json`, `package-lock.json`, `eleventy.config.js`, `src/`, and `.github/workflows/pages.yml`. Push the contents of this `site/` folder, not the outer `website/` directory. Git ignores `node_modules/` and `dist/`.

### Enable Pages

In the GitHub repository:

1. Open **Settings → Pages → Build and deployment**.
2. Set **Source** to **GitHub Actions**. Keep the workflow already in the repository.
3. Open **Actions → Publish website → Run workflow**, select **main**, and run it. This handles the first push having happened before Pages was enabled.
4. Wait for the run to succeed. **Settings → Pages** will show the published URL. Initial publication can take several minutes.

Every future push to `main` rebuilds and publishes automatically. No manual upload of `dist/`, repository secret, or separate hosting subscription is required for this workflow. [Publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [custom workflow requirements](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## 4. Everyday editing and publishing

### Easiest: edit on GitHub

After setup, open the relevant file in your repository, click the pencil icon, edit it, then **Commit changes** to `main`. GitHub builds and publishes it. For a new tab, choose **Add file → Create new file** and name it `src/teaching.md`. For a PDF/photo, use **Add file → Upload files** in the destination assets folder.

GitHub's Markdown preview is a file preview, not the finished website. Check the live site after the **Publish website** action succeeds. For visual changes, use the local preview first. [Editing files on GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files).

### Or edit locally

Start with a clean working tree and bring down any changes made on GitHub:

```sh
cd /Users/akshaysreekumar/Documents/Stanford/S3L/website/site
git status
git pull --ff-only github main
npm start
```

If `git status` shows unfinished local edits, commit or finish them before pulling. A fast-forward failure means the histories diverged; resolve that before continuing.

Edit the files, inspect the preview, and press Control-C. Then:

```sh
npm run build
git diff
git add src
git commit -m "Update bio and publications"
git push github HEAD:main
```

Use a message describing your change. `git add src` includes content, assets, templates, and styling; also stage any documentation or workflow files you intentionally changed. If Git asks for your author identity on a new computer, set `git config user.name` and `git config user.email` to your preferred name and GitHub email for this repository.

After pushing, check **Actions → Publish website**. A failed build does not deploy the edited content; read its error, fix the source, and commit again. Common causes are YAML indentation, missing quotes around a title, or a filename with mismatched capitalization.

### Undo a mistake

For a wording typo, edit it back and commit. To undo the latest committed change from a clean local checkout synchronized with GitHub:

```sh
git log -5 --oneline
```

Confirm that the top entry is the change you want to undo, then run:

```sh
git revert --no-edit HEAD
git push github HEAD:main
```

This adds an undo commit and publishes it without deleting history.

## 5. Your URL and a custom domain

The default public address is `https://asreek6654.github.io/`; publications is `/publications/`. You do not configure that address in `site.yaml`. It follows from the GitHub username and repository name.

For a repository named `website` instead, the address becomes `https://asreek6654.github.io/website/`. The included workflow handles that prefix; use the Markdown URL-filter examples above for internal links.

To use your own domain later:

1. Buy/own your chosen domain and enter it in **Settings → Pages → Custom domain → Save** before changing DNS.
2. At your domain provider, add a `CNAME` record for `www` pointing to `asreek6654.github.io` (no `https://` or path).
3. For the bare domain, use an `ALIAS`/`ANAME` to `asreek6654.github.io`, or these four `A` records for `@`:

   ```text
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

4. After DNS/certificate setup completes, enable **Enforce HTTPS** in Pages. This can take up to 24 hours.

Use only the DNS records for this website; leave unrelated services such as email intact. No repository `CNAME` file is needed with this Actions workflow. Confirm current DNS values in [GitHub's custom-domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) when setting this up. A purchased domain needs renewal; the `github.io` address does not.

## 6. Maintenance and the small amount of code

The site has two direct build dependencies: Eleventy and a YAML parser. `npm ci` uses the committed lockfile for repeatable installations. Regular publication/bio edits do not require dependency updates. Review dependency/security notices and supported Node/Actions versions periodically; when deliberately updating them, preview and build before committing both `package.json` and `package-lock.json` as appropriate. There is no recurring server process to operate.

Keep Git history, the lockfile, the workflow, and font/icon license files. Check your email, paper/code links, and mobile layout after relevant edits. Your repository history is the primary record of changes; an occasional source-folder backup is useful too.

```text
src/
  index.md                 bio + about tab settings
  publications.njk         all papers grouped by year
  404.md                   missing-page message
  _data/
    site.yaml              profile and contact details
    publications.yaml      single publication list
  _includes/
    base.njk               shared page shell, name, photo, navigation
    home.njk               bio + selected publications
    page.njk               standard layout for added Markdown pages
    paper.njk              one paper renderer, reused in both lists
    icons.njk              small inline SVG icons
  assets/
    portrait.jpg
    style.css              all visual styling, both themes, phone rules
    theme.js               only browser JavaScript: theme preference
    favicon.svg
    fonts/                 local font files and licenses
```

No database, frontend framework, tracking, external font service, AI call, or paid API is involved. Browser JavaScript is only the theme toggle; reading and navigation work without it. Shared templates prevent duplicated navigation or paper markup. The website remains portable: `npm run build` produces plain files in `dist/` that any static host can serve.

`.openai/hosting.json` belongs to the separate Sites preview and is ignored by GitHub Pages. Pushing to GitHub updates GitHub Pages only; it does not update the old preview URL. Use the GitHub URL as your main site after setup.
