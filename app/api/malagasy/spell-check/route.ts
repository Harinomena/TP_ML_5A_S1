import { NextRequest, NextResponse } from 'next/server'
import { checkSpelling, checkText, analyzeText } from '@/lib/malagasy/spell-checker'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, mode = 'full' } = body

    if (!text) {
      return NextResponse.json(
        { error: 'Le texte est requis' },
        { status: 400 }
      )
    }

    if (mode === 'word') {
      const result = checkSpelling(text)
      return NextResponse.json(result)
    }

    if (mode === 'analyze') {
      const stats = analyzeText(text)
      return NextResponse.json(stats)
    }

    // Mode full par défaut
    const results = checkText(text)
    return NextResponse.json({ results })
  } catch (error) {
    console.error('Spell check error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification orthographique' },
      { status: 500 }
    )
  }
}
