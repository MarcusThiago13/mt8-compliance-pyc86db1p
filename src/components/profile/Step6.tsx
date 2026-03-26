import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

export function Step6({ data, update }: any) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between border p-4 rounded-lg bg-muted/10">
        <Label className="text-base">O programa de integridade está formalmente instituído?</Label>
        <Switch
          checked={!!data.programaInstituido}
          onCheckedChange={(v) => update({ programaInstituido: v })}
        />
      </div>

      {data.programaInstituido && (
        <div className="space-y-2">
          <Label>Data de Implementação / Aprovação do Código</Label>
          <Input
            type="date"
            value={data.dataImplementacao || ''}
            onChange={(e) => update({ dataImplementacao: e.target.value })}
            className="w-48"
          />
        </div>
      )}

      <div className="border p-4 rounded-lg space-y-4 bg-muted/10">
        <div className="flex items-center justify-between">
          <Label className="text-base">
            Existe função de compliance officer formalmente designada?
          </Label>
          <Switch
            checked={!!data.hasComplianceOfficer}
            onCheckedChange={(v) => update({ hasComplianceOfficer: v })}
          />
        </div>
        {data.hasComplianceOfficer && (
          <div className="space-y-2">
            <Label>Quem exerce a função? (Nome ou Área)</Label>
            <Input
              value={data.complianceOfficer || ''}
              onChange={(e) => update({ complianceOfficer: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="border p-4 rounded-lg space-y-4 bg-muted/10">
        <div className="flex items-center justify-between">
          <Label className="text-base">
            A organização já passou por auditoria externa de compliance?
          </Label>
          <Switch
            checked={!!data.hasAuditoria}
            onCheckedChange={(v) => update({ hasAuditoria: v })}
          />
        </div>
        {data.hasAuditoria && (
          <div className="space-y-2">
            <Label>Quando e por qual entidade?</Label>
            <Input
              value={data.auditoriaDetalhes || ''}
              onChange={(e) => update({ auditoriaDetalhes: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-base">Escopo do Sistema de Gestão de Compliance</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Descreva a abrangência do programa (Quais áreas, unidades e atividades estão cobertas).
          Esta informação vai alimentar diretamente o requisito ISO 4.3.
        </p>
        <Textarea
          className="h-24"
          value={data.escopoGestao || ''}
          onChange={(e) => update({ escopoGestao: e.target.value })}
          placeholder="Ex: O programa abrange todas as unidades operacionais no estado de São Paulo, incluindo diretoria executiva, operacional e cadeia de fornecedores diretos."
        />
      </div>
    </div>
  )
}
