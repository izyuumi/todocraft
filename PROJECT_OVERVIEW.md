# TodoCraft: Project Overview

## 1. Vision & Core Goal

TodoCraft is a lightweight, offline-first to-do manager designed for simplicity and speed. The goal is to create a friction-free checklist that runs anywhere—desktop, phone, or tablet—without requiring a backend, user accounts, or an internet connection.

All data is persisted directly in the browser's Local Storage, managed by a clean, modern React frontend.

---

## 2. Technical Architecture & Stack

This project is built on a modern, minimalist stack, prioritizing developer experience and performance.

| Layer                   | Technology                            | Rationale                                                                                                                                                                |
| :---------------------- | :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**           | **Next.js 14 (App Router)**           | We will use the **App Router** for its file-based routing, modern React features, and clean project structure. Our pages will be client-side rendered.                   |
| **UI Components**       | **shadcn/ui**                         | A collection of beautifully designed, accessible components built on Radix UI and Tailwind CSS that can be easily customized and themed.                                 |
| **Styling**             | **Tailwind CSS**                      | For a utility-first workflow that allows for rapid UI development and easy maintenance of a consistent design system.                                                    |
| **State & Persistence** | **React Context + `useLocalStorage`** | A custom hook (`useLocalStorage`) provides a simple, reactive persistence layer. A React Context will expose tasks and CRUD operations globally, avoiding prop-drilling. |
| **Animations**          | **Framer Motion** (Optional)          | Can be added for polished interactions like drag-and-drop reordering and smooth modal transitions.                                                                       |

---

## 3. Key Architectural Concepts

- **`useLocalStorage<T>(key, defaultValue)` Hook**: This custom hook is the heart of our persistence layer. It transparently loads task data from Local Storage on mount and saves it back on any change, with debouncing to prevent performance issues.

- **`useTasks` Context Hook**: A dedicated context will manage the global state of tasks. Components will consume this context via a `useTasks` hook to access the task list and dispatch actions (add, update, delete, reorder), keeping component logic clean and decoupled.

- **Progressive Enhancement**: The application is built with a core set of features. Advanced functionality (like a Pomodoro timer or sub-tasks) can be added as isolated components that plug into the existing `useTasks` context without disrupting the core application.

---

## 4. Suggested File Structure (using App Router)

```text
/src
├── app
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main application page
├── components
│   ├── ui/                   # Shadcn UI components (e.g. button.tsx)
│   ├── header.tsx            # Custom application components
│   ├── task-editor.tsx
│   ├── task-item.tsx
│   └── theme-provider.tsx
├── lib
│   ├── hooks.ts              # Custom React hooks
│   ├── types.ts              # TypeScript interfaces (e.g., Task)
│   └── utils.ts              # Shadcn UI helpers
└── public/
```

---

## 5. Feature Roadmap

#### Core (MVP)

- **Task Management**: Add, edit, delete, and mark tasks as complete.
- **Reordering**: Drag-and-drop to re-order tasks.
- **Organization**: Basic filtering or categorization.
- **Theming**: Light, dark, and system theme support via `shadcn/ui`.
- **Responsive Design**: A fully responsive layout for mobile and desktop.

#### Potential Extensions ("Nice-to-Haves")

- **Productivity**: In-task Pomodoro timer, streak tracker for daily goals.
- **Organization**: Nested sub-tasks, a Kanban board view.
- **UX**: "Focus Mode" to hide completed tasks, desktop notifications via the Notification API.
- **Accessibility**: Enhanced keyboard shortcuts for all primary actions.

---

## 6. Future Directions

- **PWA**: Implement a Service Worker for full offline installability and reliability.
- **Data Storage**: Migrate to IndexedDB for more robust storage of larger datasets.
- **Cloud Sync**: Introduce an optional cloud sync feature using a service like Supabase, kept behind a feature flag.
