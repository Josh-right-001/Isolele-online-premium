"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Lightbulb,
  HelpCircle,
  Wand2
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestions = [
  "Comment ajouter un nouveau personnage?",
  "Guide-moi pour creer un article",
  "Comment gerer les commandes?",
  "Aide-moi a configurer une promotion",
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bienvenue dans le Centre de Commandes Isolele! Je suis Ninki, votre assistant IA. Comment puis-je vous aider aujourd'hui?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("personnage")) {
      return "Pour ajouter un nouveau personnage:\n\n1. Allez dans le menu 'Personnages'\n2. Cliquez sur 'Nouveau Personnage'\n3. Remplissez les informations: nom, titre, biographie\n4. Ajoutez une image de profil\n5. Definissez les pouvoirs et caracteristiques\n6. Cliquez sur 'Enregistrer'\n\nVoulez-vous que je vous guide etape par etape?"
    }
    
    if (lowerMessage.includes("article") || lowerMessage.includes("publication")) {
      return "Pour creer un nouvel article:\n\n1. Allez dans 'Actualites BD'\n2. Cliquez sur 'Nouvel Article'\n3. Redigez votre contenu avec l'editeur\n4. Ajoutez des images et des tags\n5. Choisissez la categorie\n6. Definissez la date de publication\n7. Publiez ou planifiez!\n\nL'editeur supporte le formatage riche et les images."
    }
    
    if (lowerMessage.includes("commande")) {
      return "La gestion des commandes:\n\n- Nouvelles commandes: Onglet 'A traiter'\n- Commandes expediees: Onglet 'Expediees'\n- Historique: Onglet 'Terminees'\n\nVous pouvez changer le statut en faisant glisser une commande d'une colonne a l'autre. Les clients sont automatiquement notifies par email."
    }
    
    if (lowerMessage.includes("promotion") || lowerMessage.includes("promo")) {
      return "Pour creer une promotion:\n\n1. Allez dans 'Boutique' > 'Promotions'\n2. Cliquez sur 'Nouveau Code'\n3. Definissez le type: pourcentage ou montant fixe\n4. Ajoutez les conditions (minimum d'achat, produits eligibles)\n5. Definissez la periode de validite\n6. Generez le code promo\n\nVous pouvez voir l'apercu de la banniere en temps reel!"
    }
    
    if (lowerMessage.includes("aide") || lowerMessage.includes("help")) {
      return "Je peux vous aider avec:\n\n- Gestion du contenu (articles, personnages)\n- Configuration de la boutique\n- Analyse des statistiques\n- Parametres du site\n- Gestion des utilisateurs\n\nQue souhaitez-vous faire?"
    }
    
    if (lowerMessage.includes("statistique") || lowerMessage.includes("analytics")) {
      return "Vos statistiques sont disponibles sur le tableau de bord:\n\n- Visites en temps reel\n- Commandes du jour/semaine/mois\n- Revenus et tendances\n- Pages les plus vues\n- Taux de conversion\n\nCliquez sur un graphique pour voir les details!"
    }
    
    return "Je comprends votre question. Laissez-moi vous aider avec ca. Pouvez-vous me donner plus de details sur ce que vous souhaitez accomplir? Je suis la pour vous guider dans toutes les fonctionnalites du Centre de Commandes Isolele."
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(input)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ 
          background: "linear-gradient(135deg, #C9A542 0%, #8B7355 100%)",
          boxShadow: "0 0 30px rgba(201, 165, 66, 0.4)"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(201, 165, 66, 0.3)",
            "0 0 40px rgba(201, 165, 66, 0.5)",
            "0 0 20px rgba(201, 165, 66, 0.3)",
          ]
        }}
        transition={{ 
          boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY }
        }}
      >
        <Sparkles className="w-6 h-6 text-[#0F1524]" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(180deg, rgba(15, 21, 36, 0.98) 0%, rgba(26, 32, 53, 0.98) 100%)",
              border: "1px solid rgba(201, 165, 66, 0.2)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div 
              className="p-4 flex items-center justify-between"
              style={{ 
                background: "linear-gradient(90deg, rgba(201, 165, 66, 0.1) 0%, transparent 100%)",
                borderBottom: "1px solid rgba(201, 165, 66, 0.1)"
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(201, 165, 66, 0.2)" }}
                >
                  <Sparkles className="w-5 h-5 text-[#C9A542]" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Ninki</h3>
                  <p className="text-xs text-gray-400">Assistant IA Isolele</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ 
                      backgroundColor: message.role === "assistant" 
                        ? "rgba(201, 165, 66, 0.2)" 
                        : "rgba(100, 100, 255, 0.2)"
                    }}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="w-4 h-4 text-[#C9A542]" />
                    ) : (
                      <User className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div 
                    className={`p-3 rounded-xl max-w-[80%] ${
                      message.role === "user" 
                        ? "bg-blue-500/20 text-blue-100" 
                        : "bg-white/5 text-gray-200"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(201, 165, 66, 0.2)" }}
                  >
                    <Bot className="w-4 h-4 text-[#C9A542]" />
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#C9A542]"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ 
                            duration: 0.8, 
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2 
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" />
                  Suggestions
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(suggestion)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-300 hover:bg-[#C9A542]/20 hover:text-[#C9A542] transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 text-white text-sm placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#C9A542]/50"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 rounded-xl disabled:opacity-50 transition-colors"
                  style={{ backgroundColor: "#C9A542" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 text-[#0F1524] animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 text-[#0F1524]" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
