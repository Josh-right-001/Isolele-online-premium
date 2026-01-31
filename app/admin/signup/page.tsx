"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { Eye, EyeOff, AlertCircle, Loader2, CheckCircle, User, Mail, Lock, Instagram } from "lucide-react"
import Image from "next/image"

export default function AdminSignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    instagramUsername: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)
  
  const router = useRouter()
  const supabase = createClient()

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Le nom complet est requis")
      return false
    }
    if (!formData.email.trim()) {
      setError("L'adresse email est requise")
      return false
    }
    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caracteres")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return false
    }
    return true
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    setError(null)

    try {
      // Create user account
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: {
            full_name: formData.fullName,
            instagram_username: formData.instagramUsername || null,
            role: "admin",
          },
        },
      })

      if (signUpError) throw signUpError

      if (authData.user) {
        // Show welcome popup
        setShowWelcome(true)
        
        // Redirect after delay
        setTimeout(() => {
          router.push("/admin")
        }, 3000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite")
    } finally {
      setIsLoading(false)
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

      {/* Signup card */}
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
          <div className="text-center mb-6">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <Image
                src="/images/isolele-logo.png"
                alt="ISOLELE Admin"
                width={70}
                height={70}
                className="mx-auto mb-3 object-contain"
              />
              <h1 className="text-xl font-bold text-white tracking-wider">
                CREER UN COMPTE
              </h1>
              <p className="text-sm text-gray-400 mt-1">Rejoignez le Centre de Commandes</p>
            </motion.div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSignup}
            className="space-y-4"
          >
            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Full Name */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Nom Complet *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  onFocus={() => setActiveField("fullName")}
                  onBlur={() => setActiveField(null)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#1a2035] text-white text-sm outline-none transition-all"
                  style={{
                    border: activeField === "fullName" 
                      ? "1px solid #C9A542" 
                      : "1px solid rgba(201, 165, 66, 0.2)",
                  }}
                  placeholder="Votre nom complet"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Adresse Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onFocus={() => setActiveField("email")}
                  onBlur={() => setActiveField(null)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#1a2035] text-white text-sm outline-none transition-all"
                  style={{
                    border: activeField === "email" 
                      ? "1px solid #C9A542" 
                      : "1px solid rgba(201, 165, 66, 0.2)",
                  }}
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Mot de Passe *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onFocus={() => setActiveField("password")}
                  onBlur={() => setActiveField(null)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#1a2035] text-white text-sm outline-none transition-all"
                  style={{
                    border: activeField === "password" 
                      ? "1px solid #C9A542" 
                      : "1px solid rgba(201, 165, 66, 0.2)",
                  }}
                  placeholder="Min. 6 caracteres"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Confirmer Mot de Passe *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  onFocus={() => setActiveField("confirmPassword")}
                  onBlur={() => setActiveField(null)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#1a2035] text-white text-sm outline-none transition-all"
                  style={{
                    border: activeField === "confirmPassword" 
                      ? "1px solid #C9A542" 
                      : "1px solid rgba(201, 165, 66, 0.2)",
                  }}
                  placeholder="Retapez le mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Instagram Username (Optional) */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Nom Instagram <span className="text-gray-600">(Optionnel - pour votre photo de profil)</span>
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={formData.instagramUsername}
                  onChange={(e) => handleChange("instagramUsername", e.target.value)}
                  onFocus={() => setActiveField("instagram")}
                  onBlur={() => setActiveField(null)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#1a2035] text-white text-sm outline-none transition-all"
                  style={{
                    border: activeField === "instagram" 
                      ? "1px solid #C9A542" 
                      : "1px solid rgba(201, 165, 66, 0.2)",
                  }}
                  placeholder="@votre_nom_instagram"
                />
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-bold tracking-wider text-[#0F1524] transition-all disabled:opacity-50 mt-6"
              style={{ backgroundColor: "#C9A542" }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(201, 165, 66, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 mx-auto animate-spin" />
              ) : (
                "CREER MON COMPTE"
              )}
            </motion.button>

            {/* Login link */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Vous avez deja un compte?{" "}
                <a 
                  href="/admin/login"
                  className="text-[#C9A542] hover:underline font-medium transition-colors"
                >
                  Se connecter
                </a>
              </p>
            </div>
          </motion.form>
        </div>
      </motion.div>

      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="rounded-2xl p-8 text-center max-w-sm mx-4"
              style={{
                background: "linear-gradient(135deg, rgba(15, 21, 36, 0.95) 0%, rgba(26, 32, 53, 0.95) 100%)",
                border: "1px solid rgba(201, 165, 66, 0.3)",
                boxShadow: "0 0 100px rgba(201, 165, 66, 0.3)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#C9A542]/20 flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-[#C9A542]" />
              </motion.div>
              
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-white mb-2"
              >
                Bienvenue, {formData.fullName.split(" ")[0]}!
              </motion.h2>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 mb-4"
              >
                Votre compte a ete cree avec succes. Vous allez etre redirige vers votre tableau de bord.
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.5, ease: "linear" }}
                className="h-1 bg-[#C9A542] rounded-full origin-left"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
