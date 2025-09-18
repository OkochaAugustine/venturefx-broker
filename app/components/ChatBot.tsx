"use client"
import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { sender: "You", text: input }])
    setInput("")
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: "Bot", text: "Thanks for your message! Our support team will get back to you soon." }
      ])
    }, 1000)
  }

  return (
    <div className="fixed bottom-0 right-0 z-50">
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Fullscreen Chat Window */}
      {open && (
        <div className="fixed inset-0 bg-white flex flex-col shadow-xl">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 flex justify-between items-center">
            <h2 className="font-semibold text-lg">Trader Support</h2>
            <button onClick={() => setOpen(false)}>
              <X size={28} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-[75%] ${
                  msg.sender === "You"
                    ? "ml-auto bg-red-600 text-white"
                    : "mr-auto bg-gray-300 text-gray-900"
                }`}
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t flex gap-2 bg-white">
            <input
              type="text"
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-red-600 text-white px-4 rounded-md hover:bg-red-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


