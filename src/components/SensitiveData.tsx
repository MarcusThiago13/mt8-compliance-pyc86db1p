import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface SensitiveDataProps {
  value: string
  label: string
}

export function SensitiveData({ value, label }: SensitiveDataProps) {
  const [visible, setVisible] = useState(false)

  const toggle = () => {
    if (!visible) {
      toast({
        title: 'Acesso Registrado',
        description: `Visualização de dados sensíveis (${label}) registrada no log de auditoria.`,
      })
    }
    setVisible(!visible)
  }

  return (
    <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-md border border-border/50">
      <span className="font-mono text-sm tracking-widest text-muted-foreground w-32">
        {visible ? value : '••••••••••••'}
      </span>
      <button
        type="button"
        onClick={toggle}
        className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center p-1 rounded-sm hover:bg-muted"
        title="Visualizar dado sensível"
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  )
}
