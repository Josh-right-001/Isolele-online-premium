"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  ShoppingCart,
  FileText,
  DollarSign,
  ArrowRight,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface StatCard {
  label: string
  value: string
  change: number
  icon: typeof Eye
  color: string
}

interface Activity {
  id: string
  type: "order" | "article" | "user" | "comment"
  message: string
  time: string
  status: "success" | "pending" | "info"
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      // Fetch real data from Supabase
      const [
        { count: articlesCount },
        { count: productsCount },
        { count: ordersCount },
        { count: subscribersCount },
      ] = await Promise.all([
        supabase.from("articles").select("*", { count: "exact", head: true }),
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
      ])

      setStats([
        {
          label: "Visites ce mois",
          value: "12,543",
          change: 12.5,
          icon: Eye,
          color: "#C9A542",
        },
        {
          label: "Commandes",
          value: String(ordersCount || 0),
          change: 8.2,
          icon: ShoppingCart,
          color: "#4CAF50",
        },
        {
          label: "Articles publies",
          value: String(articlesCount || 0),
          change: -2.1,
          icon: FileText,
          color: "#2196F3",
        },
        {
          label: "Revenus",
          value: "$4,320",
          change: 15.3,
          icon: DollarSign,
          color: "#9C27B0",
        },
      ])

      // Mock activities
      setActivities([
        {
          id: "1",
          type: "order",
          message: "Nouvelle commande #1234 de Marie D.",
          time: "Il y a 5 min",
          status: "success",
        },
        {
          id: "2",
          type: "article",
          message: "Article \"L'Empire Makanda\" publie",
          time: "Il y a 1h",
          status: "info",
        },
        {
          id: "3",
          type: "user",
          message: "Nouvel abonne a la newsletter",
          time: "Il y a 2h",
          status: "success",
        },
        {
          id: "4",
          type: "comment",
          message: "Commentaire en attente de moderation",
          time: "Il y a 3h",
          status: "pending",
        },
      ])

      setIsLoading(false)
    }

    fetchData()
  }, [supabase])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
          <p className="text-gray-400">Bienvenue dans le Centre de Commandes du Mythe</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Derniere mise a jour: maintenant</span>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="relative group p-6 rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "#0a0f1a",
              border: "1px solid rgba(201, 165, 66, 0.2)",
            }}
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                boxShadow: `inset 0 0 0 1px ${stat.color}50`,
              }}
            />
            
            {/* Energy flow animation */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  `linear-gradient(90deg, transparent 0%, ${stat.color}20 50%, transparent 100%)`,
                  `linear-gradient(90deg, transparent 100%, ${stat.color}20 50%, transparent 0%)`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stat.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.change >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              </div>
              <motion.p
                className="text-3xl font-bold text-white mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {isLoading ? (
                  <span className="inline-block w-20 h-8 bg-gray-700 rounded animate-pulse" />
                ) : (
                  <CountUp value={stat.value} />
                )}
              </motion.p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart placeholder */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 p-6 rounded-2xl"
          style={{
            backgroundColor: "#0a0f1a",
            border: "1px solid rgba(201, 165, 66, 0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Apercu du trafic</h2>
            <select className="bg-[#1a2035] text-white text-sm px-3 py-2 rounded-lg border border-[#C9A542]/20 outline-none">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
              <option>Cette annee</option>
            </select>
          </div>
          
          {/* Simple chart visualization */}
          <div className="h-64 flex items-end gap-2">
            {[65, 40, 80, 55, 90, 70, 85].map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-lg"
                style={{ backgroundColor: "#C9A542" }}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
            <span>Sam</span>
            <span>Dim</span>
          </div>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="p-6 rounded-2xl"
          style={{
            backgroundColor: "#0a0f1a",
            border: "1px solid rgba(201, 165, 66, 0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Activite recente</h2>
            <Link 
              href="/admin/activity"
              className="text-sm text-[#C9A542] hover:underline"
            >
              Voir tout
            </Link>
          </div>
          
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === "success"
                      ? "bg-green-400"
                      : activity.status === "pending"
                      ? "bg-orange-400"
                      : "bg-blue-400"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{activity.message}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: "Nouvel article", href: "/admin/news/new", color: "#2196F3" },
          { label: "Ajouter un produit", href: "/admin/shop/new", color: "#4CAF50" },
          { label: "Gerer les personnages", href: "/admin/characters", color: "#9C27B0" },
          { label: "Voir les commandes", href: "/admin/shop/orders", color: "#FF9800" },
        ].map((action) => (
          <motion.div key={action.label} variants={itemVariants}>
            <Link href={action.href}>
              <motion.div
                className="p-4 rounded-xl flex items-center justify-between group cursor-pointer"
                style={{
                  backgroundColor: "#0a0f1a",
                  border: "1px solid rgba(201, 165, 66, 0.2)",
                }}
                whileHover={{
                  borderColor: action.color,
                  boxShadow: `0 0 20px ${action.color}30`,
                }}
              >
                <span className="text-white font-medium">{action.label}</span>
                <motion.div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${action.color}20` }}
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight className="w-4 h-4" style={{ color: action.color }} />
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// Count up animation component
function CountUp({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    const numericValue = Number.parseInt(value.replace(/[^0-9]/g, "")) || 0
    const prefix = value.startsWith("$") ? "$" : ""
    const suffix = value.includes(",") ? "" : ""
    
    let current = 0
    const increment = numericValue / 30
    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(prefix + Math.floor(current).toLocaleString() + suffix)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [value])

  return <span>{displayValue}</span>
}
