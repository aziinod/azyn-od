"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Home() {
  const [time, setTime] = useState(3600)
  const [code, setCode] = useState("")
  const [success, setSuccess] = useState("")
  const [codes, setCodes] = useState<string[]>([])
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 3600))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const savedCodes = localStorage.getItem("codes")

    if (savedCodes) {
      setCodes(JSON.parse(savedCodes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("codes", JSON.stringify(codes))
  }, [codes])

  const hours = String(Math.floor(time / 3600)).padStart(2, "0")
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0")
  const seconds = String(time % 60).padStart(2, "0")

  return (
    <main className="bg-black text-white overflow-hidden">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-2xl font-bold">
            Азын од
          </h1>

          <nav className="hidden md:flex gap-8 text-sm">
            <a href="#">Home</a>
            <a href="#">Prizes</a>
            <a href="#">Winners</a>
            <a href="#">Contact</a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl"
          >
            ☰
          </button>

        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed top-20 left-0 w-full bg-black/95 backdrop-blur-md z-40 flex flex-col items-center gap-8 py-10 text-xl">

          <a href="#">Home</a>
          <a href="#">Prizes</a>
          <a href="#">Winners</a>
          <a href="#">Contact</a>

        </div>
      )}

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center px-6">

          <p className="uppercase tracking-[0.4em] text-sm text-gray-300">
            Super Campaign
          </p>

          <h1 className="mt-6 text-5xl md:text-8xl font-bold leading-tight">
            WIN
            <br />
            BIG PRIZES
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg text-gray-300 leading-8">
            Register your code for a chance to win amazing rewards.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

            <input
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="px-6 py-4 rounded-full bg-white text-black w-[320px] outline-none"
            />

            <button
              onClick={() => {
                if (code.trim() === "") {
                  setSuccess("Please enter a code")
                  return
                }

                setSuccess(`Code registered: ${code}`)

                setCodes((prev) => [...prev, code])

                setCode("")
              }}
              className="px-8 py-4 rounded-full bg-yellow-400 text-black font-bold transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Register
            </button>

          </div>

          {success && (
            <p className="mt-6 text-green-400 text-lg font-medium">
              {success}
            </p>
          )}

          {codes.length > 0 && (
            <div className="mt-10 bg-white/10 border border-white/10 rounded-3xl p-6 max-w-xl mx-auto">

              <h3 className="text-xl font-bold mb-4">
                Registered Codes
              </h3>

              <div className="space-y-3">

                {codes.map((item, index) => (
                  <div
                    key={index}
                    className="bg-black/30 rounded-xl px-4 py-3 flex items-center justify-between"
                  >

                    <span>{item}</span>

                    <button
                      onClick={() =>
                        setCodes(codes.filter((_, i) => i !== index))
                      }
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>

                  </div>
                ))}

              </div>

            </div>
          )}

        </div>

      </section>

      {/* PRIZES */}
      <section className="py-32 bg-white text-black">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
              Prizes
            </p>

            <h2 className="mt-6 text-5xl md:text-6xl font-bold">
              Win Amazing Rewards
            </h2>

          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">

            <div className="rounded-3xl overflow-hidden bg-black text-white transition duration-500 hover:-translate-y-4 hover:shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
                className="h-80 w-full object-cover"
              />

              <div className="p-8">
                <h3 className="text-3xl font-bold">
                  iPhone 16 Pro
                </h3>
              </div>

            </div>

            <div className="rounded-3xl overflow-hidden bg-black text-white transition duration-500 hover:-translate-y-4 hover:shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
                className="h-80 w-full object-cover"
              />

              <div className="p-8">
                <h3 className="text-3xl font-bold">
                  Luxury Car
                </h3>
              </div>

            </div>

            <div className="rounded-3xl overflow-hidden bg-black text-white transition duration-500 hover:-translate-y-4 hover:shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1974&auto=format&fit=crop"
                className="h-80 w-full object-cover"
              />

              <div className="p-8">
                <h3 className="text-3xl font-bold">
                  Gift Packages
                </h3>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* COUNTDOWN */}
      <section className="py-32 bg-yellow-400 text-black">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="uppercase tracking-[0.3em] text-sm">
            Next Draw
          </p>

          <h2 className="mt-6 text-5xl md:text-7xl font-bold">
            {hours} : {minutes} : {seconds}
          </h2>

          <p className="mt-6 text-xl">
            Until the next lucky draw
          </p>

        </div>

      </section>

      {/* WINNERS */}
      <section className="py-32 bg-black text-white">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center">

            <p className="uppercase tracking-[0.3em] text-sm text-gray-400">
              Latest Winners
            </p>

            <h2 className="mt-6 text-5xl md:text-6xl font-bold">
              Congratulations
            </h2>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20 grid md:grid-cols-3 gap-8"
          >

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur">

              <p className="text-gray-400 text-sm">
                Grand Prize Winner
              </p>

              <h3 className="mt-4 text-3xl font-bold">
                Б. Бат
              </h3>

              <p className="mt-4 text-yellow-400 text-xl">
                iPhone 16 Pro
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur">

              <p className="text-gray-400 text-sm">
                Weekly Winner
              </p>

              <h3 className="mt-4 text-3xl font-bold">
                Э. Номин
              </h3>

              <p className="mt-4 text-yellow-400 text-xl">
                Luxury Car
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur">

              <p className="text-gray-400 text-sm">
                Bonus Winner
              </p>

              <h3 className="mt-4 text-3xl font-bold">
                Д. Тэмүүлэн
              </h3>

              <p className="mt-4 text-yellow-400 text-xl">
                Gift Package
              </p>

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  )
}