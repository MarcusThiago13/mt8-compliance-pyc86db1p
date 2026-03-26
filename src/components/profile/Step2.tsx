import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { DynamicTable } from './DynamicTable'

export function Step2({ data, update }: any) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="grid sm:grid-cols-3 gap-4 p-4 border rounded-md bg-muted/10">
        <div className="space-y-2">
          <Label>Nome do Representante Legal</Label>
          <Input value={data.repNome || ''} onChange={(e) => update({ repNome: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Cargo</Label>
          <Input
            value={data.repCargo || ''}
            onChange={(e) => update({ repCargo: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>CPF</Label>
          <Input value={data.repCpf || ''} onChange={(e) => update({ repCpf: e.target.value })} />
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-4 p-4 border rounded-md bg-muted/10">
        <div className="space-y-2 col-span-2">
          <Label>Responsável pelo Compliance</Label>
          <Input
            value={data.compNome || ''}
            onChange={(e) => update({ compNome: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Cargo / Setor</Label>
          <Input
            value={data.compCargo || ''}
            onChange={(e) => update({ compCargo: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>E-mail / Contato</Label>
          <Input
            value={data.compEmail || ''}
            onChange={(e) => update({ compEmail: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Composição do Órgão Diretivo (Alta Direção)</Label>
        <DynamicTable
          items={data.diretoria}
          onChange={(d) => update({ diretoria: d })}
          columns={[
            { key: 'nome', label: 'Nome' },
            { key: 'cargo', label: 'Cargo' },
            { key: 'mandato', label: 'Período Mandato' },
          ]}
        />
      </div>

      <div className="flex items-center justify-between border p-4 rounded-lg bg-muted/10">
        <div className="space-y-0.5">
          <Label className="text-base">Existe Conselho Fiscal?</Label>
        </div>
        <Switch
          checked={!!data.hasConselhoFiscal}
          onCheckedChange={(v) => update({ hasConselhoFiscal: v })}
        />
      </div>

      {data.hasConselhoFiscal && (
        <div className="space-y-2 animate-in fade-in">
          <Label className="text-base">Membros do Conselho Fiscal</Label>
          <DynamicTable
            items={data.conselho}
            onChange={(d) => update({ conselho: d })}
            columns={[
              { key: 'nome', label: 'Nome' },
              { key: 'cargo', label: 'Cargo' },
            ]}
          />
        </div>
      )}
    </div>
  )
}
