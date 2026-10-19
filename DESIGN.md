# Impilo | Remote Patient Monitoring Devices

## Overview

**Product:** Impilo | Remote Patient Monitoring Devices
**URL:** https://impilo.health/
**Surface type:** marketing
**Audience:** Business decision-makers and potential customers
**Brand character:** Conversion-focused marketing presence with a minimal, restrained color palette and single-typeface typography.

### Design Principles

- Consistency over novelty — reuse existing patterns before inventing new ones.
- Token-driven — every visual decision references a token, not a magic number.
- Accessible by default — compliance is a baseline, not a feature.

## Colors

_No colors detected._

## Typography

**Font stack:** Gilroy

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 11px | Captions, metadata |
| text-sm | 12px | Labels, secondary text |
| text-base | 15px | Body text (default) |
| text-lg | 48px | Subheadings, emphasis |
| text-xl | 82px | Section headings |
| text-2xl | 110px | Section headings |

**Weight scale:** 500 · 600
**Line heights:** 15.1168px · 9.80941px · 17.9159px · 23.04px · 44.16px · 101.403px · 75.2369px

## Spacing

**Base unit:** 4px

`space-1: 1px` · `space-2: 3px` · `space-3: 7px` · `space-4: 8px` · `space-5: 10px` · `space-6: 13px` · `space-7: 14px` · `space-8: 15px` · `space-9: 18px` · `space-10: 21px` · `space-11: 22px` · `space-12: 27px` · `space-13: 28px` · `space-14: 36px` · `space-15: 37px` · `space-16: 43px` · `space-17: 44px` · `space-18: 51px` · `space-19: 71px` · `space-20: 92px`

## Shapes

**Border radius:** `radius-sm: 16px` · `radius-md: 1267.2px`

## Elevation

- **shadow-sm:** `rgba(0, 0, 0, 0.45) 0px 0.8832px 3.5584px 0px, rgb(178, 176, 255) 0px -0.8832px 2.6624px 0px inset, rgb(60, 57, 185) 0px 0px 0px 0.8832px`

## Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-base:** `transform 0.2s`
- **duration-base:** `transform 0.25s`
- **duration-slow:** `color 0.5s`
- **duration-slow:** `background-color 0.5s`
- **duration-slow:** `transform 0.5s`
- **duration-slow:** `stroke 0.5s`

## Components

- **Buttons:** 5 detected
- **Links:** 29 detected
- **Inputs:** 1 detected
- **Images:** 78 detected

## Do's and Don'ts

### Do

- Reference tokens by name, not raw values — agents and developers should use `color.text.primary`, not `#171717`.
- Define all interactive states: default, hover, focus-visible, active, disabled.
- Use the spacing scale for all padding, margin, and gap values.
- Write content in sentence case. Reserve ALL CAPS for acronyms only.
- Test every component at the smallest and largest breakpoint before shipping.

### Don't

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (16px, 1267.2px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Writing Tone

Concise, confident, implementation-focused. Avoid filler preambles.

## Authoring Workflow

When creating or updating a component guideline for this system, follow this sequence:

1. **State the intent** — one sentence on what the component does and why it exists.
2. **Map tokens** — list every color, spacing, typography, and radius token the component uses. No raw values.
3. **Define anatomy** — break the component into named parts (container, label, icon, etc.) with their token assignments.
4. **Specify states** — document every state: default, hover, focus-visible, active, disabled, loading, error, empty.
5. **Describe interactions** — keyboard, pointer, and touch behavior, including edge cases (long content, overflow, truncation).
6. **Add accessibility criteria** — write testable pass/fail checks (e.g. "focus ring must be visible at 3:1 contrast").
7. **List anti-patterns** — concrete examples of misuse with a brief explanation of why each is wrong.
8. **Close with a QA checklist** — a mechanical list of verifiable items (see Definition of Done below).

## Required Output Structure

Every component guideline produced from this system must contain these sections, in order:

1. Overview — purpose, when to use, when not to use.
2. Tokens and foundations — all referenced tokens from the tables above.
3. Anatomy and variants — named parts, variant matrix, responsive behavior.
4. States and interactions — full state table, keyboard/pointer/touch behavior.
5. Accessibility — ARIA attributes, contrast requirements, focus management, screen reader behavior.
6. Content guidelines — copy length, tone, capitalisation, placeholder text rules.
7. Anti-patterns — explicit examples of what not to build, with reasoning.

## Component Requirements

Every component built against this system must:

- Reference only tokens defined in the tables above — no hardcoded hex, px, or font values.
- Define all interactive states: default, hover, focus-visible, active, disabled, loading, error.
- Specify responsive behavior at the smallest and largest supported breakpoint.
- Handle edge cases: empty state, overflow / truncation, maximum content length.
- Include keyboard navigation (Tab, Enter, Escape, Arrow keys where applicable).
- Document ARIA roles, labels, and live-region behavior where relevant.
- Include known page component density: - **Buttons:** 5 detected
- **Links:** 29 detected
- **Inputs:** 1 detected
- **Images:** 78 detected

## Definition of Done

A component is not complete until every item below is checked:

- Renders correctly in its default state (smoke test).
- All states documented and visually verified (hover, focus, disabled, loading, error, empty).
- All visual values use design tokens — zero hardcoded values.
- Keyboard navigation works without a pointer.
- No critical accessibility violations (contrast, ARIA, focus order).
- Tested at smallest and largest breakpoint.
- Anti-patterns section lists at least one concrete misuse example.
- Documentation covers purpose, usage, props/API, and limitations.
