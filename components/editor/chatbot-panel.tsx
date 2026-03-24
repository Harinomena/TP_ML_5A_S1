"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, User, Loader2, Sparkles, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useChatbot } from "@/hooks/use-malagasy-editor"

interface ChatbotPanelProps {
  editorContext?: string
}

export function ChatbotPanel({ editorContext }: ChatbotPanelProps) {
  const { messages, sendMessage, clearMessages, isLoading } = useChatbot()
  const [input, setInput] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const messageToSend = editorContext 
      ? `[Contexte: ${editorContext.slice(0, 200)}...]\n\n${input}`
      : input
    
    await sendMessage(messageToSend)
    setInput("")
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickPrompts = [
    "Inona ny dikan'ny...?",
    "Hazavao ny...",
    "Hamarino ny soratro",
    "Ohatra ampiasana ny...",
  ]

  return (
    <Card className="flex flex-col h-[450px]">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            Mpanampy AI (Assistant)
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={clearMessages}
            className="h-8 w-8"
            disabled={messages.length === 0}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3 overflow-hidden p-4 pt-0">
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="space-y-3 pr-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">
                  Salama! Afaka manampy anao amin'ny teny Malagasy aho.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  (Bonjour! Je peux vous aider avec la langue Malagasy.)
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-2",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 max-w-[85%] text-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Prompts */}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-1">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => setInput(prompt)}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {prompt}
              </Button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2 flex-shrink-0">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Anontanio eto... (Posez votre question...)"
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()} 
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
