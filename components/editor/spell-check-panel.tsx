'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import type { SpellCheckResult } from '@/hooks/use-malagasy-editor'

interface SpellCheckPanelProps {
  errors: SpellCheckResult[]
  isLoading: boolean
  onSuggestionClick?: (original: string, suggestion: string) => void
  onIgnore?: (word: string) => void
}

export function SpellCheckPanel({
  errors,
  isLoading,
  onSuggestionClick,
  onIgnore
}: SpellCheckPanelProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Spinner className="h-4 w-4" />
            Fanamarinam-pitenenana...
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (errors.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-chart-1" />
            Tsy misy fahadisoana hita
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Ny lahatsoratra dia tsy misy fahadisoana ara-tsipelina.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          Fahadisoana hita ({errors.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <div className="px-4 pb-4 space-y-3">
            {errors.map((error, index) => (
              <div
                key={`${error.word}-${index}`}
                className="p-3 rounded-lg bg-muted/50 border border-border"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-destructive truncate">
                        {error.word}
                      </span>
                      <Badge variant="outline" className="text-[10px] shrink-0">
                        {error.errorType === 'forbidden_combination' 
                          ? 'Fitsipika' 
                          : error.errorType === 'unknown' 
                            ? 'Tsy fantatra' 
                            : 'Diso'}
                      </Badge>
                    </div>
                    
                    {error.error && (
                      <p className="text-xs text-muted-foreground mb-2">
                        {error.error}
                      </p>
                    )}
                    
                    {error.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {error.suggestions.slice(0, 4).map((suggestion) => (
                          <Button
                            key={suggestion}
                            variant="secondary"
                            size="sm"
                            className="h-6 text-xs px-2"
                            onClick={() => onSuggestionClick?.(error.word, suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 shrink-0"
                    onClick={() => onIgnore?.(error.word)}
                    title="Hadinoina"
                  >
                    <XCircle className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
