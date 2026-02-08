"use client"

import { useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import NextImage from "next/image"
import { Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { LayoutDashboard, FileText, Users, ShoppingBag, Settings, LogOut, Menu, X, Bell, Search, ChevronDown, BookOpen, BarChart3, Shield, ImagePlusIcon as ImageLucide } from "lucide-react"
import { AIAssistant } from "@/components/admin/ai-assistant"
import { SaveProvider } from "@/components/admin/save-progress"

const navItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", href: "/admin" },
  { icon: FileText, label: "Actualites", href: "/admin/news" },
  { icon: Users, label: "Personnages", href: "/admin/characters" },
  { icon: ShoppingBag, label: "Boutique", href: "/admin/shop" },
  { icon: ImageLucide, label: "Medias", href: "/admin/media" },
  { icon: BookOpen, label: "Pages", href: "/admin/pages" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Shield, label: "Securite", href: "/admin/security" },
  { icon: Settings, label: "Parametres", href: "/admin/settings" },
]

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ email?: string; fullName?: string; role?: string } | null>(null)
  const [notifications] = useState(3)
  const [searchOpen, setSearchOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      if (authUser) {
        setUser({
          email: authUser.email,
          fullName: authUser.user_metadata?.full_name || "Admin",
          role: authUser.user_metadata?.role || "admin",
        })
      }
    }
    getUser()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <Suspense fallback={null}>
      <SaveProvider>
        <div className="min-h-screen bg-[#0F1524] flex">
          {/* Sidebar - Desktop */}
          <motion.aside
            initial={false}
            animate={{ width: sidebarOpen ? 280 : 80 }}
            className="hidden lg:flex flex-col fixed left-0 top-0 h-full z-40 border-r border-[#C9A542]/20"
            style={{ backgroundColor: "#0a0f1a" }}
          >
            {/* Logo */}
            <div className="p-4 flex items-center gap-3 border-b border-[#C9A542]/20">
              <NextImage
                src="/images/isolele-logo.png"
                alt="ISOLELE"
                width={40}
                height={40}
                className="object-contain flex-shrink-0"
              />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                    <h1 className="text-lg font-bold text-white tracking-wider">ISOLELE</h1>
                    <p className="text-xs text-gray-400">Administration</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                      isActive(item.href) ? "bg-[#C9A542]/20 text-[#C9A542]" : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-medium whitespace-nowrap">
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* Toggle button */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-4 border-t border-[#C9A542]/20 text-gray-400 hover:text-white transition-colors">
              <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }}>
                <ChevronDown className="w-5 h-5 rotate-90" />
              </motion.div>
            </button>
          </motion.aside>

          {/* Mobile sidebar overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)} />
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween" }}
                  className="lg:hidden fixed left-0 top-0 h-full w-72 z-50 border-r border-[#C9A542]/20"
                  style={{ backgroundColor: "#0a0f1a" }}
                >
                  <div className="p-4 flex items-center justify-between border-b border-[#C9A542]/20">
                    <div className="flex items-center gap-3">
                      <NextImage src="/images/isolele-logo.png" alt="ISOLELE" width={40} height={40} className="object-contain" />
                      <div>
                        <h1 className="text-lg font-bold text-white tracking-wider">ISOLELE</h1>
                        <p className="text-xs text-gray-400">Administration</p>
                      </div>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                        <div className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${isActive(item.href) ? "bg-[#C9A542]/20 text-[#C9A542]" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                          <item.icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                      </Link>
                    ))}
                  </nav>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Main content */}
          <div className={`flex-1 ${sidebarOpen ? "lg:ml-[280px]" : "lg:ml-20"} transition-all duration-300`}>
            {/* Top bar */}
            <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-6 border-b border-[#C9A542]/20 bg-[#0F1524]/95 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-gray-400 hover:text-white">
                  <Menu className="w-5 h-5" />
                </button>

                <div className="relative">
                  <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                  <AnimatePresence>
                    {searchOpen && (
                      <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 300, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="absolute left-0 top-0 overflow-hidden">
                        <input type="text" placeholder="Rechercher..." className="w-full px-4 py-2 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542]" autoFocus />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {notifications}
                    </motion.span>
                  )}
                </button>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-white">{user?.fullName || user?.email}</p>
                    <p className="text-xs text-[#C9A542] capitalize">{user?.role}</p>
                  </div>
                  <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-400 transition-colors" title="Deconnexion">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </header>

            {/* Page content */}
            <main className="p-4 lg:p-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                {children}
              </motion.div>
            </main>
          </div>

          {/* AI Assistant */}
          <AIAssistant />
        </div>
      </SaveProvider>
    </Suspense>
  )
}
