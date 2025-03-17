"use client"

import type React from "react"

import { useState } from "react"
import { Bot, Send, Sparkles, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface AiAssistantProps {
  className?: string
  initialMessage?: string
}

export function AiAssistant({ className, initialMessage }: AiAssistantProps) {
  const [expanded, setExpanded] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      content:
        initialMessage ||
        "I've analyzed your calendar for today. You have 3 meetings scheduled. Would you like me to help you prepare for them or prioritize other tasks?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you prepare for your meetings. Would you like me to summarize the agenda items?",
        "Based on your calendar, I recommend focusing on the client meeting at 2:00 PM as it requires the most preparation.",
        "I've analyzed your goals progress. You're making good progress on the project proposal. Would you like me to suggest next steps?",
        "I notice you have overlapping priorities today. Would you like me to help you reorganize your schedule?",
        "Your meeting notes from yesterday contain action items that are due today. Would you like me to list them for you?",
      ]

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card
      className={cn(
        "border-white/10 bg-zinc-900/50 transition-all",
        expanded ? "fixed inset-4 z-50 flex flex-col md:inset-10" : "",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-start gap-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <div className="flex-1">
          <CardTitle>AI Assistant</CardTitle>
          <CardDescription className="text-zinc-400">Your personal AI agent is ready to help</CardDescription>
        </div>
        {expanded && (
          <Button variant="ghost" size="icon" onClick={() => setExpanded(false)} className="h-8 w-8">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </CardHeader>
      <CardContent className={cn(expanded ? "flex-1 overflow-auto" : "max-h-[200px] overflow-hidden")}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 rounded-lg p-3",
                message.role === "assistant" ? "bg-zinc-800/50" : "bg-primary/10",
              )}
            >
              {message.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm">{message.content}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-3 rounded-lg bg-zinc-800/50 p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      {expanded ? (
        <div className="border-t border-white/10 p-4">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="min-h-12 border-white/10 bg-zinc-800 resize-none"
            />
            <Button size="icon" onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      ) : (
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" className="border-white/10 bg-zinc-800 hover:bg-zinc-700">
            Maybe later
          </Button>
          <Button onClick={() => setExpanded(true)}>Assist me</Button>
        </CardFooter>
      )}
    </Card>
  )
}

