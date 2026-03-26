import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit, ShieldCheck } from 'lucide-react'

export function Summary({ data, tenant, onEdit }: any) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-4 rounded-md border border-emerald-200">
        <div className="flex items-center gap-3">
          <ShieldCheck className="size-6" />
          <div>
            <h3 className="font-semibold">Perfil Sincronizado</h3>
            <p className="text-sm opacity-90">
              Os dados institucionais estão abastecendo o núcleo ISO 37301 automaticamente.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="bg-white text-emerald-800 hover:bg-emerald-100 border-emerald-300"
        >
          <Edit className="size-4 mr-2" /> Editar Dados
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-none border-border/50 bg-muted/10">
          <CardContent className="p-4 space-y-3 text-sm">
            <h4 className="font-semibold text-base border-b pb-2">
              ISO 4.1 & 4.3 (Contexto e Escopo)
            </h4>
            <div>
              <span className="text-muted-foreground">Organização:</span>{' '}
              <strong className="float-right">{data.razaoSocial || tenant?.name}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">CNPJ:</span>{' '}
              <strong className="float-right">{data.cnpj || '-'}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Natureza:</span>{' '}
              <strong className="float-right uppercase">{tenant?.nature}</strong>
            </div>
            <div className="pt-2">
              <span className="text-muted-foreground block mb-1">Escopo do Sistema:</span>
              <div className="bg-background p-2 rounded text-xs leading-relaxed border">
                {data.escopoGestao || 'Não definido'}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-border/50 bg-muted/10">
          <CardContent className="p-4 space-y-3 text-sm">
            <h4 className="font-semibold text-base border-b pb-2">
              ISO 5.1 & 5.3 (Liderança e Funções)
            </h4>
            <div>
              <span className="text-muted-foreground">Rep. Legal:</span>{' '}
              <strong className="float-right">{data.repNome || '-'}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Resp. Compliance:</span>{' '}
              <strong className="float-right">{data.compNome || '-'}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Compliance Officer:</span>{' '}
              <strong className="float-right">{data.complianceOfficer || 'Não designado'}</strong>
            </div>
            <div className="pt-2">
              <span className="text-muted-foreground block mb-1">Órgão Diretivo:</span>
              <div className="bg-background p-2 rounded text-xs border">
                {Array.isArray(data.diretoria) && data.diretoria.length > 0
                  ? data.diretoria.map((d: any) => d.nome).join(', ')
                  : 'Não informado'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
