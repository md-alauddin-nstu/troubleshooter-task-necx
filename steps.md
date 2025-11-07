# Steps to Convert JS Project to TypeScript

## 1. Add TypeScript Configuration Files
- **Reason:** TypeScript requires a `tsconfig.json` file to define compiler options, file inclusions, and exclusions for both frontend and backend. This enables TypeScript tooling and type checking.
- **Action:** Created `tsconfig.json` in both `frontend/` and `backend/` directories with appropriate settings for React (frontend) and Node.js (backend).

## 2. Install TypeScript and Type Definitions
- **Reason:** TypeScript and type definitions are needed for type checking and to provide type information for Node.js, React, and other libraries.
- **Action:** Installed `typescript` and relevant `@types/*` packages in both `frontend/` and `backend/` using npm.

## 3. Verify TypeScript Configuration
- **Reason:** Ensuring the configuration is correct prevents build and type-check errors later. It also ensures the project is ready for file migration.
- **Action:** Will run `tsc --noEmit` in both frontend and backend to verify configuration.

## 4. Prepare for File Migration
- **Reason:** To migrate from JS to TS, all `.js`/`.jsx` files will be renamed to `.ts`/`.tsx` and checked for compatibility, but internal code will not be changed yet.
- **Action:** Will rename files and ensure imports/exports are updated accordingly.

---

**Next Steps:**
- Verify TypeScript configuration by running the TypeScript compiler in both frontend and backend.
- If successful, proceed to rename source files for TypeScript compatibility.

## Dev & Run notes (updated)

- The project now runs the backend TypeScript server directly in development using `ts-node/esm`.
- Node ESM requires explicit file extensions for local imports. In TypeScript source we use `.js` extensions for local imports (e.g. `import x from './module.js'`) so the ESM loader can resolve them; `ts-node/esm` maps those to `.ts` at runtime.

Recommended dev workflow:

1. Install dependencies in frontend and backend:

```bash
cd backend && npm install
cd ../frontend && npm install
```

2. Start both dev servers from repo root:

```bash
npm run dev
```

3. Open the frontend at http://localhost:5173 and the backend health check at http://localhost:3001/api/health

If you see Vite errors about `main.jsx` missing, verify `frontend/index.html` points to `/src/main.tsx` (this was updated during the TypeScript migration).

Production recommendation:

- Build the frontend with `cd frontend && npm run build`.
- For the backend, produce a JS build via `tsc -p backend/tsconfig.json` and run the compiled files from the `dist/` folder for best performance.

If you'd like, I can add npm scripts to build the backend into `dist/` and run it with `node` for production.
