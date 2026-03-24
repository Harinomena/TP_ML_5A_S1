// Analyse de sentiment pour le Malagasy
// Utilise un dictionnaire de mots-clés (Bag of Words)

// Mots positifs en Malagasy avec leur poids
export const POSITIVE_WORDS: Record<string, number> = {
  // Adjectifs positifs
  'tsara': 2,
  'mahafinaritra': 3,
  'mahafaly': 2,
  'soa': 2,
  'mendrika': 2,
  'kanto': 2,
  'mahagaga': 2,
  'mahatalanjona': 3,
  'mahasambatra': 3,
  'mahafatifaty': 2,
  'marevaka': 2,
  'matsiro': 2,
  'mamy': 2,
  'malefaka': 1,
  'madio': 2,
  'mazava': 2,
  'marani-tsaina': 2,
  'mahery': 1,
  'salama': 2,
  'velona': 2,
  'faly': 3,
  'sambatra': 3,
  'ravoravo': 2,

  // Verbes positifs
  'tia': 2,
  'mitia': 2,
  'mankasitraka': 3,
  'misaotra': 2,
  'midera': 2,
  'manaiky': 1,
  'manome': 1,
  'manampy': 2,
  'manohana': 2,
  'mampahery': 2,
  'mamela': 2,
  'mahomby': 2,
  'mandresy': 2,
  'mihomehy': 2,
  'mifaly': 2,


  // Noms positifs
  'fitiavana': 3,
  'hafaliana': 3,
  'fahasambarana': 3,
  'fiadanana': 3,
  'fahendrena': 2,
  'fahamarinana': 2,
  'fahasalamana': 2,
  'fanantenana': 2,
  'fahombiazana': 3,
  'fandresen': 2,
  'firaisan-kina': 2,
  'fihavanana': 3,
  'hasina': 2,
  'voninahitra': 2,
  'fitahiana': 3,
  'fahasoavana': 2,
  'harena': 2,

  // Expressions positives
  'eny': 1,
  'marina': 2,
  'tokoa': 1,
  'tena': 1,
  'indrindra': 1,
  'veloma': 1,
  'azafady': 1
}

// Mots négatifs en Malagasy avec leur poids
export const NEGATIVE_WORDS: Record<string, number> = {
  // Adjectifs négatifs
  'ratsy': -2,
  'maharary': -2,
  'mampalahelo': -3,
  'mahatsiravina': -3,
  'mahamenatra': -2,
  'maharikoriko': -2,
  'maloto': -2,
  'maizina': -1,
  'masiaka': -2,
  'tezitra': -2,
  'malahelo': -3,
  'marary': -2,
  'reraka': -1,
  'vizana': -1,
  'kivy': -2,
  'mahantra': -2,
  'adala': -2,
  'malemy': -1,

  // Verbes négatifs
  'mankahala': -3,
  'mandratra': -2,
  'mamono': -3,
  'mangalatra': -3,
  'mandainga': -2,
  'manenjika': -2,
  'mampahory': -3,
  'maneso': -2,
  'manambany': -2,
  'manozona': -3,
  'miady': -2,
  'mitomany': -2,
  'milaza ratsy': -2,

  // Noms négatifs
  'fahatezerana': -2,
  'fahoriana': -3,
  'alahelo': -3,
  'fankahalana': -3,
  'faharatsiana': -2,
  'aretina': -2,
  'fahafatesana': -2,
  'loza': -3,
  'voina': -2,
  'fahavoazana': -2,
  'olana': -2,
  'ady': -2,
  'korontana': -2,
  'haratsiana': -2,

  // Expressions négatives
  'tsia': -1,
  'tsy': -1,
  'aza': -1,
  'sanatria': -2,
  'mandrakariva tsy': -2
}

// Modificateurs d'intensité
export const INTENSIFIERS: Record<string, number> = {
  'tena': 1.5,
  'tokoa': 1.3,
  'dia': 1.2,
  'indrindra': 1.5,
  'be': 1.3,
  'loatra': 1.5,
  'mafy': 1.3
}

