'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import useSWR from 'swr'

// Types
export interface SpellCheckResult {
  word: string
  isCorrect: boolean
  suggestions: string[]
  error?: string
  errorType?: 'unknown' | 'forbidden_combination' | 'typo'
}

export interface SentimentResult {
  text: string
  score: number
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  positiveWords: string[]
  negativeWords: string[]
}

export interface Entity {
  text: string
  type: 'PERSON' | 'LOCATION' | 'ORGANIZATION' | 'DATE' | 'NUMBER' | 'UNKNOWN'
  confidence: number
  startIndex: number
  endIndex: number
}

export interface LemmaResult {
  original: string
  lemma: string
  root?: string
  prefixes: { prefix: string; type: string; description: string }[]
  suffixes: { suffix: string; type: string; description: string }[]
  confidence: number
  morphology: string
}

export interface TranslationResult {
  found: boolean
  word: string
  translation?: string
  definition?: string
  partOfSpeech?: string
  synonyms?: string[]
  antonyms?: string[]
  suggestions?: { word: string; translation: string; definition: string }[]
}

export interface EditorStats {
  wordCount: number
  charCount: number
  sentenceCount: number
  paragraphCount: number
}

// Fetcher pour SWR
const fetcher = async (url: string, body: unknown) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error('API error')
  return res.json()
}

// Hook principal de l'éditeur
export function useMalagasyEditor() {
  const [content, setContent] = useState('')
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [cursorPosition, setCursorPosition] = useState(0)
  const debounceRef = useRef<NodeJS.Timeout>()
  const [debouncedContent, setDebouncedContent] = useState('')

  // Debounce content changes
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      setDebouncedContent(content)
    }, 500)
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [content])

  // Stats calculation
  const stats: EditorStats = {
    wordCount: content.split(/\s+/).filter(w => w.length > 0).length,
    charCount: content.length,
    sentenceCount: content.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
    paragraphCount: content.split(/\n\n+/).filter(p => p.trim().length > 0).length
  }

  // Spell check
  const { data: spellCheckData, isLoading: isSpellChecking } = useSWR(
    debouncedContent.length > 0 ? ['spell-check', debouncedContent] : null,
    () => fetcher('/api/malagasy/spell-check', { text: debouncedContent }),
    { revalidateOnFocus: false }
  )

  // Sentiment analysis
  const { data: sentimentData, isLoading: isAnalyzingSentiment } = useSWR(
    debouncedContent.length > 10 ? ['sentiment', debouncedContent] : null,
    () => fetcher('/api/malagasy/sentiment', { text: debouncedContent }),
    { revalidateOnFocus: false }
  )

  // Entity recognition
  const { data: nerData, isLoading: isDetectingEntities } = useSWR(
    debouncedContent.length > 10 ? ['ner', debouncedContent] : null,
    () => fetcher('/api/malagasy/ner', { text: debouncedContent }),
    { revalidateOnFocus: false }
  )

  // Get word at cursor
  const getWordAtCursor = useCallback((text: string, position: number): string | null => {
    const before = text.slice(0, position)
    const after = text.slice(position)
    
    const beforeMatch = before.match(/[\wàâäéèêëïîôùûüç']+$/i)
    const afterMatch = after.match(/^[\wàâäéèêëïîôùûüç']+/i)
    
    const wordBefore = beforeMatch ? beforeMatch[0] : ''
    const wordAfter = afterMatch ? afterMatch[0] : ''
    
    return (wordBefore + wordAfter) || null
  }, [])

  // Handle content change
  const handleContentChange = useCallback((newContent: string, newCursorPos?: number) => {
    setContent(newContent)
    if (newCursorPos !== undefined) {
      setCursorPosition(newCursorPos)
      const word = getWordAtCursor(newContent, newCursorPos)
      setSelectedWord(word)
    }
  }, [getWordAtCursor])

  // Get spelling errors
  const spellingErrors: SpellCheckResult[] = spellCheckData?.results?.filter(
    (r: SpellCheckResult) => !r.isCorrect
  ) || []

  // Get entities
  const entities: Entity[] = nerData?.entities || []

  // Get sentiment
  const sentiment: SentimentResult | null = sentimentData || null

  return {
    content,
    setContent: handleContentChange,
    selectedWord,
    setSelectedWord,
    cursorPosition,
    setCursorPosition,
    stats,
    spellingErrors,
    isSpellChecking,
    sentiment,
    isAnalyzingSentiment,
    entities,
    isDetectingEntities,
    getWordAtCursor
  }
}

// Hook pour l'autocomplétion
export function useAutocomplete(context: string, enabled: boolean = true) {
  const [isOpen, setIsOpen] = useState(false)
  
  const { data, isLoading } = useSWR(
    enabled && context.length > 2 ? ['autocomplete', context] : null,
    () => fetcher('/api/malagasy/autocomplete', { text: context, limit: 6 }),
    { revalidateOnFocus: false }
  )

  const predictions: string[] = data?.predictions || []

  return {
    predictions,
    isLoading,
    isOpen,
    setIsOpen
  }
}

// Hook pour la traduction
export function useTranslation() {
  const [word, setWord] = useState<string | null>(null)
  const [targetLang, setTargetLang] = useState<'fr' | 'en'>('fr')

  const { data, isLoading, error } = useSWR(
    word ? ['translate', word, targetLang] : null,
    () => fetcher('/api/malagasy/translate', { word, targetLang }),
    { revalidateOnFocus: false }
  )

  const translate = useCallback((w: string) => {
    setWord(w)
  }, [])

  const clear = useCallback(() => {
    setWord(null)
  }, [])

  return {
    translate,
    clear,
    result: data as TranslationResult | null,
    isLoading,
    error,
    targetLang,
    setTargetLang
  }
}

// Hook pour la lemmatisation
export function useLemmatization() {
  const [word, setWord] = useState<string | null>(null)

  const { data, isLoading, error } = useSWR(
    word ? ['lemmatize', word] : null,
    () => fetcher('/api/malagasy/lemmatize', { text: word }),
    { revalidateOnFocus: false }
  )

  const lemmatize = useCallback((w: string) => {
    setWord(w)
  }, [])

  const clear = useCallback(() => {
    setWord(null)
  }, [])

  return {
    lemmatize,
    clear,
    result: data as LemmaResult | null,
    isLoading,
    error
  }
}

// Hook pour la synthèse vocale
export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = useCallback((text: string, rate: number = 0.9, pitch: number = 1) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utteranceRef.current = utterance

    // Try to find a suitable voice (Indonesian or French as fallback)
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(v => 
      v.lang.startsWith('id') || v.lang.startsWith('ms')
    ) || voices.find(v => 
      v.lang.startsWith('fr')
    ) || voices[0]

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.rate = rate
    utterance.pitch = pitch

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }

    window.speechSynthesis.speak(utterance)
  }, [])

  const pause = useCallback(() => {
    if (window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.pause()
      setIsPaused(true)
    }
  }, [isSpeaking])

  const resume = useCallback(() => {
    if (window.speechSynthesis && isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    }
  }, [isPaused])

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setIsPaused(false)
    }
  }, [])

  return {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused
  }
}

// Hook pour le chatbot
export function useChatbot() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (message: string) => {
    setMessages(prev => [...prev, { role: 'user', content: message }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/malagasy/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      const data = await response.json()
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message || 'Miala tsiny, nisy olana.' 
      }])
    } catch {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Miala tsiny, tsy afaka namaly aho. Andramo indray azafady.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading
  }
}
