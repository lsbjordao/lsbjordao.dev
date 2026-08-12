# Plan: Fix mobile share popup clipping

## Problem
The share popover inside the phone emulator is clipped because `.phone-emulator__screen` has `overflow: hidden`. On small viewports, positioning the popover below the share button pushes it outside the visible area.

## Root cause
- `globals.css:7648-7654` — `.phone-emulator__screen { overflow: hidden }`
- `SharePopover.tsx:148-155` — inline styles position the popover at `top: buttonPos.top` with `translateY(0.5rem)`, which exceeds the screen bounds on small phones.

## Fix
In `SharePopover.tsx:148-155`, when `buttonPos` is present, anchor the popover to the bottom of the screen instead of below the button:
- Set `top: "auto"` and `bottom: "1rem"`
- Keep `left: buttonPos.left` to preserve horizontal alignment
- Remove `transform: translateY(0.5rem)` from the `buttonPos` branch
- Keep the fallback (`bottom: 1rem`, `left: 50%`, `transform: translateX(-50%)`) when `buttonPos` is absent

This matches the component’s intended native share-sheet behavior and avoids clipping.

## Validation
1. Run dev server and test on viewport ≤ 520 px
2. Tap share button inside phone emulator — popover should appear fully visible at bottom, horizontally aligned with button
3. Confirm close behaviors (Escape, outside click, scroll, resize)
4. Run `npm run lint` and type check if available
