import React, { useState } from "react"
import { Button } from "./ui/button"

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
  }
}

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export function StudentTask() {
  const [showInstructions, setShowInstructions] = useState(false)
  
  // State for students to store fetched data
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  
  // State for search
  const [searchQuery, setSearchQuery] = useState("")
  
  // Loading & error states
  const [usersLoading, setUsersLoading] = useState(false)
  const [postsLoading, setPostsLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form for adding post
  const [postForm, setPostForm] = useState({
    title: "",
    body: "",
  })

  // 1. GET ALL USERS (https://jsonplaceholder.typicode.com/users)
  const fetchUsers = async () => {
    setUsersLoading(true)
    setError(null)
    try {
      // TODO: Реалізувати запит GET на https://jsonplaceholder.typicode.com/users
      console.log("Fetch users placeholder")
    } catch (err: any) {
      console.error(err)
      setError("Помилка завантаження користувачів")
    } finally {
      setUsersLoading(false)
    }
  }

  // 2. GET POSTS BY USER ID (https://jsonplaceholder.typicode.com/posts?userId={id})
  const fetchUserPosts = async (user: User) => {
    setSelectedUser(user)
    setPostsLoading(true)
    try {
      // TODO: Реалізувати запит GET на https://jsonplaceholder.typicode.com/posts?userId={user.id}
      // Підказка: використовуйте AbortController, щоб скасовувати попередній запит деталей, якщо користувач швидко клікає.
      console.log(`Fetch posts for user ${user.id}`)
    } catch (err: any) {
      console.error(err)
    } finally {
      setPostsLoading(false)
    }
  }

  // 3. POST NEW POST (https://jsonplaceholder.typicode.com/posts)
  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return
    
    setSubmitLoading(true)
    try {
      // TODO: Реалізувати запит POST на https://jsonplaceholder.typicode.com/posts
      // Тіло запиту: { title: postForm.title, body: postForm.body, userId: selectedUser.id }
      console.log("Add post placeholder:", postForm)
      
      // Очищення форми після успішного запиту
      setPostForm({ title: "", body: "" })
    } catch (err: any) {
      console.error(err)
    } finally {
      setSubmitLoading(false)
    }
  }

  // Local filter for users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header and Toggle Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-500">
            Student Axios Task
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Практична робота для студентів: робота з користувачами та їхніми публікаціями
          </p>
        </div>
        <Button
          onClick={() => setShowInstructions(!showInstructions)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
        >
          {showInstructions ? "Сховати опис завдання" : "Показати опис завдання"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-4 h-4 transition-transform duration-200 ${showInstructions ? "rotate-180" : ""}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </Button>
      </div>

      {/* Collapsible Instructions Card */}
      {showInstructions && (
        <div className="rounded-xl border border-emerald-250 bg-emerald-50/50 p-6 shadow-sm dark:border-emerald-900/30 dark:bg-emerald-950/10 space-y-4 animate-fade-in">
          <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-400">
            📝 Завдання для самостійної роботи
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-350 leading-relaxed">
            Вам потрібно реалізувати клієнтську частину для роботи з API <strong>JSONPlaceholder</strong> за допомогою бібліотеки <strong>Axios</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 dark:text-slate-400">
            <div className="space-y-2">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-500">Вимоги до функціоналу:</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>Натискання кнопки <strong>"Завантажити"</strong> повинно робити GET запит до <code>/users</code>.</li>
                <li>Реалізувати локальний пошук у списку користувачів за допомогою інпуту фільтрації.</li>
                <li>Клік на картку користувача робить GET запит до <code>/posts?userId=ID</code> та відображає його пости.</li>
                <li>Форма <strong>"Створити пост"</strong> робить POST запит до <code>/posts</code>.</li>
                <li>Новий пост має додаватися в локальний масив постів (на початку списку).</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-500">API Ендпоінти:</h3>
              <ul className="list-mono pl-4 space-y-1.5 font-mono text-[11px]">
                <li><strong>GET</strong> <code>https://jsonplaceholder.typicode.com/users</code></li>
                <li><strong>GET</strong> <code>https://jsonplaceholder.typicode.com/posts?userId=&#123;userId&#125;</code></li>
                <li><strong>POST</strong> <code>https://jsonplaceholder.typicode.com/posts</code> <br/>(Payload: <code>&#123; title, body, userId &#125;</code>)</li>
              </ul>
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-500 mt-2">Корисні підказки:</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>Створіть новий файл api або використовуйте існуючий клієнт Axios.</li>
                <li>Реалізуйте стани завантаження та обробку помилок за допомогою <code>try/catch/finally</code>.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid Structure */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Controls & User List */}
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Користувачі
            </h2>
            <Button
              onClick={fetchUsers}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
              disabled={usersLoading}
            >
              {usersLoading ? "Оновлення..." : "Завантажити"}
            </Button>
          </div>

          <div>
            <input
              type="text"
              placeholder="Фільтрувати користувачів за ім'ям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400 border border-red-200/50 dark:border-red-900/50">
              {error}
            </div>
          )}

          {usersLoading && (
            <div className="flex h-40 items-center justify-center text-slate-500">
              Завантаження користувачів...
            </div>
          )}

          {!usersLoading && filteredUsers.length === 0 && (
            <div className="flex h-40 items-center justify-center text-slate-500 border-2 border-dashed border-slate-200 rounded-lg dark:border-slate-800 text-sm">
              Користувачів не знайдено або не завантажено.
            </div>
          )}

          <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1">
            {!usersLoading &&
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => fetchUserPosts(user)}
                  className={`flex cursor-pointer flex-col gap-1 rounded-lg border p-3 transition hover:bg-slate-50 dark:hover:bg-slate-800 ${
                    selectedUser?.id === user.id
                      ? "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10"
                      : "border-slate-100 dark:border-slate-800"
                  }`}
                >
                  <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {user.name}
                  </h3>
                  <div className="flex flex-col text-[10px] text-slate-500 space-y-0.5">
                    <span>📧 {user.email}</span>
                    <span>🏢 {user.company?.name || "Н/Д"}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Middle Column: User Posts */}
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Пости користувача
          </h2>

          {postsLoading && (
            <div className="flex h-40 items-center justify-center text-slate-500">
              Завантаження постів...
            </div>
          )}

          {!postsLoading && !selectedUser && (
            <div className="flex h-40 items-center justify-center text-slate-500 border-2 border-dashed border-slate-200 rounded-lg dark:border-slate-800 text-sm text-center p-4">
              Оберіть користувача зі списку зліва, щоб переглянути його пости.
            </div>
          )}

          {!postsLoading && selectedUser && posts.length === 0 && (
            <div className="flex h-40 items-center justify-center text-slate-500 border-2 border-dashed border-slate-200 rounded-lg dark:border-slate-800 text-sm">
              Постів немає.
            </div>
          )}

          <div className="max-h-[450px] overflow-y-auto space-y-3 pr-1">
            {!postsLoading && selectedUser &&
              posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg border border-slate-100 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30"
                >
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 capitalize">
                    {post.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-650 dark:text-slate-400 leading-relaxed">
                    {post.body}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Right Column: Add Post Form */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
            Створити пост (POST)
          </h2>

          {!selectedUser ? (
            <div className="flex h-64 items-center justify-center text-slate-500 border-2 border-dashed border-slate-200 rounded-lg dark:border-slate-800 text-sm text-center p-4">
              Оберіть користувача зліва, щоб додати для нього новий пост.
            </div>
          ) : (
            <form onSubmit={handleAddPost} className="space-y-4">
              <div className="rounded-lg bg-emerald-50/30 dark:bg-emerald-950/10 p-3 border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                  АВТОР ПОСТА:
                </span>
                <span className="text-xs text-slate-800 dark:text-slate-200 font-semibold">
                  {selectedUser.name}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-slate-500">Заголовок</label>
                <input
                  type="text"
                  required
                  placeholder="Заголовок поста..."
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-slate-500">Текст поста</label>
                <textarea
                  required
                  placeholder="Вміст вашого поста..."
                  value={postForm.body}
                  onChange={(e) => setPostForm({ ...postForm, body: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={submitLoading}
              >
                {submitLoading ? "Надсилання..." : "Опублікувати пост"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
