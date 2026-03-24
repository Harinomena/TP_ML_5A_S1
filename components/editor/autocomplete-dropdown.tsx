"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface Suggestion {
  word: string
  frequency: number
  type: "dictionary" | "learned" | "phrase"
}

interface AutocompleteDropdownProps {
  suggestions: Suggestion[]
  selectedIndex: number
  onSelect: (word: string) => void
  position: { top: number; left: number }
  visible: boolean
}

export function AutocompleteDropdown({
  suggestions,
  selectedIndex,
  onSelect,
  position,
  visible,
}: AutocompleteDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dropdownRef.current && selectedIndex >= 0) {
      const selectedElement = dropdownRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" })
      }
    }
  }, [selectedIndex])

  if (!visible || suggestions.length === 0) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 w-64 max-h-48 overflow-y-auto rounded-lg border border-border bg-popover shadow-lg"
      style={{
        top: position.top + 24,
        left: position.left,
      }}
    >
      {suggestions.map((suggestion, index) => (
        <button
          key={`${suggestion.word}-${index}`}
          className={cn(
            "w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-accent transition-colors",
            index === selectedIndex && "bg-accent"
          )}
          onClick={() => onSelect(suggestion.word)}
        >
          <span className="font-medium">{suggestion.word}</span>
          <span className="text-xs text-muted-foreground">
            {suggestion.type === "dictionary" && "dict"}
            {suggestion.type === "learned" && "appris"}
            {suggestion.type === "phrase" && "expr"}
          </span>
        </button>
      ))}
      <div className="px-3 py-1.5 text-xs text-muted-foreground border-t border-border bg-muted/30">
        Utilisez ↑↓ pour naviguer, Entree pour selectionner, Echap pour fermer
      </div>
    </div>
  )
}
