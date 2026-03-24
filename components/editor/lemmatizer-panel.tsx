"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { BookOpen, ArrowRight, Layers } from "lucide-react"

interface LemmaResult {
  original: string
  lemma: string
  root?: string
  prefixes: { prefix: string; type: string; description: string }[]
  suffixes: { suffix: string; type: string; description: string }[]
  confidence: number
  morphology: string
}

interface LemmatizerPanelProps {
  text: string
}

export function LemmatizerPanel({ text }: LemmatizerPanelProps) {
  const [results, setResults] = useState<LemmaResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastAnalyzed, setLastAnalyzed] = useState("")

  // Auto-analyze when text changes significantly
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (text && text !== lastAnalyzed && text.length > 2) {
        handleAnalyze()
      }
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [text])

  const handleAnalyze = async () => {
    if (!text.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/malagasy/lemmatize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      const data = await response.json()
      // Handle both single result and array of results
      if (data.results) {
        setResults(data.results)
      } else if (data.original) {
        // Single word result
        setResults([data])
      } else {
        setResults([])
      }
      setLastAnalyzed(text)
    } catch (error) {
      console.error("Lemmatization error:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Spinner className="h-4 w-4" />
            Fanadihadiana ny teny...
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            Lemmatisation & Morphologie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Mifidiana teny na lahatsoratra mba hanadihadiana ny fototeny sy ny endri-teny.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            (Selectionnez du texte pour analyser sa morphologie)
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          Vokatra ny fanadihadiana ({results.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[350px]">
          <div className="px-4 pb-4 space-y-3">
            {results.map((result, index) => (
              <div
                key={`${result.original}-${index}`}
                className="p-3 rounded-lg bg-muted/50 border border-border space-y-2"
              >
                {/* Word and Lemma */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{result.original}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="font-semibold text-primary">{result.lemma}</span>
                  {result.confidence < 1 && (
                    <Badge variant="outline" className="text-[10px]">
                      {Math.round(result.confidence * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Root */}
                {result.root && (
                  <div className="flex items-center gap-2 text-xs">
                    <Layers className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Fototeny:</span>
                    <Badge variant="secondary">{result.root}</Badge>
                  </div>
                )}

                {/* Morphological breakdown */}
                {(result.prefixes.length > 0 || result.suffixes.length > 0) && (
                  <div className="flex flex-wrap gap-1 text-xs">
                    {result.prefixes.map((p, i) => (
                      <Badge key={`pre-${i}`} variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/30">
                        {p.prefix}- ({p.type})
                      </Badge>
                    ))}
                    {result.root && (
                      <Badge variant="default" className="font-mono">
                        {result.root}
                      </Badge>
                    )}
                    {result.suffixes.map((s, i) => (
                      <Badge key={`suf-${i}`} variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/30">
                        -{s.suffix} ({s.type})
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Morphology description */}
                {result.morphology && (
                  <p className="text-xs text-muted-foreground italic">
                    {result.morphology}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
