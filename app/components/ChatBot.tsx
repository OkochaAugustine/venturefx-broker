"use client"
import { useState } from "react"
import { MessageCircle, X } from "lucide-react"  // ✅ Lucide instead of react-icons

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { sender: "You", text: input }])
    setInput("")
    // simple bot auto-reply
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "Bot", text: "Thanks for your message! Our support team will get back to you soon." }])
    }, 1000)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition z-50"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col overflow-hidden z-50">
          <div className="bg-red-600 text-white p-3 font-semibold">Trader Support</div>
          <div className="flex-1 p-3 overflow-y-auto max-h-64 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "You" ? "bg-red-600 text-white ml-auto" : "bg-gray-200 text-gray-800"
                }`}
              >
                <strong>{msg.sender}:</strong> <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              type="text"
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="bg-red-600 text-white px-3 rounded-md hover:bg-red-700">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}

