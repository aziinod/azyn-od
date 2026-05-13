"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
 Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function AdminPage() {
  const router = useRouter()

  const [winner, setWinner] = useState("")

  useEffect(() => {
    const admin = localStorage.getItem("admin")

    if (!admin) {
      router.push("/login")
    }
  }, [router])

  const codes = [
    "ABC123",
    "LUCKY777",
    "WIN999",
    "SUPER555",
    "MEGA222",
  ]

  const data = [
    { day: "Mon", codes: 120 },
    { day: "Tue", codes: 210 },
    { day: "Wed", codes: 180 },
    { day: "Thu", codes: 320 },
    { day: "Fri", codes: 260 },
    { day: "Sat", codes: 400 },
    { day: "Sun", codes: 350 },
  ]

  const pickWinner = () => {
    const random = codes[Math.floor(Math.random() * codes.length)]

    setWinner(random)
  }

  return (
    <>
      <main className="min-h-screen bg-black text-white flex">

        {/* SIDEBAR */}
        <aside className="w-72 bg-white/5 border-r border-white/10 p-8">

          <h1 className="text-3xl font-bold">
            Admin
          </h1>

          <button
            onClick={() => {
              localStorage.removeItem("admin")
              router.push("/login")
            }}
            className="mt-6 bg-red-500 hover:bg-red-400 transition px-4 py-3 rounded-xl w-full"
          >
            Logout
          </button>

          <nav className="mt-10 space-y-4">

            <a className="block bg-yellow-400 text-black px-4 py-3 rounded-xl font-semibold">
              Dashboard
            </a>

            <a className="block hover:bg-white/10 px-4 py-3 rounded-xl transition">
              Codes
            </a>

            <a className="block hover:bg-white/10 px-4 py-3 rounded-xl transition">
              Winners
            </a>

            <a className="block hover:bg-white/10 px-4 py-3 rounded-xl transition">
              Settings
            </a>

          </nav>

        </aside>

        {/* CONTENT */}
        <section className="flex-1 p-10">

          <h2 className="text-5xl font-bold">
            Dashboard
          </h2>

          <p className="mt-4 text-gray-400">
            Lottery system overview
          </p>

          <button
            onClick={pickWinner}
            className="mt-6 bg-yellow-400 text-black px-6 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            Pick Random Winner
          </button>

          {/* STATS */}
          <div className="mt-10 grid md:grid-cols-3 gap-6">

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400">
                Total Codes
              </p>

              <h3 className="mt-4 text-5xl font-bold">
                1,248
              </h3>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400">
                Winners
              </p>

              <h3 className="mt-4 text-5xl font-bold">
                24
              </h3>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400">
                Campaign Status
              </p>

              <h3 className="mt-4 text-5xl font-bold text-green-400">
                Active
              </h3>
            </div>

          </div>

          {/* CHART */}
          <div className="mt-12 bg-white/10 border border-white/10 rounded-3xl p-8">

            <h3 className="text-3xl font-bold mb-8">
              Weekly Registrations
            </h3>

            <div className="h-[300px]">

              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>

                  <XAxis dataKey="day" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />

                  <Bar
                    dataKey="codes"
                    fill="#facc15"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>

            </div>

          </div>

          {/* TABLE */}
          <div className="mt-12 bg-white/10 border border-white/10 rounded-3xl p-8">

            <h3 className="text-3xl font-bold mb-8">
              Latest Codes
            </h3>

            <div className="space-y-4">

              {codes.map((code) => (
                <div
                  key={code}
                  className="bg-black/40 rounded-2xl p-4 flex items-center justify-between"
                >

                  <span>{code}</span>

                  <span className="text-gray-400">
                    2026-05-12
                  </span>

                </div>
              ))}

            </div>

          </div>

        </section>

      </main>

      {/* WINNER MODAL */}
      {winner && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">

          <div className="bg-white text-black rounded-3xl p-10 max-w-md w-full text-center animate-pulse">

            <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
              Winner Selected
            </p>

            <h2 className="mt-6 text-5xl font-bold">
              {winner}
            </h2>

            <button
              onClick={() => setWinner("")}
              className="mt-8 bg-black text-white px-6 py-4 rounded-2xl hover:scale-105 transition"
            >
              Close
            </button>

          </div>

        </div>
      )}
    </>
  )
}