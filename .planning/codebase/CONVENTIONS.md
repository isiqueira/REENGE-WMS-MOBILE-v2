# CONVENTIONS

## Language And Compiler Conventions
- TypeScript strict mode is enabled.
- Angular compiler strict template checking is enabled.
- `useDefineForClassFields` is disabled, matching common Angular compatibility defaults.

## Angular Conventions
- Components are declared through NgModules, not standalone APIs.
- Angular ESLint rule `@angular-eslint/prefer-standalone` is explicitly turned off.
- Component selectors use `app-` kebab-case.
- Directive selectors use `app` camelCase attributes.
- Component classes are expected to end in `Page` or `Component`.

## Styling Conventions
- SCSS is used across the application.
- Ionic global CSS imports are centralized in `src/global.scss`.
- Theme colors are defined both as CSS custom properties and a legacy Sass `$colors` map.
- Global styles currently include utility classes and feature-specific selectors instead of being narrowly scoped.

## Testing Conventions
- Unit tests use Jasmine and Angular TestBed.
- Current specs focus on component creation rather than behavior.
- Specs are colocated next to their components/pages.

## Notable Inconsistencies
- The codebase mixes modern Angular 20 tooling with template and styling patterns associated with older Ionic generations.
- Strict TypeScript settings are enabled, but app logic is still extremely light and does not yet exercise those constraints.
- Some template syntax in `tabs.page.html` may require modernization for full Ionic 8 correctness.

## Evidence
- `tsconfig.json`
- `.eslintrc.json`
- `src/global.scss`
- `src/theme/variables.scss`
- `src/app/tabs/tabs.page.html`
