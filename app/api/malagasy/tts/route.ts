import { NextRequest, NextResponse } from 'next/server'

// Règles de prononciation malagasy pour le TTS
const PRONUNCIATION_RULES: { pattern: RegExp; replacement: string }[] = [
  // Voyelles nasales
  { pattern: /ao/g, replacement: 'ou' },
  { pattern: /eo/g, replacement: 'éou' },
  { pattern: /ia/g, replacement: 'ya' },
  { pattern: /io/g, replacement: 'you' },
  
  // Consonnes spéciales
  { pattern: /tr/g, replacement: 'tch' },
  { pattern: /dr/g, replacement: 'dj' },
  { pattern: /ts/g, replacement: 'tss' },
  
  // 'j' se prononce comme en français
  { pattern: /j/g, replacement: 'dz' },
  
  // 'g' est toujours dur
  // 'h' est aspiré
  
  // Terminaisons
  { pattern: /tra$/g, replacement: 'tcha' },
  { pattern: /ana$/g, replacement: 'ana' }
]

// Convertir le texte malagasy en phonétique approximative
function toPhonetic(text: string): string {
  let result = text.toLowerCase()
  
  for (const rule of PRONUNCIATION_RULES) {
    result = result.replace(rule.pattern, rule.replacement)
  }
  
  return result
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, rate = 1.0, pitch = 1.0 } = body

    if (!text) {
      return NextResponse.json(
        { error: 'Le texte est requis' },
        { status: 400 }
      )
    }

    // Retourner les paramètres pour le TTS côté client
    // Le Web Speech API sera utilisé côté client
    const phonetic = toPhonetic(text)
    
    return NextResponse.json({
      text,
      phonetic,
      settings: {
        rate: Math.max(0.5, Math.min(2, rate)),
        pitch: Math.max(0.5, Math.min(2, pitch)),
        // Langues recommandées pour une prononciation approximative
        recommendedLangs: ['id-ID', 'ms-MY', 'fr-FR'] // Indonésien et Malais sont proches du Malagasy
      }
    })
  } catch (error) {
    console.error('TTS error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la synthèse vocale' },
      { status: 500 }
    )
  }
}
