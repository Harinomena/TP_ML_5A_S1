'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'
import { MapPin, User, Building, Calendar, Hash, HelpCircle, Tag } from 'lucide-react'
import type { Entity } from '@/hooks/use-malagasy-editor'

interface EntitiesPanelProps {
  entities: Entity[]
  isLoading: boolean
}

const ENTITY_CONFIG = {
  PERSON: {
    icon: User,
    label: 'Olona',
    color: 'bg-chart-5/10 text-chart-5 border-chart-5/30'
  },
  LOCATION: {
    icon: MapPin,
    label: 'Toerana',
    color: 'bg-chart-1/10 text-chart-1 border-chart-1/30'
  },
  ORGANIZATION: {
    icon: Building,
    label: 'Fikambanana',
    color: 'bg-chart-2/10 text-chart-2 border-chart-2/30'
  },
  DATE: {
    icon: Calendar,
    label: 'Daty',
    color: 'bg-chart-4/10 text-chart-4 border-chart-4/30'
  },
  NUMBER: {
    icon: Hash,
    label: 'Isa',
    color: 'bg-muted text-muted-foreground border-muted'
  },
  UNKNOWN: {
    icon: HelpCircle,
    label: 'Tsy fantatra',
    color: 'bg-muted text-muted-foreground border-muted'
  }
}

export function EntitiesPanel({ entities, isLoading }: EntitiesPanelProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Spinner className="h-4 w-4" />
            Fitadiavana entites...
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  // Group entities by type
  const groupedEntities = entities.reduce((acc, entity) => {
    if (!acc[entity.type]) {
      acc[entity.type] = []
    }
    // Avoid duplicates
    if (!acc[entity.type].some(e => e.text.toLowerCase() === entity.text.toLowerCase())) {
      acc[entity.type].push(entity)
    }
    return acc
  }, {} as Record<string, Entity[]>)

  const entityTypes = Object.keys(groupedEntities) as Array<keyof typeof ENTITY_CONFIG>

  if (entityTypes.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            Entites voafaritra (NER)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Tsy misy entites hita ao amin'ny lahatsoratra.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Tag className="h-4 w-4 text-accent" />
          Entites voafaritra ({entities.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[250px]">
          <div className="px-4 pb-4 space-y-4">
            {entityTypes.map((type) => {
              const config = ENTITY_CONFIG[type] || ENTITY_CONFIG.UNKNOWN
              const Icon = config.icon
              const typeEntities = groupedEntities[type]

              return (
                <div key={type} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {config.label} ({typeEntities.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {typeEntities.map((entity, index) => (
                      <Badge
                        key={`${entity.text}-${index}`}
                        variant="outline"
                        className={`text-xs ${config.color}`}
                      >
                        {entity.text}
                        {entity.confidence < 0.8 && (
                          <span className="ml-1 opacity-50">?</span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
