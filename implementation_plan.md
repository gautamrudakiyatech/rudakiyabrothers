# Admin Panel & E-Commerce Cleanup Implementation Plan

This implementation plan details the setup of an inline admin panel (edit-in-place) integrated seamlessly into the existing Next.js App Router website, replacing e-commerce functionality with dynamic UI management powered by Firebase.

## User Review Required

> [!WARNING]  
> - **Removing E-commerce components:** All references to "Add to Cart", "Checkout", specific color swatches (Yellow, White, Rose), and product prices will be permanently removed.
> - **Firebase Storage Rules:** Make sure your Firebase storage rules allow public reads but restrict writes/deletes to authenticated admin users. Similarly, set Firestore security rules properly. (We are assuming standard rules configured in Firebase console).
> - **Firebase Admin Service Account:** You will need to obtain the Firebase Admin SDK private key and place it in the `.env.local` accurately to allow cookie session validation.

## Proposed Changes

---
### Phase 1: Authentication & Admin Session Setup

#### [NEW] `lib/firebaseAdmin.ts`
- Implement the Firebase Admin SDK initialization using environment variables (`FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, `FIREBASE_ADMIN_PRIVATE_KEY`).
- Export `adminAuth` and `adminDb`.

#### [NEW] `app/api/auth/session/route.ts`
- POST handler to verify the Firebase ID token (`adminAuth.verifyIdToken`) provided by the client logging in.
- Create a session cookie (`cookies-next`) securely named "admin-session".

#### [NEW] `app/api/auth/logout/route.ts`
- POST handler to clear the "admin-session" cookie using `cookies-next`.

#### [NEW] `context/AdminContext.tsx`
- Setup React Context `AdminContext`.
- Checks for the "admin-session" cookie using `firebase` client auth state on initial mount.
- Provide `{ isAdmin, adminUser, logout }`.

#### [MODIFY] `app/layout.tsx`
- Wrap the app with `<AdminProvider>`.
- Include the global Toast notification provider (`sonner` or custom Context).
- Include `<AdminFloatingBar />`.

#### [NEW] `middleware.ts`
- Prevent logged-in admin users from returning to `/login` route by redirecting them to `/`.

#### [NEW] `app/login/page.tsx`
- Simple UI (Email, Password, Sign-in button).
- Client component handling `signInWithEmailAndPassword`, fetching the ID token, and sending it to `/api/auth/session`.
- Error handling on failed sign in.

---
### Phase 2: Firebase Write Operations & Seed Script

#### [NEW] `lib/adminFirestore.ts`
- Export client-side write functions specifically used by the admin overlay: 
  - `saveProduct(product: Partial<Product>)`
  - `deleteProduct(id: string)`
  - `saveCategory(category: Partial<Category>)`
  - `saveSiteSettings(settings: Partial<SiteSettings>)`

#### [NEW] `lib/types.ts`
- Ensure all models strictly adhere to the defined structure for `Product`, `Category`, `SiteSettings`, and `Review` (some are already correct).

#### [NEW] `scripts/seedFirestore.ts`
- Standalone Node/TS script to inject the predefined categories (rings, earrings, pendants, solitaire-pendants, bracelets) and hero default settings.

---
### Phase 3: Global Admin Overlay Components

#### [NEW] `components/AdminFloatingBar.tsx`
- Fixed bottom-right pill `[ ✏️ Admin Mode | Logout ]`.

#### [NEW] `components/SectionEditButton.tsx`
- Reusable `[ ✏️ Edit <label> ]` and `[ 🗑️ ]` floating buttons overlaid on absolute positions with conditional `isAdmin` rendering.

#### [NEW] `components/ConfirmDialog.tsx`
- Reusable confirmation modal for deletion workflows.

#### [NEW] `components/AdminImageUploader.tsx`
- Drag-drop file uploader showing thumbnail previews and per-image progress tied to Firebase Storage `uploadBytesResumable`.

#### [NEW] `components/ProductModal.tsx`
- Full-screen or large centered modal for creating/editing a product.
- Left panel: Image uploader interface (cover image handling, delete, sorting).
- Right panel: Input details (`name`, `category`, `description`, `diamondWeight`, `diamondShape`, `colour`, `clarity`, `metalType`, `certification`, `badge`, `isActive`).

---
### Phase 4: E-commerce Cleanup & Rendering Dynamic Data Sections

Across all components, "Add to Cart" and "Price" logic will be replaced by "Enquire Now" routing to `/contact`. We will implement dynamic skeleton loaders and "Coming Soon" empty states for both public users and admins.

#### [MODIFY] `next.config.js`
- Configure `remotePatterns` for `firebasestorage.googleapis.com`.
- Enforce `formats: ['image/avif', 'image/webp']` and caching rules.

#### [MODIFY] `app/page.tsx` (Homepage)
- Integrates `getSiteSettings()`, `getCategories()`, `getProducts(isFeatured)` directly.
- **Hero Section:** Conditionally render video/poster data or empty state. Integrate `SectionEditButton` opening Inline Hero Edit Modal.
- **Shop By Category:** Conditionally render tiles or gradients. Integrate `SectionEditButton` for category edits.
- **Review Section:** Render loaded reviews or "Reviews coming soon". Integrate Add/Edit Review modals.
- **Featured Products:** Inject skeleton loading, "Coming soon", and `SectionEditButton`. Use `<ProductModal>` for edit logic.

#### [MODIFY] `components/ProductCard.tsx`
- Strip e-commerce elements.
- Add `[ ✏️ ]` and `[ 🗑️ ]` buttons for admins.
- Adopt Next.js `<Image>` performance guidelines (`sizes`, `placeholder`, `blurDataURL`).

#### [NEW] `components/ProductCardSkeleton.tsx`
- Empty state UI matching the shimmer card effect with exact dimensions.

#### [MODIFY] `app/category/[slug]/page.tsx`
- Dynamic product grid based on category query. Implement "Coming Soon" or grid rendering.
- Present `[+ Add Product]` floating button for admins.

#### [MODIFY] `app/product/[slug]/page.tsx`
- Dynamic product detail read.
- Strip pricing and checkout variations. Show details using updated fields.
- Admin Edit button at bottom right triggering `<ProductModal>` in edit mode.
- Render `<ImageGallery>` with correct swipeable/thumbnail logic based on Firebase array.

#### [MODIFY] Static Sections (Banners & Promises)
- Refactor the gifting, engagement, and promises sections as specified, pulling images from Firebase or using placeholder gradients. Admin gets `SectionEditButton` overlays to change images and text.

## Open Questions
- Do you want to use the existing `sonner` package from your `package.json` for toast notifications, or prefer a custom `ToastContext` built from scratch as suggested in your prompt? (Using `sonner` is often faster and better looking).
- Can the `CategoryTileAdmin` logic live inside `app/page.tsx` or a component like `components/CategoryGrid.tsx` to handle the grid flow cleanly?

## Verification Plan
### Automated Tests
- Validate TypeScript compilation of all new models, contexts, and API routes.

### Manual Verification
1. Login via `/login` and verify session cookie creation and AdminContext populating.
2. Verify Admin UI (`✏️ Add/Edit` icons, floating bar) appears ONLY when authenticated.
3. Test empty states on homepage and category pages in Incognito Mode (no auth).
4. Run `seedFirestore.ts` and ensure initial data populations appear seamlessly.
5. Upload a product cover image via `ProductModal` and check Firebase Storage path format, sizes, and caching.
6. Assure E-commerce remnants (Price, colors, cart states) are completely unlinked.
