

## Section 1: Splash Screen – Shadow to Neon Reveal

### What will be built
A full-screen splash screen with a pure black background, featuring the "R" logo centered on screen. The animation is a 4-stage shadow/glow manipulation sequence — no opacity tricks, no zoom, no rotation.

### Animation Sequence
1. **Stage 1 – Heavy Shadow (0–0.8s):** Logo is present but buried under intense black drop-shadow. A very faint red glow barely hints at the logo's existence.
2. **Stage 2 – Glow Amplification (0.8–1.6s):** Red outer glow intensifies gradually (20–40px blur). Shadow remains heavy. Logo starts emerging through the red neon energy. Eased with `ease-in`.
3. **Stage 3 – Shadow Reduction / Main Reveal (1.6–2.2s):** Heavy black shadow smoothly reduces. Red neon glow stays active. Logo becomes fully visible — no movement, no scale, just shadow lift. Eased with `ease-out`.
4. **Stage 4 – Final Polished State (2.2–3.7s):** Shadow resets to minimal. Subtle red neon glow remains alive. Logo is fully crisp. Brand name text fades in below over 0.5s, then holds for ~1.5s.

### Assets
- The uploaded "R" logo (`Frame_4.png`) will be copied into the project and used as the centered image.

### Implementation Details
- Full-screen black background, nothing else on screen
- CSS keyframes using only `filter: drop-shadow()` and `box-shadow` manipulation
- No opacity flickering, no scale, no rotation, no particles, no extra effects
- After the splash hold completes, it will transition to the main page content

