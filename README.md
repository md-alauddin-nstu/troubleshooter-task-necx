# NECX Messaging App - Take-Home Interview Project

## ✨ Project Summary

This project implements a personal messaging application, styled as a chat-like interface, built upon the required **React** (frontend) and **Express.js** (backend) foundation.

### 🚀 Tech Stack

- **Frontend:** React, Vite, **Tailwind CSS**, **Shadcn UI** components
- **Backend:** Express.js, Node.js
- **Data Storage:** Local **JSON file** for simple, persistent storage

---

## 🛠️ Implementation Details & Design Decisions

This section outlines the key implementation choices made during the development process.

### Core Implementation

- Implemented the full-stack architecture to support sending, storing, and displaying messages, adhering to the provided design file.
- **Code Structure:** Maintained a minimal yet well-structured codebase for clarity and future scalability.
- **Data Persistence:** A **JSON file** is used for data storage to keep the setup simple and avoid the overhead of configuring a database, which was deemed appropriate for the scope of this take-home project.
- **Frontend Styling:** **Shadcn UI** components were integrated with **Tailwind CSS** to match the dark theme and modern aesthetic of the design file quickly and efficiently.

### Testing

- **Backend Tests:** **Integration tests** were written for the backend APIs to ensure core functionality and RESTful endpoint correctness.
- **E2E Testing:** An attempt was made to implement an end-to-end (E2E) test using **Playwright**. This was unfortunately dropped due to persistent, time-consuming technical issues related to **WSL/Windows firewall port blocking**, which made the testing environment unpredictable and unstable.

### Future Improvements & Technical Debt

With more time, the following improvements would be prioritized:

- **TypeScript & Data Layer Migration:** The project would be fully migrated to **TypeScript** from JavaScript. This would unlock the use of a powerful, modern Object-Relational Mapper (ORM) like **Prisma** with any suitable backend (e.g., Express, Next.js, or NestJS). Prisma provides **type-safe database access** by generating a client based on the database schema, which significantly reduces runtime errors and improves developer confidence and productivity.
- **Advanced Validation:** The transition to TypeScript would allow for the adoption of industry-standard tools like **Zod** for robust **API data validation** and **form validation** (in conjunction with React Hook Form), which was avoided in the current JavaScript setup due to perceived editor hinting issues.
- **Authentication** If it were true multi user messaging app, authentication could be added.
- **Real-Time Communication (WebSockets):** The application could be enhanced with **WebSockets** (e.g., using Socket.IO) to enable instant messaging if it were true multi user messaging app. This is crucial for a messaging application as it enables **bidirectional, low-latency communication** for features like:
  - **Typing indicators** ("X is typing...")
  - **Read receipts** and online/offline status
  - Instant message delivery without polling
- **Tech Stack Suggestion** NestJS for backend and NextJS for frontend could be used if complexity increases as it would reduce many of the setup headach as well as improved code structure and scalability and type script support, not to mention the performance benefit come with it.
- **E2E Testing:** The E2E test suite would be completed on a stable environment to ensure full-system functionality and user flow integrity.

### Known Issues & Time Constraints

- **Port Blocking Issue:** Significant development time was lost due to an unpredictable issue on my machine (running in **WSL**) where network ports would report as "already in use" even after being manually terminated. This often required a system restart and severely hampered the development flow, particularly for concurrent setup and testing.
- **Validation Skip:** Validation using tools like Zod was initially skipped due to editor hinting problems in the current JavaScript setup. This is a recognized shortcoming that would be addressed immediately in a TypeScript migration.

---

## 🏃 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation & Setup

1.  **Install dependencies:** From the project root, install all necessary packages.
    ```bash
    npm install
    ```
2.  **Frontend Environment Variable:** Create a `.env` file in the **`frontend/`** directory (using `frontend/env.example` as a template) and set the backend API base URL.
    ```bash
    cp frontend/.env.example frontend/.env
    ```

### Running the Application

To start both the frontend and backend development servers concurrently:

```bash
npm run dev
```

---

- Frontend (React App): Runs on http://localhost:5173

- Backend (Express API): Runs on http://localhost:3001

## Running Tests

1. Backend Integration Tests

```Bash
cd backend
npm run test
```

2. E2E Tests (Playwright)

Note: This script is included but incomplete due to the known technical issues.

```Bash
npm run test:e2e
```

## 🎨 Design & Core Requirements Checklist

The implemented solution addresses the core requirements as follows:

### Design Requirements

- ✅ Figma Match: Interface matches the general aesthetic of the provided design file.

- ✅ Theme: Dark mode interface is implemented.

- ✅ Layout: Single-page application with header, chat area, and input section is implemented.

### Essential Functionality

- ✅ Messaging System:

  - Send and store messages.

  - Display message history.

- ✅ User Management:

  - Basic user persona selection for message sending is implemented.

- ✅ Data Persistence: Messages and users persist between sessions using a JSON file.

- ✅ User Interface: Clean, intuitive, and responsive messaging interface.

### Technical Implementation

- ✅ Backend: Express.js server on port 3001 with RESTful API design.

- ✅ Frontend: React application on port 5173 with component architecture and state management.

- ✅ Development: Application runs with npm run dev and includes clean, organized code
