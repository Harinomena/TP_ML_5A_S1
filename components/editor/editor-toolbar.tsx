"use client"

import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
  Download,
  Upload,
  FileText,
  Printer,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface EditorToolbarProps {
  onFormat: (command: string, value?: string) => void
  onExport: (format: "txt" | "html" | "pdf") => void
  onImport: () => void
  onPrint: () => void
  canUndo: boolean
  canRedo: boolean
}

export function EditorToolbar({
  onFormat,
  onExport,
  onImport,
  onPrint,
  canUndo,
  canRedo,
}: EditorToolbarProps) {
  const tools = [
    { icon: Bold, command: "bold", label: "Gras (Ctrl+B)" },
    { icon: Italic, command: "italic", label: "Italique (Ctrl+I)" },
    { icon: Underline, command: "underline", label: "Souligne (Ctrl+U)" },
    { type: "separator" },
    { icon: AlignLeft, command: "justifyLeft", label: "Aligner a gauche" },
    { icon: AlignCenter, command: "justifyCenter", label: "Centrer" },
    { icon: AlignRight, command: "justifyRight", label: "Aligner a droite" },
    { type: "separator" },
    { icon: List, command: "insertUnorderedList", label: "Liste a puces" },
    { icon: ListOrdered, command: "insertOrderedList", label: "Liste numerotee" },
  ]

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30 rounded-t-lg flex-wrap">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onFormat("undo")}
              disabled={!canUndo}
            >
              <Undo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Annuler (Ctrl+Z)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onFormat("redo")}
              disabled={!canRedo}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Retablir (Ctrl+Y)</TooltipContent>
        </Tooltip>

        <div className="w-px h-6 bg-border mx-1" />

        {tools.map((tool, index) => {
          if (tool.type === "separator") {
            return <div key={index} className="w-px h-6 bg-border mx-1" />
          }
          const Icon = tool.icon!
          return (
            <Tooltip key={tool.command}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onFormat(tool.command!)}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{tool.label}</TooltipContent>
            </Tooltip>
          )
        })}

        <div className="w-px h-6 bg-border mx-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onImport}>
              <Upload className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Importer un fichier</TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Exporter</TooltipContent>
          </Tooltip>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onExport("txt")}>
              <FileText className="h-4 w-4 mr-2" />
              Texte brut (.txt)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport("html")}>
              <FileText className="h-4 w-4 mr-2" />
              HTML (.html)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport("pdf")}>
              <FileText className="h-4 w-4 mr-2" />
              PDF (.pdf)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onPrint}>
              <Printer className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Imprimer</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
