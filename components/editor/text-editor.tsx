'use client'

import { useCallback, useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { SpellCheckResult, Entity } from '@/hooks/use-malagasy-editor'

interface TextEditorProps {
  content: string
  onChange: (content: string, cursorPos?: number) => void
  spellingErrors?: SpellCheckResult[]
  entities?: Entity[]
  showSpellErrors?: boolean
  showEntities?: boolean
  placeholder?: string
  className?: string
  onWordSelect?: (word: string, rect: DOMRect) => void
}

export function TextEditor({
  content,
  onChange,
  spellingErrors = [],
  entities = [],
  showSpellErrors = true,
  showEntities = false,
  placeholder = 'Manomboka manoratra eto...',
  className,
  onWordSelect
}: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  // Handle input
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || ''
      const selection = window.getSelection()
      let cursorPos = 0
      
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const preCaretRange = range.cloneRange()
        preCaretRange.selectNodeContents(editorRef.current)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        cursorPos = preCaretRange.toString().length
      }
      
      onChange(text, cursorPos)
    }
  }, [onChange])

  // Handle context menu (right-click)
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const word = selection.toString().trim()
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      onWordSelect?.(word, rect)
    }
  }, [onWordSelect])

  // Handle double-click to select word
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const word = selection.toString().trim()
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      onWordSelect?.(word, rect)
    }
  }, [onWordSelect])

  // Sync content with editor (only when content changes externally)
  useEffect(() => {
    if (editorRef.current && document.activeElement !== editorRef.current) {
      const currentText = editorRef.current.innerText || ''
      if (currentText !== content) {
        editorRef.current.innerText = content
      }
    }
  }, [content])

  // Create highlighted content
  const getHighlightedContent = useCallback(() => {
    if (!showSpellErrors && !showEntities) return content

    let result = content
    const highlights: { start: number; end: number; type: string; original: string }[] = []

    // Add spelling errors
    if (showSpellErrors) {
      const words = content.split(/(\s+)/)
      let position = 0
      
      for (const word of words) {
        const cleanWord = word.replace(/[.,!?;:'"()]/g, '')
        const error = spellingErrors.find(e => e.word.toLowerCase() === cleanWord.toLowerCase())
        
        if (error && cleanWord.length > 0) {
          highlights.push({
            start: position,
            end: position + word.length,
            type: 'spell-error',
            original: word
          })
        }
        position += word.length
      }
    }

    // Add entity highlights
    if (showEntities) {
      for (const entity of entities) {
        highlights.push({
          start: entity.startIndex,
          end: entity.endIndex,
          type: `entity-${entity.type.toLowerCase()}`,
          original: entity.text
        })
      }
    }

    return result
  }, [content, spellingErrors, entities, showSpellErrors, showEntities])

  return (
    <div className={cn('relative', className)}>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className={cn(
          'editor-content w-full min-h-[400px] p-4 rounded-lg',
          'bg-card border border-border',
          'focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
          'transition-shadow duration-200',
          !content && !isFocused && 'text-muted-foreground'
        )}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onContextMenu={handleContextMenu}
        onDoubleClick={handleDoubleClick}
        data-placeholder={placeholder}
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
      />
      
      {/* Placeholder */}
      {!content && !isFocused && (
        <div 
          className="absolute top-4 left-4 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        >
          {placeholder}
        </div>
      )}

      {/* Spelling error indicators (visual overlay - simplified) */}
      {showSpellErrors && spellingErrors.length > 0 && (
        <div className="absolute bottom-2 right-2 text-xs text-destructive">
          {spellingErrors.length} fahadisoana
        </div>
      )}
    </div>
  )
}
