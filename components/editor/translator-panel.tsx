"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Languages, ArrowRightLeft, Copy, Volume2, Loader2, Check } from "lucide-react"
import { useTextToSpeech } from "@/hooks/use-malagasy-editor"

interface TranslatorPanelProps {
  selectedText?: string
}

export function TranslatorPanel({ selectedText }: TranslatorPanelProps) {
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState<"mg" | "fr">("mg")
  const [targetLang, setTargetLang] = useState<"mg" | "fr">("fr")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const { speak, isSpeaking } = useTextToSpeech()

  // Update source text when selected text changes
  useEffect(() => {
    if (selectedText) {
      setSourceText(selectedText)
    }
  }, [selectedText])

  const handleTranslate = async () => {
    const textToTranslate = sourceText.trim()
    if (!textToTranslate) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/malagasy/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToTranslate,
          from: sourceLang,
          to: targetLang,
        }),
      })
      const data = await response.json()
      setTranslatedText(data.translation || data.result || "Tsy nahita dikany")
    } catch (error) {
      console.error("Translation error:", error)
      setTranslatedText("Nisy olana tamin'ny fandikana")
    } finally {
      setIsLoading(false)
    }
  }

  const swapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(translatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const speakText = (text: string) => {
    if (text.trim()) {
      speak(text)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Languages className="h-4 w-4 text-primary" />
          Mpandika teny (Traducteur)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Selection */}
        <div className="flex items-center justify-between gap-2">
          <Select value={sourceLang} onValueChange={(v: "mg" | "fr") => setSourceLang(v)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mg">Malagasy</SelectItem>
              <SelectItem value="fr">Frantsay</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" onClick={swapLanguages} className="shrink-0">
            <ArrowRightLeft className="h-4 w-4" />
          </Button>

          <Select value={targetLang} onValueChange={(v: "mg" | "fr") => setTargetLang(v)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mg">Malagasy</SelectItem>
              <SelectItem value="fr">Frantsay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Source Text */}
        <div className="space-y-2">
          <div className="relative">
            <Textarea
              placeholder={sourceLang === "mg" ? "Soraty eto ny teny malagasy..." : "Ecrivez ici en francais..."}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="min-h-[100px] pr-10 resize-none"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={() => speakText(sourceText)}
              disabled={isSpeaking || !sourceText.trim()}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>

          <Button 
            onClick={handleTranslate} 
            disabled={isLoading || !sourceText.trim()} 
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mandika teny...
              </>
            ) : (
              "Dikao (Traduire)"
            )}
          </Button>
        </div>

        {/* Translation Result */}
        {translatedText && (
          <div className="space-y-2">
            <div className="relative">
              <Textarea
                value={translatedText}
                readOnly
                className="min-h-[100px] bg-muted/50 pr-20 resize-none"
              />
              <div className="absolute right-1 top-1 flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => speakText(translatedText)}
                  disabled={isSpeaking}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-chart-1" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Quick phrases */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Fehezanteny mahazatra:</p>
          <div className="flex flex-wrap gap-1">
            {[
              { mg: "Manao ahoana", fr: "Bonjour" },
              { mg: "Misaotra", fr: "Merci" },
              { mg: "Veloma", fr: "Au revoir" },
              { mg: "Azafady", fr: "S'il vous plait" },
            ].map((phrase, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => {
                  setSourceText(sourceLang === "mg" ? phrase.mg : phrase.fr)
                }}
              >
                {sourceLang === "mg" ? phrase.mg : phrase.fr}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
