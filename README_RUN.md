# How to Run the ZOGO Website Locally

This project is a monorepo structured using **pnpm workspaces**. 

Follow these steps to run both the API Server (Backend) and the Zogo Client (Frontend) on your macOS system.

---

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your system. You can verify this by running:
```bash
node --version
npm --version
```

---

### Step-by-step Process to Run the website

#### 1. Install Dependencies
Since the project uses pnpm workspaces and requires pnpm v9 to run without dependency build issues, run the following command in the project root folder:
```bash
npx pnpm@9.15.4 install
```
*(This commands installs all packages in the frontend, backend, and shared libraries).*

#### 2. Start the API Server (Backend)
Open a terminal window, navigate to the root directory `/Users/tridipsamanta/Desktop/Zogo Website`, and start the backend server on port `5001`:
```bash
PORT=5001 npx pnpm@9.15.4 --filter @workspace/api-server run dev
```

#### 3. Start the Zogo Website (Frontend)
Open a **new terminal tab or window**, navigate to the root directory, and start the Vite dev server for the frontend app:
```bash
PORT=3000 BASE_PATH=/ API_PROXY_TARGET=http://localhost:5001 npx pnpm@9.15.4 --filter @workspace/zogo run dev
```

#### 4. Access the Website
Open your browser and navigate to:
```
http://localhost:3000/
```

---

### Current Status
Both the **Backend API Server** and the **Frontend ZOGO Website** are currently **running and active** in the background:
- **API Server:** Port `5001`
- **Zogo Frontend:** Port `3000` (Proxying API requests to Port `5001`)
