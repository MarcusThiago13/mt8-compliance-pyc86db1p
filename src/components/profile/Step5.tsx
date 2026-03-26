import { Label } from '@/components/ui/label'
import { DynamicTable } from './DynamicTable'
import { AlertCircle } from 'lucide-react'

export function Step5({ data, update }: any) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="bg-primary/5 border border-primary/20 p-4 rounded-md flex items-start gap-3">
        <AlertCircle className="size-5 text-primary shrink-0 mt-0.5" />
        <div className="text-sm text-primary/80">
          Esta seção está habilitada porque a organização tem relação com o Poder Público. Liste os
          principais instrumentos ativos.
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Parcerias / Contratos / Convênios</Label>
        <DynamicTable
          items={data.parcerias}
          onChange={(d) => update({ parcerias: d })}
          columns={[
            { key: 'orgao', label: 'Órgão Parceiro' },
            { key: 'instrumento', label: 'Tipo de Instrumento' },
            { key: 'objeto', label: 'Objeto Resumido' },
            { key: 'valor', label: 'Valor Global (R$)' },
            { key: 'vigencia', label: 'Vigência' },
            { key: 'processo', label: 'Processo SEI/Físico' },
          ]}
        />
      </div>
    </div>
  )
}
