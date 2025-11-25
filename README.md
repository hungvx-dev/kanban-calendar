## 🚀 Tech Stack

- **React 18 + TypeScript**
- **Vite**
- **@dnd-kit/core** (drag & drop)
- **Vanilla CSS**
- **Bun**

## 📦 Installation & Run

### 1. Install dependencies

Using **bun**:

```bash
bun install
```

### 2. Start the dev server

```bash
bun dev
```

## Features Implemented

### ✔ Weekly Calendar (Mon → Sun)

- Automatically detects current week (ISO week).
- Displays correct dates for each day.
- Highlights **today** with purple + bold.
- Pixel-perfect styling following Figma.

### ✔ Workouts List Per Day

- Workout titles use ellipsis.
- Styling matches Figma

### ✔ Exercises Inside Workout

- Name, sets, count displayed correctly.
- Ellipsis works reliably (grid + flex fix applied).
- Empty workout still shows drop zone.

### ✔ Drag & Drop (Using @dnd-kit/core)

#### Workout → Day

- Move workout across day columns.
- Sort workout inside a day column

#### Exercise → Workout

- Move exercise across workouts.
- Sort exercise inside a workout 

## ✔ Mock API

Simulates:

    GET /api/workouts?year=2025&week=07

## How to Extend

- Add sortable reordering → `@dnd-kit/sortable`.
- Add previous/next weeks → already supported via ISO week logic.

## 🎉 Final Notes

This project demonstrates:

- Strong React + TS architecture
- Pixel-perfect UI
- Robust DnD implementation
- Clean code separation
- Attention to subtle CSS behaviors
