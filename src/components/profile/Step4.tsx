import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export function Step4({ data, update }: any) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Colaboradores CLT</Label>
          <Input
            type="number"
            min="0"
            value={data.clt || ''}
            onChange={(e) => update({ clt: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Voluntários</Label>
          <Input
            type="number"
            min="0"
            value={data.voluntarios || ''}
            onChange={(e) => update({ voluntarios: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Estagiários</Label>
          <Input
            type="number"
            min="0"
            value={data.estagiarios || ''}
            onChange={(e) => update({ estagiarios: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Terceirizados</Label>
          <Input
            type="number"
            min="0"
            value={data.terceirizados || ''}
            onChange={(e) => update({ terceirizados: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border p-4 rounded-lg bg-muted/10">
        <div className="space-y-0.5">
          <Label className="text-base">Possui política de voluntariado formalizada?</Label>
          <p className="text-sm text-muted-foreground">
            Documento formal que rege a atuação não remunerada.
          </p>
        </div>
        <Switch
          checked={!!data.politicaVoluntariado}
          onCheckedChange={(v) => update({ politicaVoluntariado: v })}
        />
      </div>
    </div>
  )
}
