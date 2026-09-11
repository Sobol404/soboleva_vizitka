# Design System: Safe Case US Visa Landing

This document is the "Source of Truth" for the visual style and UI components of the US Visa Expert landing page. Use these rules to generate new blocks or pages.

## 1. Visual Identity & Brand
- **Style**: Modern, premium, trustworthy, clean.
- **Vibe**: Expert but accessible. Professional but personal.
- **Key Element**: Large rounded corners (`3xl` / `24px`), glassmorphism effects, and bold typography.

## 2. Color Palette
The design uses a high-contrast palette with a strong accent color.

### Light Theme (Default)
- **Background Main**: `#F4F7F9` (slate-50 equivalent)
- **Background Secondary**: `#FFFFFF` (white)
- **Background Accent/Soft**: `#F0F7FD` (light blue tint)
- **Text Main**: `#324F5C` (dark slate)
- **Text Muted**: `#64748B` (slate-500)
- **Accent Primary**: `#E5484D` (vibrant red) -> Hover: `#C13D42`

### Dark Theme (Class: .dark)
- **Background Main**: `#0F172A` (slate-900)
- **Background Secondary**: `#1E293B` (slate-800)
- **Text Main**: `#F8FAFC` (slate-50)
- **Text Muted**: `#94A3B8` (slate-400)
- **Accent Primary**: `#E5484D` (remains red)

## 3. Typography
- **Body Font Family**: 'Manrope', sans-serif (Weights: 400, 500, 600, 700, 800).
- **Heading Font Family**: 'Playfair Display', Georgia, serif (Weights: 600, 700, 800).
- **Hero Title**: `text-5xl` to `text-7xl`, font-extrabold, leading-tight.
- **Section Heading**: `text-4xl` to `text-6xl`, font-bold, uppercase, tracking-wide.
- **Body Text**: `text-lg`, leading-relaxed.

## 4. UI Components (Tokens)
- **Buttons**:
  - `rounded-full` (100% pill shape).
  - Primary: Accent Red with white text + "glint" animation.
  - Secondary: White/Slate with dark text + subtle border.
- **Cards**:
  - `rounded-3xl` (24px).
  - Background: Secondary color.
  - Border: Subtle `1px` (transparent/0.05 opacity in light, white/0.1 in dark).
- **Icons**: 
  - Lucide React library.
  - Stroke width: 1.5 or 2.

## 5. Animations
- **Blob Background**: Slow moving gradients in the background (blur-3xl).
- **Hover**: Subtle lift (`hover:-translate-y-1`) and shadow enhancement.
- **Fade-in**: Standard smooth entry for sections.

## 6. Implementation Notes for AI
- Always use Tailwind CSS utility classes.
- Use `dark:` prefix for all color-related classes.
- Container: `container mx-auto px-4 max-w-7xl`.
- Responsive: Prioritize mobile-first, using `md:` and `lg:` breakpoints.
