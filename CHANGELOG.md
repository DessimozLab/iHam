# Changelog

iHam 2 is a rewrite of iHam 1 (see the `v1` branch) as a Vue 3 component and an `<i-ham>` custom element. Pre-releases are published on npm under the dist-tag `next`. The release workflow uses the section of a version as its GitHub release notes.

## [2.0.0-alpha.7] - 2026-11-18

Settles the public API before 2.0.0; several breaking changes.

### Changed (breaking)

- `<i-ham>` events carry their payload as `detail` (`e.detail.name`), not as an argument array (`e.detail[0]`).
- Props `famData` / `famDataUrl` are now `geneData` / `geneDataUrl` (attribute `gene-data-url`); the type `FamGene` is now `GeneData`.
- Prop `height` is now `maxHeight` (attribute `max-height`): it sets the maximum height of the viewer.
- Event `hogs-removed` is now `hogs-hidden`, with the payload `{level, hogs: [{index, hogId?}]}` (`hogId` with augmented OrthoXML) instead of bare column indices. It is also sent when the level changes, unless no HOGs were or are hidden.
- `node-selected` no longer has the internal node `id`.
- The package exports only the stable part of the core API: `parseSpeciesTree`, `parseOrthoXml`, `computeLevelView`, `omaEndpoints`, `fillTemplate` and the data types. Tree layout, colour and parsing helpers are internal.
- CSS custom properties `--iham-header-bg` / `--iham-header-fg` are now `--iham-popover-title-bg` / `--iham-popover-title-fg`.

### Added

- `update:tooltipTrigger` event, for `v-model:tooltipTrigger`.
- On `<i-ham>`, `level`, `coverageThreshold`, `colorScheme` and `tooltipTrigger` (and their attributes) follow the viewer, so setting them always takes effect.
- Types `IHamEvents`, `IHamMethods`, `IHamElementEventMap` and `HiddenHog`; `<i-ham>` in `HTMLElementTagNameMap` has typed methods and events.
- `computeLevelView` works without `maxima` and `species`.
- README: methods and styling (CSS custom properties).
- `iham/package.json` is exported (for tools that read the installed version).

### Fixed

- Attributes of `<i-ham>` (`id`, `class`, `style`, …) were also applied to the viewer's root element inside the shadow root.
- CSS custom properties had different defaults in different places (`--iham-border`, `--iham-muted`, `--iham-fg`).

### Internal

- Browser tests with Playwright (Chromium, Firefox, WebKit) in CI.

## [2.0.0-alpha.6] - 2026-11-18

First pre-release of iHam 2 on npm. Earlier alphas were not published.

[2.0.0-alpha.7]: https://github.com/DessimozLab/iHam/compare/v2.0.0-alpha.6...v2.0.0-alpha.7
[2.0.0-alpha.6]: https://github.com/DessimozLab/iHam/releases/tag/v2.0.0-alpha.6
