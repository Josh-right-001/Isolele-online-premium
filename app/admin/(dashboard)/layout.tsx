"use client"

import { useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import {
  LayoutDashboard,
  FileText,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  ImageIcon as ImageIconIcon,
  BookOpen,
  BarChart3,
  Shield,
  Flame,
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", href: "/admin" },
  { icon: FileText, label: "Actualites", href: "/admin/news" },
  { icon: Users, label: "Personnages", href: "/admin/characters" },
  { icon: ShoppingBag, label: "Boutique", href: "/admin/shop" },
  { icon: ImageIconIcon, label: "Medias", href: "/admin/media" },
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
  const [user, setUser] = useState<{ email?: string; role?: string } | null>(null)
  const [notifications, setNotifications] = useState(3)
  const [searchOpen, setSearchOpen] = useState(false)
  const [ninkiVisible, setNinkiVisible] = useState(false)
  
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authUser.id)
          .single()
        
        setUser({
          email: authUser.email,
          role: profile?.role || "user",
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
            <ImageIconIcon src="/images/isolele-logo.jpg" alt="ISOLELE" width={40} height={40} className="rounded-lg flex-shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
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
                    isActive(item.href)
                      ? "bg-[#C9A542]/20 text-[#C9A542]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-medium whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 w-1 h-8 bg-[#C9A542] rounded-r-full"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Toggle button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-4 border-t border-[#C9A542]/20 text-gray-400 hover:text-white transition-colors"
          >
            <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }}>
              <ChevronDown className="w-5 h-5 rotate-90" />
            </motion.div>
          </button>
        </motion.aside>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setMobileMenuOpen(false)}
              />
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
                    <ImageIconIcon src="/images/isolele-logo.jpg" alt="ISOLELE" width={40} height={40} className="rounded-lg" />
                    <div>
                      <h1 className="text-lg font-bold text-white tracking-wider">ISOLELE</h1>
                      <p className="text-xs text-gray-400">Administration</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="p-4 space-y-2">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <div
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                          isActive(item.href)
                            ? "bg-[#C9A542]/20 text-[#C9A542]"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
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
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 300, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="absolute left-0 top-0 overflow-hidden"
                    >
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full px-4 py-2 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542]"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {notifications}
                  </motion.span>
                )}
              </button>

              {/* User menu */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-white">{user?.email}</p>
                  <p className="text-xs text-[#C9A542]">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  title="Deconnexion"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </main>
        </div>

        {/* Ninki Assistant */}
        <motion.button
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A542] to-[#8B4513] flex items-center justify-center shadow-lg z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setNinkiVisible(!ninkiVisible)}
          animate={{
            boxShadow: ninkiVisible 
              ? "0 0 30px rgba(201, 165, 66, 0.5)" 
              : "0 0 20px rgba(201, 165, 66, 0.3)",
          }}
        >
          <Flame className="w-6 h-6 text-white" />
        </motion.button>

        {/* Ninki Panel */}
        <AnimatePresence>
          {ninkiVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 right-6 w-80 max-h-96 rounded-2xl overflow-hidden z-50"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.3)",
              }}
            >
              <div className="p-4 border-b border-[#C9A542]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A542] to-[#8B4513] flex items-center justify-center">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Ninki</h3>
                    <p className="text-xs text-gray-400">Assistant Isolele</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="bg-[#1a2035] rounded-lg p-3">
                  <p className="text-sm text-gray-300">
                    Bienvenue, gardien du mythe! Comment puis-je vous aider aujourd'hui?
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Posez votre question..."
                  className="w-full px-4 py-2 bg-[#1a2035] text-white text-sm rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Suspense>
  )
}
