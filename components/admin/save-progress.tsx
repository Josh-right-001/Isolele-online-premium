"use client"

import React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Save, Check, Loader2 } from "lucide-react"

interface SaveContextType {
  hasChanges: boolean
  setHasChanges: (value: boolean) => void
  triggerSave: () => void
  isSaving: boolean
}

const SaveContext = createContext<SaveContextType | undefined>(undefined)

export function useSaveContext() {
  const context = useContext(SaveContext)
  if (!context) {
    throw new Error("useSaveContext must be used within SaveProvider")
  }
  return context
}

export function SaveProvider({ children }: { children: React.ReactNode }) {
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [progress, setProgress] = useState(0)

  const triggerSave = async () => {
    if (!hasChanges || isSaving) return
    
    setIsSaving(true)
    setProgress(0)

    // Simulate save progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Simulate save completion
    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setIsSaving(false)
      setHasChanges(false)
      setShowSuccess(true)
      
      setTimeout(() => {
        setShowSuccess(false)
        setProgress(0)
      }, 2000)
    }, 2000)
  }

  return (
    <SaveContext.Provider value={{ hasChanges, setHasChanges, triggerSave, isSaving }}>
      {children}
      
      {/* Save Button - Fixed position */}
      <AnimatePresence>
        {hasChanges && (
          <motion.button
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            onClick={triggerSave}
            disabled={isSaving}
            className="fixed top-20 right-6 z-50 px-6 py-3 rounded-xl font-bold text-[#0F1524] flex items-center gap-2 shadow-lg disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: "#C9A542",
              boxShadow: "0 0 30px rgba(201, 165, 66, 0.4)"
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            ENREGISTRER
          </motion.button>
        )}
      </AnimatePresence>

      {/* Save Progress Modal */}
      <AnimatePresence>
        {isSaving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl p-8 text-center max-w-md mx-4"
              style={{
                background: "linear-gradient(135deg, rgba(15, 21, 36, 0.98) 0%, rgba(26, 32, 53, 0.98) 100%)",
                border: "1px solid rgba(201, 165, 66, 0.3)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 80px rgba(201, 165, 66, 0.2)",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-[#C9A542]/30 border-t-[#C9A542] flex items-center justify-center"
              >
                <Save className="w-6 h-6 text-[#C9A542]" />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-2">
                Enregistrement en cours...
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Vos modifications sont en cours de sauvegarde
              </p>

              {/* Progress bar */}
              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A542] to-[#D4AF37] rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
              <p className="text-[#C9A542] font-bold">
                {Math.round(Math.min(progress, 100))}%
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl p-8 text-center max-w-md mx-4"
              style={{
                background: "linear-gradient(135deg, rgba(15, 21, 36, 0.98) 0%, rgba(26, 32, 53, 0.98) 100%)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 80px rgba(34, 197, 94, 0.2)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-green-500" />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-2">
                Modifications enregistrees!
              </h3>
              <p className="text-gray-400 text-sm">
                Toutes vos modifications sont maintenant visibles sur le site public.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SaveContext.Provider>
  )
}
