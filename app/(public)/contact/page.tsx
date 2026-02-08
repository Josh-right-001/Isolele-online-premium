"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Mail, MessageSquare, Handshake, Newspaper, Send, CheckCircle, MapPin, Phone } from "lucide-react"

const contactTypes = [
  { id: "support", icon: MessageSquare, label: { en: "General Support", fr: "Support General" } },
  { id: "partnership", icon: Handshake, label: { en: "Partnership", fr: "Partenariat" } },
  { id: "press", icon: Newspaper, label: { en: "Press & Media", fr: "Presse et Media" } },
]

export default function ContactPage() {
  const { currentLanguage } = useLanguage()
  const lang = currentLanguage.code
  const t = (obj: { en: string; fr: string }) => obj[lang as "en" | "fr"] || obj.en

  const [selectedType, setSelectedType] = useState("support")
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <main className="min-h-screen py-24 px-4 md:px-8" style={{ backgroundColor: "var(--isolele-bg)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Mail className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--isolele-accent)" }} />
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--isolele-accent)" }}>
            {lang === "fr" ? "CONTACTEZ-NOUS" : "CONTACT US"}
          </h1>
          <p className="text-lg" style={{ color: "var(--isolele-text-secondary)" }}>
            {lang === "fr"
              ? "Nous sommes ouverts a la collaboration, aux questions et aux partenariats."
              : "We are open to collaboration, questions and partnerships."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <MapPin className="w-6 h-6 mb-3" style={{ color: "var(--isolele-accent)" }} />
              <h3 className="font-bold mb-1" style={{ color: "var(--isolele-text)" }}>Kinshasa, DRC</h3>
              <p className="text-sm" style={{ color: "var(--isolele-text-secondary)" }}>
                {lang === "fr" ? "Siege principal - Republique Democratique du Congo" : "Main Headquarters - Democratic Republic of the Congo"}
              </p>
            </div>
            <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <Mail className="w-6 h-6 mb-3" style={{ color: "var(--isolele-accent)" }} />
              <h3 className="font-bold mb-1" style={{ color: "var(--isolele-text)" }}>contact@isolele.com</h3>
              <p className="text-sm" style={{ color: "var(--isolele-text-secondary)" }}>
                {lang === "fr" ? "Reponse sous 48h" : "Response within 48h"}
              </p>
            </div>
            <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <Phone className="w-6 h-6 mb-3" style={{ color: "var(--isolele-accent)" }} />
              <h3 className="font-bold mb-1" style={{ color: "var(--isolele-text)" }}>
                {lang === "fr" ? "Reseaux sociaux" : "Social Media"}
              </h3>
              <p className="text-sm" style={{ color: "var(--isolele-text-secondary)" }}>@isoleleuniverse</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-2xl" style={{ backgroundColor: "var(--isolele-bg-secondary)", border: "1px solid rgba(212,175,55,0.2)" }}>
              {/* Type selector */}
              <div className="flex flex-wrap gap-3 mb-8">
                {contactTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      backgroundColor: selectedType === type.id ? "var(--isolele-accent)" : "var(--isolele-bg)",
                      color: selectedType === type.id ? "#000" : "var(--isolele-text-secondary)",
                      border: `1px solid ${selectedType === type.id ? "var(--isolele-accent)" : "rgba(212,175,55,0.2)"}`
                    }}
                  >
                    <type.icon className="w-4 h-4" />
                    {t(type.label)}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--isolele-accent)" }} />
                    <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--isolele-text)" }}>
                      {lang === "fr" ? "Message Envoye !" : "Message Sent!"}
                    </h3>
                    <p style={{ color: "var(--isolele-text-secondary)" }}>
                      {lang === "fr" ? "Nous vous repondrons dans les plus brefs delais." : "We will get back to you as soon as possible."}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-2 tracking-wider" style={{ color: "var(--isolele-text-secondary)" }}>
                          {lang === "fr" ? "NOM" : "NAME"}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                          style={{ backgroundColor: "var(--isolele-bg)", color: "var(--isolele-text)", border: "1px solid rgba(212,175,55,0.2)" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2 tracking-wider" style={{ color: "var(--isolele-text-secondary)" }}>EMAIL</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                          style={{ backgroundColor: "var(--isolele-bg)", color: "var(--isolele-text)", border: "1px solid rgba(212,175,55,0.2)" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2 tracking-wider" style={{ color: "var(--isolele-text-secondary)" }}>
                        {lang === "fr" ? "SUJET" : "SUBJECT"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                        style={{ backgroundColor: "var(--isolele-bg)", color: "var(--isolele-text)", border: "1px solid rgba(212,175,55,0.2)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2 tracking-wider" style={{ color: "var(--isolele-text-secondary)" }}>MESSAGE</label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none"
                        style={{ backgroundColor: "var(--isolele-bg)", color: "var(--isolele-text)", border: "1px solid rgba(212,175,55,0.2)" }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-lg font-bold tracking-wider transition-all"
                      style={{ backgroundColor: "var(--isolele-accent)", color: "#000" }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-5 h-5" />
                      {lang === "fr" ? "ENVOYER LE MESSAGE" : "SEND MESSAGE"}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
