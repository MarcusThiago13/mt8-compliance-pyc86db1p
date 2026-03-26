import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Plus } from 'lucide-react'

export interface Column {
  key: string
  label: string
  type?: string
}

interface Props {
  items: any[]
  onChange: (items: any[]) => void
  columns: Column[]
}

export function DynamicTable({ items = [], onChange, columns }: Props) {
  const safeItems = Array.isArray(items) ? items : []

  return (
    <div className="space-y-3 mt-2">
      {safeItems.map((item, i) => (
        <div
          key={i}
          className="flex flex-wrap sm:flex-nowrap gap-2 items-end bg-muted/20 p-3 rounded-md border border-border/50"
        >
          {columns.map((c) => (
            <div key={c.key} className="flex-1 min-w-[120px]">
              <span className="text-[11px] font-medium text-muted-foreground mb-1 block uppercase tracking-wider">
                {c.label}
              </span>
              <Input
                type={c.type || 'text'}
                value={item[c.key] || ''}
                onChange={(e) => {
                  const newItems = [...safeItems]
                  newItems[i] = { ...newItems[i], [c.key]: e.target.value }
                  onChange(newItems)
                }}
                className="h-9 text-sm"
              />
            </div>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onChange(safeItems.filter((_, idx) => idx !== i))}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange([...safeItems, {}])}
        className="gap-2"
      >
        <Plus className="size-4" /> Adicionar Linha
      </Button>
    </div>
  )
}
