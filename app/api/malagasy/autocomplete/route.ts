import { NextRequest, NextResponse } from 'next/server'
import { predictNextWord } from '@/lib/malagasy/corpus'
import { getSuggestions } from '@/lib/malagasy/dictionary'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, mode = 'nextWord', limit = 5 } = body

    if (!text) {
      return NextResponse.json(
        { error: 'Le texte est requis' },
        { status: 400 }
      )
    }

    if (mode === 'prefix') {
      // Autocomplétion basée sur le préfixe du mot actuel
      const words = text.split(/\s+/)
      const currentWord = words[words.length - 1] || ''
      const suggestions = getSuggestions(currentWord, limit)
      return NextResponse.json({
        suggestions: suggestions.map(s => s.word),
        mode: 'prefix'
      })
    }

    // Mode nextWord par défaut - prédiction du prochain mot
    const predictions = predictNextWord(text, limit)
    return NextResponse.json({
      predictions,
      mode: 'nextWord'
    })
  } catch (error) {
    console.error('Autocomplete error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'autocomplétion' },
      { status: 500 }
    )
  }
}
