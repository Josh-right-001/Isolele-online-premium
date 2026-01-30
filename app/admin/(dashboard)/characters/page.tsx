"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import {
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Edit,
  Eye,
  Trash2,
  Crown,
  Sword,
  Shield,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

interface Character {
  id: string
  name: string
  title: string
  role: "hero" | "antagonist" | "ally" | "neutral"
  kingdom: string
  description: string
  primary_color: string
  powers: string[]
  is_featured: boolean
  created_at: string
}

const roleConfig = {
  hero: { icon: Crown, color: "#C9A542", label: "Heros" },
  antagonist: { icon: Sword, color: "#FF4444", label: "Antagoniste" },
  ally: { icon: Shield, color: "#4CAF50", label: "Allie" },
  neutral: { icon: Sparkles, color: "#9E9E9E", label: "Neutre" },
}

export default function CharactersManagementPage() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState<string | null>(null)
  const [filterKingdom, setFilterKingdom] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  
  const supabase = createClient()

  useEffect(() => {
    fetchCharacters()
  }, [])

  const fetchCharacters = async () => {
    const { data, error } = await supabase
      .from("characters")
      .select("*")
      .order("name")

    if (!error && data) {
      setCharacters(data)
    }
    setIsLoading(false)
  }

  const kingdoms = [...new Set(characters.map((c) => c.kingdom))].filter(Boolean)

  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = 
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = !filterRole || character.role === filterRole
    const matchesKingdom = !filterKingdom || character.kingdom === filterKingdom
    return matchesSearch && matchesRole && matchesKingdom
  })

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("characters").delete().eq("id", id)
    if (!error) {
      setCharacters(characters.filter((c) => c.id !== id))
      setSelectedCharacter(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Le Pantheon Numerique</h1>
          <p className="text-gray-400">Gerez les personnages de l'Univers Isolele</p>
        </div>
        <Link href="/admin/characters/new">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-[#0F1524] bg-[#C9A542]"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(201, 165, 66, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Nouveau personnage
          </motion.button>
        </Link>
      </div>

      {/* Search, Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un personnage..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0a0f1a] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors"
          />
        </div>
        <div className="flex gap-2">
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
          <div className="flex rounded-lg overflow-hidden border border-[#C9A542]/20">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 transition-colors ${
                viewMode === "grid"
                  ? "bg-[#C9A542]/20 text-[#C9A542]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 transition-colors ${
                viewMode === "list"
                  ? "bg-[#C9A542]/20 text-[#C9A542]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div>
              <p className="text-sm text-gray-400 mb-2">Role</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(roleConfig).map(([role, config]) => (
                  <button
                    key={role}
                    onClick={() => setFilterRole(filterRole === role ? null : role)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                      filterRole === role
                        ? "ring-2 ring-current"
                        : "bg-[#0a0f1a] hover:bg-white/5"
                    }`}
                    style={{ 
                      color: filterRole === role ? config.color : "#9CA3AF",
                      backgroundColor: filterRole === role ? `${config.color}20` : undefined
                    }}
                  >
                    <config.icon className="w-4 h-4" />
                    {config.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Royaume</p>
              <div className="flex flex-wrap gap-2">
                {kingdoms.map((kingdom) => (
                  <button
                    key={kingdom}
                    onClick={() => setFilterKingdom(filterKingdom === kingdom ? null : kingdom)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      filterKingdom === kingdom
                        ? "bg-[#C9A542]/20 text-[#C9A542] ring-2 ring-[#C9A542]"
                        : "bg-[#0a0f1a] text-gray-400 hover:text-white"
                    }`}
                  >
                    {kingdom}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Characters Grid/List */}
      {isLoading ? (
        <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : ""}`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`bg-[#0a0f1a] border border-[#C9A542]/20 rounded-2xl animate-pulse ${
                viewMode === "grid" ? "aspect-[3/4]" : "h-24"
              }`}
            />
          ))}
        </div>
      ) : filteredCharacters.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 mb-4">Aucun personnage trouve</p>
          <Link href="/admin/characters/new">
            <button className="text-[#C9A542] hover:underline">
              Creer votre premier personnage
            </button>
          </Link>
        </motion.div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCharacters.map((character, index) => {
            const RoleIcon = roleConfig[character.role]?.icon || Crown
            return (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  backgroundColor: "#0a0f1a",
                  border: "1px solid rgba(201, 165, 66, 0.2)",
                }}
                onClick={() => setSelectedCharacter(character)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Character image/placeholder */}
                <div
                  className="aspect-[3/4] relative"
                  style={{
                    background: `linear-gradient(135deg, ${character.primary_color || "#C9A542"}40 0%, #0a0f1a 100%)`,
                  }}
                >
                  {/* Large initial */}
                  <span
                    className="absolute inset-0 flex items-center justify-center text-8xl font-black opacity-20"
                    style={{ color: character.primary_color || "#C9A542" }}
                  >
                    {character.name[0]}
                  </span>

                  {/* Featured badge */}
                  {character.is_featured && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#C9A542] text-[#0F1524] text-xs font-bold">
                      Vedette
                    </div>
                  )}

                  {/* Role badge */}
                  <div
                    className="absolute top-3 right-3 p-2 rounded-full"
                    style={{ backgroundColor: `${roleConfig[character.role]?.color}20` }}
                  >
                    <RoleIcon
                      className="w-4 h-4"
                      style={{ color: roleConfig[character.role]?.color }}
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-2">
                      <Link href={`/admin/characters/${character.id}`} onClick={(e) => e.stopPropagation()}>
                        <motion.button
                          className="p-2 rounded-lg bg-[#C9A542] text-[#0F1524]"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                      </Link>
                      <Link href={`/characters/${character.id}`} target="_blank" onClick={(e) => e.stopPropagation()}>
                        <motion.button
                          className="p-2 rounded-lg bg-white/10 text-white"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Character info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white truncate">{character.name}</h3>
                  <p className="text-sm text-gray-400 truncate">{character.title}</p>
                  {character.kingdom && (
                    <p className="text-xs text-[#C9A542] mt-1">{character.kingdom}</p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredCharacters.map((character, index) => {
            const RoleIcon = roleConfig[character.role]?.icon || Crown
            return (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#0a0f1a] border border-[#C9A542]/20 hover:border-[#C9A542]/40 transition-all cursor-pointer"
                onClick={() => setSelectedCharacter(character)}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${character.primary_color || "#C9A542"}40 0%, #0a0f1a 100%)`,
                    color: character.primary_color || "#C9A542",
                  }}
                >
                  {character.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white">{character.name}</h3>
                    {character.is_featured && (
                      <span className="px-2 py-0.5 rounded-full bg-[#C9A542]/20 text-[#C9A542] text-xs">
                        Vedette
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{character.title}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center gap-2 px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${roleConfig[character.role]?.color}20` }}
                  >
                    <RoleIcon
                      className="w-4 h-4"
                      style={{ color: roleConfig[character.role]?.color }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: roleConfig[character.role]?.color }}
                    >
                      {roleConfig[character.role]?.label}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Link href={`/admin/characters/${character.id}`} onClick={(e) => e.stopPropagation()}>
                      <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(character.id)
                      }}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Character Detail Panel */}
      <AnimatePresence>
        {selectedCharacter && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setSelectedCharacter(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl z-50"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.3)",
              }}
            >
              <div
                className="h-48 relative"
                style={{
                  background: `linear-gradient(135deg, ${selectedCharacter.primary_color || "#C9A542"}60 0%, #0a0f1a 100%)`,
                }}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-[150px] font-black opacity-20"
                  style={{ color: selectedCharacter.primary_color || "#C9A542" }}
                >
                  {selectedCharacter.name[0]}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCharacter.name}</h2>
                    <p className="text-[#C9A542]">{selectedCharacter.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/characters/${selectedCharacter.id}`}>
                      <button className="px-4 py-2 rounded-lg bg-[#C9A542] text-[#0F1524] font-medium">
                        Modifier
                      </button>
                    </Link>
                    <button
                      onClick={() => setSelectedCharacter(null)}
                      className="px-4 py-2 rounded-lg border border-[#C9A542]/30 text-white"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
                <p className="text-gray-400">{selectedCharacter.description}</p>
                {selectedCharacter.powers && selectedCharacter.powers.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Pouvoirs</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCharacter.powers.map((power) => (
                        <span
                          key={power}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: `${selectedCharacter.primary_color || "#C9A542"}20`,
                            color: selectedCharacter.primary_color || "#C9A542",
                          }}
                        >
                          {power}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
