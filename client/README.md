# UserVault Client – React + TypeScript + Vite

This project is the **frontend client** for UserVault, a user management application built with React, TypeScript, and Vite. It demonstrates modern React practices, modular architecture, and robust state management, with a focus on maintainability and scalability.

---

## 🛠️ Tech Stack

- **React 18** with functional components and hooks
- **TypeScript** for type safety
- **Vite** for fast development and build
- **React Router** for routing
- **React Hook Form** + **Valibot** for form state and validation
- **Axios** for HTTP requests
- **Notistack** for notifications
- **Custom hooks** for data fetching and UI logic
- **CSS Modules** for scoped styling

---

## 📁 Project Structure

```
client/
  ├── public/           # Static assets
  ├── src/
  │   ├── components/   # Reusable UI components (forms, tables, modals, etc.)
  │   ├── context/      # React context providers (e.g., modal state)
  │   ├── hooks/        # Custom React hooks (data fetching, debounce, etc.)
  │   ├── pages/        # Page-level components (e.g., Home)
  │   ├── router/       # Routing configuration
  │   ├── schemas/      # TypeScript and validation schemas
  │   ├── services/     # API clients and endpoints
  │   ├── utils/        # Utility functions (snackbar, validation, etc.)
  │   ├── index.css     # Global styles
  │   └── main.tsx      # App entry point
  ├── package.json
  └── vite.config.ts
```

---

## 🧩 Key Architectural Decisions

### 1. **Component-Driven Design**

- UI is broken down into small, reusable components (e.g., `UserTable`, `UserCard`, `UserForm`, `Modal`).
- Each component is styled with CSS Modules for encapsulation and maintainability.

### 2. **Hooks for Logic Reuse**

- **Data fetching** is abstracted into custom hooks like [`useGetUsers`](src/hooks/useGetUsers.ts) and [`useCreateUser`](src/hooks/useCreateUser.ts).
- **UI logic** (e.g., modal state, media queries, debounced values) is handled with hooks such as [`useModalContext`](src/context/modal.context.tsx) and [`useDebouncedValue`](src/hooks/useDebouncedValue.hook.ts).

### 3. **Form Handling and Validation**

- Forms use `react-hook-form` for performant state management.
- Validation is enforced with Valibot schemas (see [`UserSchema`](src/schemas/user.schema.ts)), ensuring robust client-side checks.

### 4. **API Layer**

- All API calls are centralized in [`services/API/client.ts`](src/services/API/client.ts), using Axios instances for consistent configuration.
- Endpoints are typed and handle errors gracefully, with user feedback via Notistack snackbars.

### 5. **State and Feedback**

- Loading, error, and success states are handled at the hook and component level.
- User feedback is provided through snackbars and inline form messages.

---

## 🚦 Main Features & Flow

1. **User Listing & Pagination**
   - Fetches users from the backend with pagination and search.
   - Uses a debounced search input to minimize unnecessary requests.

2. **User Creation**
   - Modal form for adding new users.
   - Validates input before submission.
   - On success, updates the user list and provides feedback.

3. **User Status Toggle**
   - Allows toggling user active/inactive state directly from the user card.
   - Optimistically updates UI and handles errors.

4. **Responsive Design**
   - Uses custom hooks and CSS media queries for mobile-friendly layouts.

---

## 🧑‍💻 Code Highlights

- **Hooks Example:**  
  [`useGetUsers`](src/hooks/useGetUsers.ts) manages fetching, pagination, and search state for users.
- **Form Example:**  
  [`UserForm`](src/components/Forms/UserForm.tsx) uses `react-hook-form` and Valibot for robust validation and UX.
- **API Example:**  
  [`createUser`](src/services/API/client.ts) abstracts the POST request for user creation, handling errors and responses.
- **Context Example:**  
  [`ModalProvider`](src/context/modal.context.tsx) provides modal open/close state to any component in the tree.

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open in browser:**  
   Visit [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing & Linting

- ESLint is configured for TypeScript and React best practices.
- See [`eslint.config.js`](eslint.config.js) for rules and recommended plugins.

---

## 📚 Further Improvements

- Integrate React Query for advanced caching and background updates.
- Add unit and integration tests for hooks and components.
- Enhance accessibility and add dark/light theme support.

---

## 🤝 About

This codebase is designed to demonstrate:
- Modern React patterns (hooks, context, modularity)
- Type-safe and validated forms
- Clean separation of concerns (UI, logic, API)
- Scalable and maintainable frontend architecture

---