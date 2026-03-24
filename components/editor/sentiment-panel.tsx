'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Spinner } from '@/components/ui/spinner'
import { Smile, Frown, Meh } from 'lucide-react'
import type { SentimentResult } from '@/hooks/use-malagasy-editor'

interface SentimentPanelProps {
  sentiment: SentimentResult | null
  isLoading: boolean
}

export function SentimentPanel({ sentiment, isLoading }: SentimentPanelProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Spinner className="h-4 w-4" />
            Fanadihadiana ny fihetseham-po...
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (!sentiment) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Meh className="h-4 w-4 text-muted-foreground" />
            Fanadihadiana fihetseham-po
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Manoratra lahatsoratra mba hanadihadiana ny fihetseham-po.
          </p>
        </CardContent>
      </Card>
    )
  }

  const getSentimentIcon = () => {
    switch (sentiment.sentiment) {
      case 'positive':
        return <Smile className="h-5 w-5 text-chart-1" />
      case 'negative':
        return <Frown className="h-5 w-5 text-destructive" />
      default:
        return <Meh className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getSentimentLabel = () => {
    switch (sentiment.sentiment) {
      case 'positive':
        return 'Tsara'
      case 'negative':
        return 'Ratsy'
      default:
        return 'Antonony'
    }
  }

  const getSentimentColor = () => {
    switch (sentiment.sentiment) {
      case 'positive':
        return 'bg-chart-1'
      case 'negative':
        return 'bg-destructive'
      default:
        return 'bg-muted-foreground'
    }
  }

  // Convert score from [-1, 1] to [0, 100]
  const progressValue = ((sentiment.score + 1) / 2) * 100

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span className="flex items-center gap-2">
            {getSentimentIcon()}
            Fihetseham-po
          </span>
          <Badge 
            variant={sentiment.sentiment === 'positive' ? 'default' : sentiment.sentiment === 'negative' ? 'destructive' : 'secondary'}
          >
            {getSentimentLabel()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Ratsy</span>
            <span>Antonony</span>
            <span>Tsara</span>
          </div>
          <div className="relative h-2 rounded-full bg-muted overflow-hidden">
            <div 
              className={`absolute h-full transition-all duration-500 ${getSentimentColor()}`}
              style={{ width: `${progressValue}%` }}
            />
            <div 
              className="absolute h-full w-0.5 bg-foreground/50"
              style={{ left: '50%' }}
            />
          </div>
          <div className="text-center text-xs text-muted-foreground">
            Score: {(sentiment.score * 100).toFixed(0)}%
          </div>
        </div>

        {/* Confidence */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Fahatokiana</span>
            <span>{(sentiment.confidence * 100).toFixed(0)}%</span>
          </div>
          <Progress value={sentiment.confidence * 100} className="h-1" />
        </div>

        {/* Positive words */}
        {sentiment.positiveWords.length > 0 && (
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Teny tsara hita:</span>
            <div className="flex flex-wrap gap-1">
              {sentiment.positiveWords.slice(0, 6).map((word) => (
                <Badge key={word} variant="outline" className="text-[10px] bg-chart-1/10">
                  {word}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Negative words */}
        {sentiment.negativeWords.length > 0 && (
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Teny ratsy hita:</span>
            <div className="flex flex-wrap gap-1">
              {sentiment.negativeWords.slice(0, 6).map((word) => (
                <Badge key={word} variant="outline" className="text-[10px] bg-destructive/10">
                  {word}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
