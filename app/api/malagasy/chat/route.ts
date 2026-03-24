import { NextRequest, NextResponse } from 'next/server'
import { lookupWord, fuzzySearch, getSuggestions } from '@/lib/malagasy/dictionary'
import { lemmatize, getDerivedForms } from '@/lib/malagasy/lemmatizer'
import { checkSpelling } from '@/lib/malagasy/spell-checker'

// Patterns de reconnaissance d'intention
const INTENT_PATTERNS = {
  translate: [
    /inona\s+(?:ny\s+)?(?:dikany|dikan['']?ny|dikan-teny)\s*(?:amin['']?ny\s+(?:frantsay|anglisy))?\s*(?:ny\s+teny\s+)?"?(.+?)"?$/i,
    /(?:traduction|traduire|translate)\s+(?:de\s+)?["']?(.+?)["']?$/i,
    /(?:what\s+(?:does|is))\s+["']?(.+?)["']?\s+(?:mean|in\s+(?:french|english))/i,
    /dikany\s+["']?(.+?)["']?/i
  ],
  synonym: [
    /(?:inona\s+)?(?:ny\s+)?(?:mitovy\s+dikany|synonyme|synonymes?)\s+(?:amin['']?ny|ny)?\s*["']?(.+?)["']?$/i,
    /(?:synonym(?:e)?s?\s+(?:of|for|de))\s+["']?(.+?)["']?$/i,
    /misy\s+teny\s+hafa\s+mitovy\s+dikany\s+amin['']?ny\s+["']?(.+?)["']?/i
  ],
  conjugate: [
    /(?:ahoana\s+no\s+)?(?:fiovan['']?ny\s+teny|conjugaison|conjuguer)\s+(?:ny\s+teny\s+)?["']?(.+?)["']?$/i,
    /(?:conjugate|conjugation\s+of)\s+["']?(.+?)["']?$/i,
    /inona\s+(?:avy\s+)?ny\s+endrik['']?ny\s+["']?(.+?)["']?/i
  ],
  lemma: [
    /(?:inona\s+)?(?:ny\s+)?(?:fototra|fotony|racine|root)\s+(?:n['']?ny\s+teny\s+)?["']?(.+?)["']?$/i,
    /(?:root|lemma)\s+(?:of|for)\s+["']?(.+?)["']?$/i,
    /avy\s+aiza\s+ny\s+teny\s+["']?(.+?)["']?/i
  ],
  spell: [
    /(?:marina\s+ve\s+ny\s+)?(?:tsipelina|orthographe|spelling)\s+(?:n['']?ny\s+)?["']?(.+?)["']?$/i,
    /(?:is)\s+["']?(.+?)["']?\s+(?:correct(?:ly)?\s+spelled|right)/i,
    /mety\s+ve\s+ny\s+fanoratana\s+["']?(.+?)["']?/i
  ],
  help: [
    /(?:inona\s+no\s+)?(?:afaka\s+ataonao|azonao\s+atao)/i,
    /(?:help|aide|fanampiana)/i,
    /(?:what\s+can\s+you\s+do)/i
  ],
  greeting: [
    /^(?:salama|manahoana|manao\s+ahoana|hi|hello|bonjour)/i,
    /^(?:akory|azafady)/i
  ]
}

// Fonction pour extraire le mot d'une requête
function extractWord(text: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match && match[1]) {
      return match[1].trim().replace(/["']/g, '')
    }
  }
  return null
}

// Fonction pour détecter l'intention
function detectIntent(text: string): { intent: string; word: string | null } {
  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    if (intent === 'greeting' || intent === 'help') {
      for (const pattern of patterns) {
        if (pattern.test(text)) {
          return { intent, word: null }
        }
      }
    } else {
      const word = extractWord(text, patterns)
      if (word) {
        return { intent, word }
      }
    }
  }
  
  // Intent par défaut: recherche de mot
  const words = text.split(/\s+/)
  const lastWord = words[words.length - 1].replace(/[.,!?;:'"()]/g, '')
  return { intent: 'lookup', word: lastWord }
}

// Générer une réponse basée sur l'intention
function generateResponse(intent: string, word: string | null): { message: string; data?: unknown } {
  switch (intent) {
    case 'greeting':
      return {
        message: 'Salama! Izaho dia mpanampy anao amin\'ny teny Malagasy. Afaka manampy anao aho amin\'ny:\n\n' +
          '- Dikany (traduction)\n' +
          '- Teny mitovy dikany (synonymes)\n' +
          '- Fiovan\'ny teny (conjugaison)\n' +
          '- Fototra ny teny (lemmatisation)\n' +
          '- Tsipelina (orthographe)\n\n' +
          'Anontanio fotsiny!'
      }
    
    case 'help':
      return {
        message: 'Afaka manampy anao aho amin\'ireto:\n\n' +
          '1. "Inona ny dikany ny teny [mot]?" - Hahazo ny dikany\n' +
          '2. "Misy teny mitovy dikany amin\'ny [mot]?" - Hahazo synonymes\n' +
          '3. "Inona ny fototra ny teny [mot]?" - Hahazo ny racine\n' +
          '4. "Marina ve ny tsipelina [mot]?" - Hanamarina ny orthographe\n' +
          '5. "Inona avy ny endrik\'ny [mot]?" - Hahazo ny formes dérivées\n\n' +
          'Azonao atao koa ny manoratra teny iray fotsiny, dia omeko ny mombamomba azy.'
      }
    
    case 'translate':
      if (!word) return { message: 'Azafady, omeo ny teny tianao hadika.' }
      const entry = lookupWord(word)
      if (entry) {
        return {
          message: `**${entry.word}**\n\n` +
            `Frantsay: ${entry.translation.fr}\n` +
            `Anglisy: ${entry.translation.en}\n\n` +
            `Famaritana: ${entry.definition}`,
          data: entry
        }
      }
      const suggestions = fuzzySearch(word, 3)
      if (suggestions.length > 0) {
        return {
          message: `Tsy hitako ny teny "${word}". Angamba tianao hilaza:\n\n` +
            suggestions.map(s => `- **${s.word}**: ${s.translation.fr}`).join('\n'),
          data: { suggestions }
        }
      }
      return { message: `Miala tsiny, tsy hitako ny teny "${word}" ao amin'ny diksionera.` }
    
    case 'synonym':
      if (!word) return { message: 'Azafady, omeo ny teny tianao hahitana synonymes.' }
      const synEntry = lookupWord(word)
      if (synEntry && synEntry.synonyms && synEntry.synonyms.length > 0) {
        return {
          message: `Teny mitovy dikany amin'ny "${synEntry.word}":\n\n` +
            synEntry.synonyms.map(s => `- ${s}`).join('\n'),
          data: { synonyms: synEntry.synonyms }
        }
      }
      return { message: `Tsy nahitako teny mitovy dikany amin'ny "${word}".` }
    
    case 'conjugate':
    case 'lemma':
      if (!word) return { message: 'Azafady, omeo ny teny tianao hanadihadiana.' }
      const lemmaResult = lemmatize(word)
      const forms = getDerivedForms(lemmaResult.root || word)
      return {
        message: `**Fanadihadiana ny teny "${word}"**\n\n` +
          `Fototra: ${lemmaResult.root || lemmaResult.lemma}\n` +
          `Morphologie: ${lemmaResult.morphology}\n\n` +
          (lemmaResult.prefixes.length > 0 
            ? `Préfixes: ${lemmaResult.prefixes.map(p => `${p.prefix} (${p.description})`).join(', ')}\n` 
            : '') +
          (lemmaResult.suffixes.length > 0 
            ? `Suffixes: ${lemmaResult.suffixes.map(s => `${s.suffix} (${s.description})`).join(', ')}\n` 
            : '') +
          `\n**Formes dérivées:**\n` +
          forms.slice(0, 5).map(f => `- ${f.form}: ${f.description}`).join('\n'),
        data: { lemma: lemmaResult, forms }
      }
    
    case 'spell':
      if (!word) return { message: 'Azafady, omeo ny teny tianao hojerena.' }
      const spellResult = checkSpelling(word)
      if (spellResult.isCorrect) {
        return { message: `Marina ny tsipelina "${word}".`, data: spellResult }
      }
      return {
        message: `Mety misy diso ny tsipelina "${word}".\n\n` +
          (spellResult.error ? `Olana: ${spellResult.error}\n\n` : '') +
          (spellResult.suggestions.length > 0 
            ? `Soso-kevitra:\n${spellResult.suggestions.map(s => `- ${s}`).join('\n')}`
            : ''),
        data: spellResult
      }
    
    case 'lookup':
    default:
      if (!word) return { message: 'Azafady, omeo ny teny tianao ho fantatra.' }
      const lookupEntry = lookupWord(word)
      if (lookupEntry) {
        return {
          message: `**${lookupEntry.word}** (${lookupEntry.partOfSpeech})\n\n` +
            `Famaritana: ${lookupEntry.definition}\n` +
            `Frantsay: ${lookupEntry.translation.fr}\n` +
            `Anglisy: ${lookupEntry.translation.en}` +
            (lookupEntry.synonyms ? `\n\nSynonymes: ${lookupEntry.synonyms.join(', ')}` : '') +
            (lookupEntry.antonyms ? `\nAntonymes: ${lookupEntry.antonyms.join(', ')}` : ''),
          data: lookupEntry
        }
      }
      const lookupSuggestions = fuzzySearch(word, 5)
      if (lookupSuggestions.length > 0) {
        return {
          message: `Tsy hitako ny teny "${word}". Ireto ny teny mifanitsy:\n\n` +
            lookupSuggestions.map(s => 
              `- **${s.word}**: ${s.translation.fr}`
            ).join('\n'),
          data: { suggestions: lookupSuggestions }
        }
      }
      return { message: `Miala tsiny, tsy hitako ny teny "${word}".` }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Le message est requis' },
        { status: 400 }
      )
    }

    const { intent, word } = detectIntent(message)
    const response = generateResponse(intent, word)

    return NextResponse.json({
      intent,
      word,
      ...response
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement du message' },
      { status: 500 }
    )
  }
}
