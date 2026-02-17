

## Add Showcasing Product Section with Controller Images

### What will be built
A new "Showcasing Product" section below the hero, featuring two controller images (black and grey) displayed on a grey gradient platform shape, with shadow effects applied to the controllers.

### Assets to copy
- `Untitled_design-18.png` (black controller) -> `src/assets/controller-black.png`
- `Untitled_design-19.png` (grey controller) -> `src/assets/controller-grey.png`
- `Rectangle_16.png` (grey gradient platform shape) -> `src/assets/platform-bg.png`

### Section layout
- Full-width black background section
- "Showcasing Product" heading top-left (large, light font)
- Description paragraph below heading
- Centered platform shape (the grey trapezoid gradient) with both controllers placed on top
- Controllers get `drop-shadow` effects for depth (e.g. `drop-shadow(0 20px 40px rgba(0,0,0,0.6))`)

### Technical Details

**New file:** `src/components/ShowcasingProduct.tsx`
- Black background full-width section
- Heading + description text aligned left
- Platform image as background for the controller display area
- Both controller images overlaid on platform with CSS drop-shadows
- Controllers positioned side by side, slightly overlapping for depth

**Modified file:** `src/pages/Index.tsx`
- Import and render `ShowcasingProduct` below `HeroSection`

**Shadow styling on controllers:**
- `filter: drop-shadow(0 25px 50px rgba(0,0,0,0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.3))`
- Gives a realistic floating/elevated look on the dark background

