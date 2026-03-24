// Reconnaissance d'Entités Nommées (NER) pour le Malagasy
// Détecte les villes, personnalités, organisations, etc.

// Villes et régions de Madagascar
export const LOCATIONS = new Set([
  // Grandes villes
  'antananarivo', 'toamasina', 'antsirabe', 'fianarantsoa', 'mahajanga',
  'toliara', 'antsiranana', 'ambovombe', 'ambatondrazaka', 'morondava',
  'manakara', 'antalaha', 'nosy be', 'sainte-marie', 'tamatave',
  'diego suarez', 'fort dauphin', 'tulear', 'majunga',
  
  // Régions
  'analamanga', 'vakinankaratra', 'itasy', 'bongolava', 'haute matsiatra',
  'amoron\'i mania', 'vatovavy', 'fitovinany', 'atsimo atsinanana',
  'ihorombe', 'menabe', 'atsimo andrefana', 'androy', 'anosy',
  'alaotra mangoro', 'atsinanana', 'analanjirofo', 'sava', 'diana',
  'boeny', 'sofia', 'betsiboka', 'melaky',
  
  // Districts notables
  'ambositra', 'ambalavao', 'ihosy', 'ranohira', 'betioky',
  'ampanihy', 'ambanja', 'sambava', 'andapa', 'vohemar',
  'maroantsetra', 'mananara', 'moramanga', 'anosibe an\'ala',
  
  // Lieux internationaux connus
  'frantsa', 'paris', 'amerika', 'new york', 'london', 'china',
  'japana', 'india', 'south africa', 'australia', 'canada'
])

// Personnalités historiques et contemporaines malagasy
export const PERSONS = new Set([
  // Rois et Reines
  'andrianampoinimerina', 'radama', 'ranavalona', 'rasoherina',
  'ranavalona ii', 'ranavalona iii', 'rainilaiarivony',
  
  // Personnalités historiques
  'jean ralaimongo', 'joseph ravoahangy', 'jacques rabemananjara',
  'philibert tsiranana', 'didier ratsiraka', 'albert zafy',
  'marc ravalomanana', 'andry rajoelina', 'hery rajaonarimampianina',
  
  // Artistes et sportifs
  'jaojoby', 'd\'gary', 'rossy', 'ninie doniah', 'tsiliva',
  'bodo', 'samoela', 'mahaleo', 'charles kely',
  
  // Autres
  'rabemanjara', 'raseta', 'rabearimanana', 'ratsimandrava'
])

// Organisations et institutions
export const ORGANIZATIONS = new Set([
  // Gouvernement
  'repoblikan\'i madagasikara', 'governemanta', 'filoham-pirenena',
  'praiminisitra', 'mpikambana antenimieram-pirenena', 'antenimierampirenena',
  'antenimierandoholona',
  
  // Universités
  'universite antananarivo', 'universite fianarantsoa', 'universite toamasina',
  'universite mahajanga', 'universite toliara', 'universite antsiranana',
  
  // Institutions
  'banky foiben\'i madagasikara', 'banque centrale', 'jirama',
  'telma', 'orange madagascar', 'airtel', 'air madagascar',
  'fmi', 'banque mondiale', 'onu', 'unicef', 'oif',
  
  // Médias
  'tvm', 'rit', 'tv plus', 'rta', 'mbs', 'viva', 'express de madagascar',
  'midi madagasikara', 'les nouvelles', 'tribune', 'gazetiko'
])

// Mots-clés pour détecter les entités par contexte
const PERSON_INDICATORS = [
  'atoa', 'andriamatoa', 'rtoa', 'ramatoa', 'i', 'ingahy', 'raiamandreny',
  'filoha', 'minisitra', 'mpampianatra', 'dokotera', 'pasitera', 'masera'
]

const LOCATION_INDICATORS = [
  'ao', 'any', 'eto', 'tany', 'tanàna', 'faritra', 'distrika', 'renivohitra',
  'kaominina', 'fokontany'
]

const ORGANIZATION_INDICATORS = [
  'orinasa', 'fikambanana', 'vondrona', 'antoko', 'fanjakana', 'ministeran\'ny',
  'sekoly', 'hopitaly', 'banky', 'fitsarana'
]

export interface Entity {
  text: string
  type: 'PERSON' | 'LOCATION' | 'ORGANIZATION' | 'DATE' | 'NUMBER' | 'UNKNOWN'
  confidence: number
  startIndex: number
  endIndex: number
}

