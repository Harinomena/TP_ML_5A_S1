"use client"

import { useState, useCallback, useRef, useEffect, useMemo } from "react"
import { TextEditor } from "@/components/editor/text-editor"
import { SpellCheckPanel } from "@/components/editor/spell-check-panel"
import { TranslatorPanel } from "@/components/editor/translator-panel"
import { LemmatizerPanel } from "@/components/editor/lemmatizer-panel"
import { SentimentPanel } from "@/components/editor/sentiment-panel"
import { EntitiesPanel } from "@/components/editor/entities-panel"
import { ChatbotPanel } from "@/components/editor/chatbot-panel"
import { useMalagasyEditor, useAutocomplete, useTextToSpeech } from "@/hooks/use-malagasy-editor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  SpellCheck, 
  Languages, 
  BookOpen, 
  Heart, 
  Tag, 
  Bot, 
  Volume2, 
  VolumeX,
  FileText,
  Download,
  Upload,
  Settings,
  Moon,
  Sun,
  Keyboard,
  BarChart3
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type PanelType = "spellcheck" | "translator" | "lemmatizer" | "sentiment" | "entities" | "chatbot"

export default function MalagasyEditorPage() {
  const [activePanel, setActivePanel] = useState<PanelType>("spellcheck")
  const [selectedWord, setSelectedWord] = useState("")
  const [ignoredWords, setIgnoredWords] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const {
    content,
    setContent,
    stats,
    spellingErrors,
    isSpellChecking,
    sentiment,
    isAnalyzingSentiment,
    entities,
    isDetectingEntities,
  } = useMalagasyEditor()

  const { speak, stop, isSpeaking } = useTextToSpeech()
  const { predictions } = useAutocomplete(content.slice(-50), content.length > 3)

  // Filter out ignored words
  const filteredErrors = spellingErrors.filter(e => !ignoredWords.has(e.word.toLowerCase()))

  // Handle text change
  const handleContentChange = useCallback((newContent: string, cursorPos?: number) => {
    setContent(newContent, cursorPos)
  }, [setContent])

  // Handle spell correction
  const handleCorrection = useCallback((original: string, suggestion: string) => {
    const newContent = content.replace(new RegExp(`\\b${original}\\b`, "gi"), suggestion)
    setContent(newContent)
  }, [content, setContent])

  // Handle ignore word
  const handleIgnore = useCallback((word: string) => {
    setIgnoredWords(prev => new Set([...prev, word.toLowerCase()]))
  }, [])

  // Handle word selection from editor
  const handleWordSelect = useCallback((word: string) => {
    setSelectedWord(word)
  }, [])

  // Handle export
  const handleExport = (format: "txt" | "html") => {
    const mimeType = format === "html" ? "text/html" : "text/plain"
    const exportContent = format === "html" 
      ? `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Document Malagasy</title></head><body><p>${content.replace(/\n/g, "</p><p>")}</p></body></html>`
      : content

    const blob = new Blob([exportContent], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `document-malagasy.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Handle import
  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const fileContent = event.target?.result as string
      // Strip HTML tags if HTML file
      const plainText = file.name.endsWith(".html") 
        ? fileContent.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
        : fileContent
      setContent(plainText)
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  // Handle TTS
  const handleSpeak = () => {
    if (isSpeaking) {
      stop()
    } else if (content.trim()) {
      speak(content)
    }
  }

  const panels = [
    { id: "spellcheck" as PanelType, icon: SpellCheck, label: "Correcteur", badge: filteredErrors.length || undefined },
    { id: "translator" as PanelType, icon: Languages, label: "Traducteur" },
    { id: "lemmatizer" as PanelType, icon: BookOpen, label: "Lemmatisation" },
    { id: "sentiment" as PanelType, icon: Heart, label: "Sentiment" },
    { id: "entities" as PanelType, icon: Tag, label: "Entites", badge: entities.length || undefined },
    { id: "chatbot" as PanelType, icon: Bot, label: "Assistant" },
  ]

  const renderPanel = () => {
    switch (activePanel) {
      case "spellcheck":
        return (
          <SpellCheckPanel
            errors={filteredErrors}
            isLoading={isSpellChecking}
            onSuggestionClick={handleCorrection}
            onIgnore={handleIgnore}
          />
        )
      case "translator":
        return <TranslatorPanel selectedText={selectedWord} />
      case "lemmatizer":
        return <LemmatizerPanel text={selectedWord || content} />
      case "sentiment":
        return <SentimentPanel sentiment={sentiment} isLoading={isAnalyzingSentiment} />
      case "entities":
        return <EntitiesPanel entities={entities} isLoading={isDetectingEntities} />
      case "chatbot":
        return <ChatbotPanel editorContext={content} />
      default:
        return null
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.html"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold tracking-tight">Editeur Malagasy</h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Editeur de texte augmente par l'IA
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Stats */}
              <div className="hidden md:flex items-center gap-2 mr-4">
                <Badge variant="secondary" className="font-mono">
                  {stats.wordCount} teny
                </Badge>
                <Badge variant="outline" className="font-mono">
                  {stats.charCount} litera
                </Badge>
              </div>

              {/* TTS Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSpeak}
                    disabled={!content.trim()}
                  >
                    {isSpeaking ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isSpeaking ? "Mamarana ny famakiana" : "Vakio ny lahatsoratra"}
                </TooltipContent>
              </Tooltip>

              {/* Import Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleImport}>
                    <Upload className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Hampiditra rakitra</TooltipContent>
              </Tooltip>

              {/* Export Dropdown */}
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Hamoaka rakitra</TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport("txt")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Texte (.txt)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("html")}>
                    <FileText className="h-4 w-4 mr-2" />
                    HTML (.html)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Hanova loko</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container px-4 py-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Editor Section */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Lahatsoratra</CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Keyboard className="h-3 w-3" />
                      <span className="hidden sm:inline">Soraty eto</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <TextEditor
                    content={content}
                    onChange={handleContentChange}
                    spellingErrors={filteredErrors}
                    entities={entities}
                    showSpellErrors={activePanel === "spellcheck"}
                    showEntities={activePanel === "entities"}
                    onWordSelect={handleWordSelect}
                    placeholder="Manomboka manoratra eto... (Commencez a ecrire ici...)"
                    className="border-0 rounded-none"
                  />
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Statistika:</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <span><strong>{stats.wordCount}</strong> teny</span>
                      <span><strong>{stats.charCount}</strong> litera</span>
                      <span><strong>{stats.sentenceCount}</strong> fehezanteny</span>
                      <span><strong>{stats.paragraphCount}</strong> paragrafy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Autocomplete Predictions */}
              {predictions.length > 0 && (
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">Soso-kevitra:</span>
                      {predictions.slice(0, 5).map((prediction, i) => (
                        <Button
                          key={i}
                          variant="secondary"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => {
                            // Add the prediction to content
                            const lastSpace = content.lastIndexOf(" ")
                            const newContent = content.slice(0, lastSpace + 1) + prediction + " "
                            setContent(newContent)
                          }}
                        >
                          {prediction}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Tools Panel */}
            <div className="space-y-4">
              {/* Panel Tabs */}
              <Tabs value={activePanel} onValueChange={(v) => setActivePanel(v as PanelType)}>
                <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto p-1">
                  {panels.map((panel) => {
                    const Icon = panel.icon
                    return (
                      <TabsTrigger
                        key={panel.id}
                        value={panel.id}
                        className="flex flex-col gap-1 py-2 px-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-[10px] leading-none hidden lg:block">{panel.label}</span>
                        {panel.badge && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                            {panel.badge > 9 ? "9+" : panel.badge}
                          </span>
                        )}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
              </Tabs>

              {/* Active Panel Content */}
              <div className="min-h-[400px]">
                {renderPanel()}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-4 mt-8">
          <div className="container px-4 text-center text-xs text-muted-foreground">
            <p>Editeur Malagasy - Editeur de texte augmente par l'IA pour la langue Malagasy</p>
            <p className="mt-1">TP Machine Learning - M2 S1</p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}
