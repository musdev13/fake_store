import { useState } from "react"
import { FetchAPIStore } from "./components/FetchAPIStore"
import { AxiosAPIStore } from "./components/AxiosAPIStore"
import { StudentTask } from "./components/StudentTask"

export function App() {
  const [activeTab, setActiveTab] = useState<"fetch" | "axios" | "task">("axios")

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-200">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Navigation / Toggle Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Fake Store API Demo</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Interactive workspace for comparing fetch and axios requests
            </p>
          </div>
          <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50">
            <button
              onClick={() => setActiveTab("fetch")}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === "fetch"
                  ? "bg-white shadow-sm text-amber-600 dark:bg-slate-800 dark:text-amber-500 font-semibold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Fetch API
            </button>
            <button
              onClick={() => setActiveTab("axios")}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === "axios"
                  ? "bg-white shadow-sm text-sky-600 dark:bg-slate-800 dark:text-sky-400 font-semibold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Axios API
            </button>
            <button
              onClick={() => setActiveTab("task")}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === "task"
                  ? "bg-white shadow-sm text-emerald-600 dark:bg-slate-800 dark:text-emerald-500 font-semibold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Завдання (Axios)
            </button>
          </div>
        </div>

        {/* Workspace Panels */}
        <main className="py-2">
          {activeTab === "fetch" && <FetchAPIStore />}
          {activeTab === "axios" && <AxiosAPIStore />}
          {activeTab === "task" && <StudentTask />}
        </main>
      </div>
    </div>
  )
}

export default App;

