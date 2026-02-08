"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const duration = 3000
    const interval = 30
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return Math.min(prev + increment, 100)
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsComplete(true)
        setTimeout(onComplete, 500)
      }, 1000)
    }
  }, [progress, onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--isolele-bg, #0A0A0A)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated Kongo pattern background */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-[200%] w-px origin-center"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                    background: `linear-gradient(to bottom, transparent, var(--isolele-accent, #D4AF37), transparent)`,
                  }}
                />
              ))}
            </motion.div>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`diamond-${i}`}
                className="absolute h-32 w-32 rotate-45 border opacity-30"
                style={{
                  borderColor: "var(--isolele-accent, #D4AF37)",
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 15}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            ))}
          </div>

          {/* Logo container */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={progress >= 100 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1, repeat: progress >= 100 ? 1 : 0 }}
          >
            {/* Logo image with drawing effect */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src="/images/isolele-logo.png"
                alt="ISOLELE Logo"
                className="h-48 w-auto object-contain"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-xl"
                style={{ backgroundColor: "var(--isolele-accent, #D4AF37)" }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            {/* Progress bar */}
            <div className="relative h-1 w-64 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, var(--isolele-accent, #D4AF37), var(--isolele-accent-secondary, #B3541E))`,
                }}
              />
              {/* Shine effect */}
              <motion.div
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: [-80, 260] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="mt-4 font-mono text-sm tracking-widest"
              style={{ color: "var(--isolele-text-secondary, #D3D3C7)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              {progress < 100 ? "A VISIONARY AFRICAN UNIVERSE" : "WELCOME TO ISOLELE"}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
