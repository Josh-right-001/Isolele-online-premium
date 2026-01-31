"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"
import Image from "next/image"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""])
  const [show2FA, setShow2FA] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam === "unauthorized") {
      setError("Vous n'avez pas les droits d'acces a cette zone.")
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      if (data.user) {
        // Check if user is admin
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single()

        if (profileError || (profile?.role !== "admin" && profile?.role !== "super_admin")) {
          await supabase.auth.signOut()
          throw new Error("Acces refuse. Vous n'etes pas administrateur.")
        }

        // Simulate 2FA for demo purposes
        setShow2FA(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite")
    } finally {
      setIsLoading(false)
    }
  }

  const handle2FASubmit = async () => {
    const code = otpCode.join("")
    if (code.length !== 6) {
      setError("Veuillez entrer le code complet")
      return
    }

    setIsLoading(true)
    
    // Simulate 2FA verification (in production, verify with backend)
    setTimeout(() => {
      router.push("/admin")
    }, 1000)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newOtp = [...otpCode]
    newOtp[index] = value
    setOtpCode(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0F1524]">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              border: "1px solid #C9A542",
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 mx-4"
      >
        <div 
          className="rounded-2xl p-8 backdrop-blur-xl"
          style={{
            backgroundColor: "rgba(15, 21, 36, 0.9)",
            border: "1px solid rgba(201, 165, 66, 0.2)",
            boxShadow: "0 0 60px rgba(201, 165, 66, 0.1)",
          }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <Image
                src="/images/isolele-logo.png"
                alt="ISOLELE Admin"
                width={80}
                height={80}
                className="mx-auto mb-4 object-contain"
              />
              <h1 className="text-2xl font-bold text-white tracking-wider">
                ISOLELE ADMIN
              </h1>
              <p className="text-sm text-gray-400 mt-1">Centre de Commandes du Mythe</p>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {!show2FA ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLogin}
                className="space-y-6"
              >
                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-sm text-red-400">{error}</p>
                  </motion.div>
                )}

                {/* Email field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                    className="w-full px-4 py-3 rounded-lg bg-[#1a2035] text-white outline-none transition-all"
                    style={{
                      border: activeField === "email" 
                        ? "1px solid #C9A542" 
                        : "1px solid rgba(201, 165, 66, 0.2)",
                      boxShadow: activeField === "email" 
                        ? "0 0 20px rgba(201, 165, 66, 0.2)" 
                        : "none",
                    }}
                    placeholder="admin@isolele.com"
                    required
                  />
                  {activeField === "email" && (
                    <motion.div
                      layoutId="field-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A542]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>

                {/* Password field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setActiveField("password")}
                      onBlur={() => setActiveField(null)}
                      className="w-full px-4 py-3 pr-12 rounded-lg bg-[#1a2035] text-white outline-none transition-all"
                      style={{
                        border: activeField === "password" 
                          ? "1px solid #C9A542" 
                          : "1px solid rgba(201, 165, 66, 0.2)",
                        boxShadow: activeField === "password" 
                          ? "0 0 20px rgba(201, 165, 66, 0.2)" 
                          : "none",
                      }}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {/* Password seed animation */}
                  <div className="flex gap-1 mt-2">
                    {password.split("").slice(0, 12).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-[#C9A542]"
                      />
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-lg font-bold tracking-wider text-[#0F1524] transition-all disabled:opacity-50"
                  style={{ backgroundColor: "#C9A542" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(201, 165, 66, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                  ) : (
                    "SE CONNECTER"
                  )}
                </motion.button>

                {/* Signup link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-400">
                    Vous n'avez pas de compte?{" "}
                    <a 
                      href="/admin/signup"
                      className="text-[#C9A542] hover:underline font-medium transition-colors"
                    >
                      Creer un compte maintenant
                    </a>
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="2fa"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-xl font-bold text-white mb-2">
                    Verification a deux facteurs
                  </h2>
                  <p className="text-sm text-gray-400">
                    Entrez le code de votre application d'authentification
                  </p>
                </div>

                {/* OTP Input */}
                <div className="flex justify-center gap-2">
                  {otpCode.map((digit, index) => (
                    <motion.input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold rounded-lg bg-[#1a2035] text-white outline-none transition-all"
                      style={{
                        border: digit 
                          ? "1px solid #C9A542" 
                          : "1px solid rgba(201, 165, 66, 0.2)",
                        background: digit 
                          ? "linear-gradient(135deg, rgba(201, 165, 66, 0.1) 0%, transparent 100%)"
                          : "#1a2035",
                      }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: digit ? 1.05 : 1, 
                        opacity: 1,
                      }}
                      transition={{ delay: index * 0.05 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={handle2FASubmit}
                  disabled={isLoading || otpCode.join("").length !== 6}
                  className="w-full py-4 rounded-lg font-bold tracking-wider text-[#0F1524] transition-all disabled:opacity-50"
                  style={{ backgroundColor: "#C9A542" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                  ) : (
                    "VERIFIER"
                  )}
                </motion.button>

                <button
                  onClick={() => setShow2FA(false)}
                  className="w-full text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Retour a la connexion
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Success animation overlay */}
        <AnimatePresence>
          {isLoading && show2FA && otpCode.join("").length === 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-[#0F1524]/80 backdrop-blur-sm rounded-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                className="w-16 h-16 rounded-full bg-[#C9A542] flex items-center justify-center"
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#0F1524]">
                    <motion.path
                      d="M5 13l4 4L19 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
