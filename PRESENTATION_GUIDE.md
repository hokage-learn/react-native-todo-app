# Must-Do Todo App - Presentation Walkthrough Guide

## App Overview

Must-Do is a sophisticated React Native Todo List application with real-time synchronization, theme switching, and comprehensive CRUD operations.

---

## App Structure & Architecture

### Technology Stack
- **React Native** with **Expo** (SDK 54)
- **Expo Router** for file-based navigation
- **Convex** for real-time backend
- **TypeScript** for type safety
- **React Native Reanimated** for smooth animations
- **React Native Gesture Handler** for swipe and drag gestures

### Project File Structure

```
must-do/
│
├── app/                          # Expo Router Screens (File-based routing)
│   ├── _layout.tsx              # Root layout with providers (Convex, Theme)
│   ├── index.tsx                # Main todo list screen
│   ├── add-todo.tsx             # Add new todo screen (modal)
│   └── edit-todo/
│       └── [id].tsx             # Edit todo screen (dynamic route)
│
├── components/                   # Reusable UI Components
│   ├── TodoItem.tsx             # Individual todo card with swipe-to-delete
│   ├── TodoForm.tsx             # Form for creating/editing todos
│   ├── TodoList.tsx             # List wrapper (integrated in index.tsx)
│   ├── SearchBar.tsx            # Search input component
│   ├── FilterButtons.tsx        # Filter tabs (All/Active/Completed) with counts
│   ├── EmptyState.tsx           # Empty state messages
│   ├── ThemeToggle.tsx          # Theme switcher button
│   └── Toast.tsx                # Toast notification component
│
├── context/                      # React Context Providers
│   └── ThemeContext.tsx          # Theme management with AsyncStorage persistence
│
├── hooks/                        # Custom React Hooks
│   └── useTodos.ts              # Convex hooks (useQuery, useMutation)
│
├── convex/                       # Convex Backend Functions
│   ├── schema.ts                # Database schema definition
│   ├── listTodos.ts             # Query: Fetch all todos
│   ├── getTodo.ts               # Query: Get single todo
│   ├── createTodo.ts            # Mutation: Create new todo
│   ├── updateTodo.ts            # Mutation: Update todo
│   ├── deleteTodo.ts            # Mutation: Delete todo
│   ├── toggleComplete.ts        # Mutation: Toggle completion status
│   └── reorderTodos.ts          # Mutation: Reorder todos (drag & drop)
│
├── types/                        # TypeScript Type Definitions
│   ├── todo.ts                  # Todo types and interfaces
│   └── theme.ts                 # Theme color definitions
│
├── utils/                        # Utility Functions
│   └── convex.ts                # Convex client initialization
│
├── assets/                       # Static Assets
│   └── [icons, images]
│
└── Configuration Files
    ├── app.json                 # Expo configuration
    ├── eas.json                 # EAS build configuration
    ├── babel.config.js          # Babel config (Reanimated plugin)
    ├── tsconfig.json            # TypeScript configuration
    └── .npmrc                   # npm configuration (peer deps)
```

---

## Feature Walkthrough

### 1. **Main Screen (app/index.tsx)**

**Location:** `app/index.tsx`

**Features:**
- **Header:** Search bar + Theme toggle button
- **Filter Tabs:** All (X) | Active (X) | Completed (X) - with real-time counts
- **Todo List:** Drag-and-drop reorderable list
- **FAB Button:** Floating action button to add new todos
- **Pull-to-refresh:** Swipe down to refresh todos

**Key Functionality:**
- Real-time todo updates via Convex `useQuery`
- Search todos by title/description
- Filter by status (All/Active/Completed)
- Long-press to drag and reorder todos
- Swipe left on todo to delete (handled in TodoItem)
- Tap todo to toggle complete/incomplete

**Real-time Updates:**
- Todos automatically update when changed on other devices
- No manual refresh needed
- Optimistic UI updates

---

### 2. **Add Todo Screen (app/add-todo.tsx)**

**Location:** `app/add-todo.tsx`

**Features:**
- Modal presentation
- Form with validation using Zod
- Fields:
  - Title (required, max 100 chars)
  - Description (optional, max 500 chars)
  - Due Date (optional, date picker)

**Flow:**
1. User taps FAB button → navigates to add-todo
2. Fills form → validates input
3. Submits → creates todo via Convex mutation
4. Success toast → navigates back
5. Todo appears in list instantly (real-time)

---

### 3. **Edit Todo Screen (app/edit-todo/[id].tsx)**

**Location:** `app/edit-todo/[id].tsx`

**Features:**
- Loads existing todo data
- Pre-populates form
- Updates todo via Convex mutation
- Real-time sync after update

**Flow:**
1. User taps edit icon on todo
2. Screen loads with todo data
3. User modifies fields
4. Submits → updates via Convex
5. Success toast → back to list
6. Changes sync in real-time

---

### 4. **TodoItem Component (components/TodoItem.tsx)**

**Features:**
- **Checkbox:** Tap to toggle complete/incomplete
- **Title & Description:** Display with styling
- **Due Date:** Shows with calendar icon, red if overdue
- **Swipe to Delete:** Swipe left reveals delete action
- **Edit Button:** Tap edit icon to edit todo
- **Animations:** Smooth animations using Reanimated

**Interactions:**
- Tap checkbox → Toggle completion
- Tap edit icon → Navigate to edit screen
- Swipe left → Delete (with animation)
- Visual feedback for all actions

---

### 5. **Theme System (context/ThemeContext.tsx)**