// Détecter les entités dans un texte
export function detectEntities(text: string): Entity[] {
  const entities: Entity[] = []
  const words = text.split(/\s+/)
  const lowerText = text.toLowerCase()
  
  // Regex pour les dates
  const datePatterns = [
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/g,
    /(\d{1,2})\s+(janoary|febroary|martsa|aprily|mey|jona|jolay|aogositra|septambra|oktobra|novambra|desambra)\s+(\d{4})/gi,
    /(janoary|febroary|martsa|aprily|mey|jona|jolay|aogositra|septambra|oktobra|novambra|desambra)\s+(\d{4})/gi
  ]
  
  // Détecter les dates
  for (const pattern of datePatterns) {
    let match
    while ((match = pattern.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: 'DATE',
        confidence: 0.95,
        startIndex: match.index,
        endIndex: match.index + match[0].length
      })
    }
  }
  
  // Regex pour les nombres
  const numberPattern = /\b(\d+([.,]\d+)?)\b/g
  let numberMatch
  while ((numberMatch = numberPattern.exec(text)) !== null) {
    entities.push({
      text: numberMatch[0],
      type: 'NUMBER',
      confidence: 1.0,
      startIndex: numberMatch.index,
      endIndex: numberMatch.index + numberMatch[0].length
    })
  }
  
  // Parcourir les mots pour détecter les entités nommées
  let currentIndex = 0
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const lowerWord = word.toLowerCase().replace(/[.,!?;:'"()]/g, '')
    const wordStart = text.indexOf(word, currentIndex)
    currentIndex = wordStart + word.length
    
    // Vérifier si c'est un lieu connu
    if (LOCATIONS.has(lowerWord)) {
      entities.push({
        text: word,
        type: 'LOCATION',
        confidence: 0.95,
        startIndex: wordStart,
        endIndex: wordStart + word.length
      })
      continue
    }
    
    // Vérifier si c'est une personne connue
    if (PERSONS.has(lowerWord)) {
      entities.push({
        text: word,
        type: 'PERSON',
        confidence: 0.95,
        startIndex: wordStart,
        endIndex: wordStart + word.length
      })
      continue
    }
    
    // Vérifier si c'est une organisation connue
    if (ORGANIZATIONS.has(lowerWord)) {
      entities.push({
        text: word,
        type: 'ORGANIZATION',
        confidence: 0.95,
        startIndex: wordStart,
        endIndex: wordStart + word.length
      })
      continue
    }
    
    // Détecter par indicateurs contextuels
    if (i > 0) {
      const prevWord = words[i - 1].toLowerCase()
      
      // Indicateurs de personne
      if (PERSON_INDICATORS.includes(prevWord) && word[0] === word[0].toUpperCase()) {
        entities.push({
          text: word,
          type: 'PERSON',
          confidence: 0.7,
          startIndex: wordStart,
          endIndex: wordStart + word.length
        })
        continue
      }
      
      // Indicateurs de lieu
      if (LOCATION_INDICATORS.includes(prevWord) && word[0] === word[0].toUpperCase()) {
        entities.push({
          text: word,
          type: 'LOCATION',
          confidence: 0.6,
          startIndex: wordStart,
          endIndex: wordStart + word.length
        })
        continue
      }
      
      // Indicateurs d'organisation
      if (ORGANIZATION_INDICATORS.includes(prevWord) && word[0] === word[0].toUpperCase()) {
        entities.push({
          text: word,
          type: 'ORGANIZATION',
          confidence: 0.6,
          startIndex: wordStart,
          endIndex: wordStart + word.length
        })
        continue
      }
    }
    
    // Détecter les noms propres (commence par majuscule)
    if (word[0] === word[0].toUpperCase() && word[0].match(/[A-Z]/)) {
      // Vérifier si ce n'est pas en début de phrase
      const isStartOfSentence = wordStart === 0 || 
        text.slice(Math.max(0, wordStart - 2), wordStart).match(/[.!?]\s*$/)
      
      if (!isStartOfSentence) {
        entities.push({
          text: word,
          type: 'UNKNOWN',
          confidence: 0.4,
          startIndex: wordStart,
          endIndex: wordStart + word.length
        })
      }
    }
  }
  
  // Trier par position et supprimer les doublons
  entities.sort((a, b) => a.startIndex - b.startIndex)
  
  // Filtrer les entités qui se chevauchent
  const filtered: Entity[] = []
  for (const entity of entities) {
    const overlaps = filtered.some(
      e => (entity.startIndex >= e.startIndex && entity.startIndex < e.endIndex) ||
           (entity.endIndex > e.startIndex && entity.endIndex <= e.endIndex)
    )
    if (!overlaps) {
      filtered.push(entity)
    }
  }
  
  return filtered
}

// Obtenir un résumé des entités
export function getEntitySummary(text: string): {
  entities: Entity[]
  byType: Record<string, string[]>
  count: number
} {
  const entities = detectEntities(text)
  const byType: Record<string, string[]> = {
    PERSON: [],
    LOCATION: [],
    ORGANIZATION: [],
    DATE: [],
    NUMBER: [],
    UNKNOWN: []
  }
  
  for (const entity of entities) {
    if (!byType[entity.type].includes(entity.text)) {
      byType[entity.type].push(entity.text)
    }
  }
  
  return {
    entities,
    byType,
    count: entities.length
  }
}
