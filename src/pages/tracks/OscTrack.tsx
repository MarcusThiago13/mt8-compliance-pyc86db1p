import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Building2,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  FileText,
  Activity,
  AlertCircle,
} from 'lucide-react'
import { useTenant } from '@/contexts/TenantContext'

const DOCS_REGULARIDADE = [
  { id: 1, nome: 'Estatuto Social Registrado', status: 'Apto', critico: true },
  { id: 2, nome: 'Ata de Eleição da Diretoria Atual', status: 'Apto', critico: true },
  { id: 3, nome: 'Certidão Negativa de Débitos (CND) Federal', status: 'Atenção', critico: true },
  { id: 4, nome: 'Certidão de Regularidade do FGTS (CRF)', status: 'Apto', critico: true },
  { id: 5, nome: 'Alvará de Funcionamento', status: 'Bloqueado', critico: false },
  { id: 6, nome: 'Inscrição no Conselho Municipal', status: 'Atenção', critico: false },
]

export default function OscTrack() {
  const { tenant } = useTenant()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Apto':
        return <CheckCircle2 className="size-4 text-emerald-500" />
      case 'Atenção':
        return <AlertTriangle className="size-4 text-amber-500" />
      case 'Bloqueado':
        return <ShieldAlert className="size-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Apto':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800'
      case 'Atenção':
        return 'bg-amber-50 border-amber-200 text-amber-800'
      case 'Bloqueado':
        return 'bg-red-50 border-red-200 text-red-800'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Card className="border-l-4 border-l-indigo-500 shadow-sm bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
                <Building2 className="size-6 text-indigo-500" />
                Módulo Terceiro Setor (OSC)
              </CardTitle>
              <CardDescription className="mt-1 text-base">
                Conformidade MROSC, Regularidade e Prestação de Contas em tempo real.
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-indigo-50 text-indigo-700 border-indigo-200 text-sm py-1"
            >
              Painel Integrado
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="regularidade" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto gap-2 bg-muted/50 p-1 mb-6">
          <TabsTrigger value="regularidade" className="py-2.5">
            Regularidade
          </TabsTrigger>
          <TabsTrigger value="mrosc" className="py-2.5">
            Gestão MROSC
          </TabsTrigger>
          <TabsTrigger value="contas" className="py-2.5">
            Prestação de Contas
          </TabsTrigger>
          <TabsTrigger value="cebas" className="py-2.5">
            CEBAS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="regularidade" className="space-y-4">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="size-5 text-slate-600" /> Semáforo de Prontidão Institucional
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-3">
                {DOCS_REGULARIDADE.map((doc) => (
                  <div
                    key={doc.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-md border gap-2 ${getStatusColor(doc.status)}`}
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(doc.status)}
                      <span className="font-medium text-sm">{doc.nome}</span>
                      {doc.critico && (
                        <Badge variant="destructive" className="text-[10px] h-5">
                          Bloqueante
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mrosc">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Ciclo de Vida da Parceria</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center relative mb-8 px-4 hidden sm:flex">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -z-10 -translate-y-1/2 rounded-full"></div>
                {['Habilitação', 'Celebração', 'Execução', 'Prestação', 'Encerramento'].map(
                  (step, i) => (
                    <div key={step} className="flex flex-col items-center gap-2 bg-card px-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${i === 2 ? 'border-primary bg-primary text-primary-foreground' : i < 2 ? 'border-primary bg-primary/10 text-primary' : 'border-muted-foreground bg-muted text-muted-foreground'}`}
                      >
                        {i + 1}
                      </div>
                      <span
                        className={`text-xs font-medium ${i === 2 ? 'text-primary' : 'text-muted-foreground'}`}
                      >
                        {step}
                      </span>
                    </div>
                  ),
                )}
              </div>
              <div className="bg-muted/30 p-6 rounded-lg border text-center text-sm text-muted-foreground">
                <FileText className="size-8 mx-auto mb-3 text-primary/40" />
                Selecione uma parceria ativa na etapa de <strong>Execução</strong> para gerenciar
                metas e alcance de indicadores MROSC.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contas" className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="shadow-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Conciliação Bancária</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">89%</div>
                <p className="text-xs text-muted-foreground">Despesas comprovadas</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Padrão CGU (DID)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">2</div>
                <p className="text-xs text-muted-foreground">Relatórios pendentes</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-border/50 bg-red-50 border-red-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-red-800">Diligências / Glosas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">1</div>
                <p className="text-xs text-red-600/80">Requer resposta imediata</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cebas">
          <Card>
            <CardContent className="py-12 flex flex-col items-center justify-center text-center">
              <AlertCircle className="size-12 text-muted-foreground/40 mb-4" />
              <h3 className="text-xl font-bold mb-2">Módulo CEBAS Desativado</h3>
              <p className="text-muted-foreground max-w-md">
                A certificação de Entidade Beneficente de Assistência Social não está habilitada
                para este tenant. Apenas Super Admins podem ativar este módulo de alto rigor
                normativo.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
