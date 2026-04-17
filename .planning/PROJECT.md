# Mayan Mobile

## What This Is

Mayan Mobile is an Android warehouse management application that enables warehouse operators to perform all WMS operations — receiving, storage, picking, transfer, inventory, shipping, stuffing, conference, and TFA — from a mobile device. It is a full migration of the legacy Mayan WMS Mobile (Ionic 3 + Cordova 7) to Ionic 8 / Angular 20 / Capacitor 8, preserving all 13 original workflow modules and existing API connections.

## Core Value

All 13 WMS workflow modules must be fully functional and connected to the Mayan WMS API — if an operator can't do their workflow on the device, the app fails.

## Requirements

### Validated

- ✓ Ionic 8 + Angular 20 + Capacitor 8 scaffold initialized — existing
- ✓ Android build pipeline configured (Capacitor) — existing
- ✓ Branding assets (Mayan logo, sounds, fonts) in place — existing
- ✓ Codebase mapped and architectural gaps documented — existing

### Active

- [ ] Core infrastructure (HTTP client, session service, base page service, routing)
- [ ] Authentication and session management
- [ ] Reception module (6 pages)
- [ ] Storage module
- [ ] Picking module
- [ ] Transfer module
- [ ] Inventory module
- [ ] Shipping module
- [ ] Stuffing module
- [ ] Conference module
- [ ] TFA module
- [ ] Initial Charge module
- [ ] Auxiliary Queries module
- [ ] Settings module
- [ ] App identity and finalization (app ID, splash, icons)

### Out of Scope

- iOS build — Android only for this milestone
- UI redesign — keeping legacy behavior and visual patterns
- OAuth/JWT auth — keeping existing username/password + session token pattern
- Hardware barcode scanner integration — current camera-based behavior preserved; HW scanner deferred
- Encrypted/secure storage — Capacitor Preferences used as direct localStorage equivalent; encryption deferred
- HTTPS enforcement / certificate pinning — API URL is runtime-configurable; TLS enforcement deferred
- Offline mode / sync pipeline — requires API contract changes beyond scope

## Context

- **Legacy app**: Ionic 3 + Angular 5 + Cordova 7, ~15,000 lines of code, 41 pages, 13 providers
- **v2 scaffold**: Ionic 8 + Angular 20 + Capacitor 8 — initialized but empty (starter tabs only)
- **API**: Mayan WMS REST API at `http://api.mayanwms.com.br/log/api` (configurable at runtime by user)
- **Session pattern**: `UserName` sent as query param or body on all authenticated requests; session object stored in Capacitor Preferences (equivalent to legacy `localStorage['user-sessionWms']`)
- **Barcode focus management**: Legacy app uses a 20ms interval to force focus on `.foco` inputs — this pattern must be preserved in v2
- **Audio feedback**: Success (`assets/sounds/mp3/success-5.mp3`) and error (`assets/sounds/mp3/system-fault.mp3`) sounds on scanner operations
- **App version**: AppVersion "1.0.1" validated against API on login
- **Codebase map**: Available at `.planning/codebase/` — all architectural gaps documented

## Constraints

- **Tech stack**: Ionic 8 + Angular 20 + Capacitor 8 — no downgrade, no swap
- **Platform**: Android only — no iOS build in this milestone
- **Module pattern**: NgModule-based (not standalone components) — ESLint rule enforces this
- **API compatibility**: All 13 providers must reproduce the exact same endpoints and request shapes as the legacy app
- **UX fidelity**: Pages must reproduce legacy behavior — no UX redesign in v1
- **App identity**: App name "Mayan Mobile", App ID to be set to `com.reenge.mayanwms`

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Capacitor Preferences instead of raw localStorage | Capacitor Preferences is the idiomatic v8 equivalent; same key/value API; avoids web-only localStorage dependency in native context | — Pending |
| Keep legacy API URL pattern (configurable at runtime) | Operators point to different environments; changing this breaks existing deployments | — Pending |
| NgModule-based components (not standalone) | ESLint rule `@angular-eslint/prefer-standalone` explicitly disabled; project convention is NgModule | — Pending |
| Scope session token as Preferences key `user-sessionWms` | 1:1 mapping to legacy key name; simplifies migration validation | — Pending |
| apiUrl stored as Preferences key `apiUrl-sessionWms` | 1:1 mapping to legacy key name | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-06 after initialization*
