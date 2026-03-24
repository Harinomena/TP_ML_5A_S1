import { NextRequest, NextResponse } from 'next/server'
import { malagasyDictionary, lookupWord, fuzzySearch, type WordEntry } from '@/lib/malagasy/dictionary'

// Dictionnaire Francais -> Malagasy (inverse)
const frenchToMalagasy = new Map<string, WordEntry[]>()

// Construire l'index inverse
malagasyDictionary.forEach(entry => {
  if (entry.translation.fr) {
    // Splitter les traductions multiples (ex: "aller, marcher")
    const frenchWords = entry.translation.fr.split(/[,;]/).map(w => w.trim().toLowerCase())
    frenchWords.forEach(frWord => {
      if (!frenchToMalagasy.has(frWord)) {
        frenchToMalagasy.set(frWord, [])
      }
      frenchToMalagasy.get(frWord)!.push(entry)
    })
  }
})

// Fonction pour traduire du Francais vers le Malagasy
function translateFrenchToMalagasy(text: string): { translation: string; entries: WordEntry[] } {
  const words = text.toLowerCase().split(/\s+/)
  const translations: string[] = []
  const foundEntries: WordEntry[] = []
  
  for (const word of words) {
    const cleanWord = word.replace(/[.,!?;:'"()]/g, '')
    const entries = frenchToMalagasy.get(cleanWord)
    
    if (entries && entries.length > 0) {
      // Prendre le mot le plus frequent
      const bestEntry = entries.sort((a, b) => (b.frequency || 0) - (a.frequency || 0))[0]
      translations.push(bestEntry.word)
      foundEntries.push(bestEntry)
    } else {
      // Garder le mot original si pas de traduction
      translations.push(word)
    }
  }
  
  return {
    translation: translations.join(' '),
    entries: foundEntries
  }
}

// Fonction pour traduire du Malagasy vers le Francais
function translateMalagasyToFrench(text: string): { translation: string; entries: WordEntry[] } {
  const words = text.toLowerCase().split(/\s+/)
  const translations: string[] = []
  const foundEntries: WordEntry[] = []
  
  for (const word of words) {
    const cleanWord = word.replace(/[.,!?;:'"()]/g, '')
    const entry = lookupWord(cleanWord)
    
    if (entry && entry.translation.fr) {
      // Prendre la premiere traduction
      const firstTranslation = entry.translation.fr.split(/[,;]/)[0].trim()
      translations.push(firstTranslation)
      foundEntries.push(entry)
    } else {
      // Chercher dans les mots similaires
      const similar = fuzzySearch(cleanWord, 1)
      if (similar.length > 0 && similar[0].translation.fr) {
        const firstTranslation = similar[0].translation.fr.split(/[,;]/)[0].trim()
        translations.push(firstTranslation)
        foundEntries.push(similar[0])
      } else {
        translations.push(word)
      }
    }
  }
  
  return {
    translation: translations.join(' '),
    entries: foundEntries
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, word, from, to, targetLang } = body

    const sourceText = text || word
    if (!sourceText) {
      return NextResponse.json(
        { error: 'Le texte est requis' },
        { status: 400 }
      )
    }

    // Determiner la direction de traduction
    const sourceLang = from || 'mg'
    const destLang = to || targetLang || 'fr'

    // Si c'est un seul mot, retourner aussi les details du dictionnaire
    const isSingleWord = sourceText.trim().split(/\s+/).length === 1

    if (sourceLang === 'mg' && (destLang === 'fr' || destLang === 'en')) {
      // Malagasy -> Francais/Anglais
      if (isSingleWord) {
        const entry = lookupWord(sourceText.trim())
        if (entry) {
          return NextResponse.json({
            found: true,
            word: entry.word,
            translation: entry.translation[destLang as 'fr' | 'en'] || entry.translation.fr,
            result: entry.translation[destLang as 'fr' | 'en'] || entry.translation.fr,
            definition: entry.definition,
            partOfSpeech: entry.partOfSpeech,
            synonyms: entry.synonyms || [],
            antonyms: entry.antonyms || []
          })
        }
        
        // Recherche floue
        const suggestions = fuzzySearch(sourceText, 5)
        if (suggestions.length > 0) {
          return NextResponse.json({
            found: false,
            word: sourceText,
            translation: suggestions[0].translation[destLang as 'fr' | 'en'] || suggestions[0].translation.fr,
            result: suggestions[0].translation[destLang as 'fr' | 'en'] || suggestions[0].translation.fr,
            suggestions: suggestions.map(s => ({
              word: s.word,
              translation: s.translation[destLang as 'fr' | 'en'] || s.translation.fr
            }))
          })
        }
      }

      // Traduction de texte complet
      const { translation, entries } = translateMalagasyToFrench(sourceText)
      return NextResponse.json({
        found: entries.length > 0,
        translation,
        result: translation,
        wordsTranslated: entries.length,
        totalWords: sourceText.split(/\s+/).length
      })

    } else if (sourceLang === 'fr' && destLang === 'mg') {
      // Francais -> Malagasy
      if (isSingleWord) {
        const cleanWord = sourceText.trim().toLowerCase()
        const entries = frenchToMalagasy.get(cleanWord)
        
        if (entries && entries.length > 0) {
          const bestEntry = entries.sort((a, b) => (b.frequency || 0) - (a.frequency || 0))[0]
          return NextResponse.json({
            found: true,
            word: cleanWord,
            translation: bestEntry.word,
            result: bestEntry.word,
            definition: bestEntry.definition,
            partOfSpeech: bestEntry.partOfSpeech,
            alternatives: entries.slice(1, 5).map(e => e.word)
          })
        }
      }

      // Traduction de texte complet
      const { translation, entries } = translateFrenchToMalagasy(sourceText)
      return NextResponse.json({
        found: entries.length > 0,
        translation,
        result: translation,
        wordsTranslated: entries.length,
        totalWords: sourceText.split(/\s+/).length
      })
    }

    return NextResponse.json({
      found: false,
      translation: sourceText,
      result: sourceText,
      message: 'Direction de traduction non supportee'
    })

  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la traduction' },
      { status: 500 }
    )
  }
}
