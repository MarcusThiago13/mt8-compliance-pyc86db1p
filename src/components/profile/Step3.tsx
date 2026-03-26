import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { DynamicTable } from './DynamicTable'

export function Step3({ data, update }: any) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="border p-4 rounded-lg space-y-4 bg-muted/10">
        <div className="flex items-center justify-between">
          <Label className="text-base">
            A organização integra alguma rede, federação ou sistema nacional?
          </Label>
          <Switch
            checked={!!data.integraRede}
            onCheckedChange={(v) => update({ integraRede: v })}
          />
        </div>
        {data.integraRede && (
          <Input
            placeholder="Qual? Descreva brevemente."
            value={data.redeDescricao || ''}
            onChange={(e) => update({ redeDescricao: e.target.value })}
            className="mt-2"
          />
        )}
      </div>

      <div className="border p-4 rounded-lg space-y-4 bg-muted/10">
        <div className="flex items-center justify-between">
          <Label className="text-base">Possui entidades coligadas ou controladas?</Label>
          <Switch
            checked={!!data.possuiColigadas}
            onCheckedChange={(v) => update({ possuiColigadas: v })}
          />
        </div>
        {data.possuiColigadas && (
          <DynamicTable
            items={data.coligadas}
            onChange={(d) => update({ coligadas: d })}
            columns={[
              { key: 'nome', label: 'Nome da Entidade' },
              { key: 'cnpj', label: 'CNPJ' },
              { key: 'relacao', label: 'Tipo de Relação' },
            ]}
          />
        )}
      </div>

      <div className="flex items-center justify-between border p-4 rounded-lg bg-muted/10">
        <Label className="text-base">Recebe recursos de fundos internacionais?</Label>
        <Switch
          checked={!!data.recebeFundosInt}
          onCheckedChange={(v) => update({ recebeFundosInt: v })}
        />
      </div>
    </div>
  )
}
