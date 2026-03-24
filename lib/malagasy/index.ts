// Index principal du moteur NLP Malagasy
// Exporte toutes les fonctionnalités

export * from './dictionary'
export * from './corpus'
export * from './spell-checker'
export * from './lemmatizer'
export * from './sentiment'
export * from './ner'

// Types pour l'éditeur
export interface EditorAnalysis {
  spellCheck: import('./spell-checker').SpellCheckResult[]
  sentiment: import('./sentiment').SentimentResult
  entities: import('./ner').Entity[]
  wordCount: number
  characterCount: number
  sentenceCount: number
}

// Fonction d'analyse complète du texte
export function analyzeDocument(text: string): EditorAnalysis {
  const { checkText } = require('./spell-checker')
  const { analyzeSentiment } = require('./sentiment')
  const { detectEntities } = require('./ner')
  
  return {
    spellCheck: checkText(text),
    sentiment: analyzeSentiment(text),
    entities: detectEntities(text),
    wordCount: text.split(/\s+/).filter(w => w.length > 0).length,
    characterCount: text.length,
    sentenceCount: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
  }
}
