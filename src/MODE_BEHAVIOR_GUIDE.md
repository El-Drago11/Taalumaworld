# Content Mode Behavior Guide
**Taaluma.world - Expected Behavior in Each Mode**

## 🔵 **CHAPTER MODE** (Primary Mode)

### What You Should See:

#### 1. **Header Navigation**
- Link text: "My Chapters"
- Link destination: `/my-chapters`
- Navigation menu shows:
  - ✅ Home
  - ✅ About Us
  - ✅ Contact
  - ❌ Books (hidden)
  - ❌ Categories (hidden)
  - ❌ Thought Leaders (hidden)

#### 2. **Home Page (`/`)**
- Hero: "Explore Chapters" button
- Section title: "Browse All Chapters"
- Content grid: **Only chapters** (ChapterCard components)
- No books or author listings

#### 3. **Search**
- Only searches chapters
- Results show only chapters
- No books or authors in dropdown

#### 4. **My Chapters Page (`/my-chapters`)**
- Shows purchased/owned chapters
- Reading progress for chapters
- Chapter cards only

#### 5. **Cart**
- Can only add chapters
- Cart items are type: 'chapter'

---

## 📘 **BOOKS MODE** (Secondary Mode)

### What You Should See:

#### 1. **Header Navigation**
- Link text: "My Books"
- Link destination: `/my-books`
- Navigation menu shows:
  - ✅ Home
  - ✅ About Us
  - ✅ Contact
  - ✅ Books
  - ✅ Categories
  - ✅ Thought Leaders

#### 2. **Home Page (`/`)**
- Hero: "Explore Books" button
- Section title: "Browse All Books"
- Content grid: **Only books** (BookCard components)
- No chapter listings

#### 3. **Search**
- Only searches books and authors
- Results show only books + thought leaders
- No chapters in dropdown

#### 4. **My Books Page (`/my-books`)**
- Shows purchased/owned books
- Reading progress for books
- Book cards only

#### 5. **Cart**
- Can only add books
- Cart items are type: 'book'

---

## 🔧 **Testing the Mode Switch**

### Step 1: Open Admin Panel
1. Navigate to `/admin`
2. Click on "Settings" tab
3. Find the "Content Mode" toggle switch

### Step 2: Test Chapter Mode
1. Set toggle to **Chapters**
2. Go to home page (`/`)
3. **Verify**:
   - [ ] Header shows "My Chapters"
   - [ ] Hero button says "Explore Chapters"
   - [ ] Section title is "Browse All Chapters"
   - [ ] Grid shows ONLY chapter cards
   - [ ] No book cards visible
   - [ ] Navigation has NO "Books", "Categories", or "Thought Leaders"

### Step 3: Test Books Mode
1. Go back to Admin → Settings
2. Set toggle to **Books**
3. Go to home page (`/`)
4. **Verify**:
   - [ ] Header shows "My Books"
   - [ ] Hero button says "Explore Books"
   - [ ] Section title is "Browse All Books"
   - [ ] Grid shows ONLY book cards
   - [ ] No chapter cards visible
   - [ ] Navigation has "Books", "Categories", and "Thought Leaders"

### Step 4: Test Search
**In Chapter Mode**:
1. Click search bar
2. Type a search term
3. **Verify**: Only chapters appear in results

**In Books Mode**:
1. Click search bar
2. Type a search term
3. **Verify**: Only books and authors appear in results

### Step 5: Test Cart
**In Chapter Mode**:
1. Add a chapter to cart
2. Switch to Books Mode in Admin
3. **Verify**: Cart should be empty (cleared automatically)

**In Books Mode**:
1. Add a book to cart
2. Switch to Chapter Mode in Admin
3. **Verify**: Cart should be empty (cleared automatically)

---

## ❌ **What Should NEVER Happen**

1. ❌ Seeing chapters AND books at the same time on any page
2. ❌ "My Books" link going to `/my-chapters` page
3. ❌ "My Chapters" link going to `/my-books` page
4. ❌ Search showing mixed results (both chapters and books)
5. ❌ Cart containing both chapters and books
6. ❌ Books Mode showing chapter cards
7. ❌ Chapters Mode showing book cards
8. ❌ Navigation links changing style (only content changes, not UI)

---

## 🐛 **If You See Chapters in Books Mode**

### Possible Causes:

1. **Browser cache**: Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. **localStorage not updated**: Check browser console → Application → Local Storage
   - Should see `display-mode: "books"` when in Books Mode
   - Should see `display-mode: "chapters"` when in Chapter Mode
3. **Page not re-rendering**: Make sure you're navigating to home page AFTER toggling mode
4. **Component not using Redux**: Check if component is using old localStorage directly

### Debug Steps:

1. Open Browser DevTools (F12)
2. Go to Console tab
3. Type: `localStorage.getItem('display-mode')`
4. Should return either `"chapters"` or `"books"`
5. Go to Admin Panel, toggle mode
6. Run the command again - it should change
7. Go to home page (`/`)
8. If you still see wrong content, check Redux DevTools:
   - Install Redux DevTools extension
   - Open it
   - Check `contentMode` slice
   - Should match localStorage value

---

## 📊 **Current Implementation Status**

### ✅ Fully Implemented:
- Redux state management for content mode
- Mode-aware cart (prevents mixing)
- Global search filtering by mode
- Header dynamic text and links
- Admin panel toggle
- WebsiteView mode-aware rendering
- Navigation links show/hide

### ⚠️ Areas to Verify:
- Books page (`/books`) - should only show in Books Mode
- Categories page (`/categories`) - should only show in Books Mode
- Authors page (`/authors`) - should only show in Books Mode
- Checkout flow respects mode
- User dashboard pages show correct content

---

## 🎯 **Summary**

**Golden Rule**: When admin toggles the mode, the **content type** changes but the **UI/design** stays exactly the same.

- **Chapter Mode**: Chapters everywhere, no books
- **Books Mode**: Books everywhere, no chapters

If you're seeing chapters in Books Mode, there's a bug in a specific component that needs to be fixed. Please identify exactly which page/component is showing the wrong content so we can fix it.