// Négateurs qui inversent le sentiment
export const NEGATORS = ['tsy', 'aza', 'tsia', 'na']

export interface SentimentResult {
  text: string
  score: number
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  positiveWords: string[]
  negativeWords: string[]
  details: {
    positiveScore: number
    negativeScore: number
    wordCount: number
  }
}

// Analyser le sentiment d'un texte
export function analyzeSentiment(text: string): SentimentResult {
  const words = text.toLowerCase()
    .replace(/[.,!?;:'"()]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 0)

  let positiveScore = 0
  let negativeScore = 0
  const positiveWords: string[] = []
  const negativeWords: string[] = []

  let negationActive = false
  let intensifier = 1

  for (let i = 0; i < words.length; i++) {
    const word = words[i]

    // Vérifier les négateurs
    if (NEGATORS.includes(word)) {
      negationActive = true
      continue
    }

    // Vérifier les modificateurs d'intensité
    if (INTENSIFIERS[word]) {
      intensifier = INTENSIFIERS[word]
      continue
    }

    // Vérifier les mots positifs
    if (POSITIVE_WORDS[word]) {
      let score = POSITIVE_WORDS[word] * intensifier
      if (negationActive) {
        score = -score * 0.5 // La négation inverse et atténue
        negativeWords.push(word)
        negativeScore += Math.abs(score)
      } else {
        positiveWords.push(word)
        positiveScore += score
      }
      negationActive = false
      intensifier = 1
      continue
    }

    // Vérifier les mots négatifs
    if (NEGATIVE_WORDS[word]) {
      let score = Math.abs(NEGATIVE_WORDS[word]) * intensifier
      if (negationActive) {
        // Double négation = positif atténué
        positiveWords.push(word)
        positiveScore += score * 0.3
      } else {
        negativeWords.push(word)
        negativeScore += score
      }
      negationActive = false
      intensifier = 1
      continue
    }

    // Réinitialiser si le mot n'est pas reconnu
    negationActive = false
    intensifier = 1
  }

  // Calculer le score final
  const totalScore = positiveScore - negativeScore
  const normalizedScore = Math.max(-1, Math.min(1, totalScore / Math.max(words.length, 1)))

  // Déterminer le sentiment
  let sentiment: 'positive' | 'negative' | 'neutral'
  if (normalizedScore > 0.1) {
    sentiment = 'positive'
  } else if (normalizedScore < -0.1) {
    sentiment = 'negative'
  } else {
    sentiment = 'neutral'
  }

  // Calculer la confiance basée sur le nombre de mots reconnus
  const recognizedWords = positiveWords.length + negativeWords.length
  const confidence = Math.min(1, recognizedWords / Math.max(words.length * 0.3, 1))

  return {
    text,
    score: normalizedScore,
    sentiment,
    confidence,
    positiveWords: [...new Set(positiveWords)],
    negativeWords: [...new Set(negativeWords)],
    details: {
      positiveScore,
      negativeScore,
      wordCount: words.length
    }
  }
}

// Analyser le sentiment de plusieurs phrases
export function analyzeSentences(text: string): SentimentResult[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  return sentences.map(sentence => analyzeSentiment(sentence.trim()))
}

// Obtenir un résumé du sentiment global
export function getSentimentSummary(text: string): {
  overall: SentimentResult
  sentences: SentimentResult[]
  distribution: { positive: number; negative: number; neutral: number }
} {
  const sentences = analyzeSentences(text)
  const overall = analyzeSentiment(text)

  const distribution = {
    positive: sentences.filter(s => s.sentiment === 'positive').length,
    negative: sentences.filter(s => s.sentiment === 'negative').length,
    neutral: sentences.filter(s => s.sentiment === 'neutral').length
  }

  return { overall, sentences, distribution }
}
