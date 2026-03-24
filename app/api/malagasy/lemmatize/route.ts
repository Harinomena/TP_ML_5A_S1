import { NextRequest, NextResponse } from 'next/server'
import { lemmatize, analyzeText, getDerivedForms } from '@/lib/malagasy/lemmatizer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, mode = 'auto' } = body

    if (!text) {
      return NextResponse.json(
        { error: 'Le texte est requis' },
        { status: 400 }
      )
    }

    const trimmedText = text.trim()
    const wordCount = trimmedText.split(/\s+/).length

    // Auto-detect mode based on input
    const actualMode = mode === 'auto' 
      ? (wordCount > 1 ? 'text' : 'word')
      : mode

    if (actualMode === 'text') {
      // Analyser tout le texte
      const results = analyzeText(trimmedText)
      return NextResponse.json({ results })
    }

    if (actualMode === 'derived') {
      // Obtenir les formes derivees d'une racine
      const forms = getDerivedForms(trimmedText)
      return NextResponse.json({ root: trimmedText, forms })
    }

    // Mode word par defaut - lemmatiser un seul mot ou retourner les resultats pour chaque mot
    if (wordCount === 1) {
      const result = lemmatize(trimmedText)
      return NextResponse.json(result)
    } else {
      // Si plusieurs mots mais mode 'word', analyser comme texte
      const results = analyzeText(trimmedText)
      return NextResponse.json({ results })
    }
  } catch (error) {
    console.error('Lemmatize error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la lemmatisation' },
      { status: 500 }
    )
  }
}
