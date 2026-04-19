# Task List for Inline Admin Functionality

- `[x]` **Phase 1: Authentication & Admin Session Setup**
  - `[x]` Configure Firebase Admin SDK (`lib/firebaseAdmin.ts`)
  - `[x]` Build Session API routes (`api/auth/session`, `api/auth/logout`, `api/auth/verify`)
  - `[x]` Setup Admin Context (`context/AdminContext.tsx`)
  - `[x]` Update Root Layout with Toaster and Context Provider (`app/layout.tsx`)
  - `[x]` Configure Middleware (`middleware.ts`)
  - `[x]` Create Login Page (`app/login/page.tsx`)

- `[x]` **Phase 2: Types, Write Operations & Seeding**
  - `[x]` Review/Update `lib/types.ts`
  - `[x]` Create Firebase Admin Write Operations (`lib/adminFirestore.ts`)
  - `[x]` Implement Seeder Script (`scripts/seedFirestore.ts`)

- `[x]` **Phase 3: Reusable Admin Components**
  - `[x]` `AdminFloatingBar.tsx`
  - `[x]` `SectionEditButton.tsx`
  - `[x]` `ConfirmDialog.tsx`
  - `[x]` `AdminImageUploader.tsx`
  - `[x]` `ProductModal.tsx`

- `[x]` **Phase 4: Remove E-commerce & Clean up `next.config.js`**
  - `[x]` Configure `next.config.js` for images
  - `[x]` Update `ProductCard.tsx` (Remove price/cart, append Enquire CTA)
  - `[x]` Create `ProductCardSkeleton.tsx`

- `[x]` **Phase 5: Refactoring App Pages with Overlays**
  - `[x]` Create `CategoryGrid.tsx`
  - `[x]` Update Homepage (`app/page.tsx`) with empty states and edit overlays
  - `[x]` Update Category Page (`app/category/[slug]/page.tsx`)
  - `[x]` Update Product Details Page (`app/product/[slug]/page.tsx`)
