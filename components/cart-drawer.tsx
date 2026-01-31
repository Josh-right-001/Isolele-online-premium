"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, Trash2, CreditCard, ShoppingBag, Check, Loader2 } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, shipping, total, isCartOpen, setIsCartOpen, clearCart } = useCart()
  const { t } = useLanguage()
  const [showPayment, setShowPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "google" | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    email: "",
  })

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setPaymentSuccess(true)
    // Clear cart after successful payment
    setTimeout(() => {
      clearCart()
      setPaymentSuccess(false)
      setShowPayment(false)
      setPaymentMethod(null)
      setIsCartOpen(false)
    }, 5000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col shadow-2xl"
            style={{ backgroundColor: "var(--isolele-bg, #FFFFFF)" }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between border-b p-4"
              style={{ borderColor: "rgba(var(--isolele-accent), 0.2)" }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag style={{ color: "var(--isolele-accent, #B8860B)" }} className="h-6 w-6" />
                <h2 
                  className="text-xl font-bold"
                  style={{ color: "var(--isolele-text, #1A1A1A)" }}
                >
                  {t("cart_title")}
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-2 transition-colors hover:bg-black/10"
              >
                <X className="h-5 w-5" style={{ color: "var(--isolele-text, #1A1A1A)" }} />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center p-8">
                  <ShoppingBag 
                    className="mb-4 h-16 w-16 opacity-30"
                    style={{ color: "var(--isolele-text-secondary, #4A4A4A)" }}
                  />
                  <p 
                    className="text-center"
                    style={{ color: "var(--isolele-text-secondary, #4A4A4A)" }}
                  >
                    {t("cart_empty")}
                  </p>
                </div>
              ) : (
                <div className="p-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-4 flex gap-4 rounded-lg p-3"
                      style={{ 
                        backgroundColor: "var(--isolele-bg-secondary, #F8F6F0)",
                        borderBottom: index < items.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none"
                      }}
                    >
                      {/* Product Image */}
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 
                            className="font-semibold text-sm"
                            style={{ color: "var(--isolele-text, #1A1A1A)" }}
                          >
                            {item.name}
                          </h3>
                          <p 
                            className="text-xs line-clamp-2 mt-1"
                            style={{ color: "var(--isolele-text-secondary, #4A4A4A)" }}
                          >
                            {item.description}
                          </p>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="rounded-full p-1 transition-colors hover:bg-black/10"
                              style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span 
                              className="w-6 text-center text-sm font-medium"
                              style={{ color: "var(--isolele-text, #1A1A1A)" }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="rounded-full p-1 transition-colors hover:bg-black/10"
                              style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="rounded-full p-1 text-red-500 transition-colors hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex flex-col items-end justify-between">
                        <span 
                          className="font-bold"
                          style={{ color: "var(--isolele-accent, #B8860B)" }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ${(item.originalPrice * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Totals */}
            {items.length > 0 && (
              <div 
                className="border-t p-4"
                style={{ 
                  borderColor: "rgba(var(--isolele-accent), 0.2)",
                  backgroundColor: "var(--isolele-bg-secondary, #F8F6F0)"
                }}
              >
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--isolele-text-secondary, #4A4A4A)" }}>
                      {t("cart_subtotal")}
                    </span>
                    <span style={{ color: "var(--isolele-text, #1A1A1A)" }}>
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--isolele-text-secondary, #4A4A4A)" }}>
                      {t("cart_shipping")}
                    </span>
                    <span style={{ color: "var(--isolele-text, #1A1A1A)" }}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div 
                    className="flex justify-between pt-2 text-lg font-bold"
                    style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
                  >
                    <span style={{ color: "var(--isolele-text, #1A1A1A)" }}>
                      {t("cart_total")}
                    </span>
                    <span style={{ color: "var(--isolele-accent, #B8860B)" }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowPayment(true)}
                  className="w-full py-6 text-lg font-bold"
                  style={{ 
                    backgroundColor: "var(--isolele-accent, #B8860B)",
                    color: "white"
                  }}
                >
                  {t("cart_checkout")}
                </Button>
              </div>
            )}
          </motion.div>

          {/* Payment Modal */}
          <AnimatePresence>
            {showPayment && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-full max-w-lg overflow-hidden rounded-2xl"
                  style={{ 
                    backgroundColor: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(184,134,11,0.2)"
                  }}
                >
                  {paymentSuccess ? (
                    /* Success State */
                    <div className="p-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                        style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
                      >
                        <Check className="h-10 w-10 text-green-500" />
                      </motion.div>
                      <h3 className="mb-2 text-2xl font-bold text-gray-900">
                        {t("payment_success")}
                      </h3>
                      <p className="mb-6 text-gray-600">
                        {t("payment_receipt_sent")}
                      </p>
                      
                      {/* Receipt Preview */}
                      <div 
                        className="mx-auto max-w-xs rounded-lg border bg-white p-4 text-left font-mono text-xs"
                        style={{ borderStyle: "dashed" }}
                      >
                        <div className="mb-2 text-center">
                          <Image 
                            src="/images/isolele-logo.png" 
                            alt="Isolele" 
                            width={60} 
                            height={30}
                            className="mx-auto mb-2"
                          />
                          <p className="font-bold">ISOLELE COMICS</p>
                          <p className="text-gray-500">www.isolele.com</p>
                        </div>
                        <div className="my-2 border-t border-dashed" />
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between py-1">
                            <span className="truncate">{item.name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="my-2 border-t border-dashed" />
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="mt-2 flex justify-between font-bold">
                          <span>TOTAL</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="mt-4 text-center text-gray-500">
                          <p>Thank you for your purchase!</p>
                          <p>The legend continues...</p>
                        </div>
                      </div>
                    </div>
                  ) : paymentMethod === "card" ? (
                    /* Card Payment Form */
                    <div className="p-6">
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">{t("payment_card")}</h3>
                        <button
                          onClick={() => setPaymentMethod(null)}
                          className="rounded-full p-2 hover:bg-gray-100"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            {t("payment_card_number")}
                          </label>
                          <Input
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              {t("payment_expiry")}
                            </label>
                            <Input
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                              placeholder="MM/YY"
                              maxLength={5}
                              className="bg-white"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              {t("payment_cvv")}
                            </label>
                            <Input
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                              placeholder="123"
                              maxLength={4}
                              type="password"
                              className="bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            {t("payment_name")}
                          </label>
                          <Input
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            placeholder="John Doe"
                            className="bg-white"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            {t("payment_email")}
                          </label>
                          <Input
                            value={cardDetails.email}
                            onChange={(e) => setCardDetails({ ...cardDetails, email: e.target.value })}
                            placeholder="john@example.com"
                            type="email"
                            className="bg-white"
                          />
                        </div>

                        <div 
                          className="rounded-lg p-4 text-center"
                          style={{ backgroundColor: "rgba(184,134,11,0.1)" }}
                        >
                          <p className="text-sm text-gray-600 mb-1">
                            Your adventure awaits. Complete your order to join the legend.
                          </p>
                          <p className="text-2xl font-bold" style={{ color: "var(--isolele-accent, #B8860B)" }}>
                            ${total.toFixed(2)}
                          </p>
                        </div>

                        <Button
                          onClick={handlePayment}
                          disabled={isProcessing || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name || !cardDetails.email}
                          className="w-full py-6 text-lg font-bold"
                          style={{ 
                            backgroundColor: "var(--isolele-accent, #B8860B)",
                            color: "white"
                          }}
                        >
                          {isProcessing ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-5 w-5 animate-spin" />
                              <span>Processing...</span>
                            </div>
                          ) : (
                            t("payment_confirm")
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Payment Method Selection */
                    <div className="p-6">
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">{t("payment_title")}</h3>
                        <button
                          onClick={() => setShowPayment(false)}
                          className="rounded-full p-2 hover:bg-gray-100"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <button
                          onClick={() => setPaymentMethod("google")}
                          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-gray-400"
                        >
                          <svg viewBox="0 0 24 24" className="h-6 w-6">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span className="font-medium">Google Pay</span>
                        </button>

                        <button
                          onClick={() => setPaymentMethod("card")}
                          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-gray-400"
                        >
                          <CreditCard className="h-6 w-6 text-gray-600" />
                          <span className="font-medium">{t("payment_card")}</span>
                        </button>

                        <div 
                          className="rounded-lg p-4 text-center"
                          style={{ backgroundColor: "rgba(184,134,11,0.1)" }}
                        >
                          <p className="text-2xl font-bold" style={{ color: "var(--isolele-accent, #B8860B)" }}>
                            ${total.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">Total to pay</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
