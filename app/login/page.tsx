"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("admin", "true")
      router.push("/admin")
    } else {
      alert("Wrong password")
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-3xl p-10 backdrop-blur">

        <h1 className="text-4xl font-bold text-center">
          Admin Login
        </h1>

        <p className="mt-4 text-center text-gray-400">
          Enter admin password
        </p>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-8 w-full px-6 py-4 rounded-2xl bg-white text-black outline-none"
        />

        <button
          onClick={handleLogin}
          className="mt-6 w-full py-4 rounded-2xl bg-yellow-400 text-black font-bold hover:scale-105 transition"
        >
          Login
        </button>

      </div>

    </main>
  )
}
