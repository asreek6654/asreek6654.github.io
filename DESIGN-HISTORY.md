# Earlier design options

The approved all-blue name design is saved at commit `56e13ee6ad6a5f59479ca04f4c8e24363aebed2d` (local tag `approved-design-2026-09-30`). This file is only a record of earlier options; it is not part of the generated website. Use the main [README](README.md) for everyday editing and publishing.

The current style uses IBM Plex Sans for body text and IBM Plex Mono for uppercase section headings and years, with blue links and a divider above selected publications. Colors and font names are defined in `:root` in `src/assets/style.css`. The font files and their licenses live in `src/assets/fonts/` and are served by the site itself; there is no external font service or new build dependency. Keep writing headings normally: CSS makes section headings uppercase while navigation labels stay lowercase.

The previous design is saved in Git at commit `8081cbdf9094dfb0cf45afeb418f631261297947` (also tagged locally as `design-before-editorial-2026-09-28`). To restore just its appearance while keeping your content and layout, run:

```sh
git restore --source=8081cbdf9094dfb0cf45afeb418f631261297947 -- src/assets/style.css src/assets/favicon.svg
npm run build
```

To restore the intermediate serif-and-burgundy design instead, use commit `0c25432e05faa163266a5cfd8ff56bd6d05f9925` in that command (also tagged locally as `design-editorial-2026-09-28`). Preview the result, then commit and publish as usual. These style changes leave bio wording, publications, and navigation unchanged.

The entire about-page name is blue, with larger, upright bold serif initials inspired by journal drop caps. They are derived automatically from `name` in `site.yaml`, with styling in `.site-name`, `.name-word`, and `.name-initial`. To remove only this name treatment and keep the blue technical design, restore `src/_includes/base.njk` and `src/assets/style.css` from commit `40755de1eb21a09752b146f40f8a9173690c1e55` (local tag `design-before-name-initials-2026-09-29`).

The blue italic initials are saved at commit `ddc570c417346b96fcd6f5d9f405f57015e534af` (local tag `design-blue-initials-2026-09-29`). The monochrome italic initials are saved at commit `7fb134c240a232e09f5617ac17d399713b5b882a` (local tag `design-monochrome-italic-initials-2026-09-29`). The bold monochrome initials are saved at commit `9be15311b257f36ca9c66974245a284884e135c3` (local tag `design-bold-monochrome-initials-2026-09-29`). The version with only the bold initials in blue is saved at commit `04e54f7c2d62c5ed936fd53fc5cc22a6b4223424` (local tag `design-bold-blue-initials-2026-09-29`). Restore only `src/assets/style.css` from the corresponding commit to return to that treatment. For a fully monochrome name with the current shapes, remove `color: var(--link);` from both `.site-name` and `.name-initial`.

