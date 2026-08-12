# Plan: Fix mobile share popup clipping inside phone emulator

## Problem
`SharePopover` is rendered inside `.phone-emulator__screen`, which has `overflow: hidden`. On mobile/small viewports, when the popover is positioned below the share button using `buttonPos`, it extends past the screen bounds and gets clipped.

## Root cause
`globals.css:7648-7654` — `.phone-emulator__screen` has `overflow: hidden`.
`SharePopover.tsx:148-155` — inline styles use `position: absolute; top: buttonPos.top; transform: translateY(0.5rem)`. On small screens this places the popover outside the visible area of the phone screen.

## Fix strategy
Keep the popover inside the phone screen (preserving the mockup aesthetic) but anchor it to the bottom like a native share sheet, while preserving horizontal alignment with the button when `buttonPos` is available. This matches the existing component comment: *"It slides up from the bottom like a native iOS/Android share sheet."*

## Implementation tasks
1. **`app/_components/SharePopover.tsx`** (lines 148–155)
   - When `buttonPos` is present, replace `top`/`transform: translateY(...)` with `bottom: 1rem`.
   - Keep `left: buttonPos.left` so the popover horizontally aligns with the button.
   - When `buttonPos` is absent, keep the existing fallback (`bottom: 1rem`, `left: 50%`, `transform: translateX(-50%)`).
   - Remove `top` and `bottom: auto` from the `buttonPos` branch.

2. **Verify animation compatibility**
   - `@keyframes phone-share-in` animates `transform` from `translateY(-5px) scale(0.98)` to `none`.
   - Ensure the new inline `transform` values do not conflict with the animation. Prefer no inline `transform` in the `buttonPos` branch (or use `translateX` only if needed, but keep it simple).

3. **Validation**
   - Run the dev server and test on a viewport ≤ 520 px wide.
   - Tap the share button inside the phone emulator and confirm the popover appears fully visible at the bottom of the screen, aligned with the button horizontally.
   - Confirm closing behavior (Escape, outside click, scroll, resize) still works.
   - Run `npm run lint` / type check if available.

## Notes
- No portal to `document.body` is needed; keeping it inside the screen preserves the MVP mockup.
- If a future design requires the popover to appear directly under the button on larger screens, add a media-query or container-width guard, but for the phone emulator the bottom-sheet behavior is correct.
