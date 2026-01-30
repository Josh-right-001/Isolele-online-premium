"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  Calendar,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  status: "draft" | "review" | "approved" | "scheduled" | "published"
  created_at: string
  published_at: string | null
  read_time: number
}

const statusColors = {
  draft: { bg: "bg-gray-500/20", text: "text-gray-400", label: "Brouillon" },
  review: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "En revision" },
  approved: { bg: "bg-blue-500/20", text: "text-blue-400", label: "Approuve" },
  scheduled: { bg: "bg-purple-500/20", text: "text-purple-400", label: "Planifie" },
  published: { bg: "bg-green-500/20", text: "text-green-400", label: "Publie" },
}

export default function NewsManagementPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  
  const supabase = createClient()

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setArticles(data)
    }
    setIsLoading(false)
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = !filterStatus || article.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("articles").delete().eq("id", id)
    if (!error) {
      setArticles(articles.filter((a) => a.id !== id))
    }
    setActiveMenu(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Actualites BD</h1>
          <p className="text-gray-400">Gerez vos articles et publications</p>
        </div>
        <Link href="/admin/news/new">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-[#0F1524] bg-[#C9A542]"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(201, 165, 66, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Nouvel article
          </motion.button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0a0f1a] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
            showFilters
              ? "border-[#C9A542] text-[#C9A542] bg-[#C9A542]/10"
              : "border-[#C9A542]/20 text-gray-400 hover:text-white"
          }`}
        >
          <Filter className="w-5 h-5" />
          Filtres
        </button>
      </div>

      {/* Filter tags */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {Object.entries(statusColors).map(([status, config]) => (
              <button
                key={status}
                onClick={() => setFilterStatus(filterStatus === status ? null : status)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  filterStatus === status
                    ? `${config.bg} ${config.text} ring-2 ring-current`
                    : "bg-[#0a0f1a] text-gray-400 hover:text-white"
                }`}
              >
                {config.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Articles list */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#0a0f1a] border border-[#C9A542]/20 animate-pulse"
            >
              <div className="flex gap-4">
                <div className="w-32 h-24 bg-gray-700 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-20 bg-gray-700 rounded" />
                  <div className="h-6 w-3/4 bg-gray-700 rounded" />
                  <div className="h-4 w-1/2 bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          ))
        ) : filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 mb-4">Aucun article trouve</p>
            <Link href="/admin/news/new">
              <button className="text-[#C9A542] hover:underline">
                Creer votre premier article
              </button>
            </Link>
          </motion.div>
        ) : (
          filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative p-6 rounded-2xl bg-[#0a0f1a] border border-[#C9A542]/20 hover:border-[#C9A542]/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Thumbnail */}
                <div
                  className="w-full sm:w-32 h-24 rounded-lg flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${statusColors[article.status].text.replace("text-", "")}40 0%, #0a0f1a 100%)`,
                  }}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[article.status].bg} ${statusColors[article.status].text}`}
                    >
                      {statusColors[article.status].label}
                    </span>
                    <span className="text-xs text-gray-400">{article.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 truncate">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.created_at).toLocaleDateString("fr-FR")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.read_time} min de lecture
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setActiveMenu(activeMenu === article.id ? null : article.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  <AnimatePresence>
                    {activeMenu === article.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-48 rounded-lg overflow-hidden z-10"
                        style={{
                          backgroundColor: "#1a2035",
                          border: "1px solid rgba(201, 165, 66, 0.2)",
                        }}
                      >
                        <Link
                          href={`/admin/news/${article.id}`}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Modifier
                        </Link>
                        <Link
                          href={`/news/${article.id}`}
                          target="_blank"
                          className="flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          Apercu
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Workflow status bar */}
              <div className="mt-4 pt-4 border-t border-[#C9A542]/10">
                <div className="flex items-center gap-1">
                  {["draft", "review", "approved", "scheduled", "published"].map((status, i) => {
                    const statusIndex = ["draft", "review", "approved", "scheduled", "published"].indexOf(article.status)
                    const isActive = i <= statusIndex
                    return (
                      <div
                        key={status}
                        className={`flex-1 h-1 rounded-full transition-colors ${
                          isActive ? "bg-[#C9A542]" : "bg-gray-700"
                        }`}
                      />
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