**Features:**
- Light and dark themes
- System theme detection
- Manual toggle button
- Persistent storage (AsyncStorage)
- Smooth transitions

**Theme Colors:**
- Background colors
- Text colors (primary/secondary)
- Primary/secondary button colors
- Border and shadow colors
- Error/success/warning colors

**Implementation:**
- Context API for theme state
- AsyncStorage for persistence
- Animated theme toggle
- Theme-aware status bar

---

### 6. **Search & Filter (components/SearchBar.tsx, FilterButtons.tsx)**

**Search:**
- Real-time search as you type
- Searches title and description
- Case-insensitive

**Filter:**
- All: Shows all todos
- Active: Shows only incomplete todos
- Completed: Shows only completed todos
- Dynamic counts on each tab

---

### 7. **Drag & Sort (app/index.tsx + react-native-draggable-flatlist)**

**Implementation:**
- Long-press todo to start drag
- Drag to reorder
- Release to save new order
- Order persisted via Convex mutation
- Visual feedback during drag

---

## Backend Architecture (Convex)

### Database Schema (convex/schema.ts)

```typescript
todos: {
  title: string
  description?: string
  dueDate?: number      // timestamp
  completed: boolean
  createdAt: number      // timestamp
  order: number          // for drag & sort
}
```

### Queries (Read Operations)
- **listTodos:** Get all todos ordered by `order` field
- **getTodo:** Get single todo by ID

### Mutations (Write Operations)
- **createTodo:** Create new todo with auto-generated order
- **updateTodo:** Update todo fields (title, description, dueDate, completed)
- **deleteTodo:** Remove todo from database
- **toggleComplete:** Toggle completion status
- **reorderTodos:** Update order field for multiple todos

---

## Data Flow

### Creating a Todo:
1. User fills form → `TodoForm` component
2. Form validates → Zod schema
3. Calls `useCreateTodo()` hook
4. Hook calls `api.createTodo.createTodo` mutation
5. Convex saves to database
6. Query automatically updates (real-time)
7. UI reflects new todo instantly

### Real-time Sync:
- Convex uses WebSocket connection
- Changes broadcast to all connected clients
- React hooks automatically re-render
- No manual refresh needed

---

## Key Technical Details

### State Management
- **Theme:** React Context + AsyncStorage
- **Todos:** Convex queries (automatic state management)
- **UI State:** React useState (search, filter, loading)

### Navigation
- Expo Router (file-based)
- Stack navigation with modals
- Deep linking support

### Animations
- React Native Reanimated for smooth transitions
- Gesture Handler for swipe gestures
- Animated theme toggle

### Error Handling
- Try-catch blocks around mutations
- Toast notifications for errors
- Connection error detection
- Graceful fallbacks

---

## Presentation Points to Highlight

1. **Real-time Synchronization**
   - Open app on two devices
   - Create/edit/delete on one
   - Watch it appear on other instantly

2. **Theme Switching**
   - Toggle between light/dark
   - Show smooth animation
   - Restart app to show persistence

3. **Drag & Sort**
   - Long-press todo
   - Drag to reorder
   - Release to save

4. **Swipe to Delete**
   - Swipe left on todo
   - Watch delete animation
   - Todo removed

5. **Search & Filter**
   - Type in search bar
   - Switch between filter tabs
   - Show counts updating

6. **Form Validation**
   - Try submitting empty form
   - Show validation errors
   - Success flow

---

## Demo Script Suggestions

1. **Introduction (30 sec)**
   - Show app name and logo
   - Briefly mention features

2. **Theme Demo (30 sec)**
   - Toggle between themes
   - Highlight smooth transitions

3. **CRUD Operations (2 min)**
   - Create a todo (with all fields)
   - Edit a todo
   - Toggle completion
   - Delete a todo (swipe)

4. **Advanced Features (1 min)**
   - Search functionality
   - Filter tabs with counts
   - Drag to reorder

5. **Real-time Sync (30 sec)**
   - Show on two devices if possible
   - Or explain how it works

6. **Closing (30 sec)**
   - Summarize key features
   - Mention tech stack

---

## Files to Reference During Presentation

- **Main Screen:** `app/index.tsx` - Shows list, search, filter, drag
- **Form Component:** `components/TodoForm.tsx` - Validation, date picker
- **Theme System:** `context/ThemeContext.tsx` - Theme management
- **Backend:** `convex/` folder - Show schema and mutations
- **Hooks:** `hooks/useTodos.ts` - Convex integration

---

## Tips for Recording

1. **Use screen recording** with voiceover
2. **Show code snippets** for key features
3. **Demonstrate real-time sync** if possible (two devices)
4. **Highlight smooth animations** and transitions
5. **Show error handling** (try offline mode)
6. **Keep it concise** - 3-5 minutes total
7. **Show both themes** - light and dark
8. **Demonstrate all CRUD operations** clearly

---

## Common Questions & Answers

**Q: How does real-time sync work?**
A: Convex uses WebSocket connections. When data changes, all connected clients receive updates automatically through React hooks.

**Q: How is theme persistence implemented?**
A: Using AsyncStorage to save theme preference. On app launch, theme is loaded and applied.

**Q: How does drag-and-sort work?**
A: Using react-native-draggable-flatlist. On drag end, we call Convex mutation to update the order field for all todos.

**Q: What makes this pixel-perfect?**
A: Careful attention to spacing, colors, typography, and animations matching the Figma design specifications.

---

This guide should help you create a comprehensive presentation video demonstrating all the features!

