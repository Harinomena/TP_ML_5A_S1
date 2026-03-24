import { NextRequest, NextResponse } from 'next/server'
import { detectEntities, getEntitySummary } from '@/lib/malagasy/ner'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, mode = 'detect' } = body

    if (!text) {
      return NextResponse.json(
        { error: 'Le texte est requis' },
        { status: 400 }
      )
    }

    if (mode === 'summary') {
      // Obtenir un résumé des entités
      const summary = getEntitySummary(text)
      return NextResponse.json(summary)
    }

    // Mode detect par défaut
    const entities = detectEntities(text)
    return NextResponse.json({ entities })
  } catch (error) {
    console.error('NER error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la reconnaissance d\'entités' },
      { status: 500 }
    )
  }
}
