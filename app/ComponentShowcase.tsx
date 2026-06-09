// ─────────────────────────────────────────────────────────────────────────────
// app/ComponentShowcase.tsx — GardenPulse
//
// STANDALONE preview screen (mirrors app/showcase.tsx).
//
// This file is the single, self-contained way to view every reusable UI
// component in the app. It re-exports the route from app/showcase.tsx so
// that BOTH paths open the same screen:
//
//   /ComponentShowcase
//   /showcase
//
// Usage:
//   In a navigator:  import ComponentShowcase from './ComponentShowcase';
//   In a screen:     <ComponentShowcase />
// ─────────────────────────────────────────────────────────────────────────────

export { default } from './showcase';
