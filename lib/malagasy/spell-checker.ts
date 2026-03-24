// Correcteur orthographique pour le Malagasy
// Utilise la distance de Levenshtein et les règles phonotactiques

import { malagasyDictionary, dictionaryIndex } from './dictionary'

// Combinaisons de lettres interdites en Malagasy
export const FORBIDDEN_COMBINATIONS = [
  'nb', 'mk', 'nk', 'dt', 'bp', 'sz', 'pf', 'td', 'kg', 'bv', 
  'pm', 'pb', 'db', 'dp', 'gb', 'gp', 'kb', 'kp',
  'mh', 'nh', 'ngk', 'ngg'
]

// Combinaisons interdites au début d'un mot
export const FORBIDDEN_START_COMBINATIONS = [
  'nb', 'mk', 'nk', 'ng', 'nd', 'mb', 'mp', 'ndr', 'nts', 'nj'
]

// Préfixes valides en Malagasy
export const VALID_PREFIXES = [
  'mi', 'ma', 'man', 'mam', 'maha', 'mpan', 'mpam', 'fi', 'fan', 'fam',
  'mpi', 'mpa', 'tafa', 'voa', 'aha', 'an', 'i', 'mp', 'f', 'm'
]

// Suffixes valides en Malagasy
export const VALID_SUFFIXES = [
  'ana', 'ina', 'na', 'tra', 'ka', 'ny', 'ko', 'nao', 'ny', 'nareo'
]

// Calculer la distance de Levenshtein entre deux mots
export function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length
  const n = s2.length
  
  // Créer la matrice
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))
  
  // Initialiser la première ligne et colonne
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  
  // Remplir la matrice
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // suppression
          dp[i][j - 1],     // insertion
          dp[i - 1][j - 1]  // substitution
        )
      }
    }
  }
  
  return dp[m][n]
}

// Vérifier si un mot contient des combinaisons interdites
export function hasForbiddenCombination(word: string): { valid: boolean; error?: string } {
  const lowerWord = word.toLowerCase()
  
  // Vérifier les combinaisons interdites au début
  for (const combo of FORBIDDEN_START_COMBINATIONS) {
    if (lowerWord.startsWith(combo) && !VALID_PREFIXES.some(p => lowerWord.startsWith(p))) {
      return { 
        valid: false, 
        error: `Le mot ne peut pas commencer par "${combo}" en Malagasy` 
      }
    }
  }
  
  // Vérifier les combinaisons interdites n'importe où
  for (const combo of FORBIDDEN_COMBINATIONS) {
    // Exclure si le combo fait partie d'un préfixe valide
    const isInPrefix = VALID_PREFIXES.some(p => p.includes(combo))
    if (!isInPrefix && lowerWord.includes(combo)) {
      return { 
        valid: false, 
        error: `La combinaison "${combo}" n'existe pas en Malagasy` 
      }
    }
  }
  
  return { valid: true }
}

// Vérifier si un mot est dans le dictionnaire
export function isValidWord(word: string): boolean {
  return dictionaryIndex.has(word.toLowerCase())
}

// Interface pour les résultats de vérification orthographique
export interface SpellCheckResult {
  word: string
  isCorrect: boolean
  suggestions: string[]
  error?: string
  errorType?: 'unknown' | 'forbidden_combination' | 'typo'
}

// Vérifier l'orthographe d'un mot
export function checkSpelling(word: string): SpellCheckResult {
  const cleanWord = word.toLowerCase().replace(/[.,!?;:'"()]/g, '')
  
  if (cleanWord.length === 0) {
    return { word, isCorrect: true, suggestions: [] }
  }
  
  // Vérifier si le mot est dans le dictionnaire
  if (isValidWord(cleanWord)) {
    return { word, isCorrect: true, suggestions: [] }
  }
  
  // Vérifier les combinaisons interdites
  const forbiddenCheck = hasForbiddenCombination(cleanWord)
  if (!forbiddenCheck.valid) {
    return {
      word,
      isCorrect: false,
      suggestions: getSuggestions(cleanWord),
      error: forbiddenCheck.error,
      errorType: 'forbidden_combination'
    }
  }
  
  // Le mot n'est pas dans le dictionnaire mais pas d'erreur phonotactique
  return {
    word,
    isCorrect: false,
    suggestions: getSuggestions(cleanWord),
    error: 'Mot inconnu',
    errorType: 'unknown'
  }
}

// Obtenir des suggestions de correction
export function getSuggestions(word: string, maxSuggestions: number = 5): string[] {
  const suggestions: { word: string; distance: number; frequency: number }[] = []
  
  for (const entry of malagasyDictionary) {
    const distance = levenshteinDistance(word.toLowerCase(), entry.word.toLowerCase())
    
    // Ne garder que les mots avec une distance raisonnable
    if (distance <= Math.max(2, Math.floor(word.length / 2))) {
      suggestions.push({
        word: entry.word,
        distance,
        frequency: entry.frequency || 1
      })
    }
  }
  
  // Trier par distance puis par fréquence
  return suggestions
    .sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance
      return b.frequency - a.frequency
    })
    .slice(0, maxSuggestions)
    .map(s => s.word)
}

// Vérifier un texte entier
export function checkText(text: string): SpellCheckResult[] {
  const words = text.split(/\s+/).filter(w => w.length > 0)
  return words.map(word => checkSpelling(word))
}

// Obtenir les statistiques d'erreur
export interface SpellCheckStats {
  totalWords: number
  correctWords: number
  incorrectWords: number
  errorRate: number
  errors: SpellCheckResult[]
}

export function analyzeText(text: string): SpellCheckStats {
  const results = checkText(text)
  const errors = results.filter(r => !r.isCorrect)
  
  return {
    totalWords: results.length,
    correctWords: results.length - errors.length,
    incorrectWords: errors.length,
    errorRate: errors.length / Math.max(results.length, 1),
    errors
  }
}
