// Lemmatiseur pour le Malagasy (Fandrasan-teny)
// Permet de retrouver la racine d'un mot

import { dictionaryIndex, lookupWord } from './dictionary'

// Préfixes malagasy avec leur signification
export const PREFIXES = [
  { prefix: 'maha', type: 'causatif', description: 'Rend capable de' },
  { prefix: 'mam', type: 'actif', description: 'Action avec m → p' },
  { prefix: 'man', type: 'actif', description: 'Action avec n → t/d' },
  { prefix: 'mi', type: 'actif', description: 'Action simple' },
  { prefix: 'ma', type: 'adjectif', description: 'État ou qualité' },
  { prefix: 'mpan', type: 'agent', description: 'Celui qui fait (n → t/d)' },
  { prefix: 'mpam', type: 'agent', description: 'Celui qui fait (m → p)' },
  { prefix: 'mpi', type: 'agent', description: 'Celui qui fait' },
  { prefix: 'mp', type: 'agent', description: 'Celui qui fait' },
  { prefix: 'fan', type: 'instrument', description: 'Outil pour (n → t/d)' },
  { prefix: 'fam', type: 'instrument', description: 'Outil pour (m → p)' },
  { prefix: 'fi', type: 'instrument/abstrait', description: 'Action ou manière' },
  { prefix: 'f', type: 'instrument', description: 'Outil ou manière' },
  { prefix: 'tafa', type: 'passif-accidentel', description: 'État résultant involontaire' },
  { prefix: 'voa', type: 'passif-résultatif', description: 'État résultant' },
  { prefix: 'aha', type: 'circonstanciel', description: 'Lieu ou temps' },
  { prefix: 'an', type: 'locatif', description: 'Dans, à' },
  { prefix: 'i', type: 'article', description: 'Article défini' }
]

// Suffixes malagasy avec leur signification
export const SUFFIXES = [
  { suffix: 'ana', type: 'nominalisation', description: 'Action de' },
  { suffix: 'ina', type: 'passif', description: 'Être fait' },
  { suffix: 'na', type: 'passif/nominalisation', description: 'Être fait / action' },
  { suffix: 'tra', type: 'passif', description: 'État résultant' },
  { suffix: 'ka', type: 'passif', description: 'État résultant' },
  { suffix: 'ny', type: 'possessif', description: 'Son/sa (3e personne)' },
  { suffix: 'ko', type: 'possessif', description: 'Mon/ma (1e personne)' },
  { suffix: 'nao', type: 'possessif', description: 'Ton/ta (2e personne)' },
  { suffix: 'nareo', type: 'possessif', description: 'Votre (2e personne pluriel)' },
  { suffix: 'ntsika', type: 'possessif', description: 'Notre (inclusif)' },
  { suffix: 'nay', type: 'possessif', description: 'Notre (exclusif)' }
]

// Règles de modification pour retrouver la racine
const CONSONANT_CHANGES = [
  { from: 'm', to: 'p' }, // mampianatra → ampianatra → anatra
  { from: 'n', to: 't' }, // mandeha → andeha → deha
  { from: 'n', to: 'd' },
  { from: 'mp', to: 'p' },
  { from: 'nt', to: 't' },
  { from: 'nd', to: 'd' },
  { from: 'nk', to: 'k' },
  { from: 'ng', to: 'g' }
]

export interface LemmaResult {
  original: string
  lemma: string
  root?: string
  prefixes: { prefix: string; type: string; description: string }[]
  suffixes: { suffix: string; type: string; description: string }[]
  confidence: number
  morphology: string
}

// Fonction principale de lemmatisation
export function lemmatize(word: string): LemmaResult {
  const original = word.toLowerCase()
  let current = original
  const foundPrefixes: LemmaResult['prefixes'] = []
  const foundSuffixes: LemmaResult['suffixes'] = []
  
  // Vérifier si le mot existe tel quel dans le dictionnaire
  const directEntry = lookupWord(current)
  if (directEntry && directEntry.root) {
    return {
      original,
      lemma: directEntry.word,
      root: directEntry.root,
      prefixes: [],
      suffixes: [],
      confidence: 1.0,
      morphology: `Mot de base, racine: ${directEntry.root}`
    }
  }
  
  // Retirer les suffixes d'abord
  for (const { suffix, type, description } of SUFFIXES) {
    if (current.endsWith(suffix) && current.length > suffix.length + 2) {
      const withoutSuffix = current.slice(0, -suffix.length)
      // Vérifier si le résultat existe ou continue à être analysable
      if (withoutSuffix.length >= 2) {
        foundSuffixes.unshift({ suffix, type, description })
        current = withoutSuffix
      }
    }
  }
  
  // Retirer les préfixes
  for (const { prefix, type, description } of PREFIXES) {
    if (current.startsWith(prefix) && current.length > prefix.length + 1) {
      const withoutPrefix = current.slice(prefix.length)
      // Appliquer les changements de consonnes si nécessaire
      let modifiedRoot = withoutPrefix
      for (const { from, to } of CONSONANT_CHANGES) {
        if (withoutPrefix.startsWith(from)) {
          modifiedRoot = to + withoutPrefix.slice(from.length)
          break
        }
      }
      
      // Vérifier si le résultat existe dans le dictionnaire
      if (dictionaryIndex.has(modifiedRoot) || modifiedRoot.length >= 2) {
        foundPrefixes.push({ prefix, type, description })
        current = modifiedRoot
        break // Un seul préfixe principal généralement
      }
    }
  }
  
  // Rechercher la racine dans le dictionnaire
  const entry = lookupWord(current)
  const root = entry?.root || current
  
  // Calculer la confiance
  const confidence = entry ? 0.9 : (foundPrefixes.length + foundSuffixes.length > 0 ? 0.6 : 0.3)
  
  // Construire la description morphologique
  const morphParts: string[] = []
  if (foundPrefixes.length > 0) {
    morphParts.push(`Préfixe(s): ${foundPrefixes.map(p => p.prefix).join(' + ')}`)
  }
  morphParts.push(`Racine: ${root}`)
  if (foundSuffixes.length > 0) {
    morphParts.push(`Suffixe(s): ${foundSuffixes.map(s => s.suffix).join(' + ')}`)
  }
  
  return {
    original,
    lemma: current,
    root,
    prefixes: foundPrefixes,
    suffixes: foundSuffixes,
    confidence,
    morphology: morphParts.join(' | ')
  }
}

// Analyser un texte complet
export function analyzeText(text: string): LemmaResult[] {
  const words = text
    .toLowerCase()
    .replace(/[.,!?;:'"()]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 0)
  
  return words.map(word => lemmatize(word))
}

// Obtenir toutes les formes dérivées d'une racine
export function getDerivedForms(root: string): { form: string; description: string }[] {
  const forms: { form: string; description: string }[] = []
  
  // Générer les formes avec préfixes
  for (const { prefix, type, description } of PREFIXES.slice(0, 6)) {
    let form = prefix + root
    
    // Appliquer les changements de consonnes
    if (prefix === 'man' && root.startsWith('t')) {
      form = 'man' + root.slice(1)
    } else if (prefix === 'mam' && root.startsWith('p')) {
      form = 'mam' + root.slice(1)
    }
    
    forms.push({
      form,
      description: `${type}: ${description}`
    })
  }
  
  // Générer les formes avec suffixes
  for (const { suffix, type, description } of SUFFIXES.slice(0, 4)) {
    forms.push({
      form: root + suffix,
      description: `${type}: ${description}`
    })
  }
  
  return forms
}
