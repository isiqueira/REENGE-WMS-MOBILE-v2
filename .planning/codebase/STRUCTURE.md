# STRUCTURE

## Top-Level Layout
- `src/app`: Angular application shell, tabs pages, and shared starter component.
- `src/assets`: Static assets including images, fonts, icons, and sounds.
- `src/environments`: Build-time environment flags.
- `src/theme`: Ionic theme variables.
- `.vscode`: Workspace editor settings.

## App Folder Breakdown
- `app.component.*`: Root application shell.
- `app.module.ts`: Root NgModule.
- `app-routing.module.ts`: Root router entry point.
- `tabs/`: Main routed container and tab navigation.
- `tab1/`, `tab2/`, `tab3/`: Individually lazy-loaded pages.
- `explore-container/`: Starter sample component used by placeholder pages.

## Structural Observations
- There is no `core`, `shared`, `services`, `guards`, `interceptors`, or `models` directory yet.
- There is no domain-driven separation for receiving, inventory, picking, shipping, or configuration workflows.
- The route tree is shallow and centered around starter tabs.

## Asset Layout
- `assets/imgs`: Branding and fallback images.
- `assets/icon`: App icon resources.
- `assets/fonts`: Font files.
- `assets/sounds`: Alert and success audio assets in multiple formats.

## Legacy Port Clues
- `tabs.page.html` includes Ionic v3-style markup patterns such as `padding`, `text-center`, `floating`, and `ion-button` usage in template attributes.
- `global.scss` contains a large amount of app-specific CSS and compatibility-oriented theme data, suggesting a partial carry-over from an older Ionic codebase.

## Interpretation
- The folder structure is clean but minimal.
- Real feature segmentation has not started yet.

## Evidence
- `src/app/`
- `src/assets/`
- `src/theme/variables.scss`
- `src/global.scss`
- `src/app/tabs/tabs.page.html`
