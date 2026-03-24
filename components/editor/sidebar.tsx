"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  SpellCheck,
  Languages,
  BookOpen,
  Heart,
  Users,
  Bot,
  Settings,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useTheme } from "next-themes"

export type PanelType = "spellcheck" | "translator" | "lemmatizer" | "sentiment" | "entities" | "chatbot" | null

interface SidebarProps {
  activePanel: PanelType
  onPanelChange: (panel: PanelType) => void
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
}

const panels = [
  { id: "spellcheck" as PanelType, icon: SpellCheck, label: "Correcteur orthographique", shortcut: "F7" },
  { id: "translator" as PanelType, icon: Languages, label: "Traducteur", shortcut: "Ctrl+T" },
  { id: "lemmatizer" as PanelType, icon: BookOpen, label: "Lemmatisation", shortcut: "Ctrl+L" },
  { id: "sentiment" as PanelType, icon: Heart, label: "Analyse de sentiment", shortcut: "Ctrl+S" },
  { id: "entities" as PanelType, icon: Users, label: "Entites nommees", shortcut: "Ctrl+E" },
  { id: "chatbot" as PanelType, icon: Bot, label: "Assistant IA", shortcut: "Ctrl+K" },
]

export function Sidebar({ activePanel, onPanelChange, collapsed, onCollapsedChange }: SidebarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <TooltipProvider>
      <div
        className={cn(
          "flex flex-col h-full bg-card border-r border-border transition-all duration-300",
          collapsed ? "w-16" : "w-56"
        )}
      >
        <div className="flex-1 py-4">
          <div className="space-y-1 px-2">
            {panels.map((panel) => {
              const Icon = panel.icon
              const isActive = activePanel === panel.id

              return (
                <Tooltip key={panel.id} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 h-10",
                        collapsed && "justify-center px-0"
                      )}
                      onClick={() => onPanelChange(isActive ? null : panel.id)}
                    >
                      <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary")} />
                      {!collapsed && (
                        <span className="truncate">{panel.label}</span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{panel.label}</p>
                      <p className="text-xs text-muted-foreground">{panel.shortcut}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              )
            })}
          </div>
        </div>

        <div className="border-t border-border p-2 space-y-1">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn("w-full justify-start gap-3 h-10", collapsed && "justify-center px-0")}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <Moon className="h-5 w-5 flex-shrink-0" />
                )}
                {!collapsed && <span>Theme</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                Changer le theme
              </TooltipContent>
            )}
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn("w-full justify-start gap-3 h-10", collapsed && "justify-center px-0")}
              >
                <Settings className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>Parametres</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                Parametres
              </TooltipContent>
            )}
          </Tooltip>

          <Button
            variant="ghost"
            size="icon"
            className="w-full h-8"
            onClick={() => onCollapsedChange(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}
