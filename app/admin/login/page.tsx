"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import {
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Lock,
  Instagram,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"

const DEFAULT_ADMIN_EMAIL = "Isoleleuniverse@gmail.com"
const DEFAULT_ADMIN_PASSWORD = "IsoleleForever.243"

export default function AdminAuthPage() {
  const router = useRouter()
  const supabase = createClient()

  const [viewMode, setViewMode] = useState<"login" | "signup">("login")

  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)

  // Signup state
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    instagramUsername: "",
  })
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [signupError, setSignupError] = useState<string | null>(null)
  const [signupLoading, setSignupLoading] = useState(false)

  const [showWelcome, setShowWelcome] = useState(false)
  const [welcomeName, setWelcomeName] = useState("")

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        router.push("/admin")
      }
    }
    checkUser()
  }, [supabase, router])

  // Helper: ensure profile exists in DB
  const ensureProfile = async (userId: string, email: string, fullName: string, role: string) => {
    try {
      await supabase.from("profiles").upsert(
        {
          id: userId,
          email,
          full_name: fullName,
          role,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      )
    } catch {
      // Non-critical - middleware will also try to create it
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    setLoginLoading(true)

    try {
      const isDefault = loginEmail === DEFAULT_ADMIN_EMAIL && loginPassword === DEFAULT_ADMIN_PASSWORD

      // Try to sign in
      let signInResult = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      })

      // If default admin credentials fail, auto-create the account
      if (signInResult.error && isDefault) {
        const { error: signUpErr } = await supabase.auth.signUp({
          email: DEFAULT_ADMIN_EMAIL,
          password: DEFAULT_ADMIN_PASSWORD,
          options: {
            data: {
              full_name: "Admin Isolele",
              role: "super_admin",
            },
          },
        })

        if (signUpErr && !signUpErr.message.includes("already registered")) {
          throw signUpErr
        }

        // Retry sign in
        signInResult = await supabase.auth.signInWithPassword({
          email: DEFAULT_ADMIN_EMAIL,
          password: DEFAULT_ADMIN_PASSWORD,
        })
      }

      if (signInResult.error) {
        throw signInResult.error
      }

      // Ensure profile row exists
      if (signInResult.data.user) {
        const u = signInResult.data.user
        await ensureProfile(
          u.id,
          u.email || loginEmail,
          u.user_metadata?.full_name || (isDefault ? "Admin Isolele" : "Administrateur"),
          isDefault ? "super_admin" : (u.user_metadata?.role || "admin")
        )
      }

      setWelcomeName(isDefault ? "Admin" : (signInResult.data.user?.user_metadata?.full_name?.split(" ")[0] || "Administrateur"))
      setShowWelcome(true)
      setTimeout(() => router.push("/admin"), 2500)
    } catch (err) {
      setLoginError(
        err instanceof Error
          ? err.message === "Invalid login credentials"
            ? "Email ou mot de passe incorrect"
            : err.message
          : "Email ou mot de passe incorrect"
      )
    } finally {
      setLoginLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError(null)

    if (!signupData.fullName.trim()) {
      setSignupError("Le nom complet est requis")
      return
    }
    if (!signupData.email.trim()) {
      setSignupError("L'adresse email est requise")
      return
    }
    if (signupData.password.length < 6) {
      setSignupError("Le mot de passe doit contenir au moins 6 caracteres")
      return
    }
    if (signupData.password !== signupData.confirmPassword) {
      setSignupError("Les mots de passe ne correspondent pas")
      return
    }

    setSignupLoading(true)

    try {
      // Create account
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            full_name: signupData.fullName,
            instagram_username: signupData.instagramUsername || null,
            role: "admin",
          },
        },
      })

      if (error) throw error

      if (data.user) {
        // Create profile
        await ensureProfile(data.user.id, signupData.email, signupData.fullName, "admin")

        // Auto sign in after signup
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email: signupData.email,
          password: signupData.password,
        })

        if (signInErr) {
          // If email confirmation is required, show message
          if (signInErr.message.includes("Email not confirmed")) {
            setSignupError("Un email de confirmation a ete envoye. Verifiez votre boite de reception.")
            setSignupLoading(false)
            return
          }
          throw signInErr
        }

        setWelcomeName(signupData.fullName.split(" ")[0])
        setShowWelcome(true)
        setTimeout(() => router.push("/admin"), 2500)
      }
    } catch (err) {
      setSignupError(err instanceof Error ? err.message : "Une erreur s'est produite")
    } finally {
      setSignupLoading(false)
    }
  }

  const handleSignupChange = (field: string, value: string) => {
    setSignupData((prev) => ({ ...prev, [field]: value }))
    setSignupError(null)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: "#0F1524" }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`bg-${i}`}
            className="absolute opacity-10"
            style={{
              left: `${(i * 8.3) % 100}%`,
              top: `${(i * 12.5) % 100}%`,
              width: `${40 + (i * 7) % 60}px`,
              height: `${40 + (i * 7) % 60}px`,
              border: "1px solid #C9A542",
              transform: `rotate(${i * 30}deg)`,
            }}
            animate={{ rotate: [i * 30, i * 30 + 360], scale: [1, 1.1, 1] }}
            transition={{ duration: 20 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* Main container */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(15, 21, 36, 0.95)",
            border: "1px solid rgba(201, 165, 66, 0.3)",
            boxShadow: "0 0 80px rgba(201, 165, 66, 0.15)",
          }}
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-[#C9A542]/20 text-center">
            <Image src="/images/isolele-logo.png" alt="ISOLELE Admin" width={70} height={70} className="mx-auto mb-4 object-contain" />
            <h1 className="text-xl font-bold text-white tracking-wider">CENTRE DE COMMANDES</h1>
            <p className="text-sm text-gray-400 mt-1">
              {viewMode === "login" ? "Connectez-vous pour acceder au panneau" : "Creez votre compte administrateur"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* ===== LOGIN FORM ===== */}
            {viewMode === "login" && (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="p-6 space-y-5"
              >
                {loginError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-sm text-red-400">{loginError}</p>
                  </motion.div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 tracking-wider">ADRESSE EMAIL</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => { setLoginEmail(e.target.value); setLoginError(null) }}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#1a2035] text-white outline-none transition-all border border-[#C9A542]/20 focus:border-[#C9A542] focus:shadow-[0_0_20px_rgba(201,165,66,0.15)]"
                      placeholder="admin@isolele.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 tracking-wider">MOT DE PASSE</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => { setLoginPassword(e.target.value); setLoginError(null) }}
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-[#1a2035] text-white outline-none transition-all border border-[#C9A542]/20 focus:border-[#C9A542] focus:shadow-[0_0_20px_rgba(201,165,66,0.15)]"
                      placeholder="Votre mot de passe"
                      required
                    />
                    <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                      {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-4 rounded-xl font-bold tracking-wider text-[#0F1524] transition-all disabled:opacity-50"
                  style={{ backgroundColor: "#C9A542" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(201, 165, 66, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loginLoading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : "SE CONNECTER"}
                </motion.button>

                <div className="text-center pt-2">
                  <p className="text-sm text-gray-400">
                    {"Vous n'avez pas de compte? "}
                    <button type="button" onClick={() => { setViewMode("signup"); setLoginError(null) }} className="text-[#C9A542] hover:underline font-medium transition-colors">
                      Creez un compte maintenant
                    </button>
                  </p>
                </div>
              </motion.form>
            )}

            {/* ===== SIGNUP FORM ===== */}
            {viewMode === "signup" && (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSignup}
                className="p-6 space-y-4"
              >
                <button type="button" onClick={() => { setViewMode("login"); setSignupError(null) }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#C9A542] transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Retour a la connexion
                </button>

                {signupError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-sm text-red-400">{signupError}</p>
                  </motion.div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 tracking-wider">NOM COMPLET *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="text" value={signupData.fullName} onChange={(e) => handleSignupChange("fullName", e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1a2035] text-white text-sm outline-none border border-[#C9A542]/20 focus:border-[#C9A542]" placeholder="Votre nom complet" required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 tracking-wider">ADRESSE EMAIL *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="email" value={signupData.email} onChange={(e) => handleSignupChange("email", e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1a2035] text-white text-sm outline-none border border-[#C9A542]/20 focus:border-[#C9A542]" placeholder="admin@example.com" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 tracking-wider">MOT DE PASSE *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type={showSignupPassword ? "text" : "password"} value={signupData.password} onChange={(e) => handleSignupChange("password", e.target.value)} className="w-full pl-10 pr-9 py-3 rounded-xl bg-[#1a2035] text-white text-sm outline-none border border-[#C9A542]/20 focus:border-[#C9A542]" placeholder="Min. 6 car." required />
                      <button type="button" onClick={() => setShowSignupPassword(!showSignupPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                        {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 tracking-wider">CONFIRMER *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type={showConfirmPassword ? "text" : "password"} value={signupData.confirmPassword} onChange={(e) => handleSignupChange("confirmPassword", e.target.value)} className="w-full pl-10 pr-9 py-3 rounded-xl bg-[#1a2035] text-white text-sm outline-none border border-[#C9A542]/20 focus:border-[#C9A542]" placeholder="Retapez" required />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 tracking-wider">
                    INSTAGRAM <span className="text-gray-600">(Optionnel)</span>
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="text" value={signupData.instagramUsername} onChange={(e) => handleSignupChange("instagramUsername", e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1a2035] text-white text-sm outline-none border border-[#C9A542]/20 focus:border-[#C9A542]" placeholder="@votre_instagram" />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={signupLoading}
                  className="w-full py-3.5 rounded-xl font-bold tracking-wider text-[#0F1524] transition-all disabled:opacity-50 mt-2"
                  style={{ backgroundColor: "#C9A542" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(201, 165, 66, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {signupLoading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : "CREER MON COMPTE"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative corners */}
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#C9A542]/40" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#C9A542]/40" />
      </motion.div>

      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="rounded-2xl p-8 text-center max-w-sm mx-4"
              style={{
                background: "linear-gradient(135deg, rgba(15, 21, 36, 0.98) 0%, rgba(26, 32, 53, 0.98) 100%)",
                border: "1px solid rgba(201, 165, 66, 0.4)",
                boxShadow: "0 0 100px rgba(201, 165, 66, 0.3)",
              }}
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#C9A542]/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-[#C9A542]" />
              </motion.div>
              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-2xl font-bold text-white mb-2">
                {"Bienvenue, "}{welcomeName}{"!"}
              </motion.h2>
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-gray-400 mb-6">
                Connexion reussie. Redirection vers le tableau de bord...
              </motion.p>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2, ease: "linear" }} className="h-1.5 bg-gradient-to-r from-[#C9A542] to-[#FFD700] rounded-full origin-left" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
