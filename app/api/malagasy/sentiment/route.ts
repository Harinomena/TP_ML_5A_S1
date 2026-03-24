import { NextRequest, NextResponse } from 'next/server'
import { analyzeSentiment, analyzeSentences, getSentimentSummary } from '@/lib/malagasy/sentiment'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, mode = 'simple' } = body

    if (!text) {
      return NextResponse.json(
        { error: 'Le texte est requis' },
        { status: 400 }
      )
    }

    if (mode === 'sentences') {
      // Analyser phrase par phrase
      const results = analyzeSentences(text)
      return NextResponse.json({ results })
    }

    if (mode === 'summary') {
      // Obtenir un résumé complet
      const summary = getSentimentSummary(text)
      return NextResponse.json(summary)
    }

    // Mode simple par défaut
    const result = analyzeSentiment(text)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Sentiment analysis error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse de sentiment' },
      { status: 500 }
    )
  }
}
