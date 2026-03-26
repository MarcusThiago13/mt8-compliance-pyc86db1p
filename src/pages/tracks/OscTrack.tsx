import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Building,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Lock,
  FileText,
  Wallet,
  Search,
} from 'lucide-react'

export default function OscTrack() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Card className="border-l-4 border-l-primary shadow-sm bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
                <Building className="size-6 text-primary" />
                Módulo OSC (Terceiro Setor)
              </CardTitle>
              <CardDescription className="mt-1 text-base">
                Gestão estruturada de parcerias, regularidade institucional e prestação de contas
                (MROSC).
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="regularidade" className="w-full">
        <TabsList className="flex flex-wrap w-full justify-start h-auto p-1 bg-muted/50 rounded-lg border gap-1">
          <TabsTrigger value="regularidade" className="py-2.5 px-4 text-xs sm:text-sm">
            Regularidade Institucional
          </TabsTrigger>
          <TabsTrigger value="parcerias" className="py-2.5 px-4 text-xs sm:text-sm">
            Gestão de Parcerias MROSC
          </TabsTrigger>
          <TabsTrigger value="prestacao" className="py-2.5 px-4 text-xs sm:text-sm">
            Prestação de Contas
          </TabsTrigger>
          <TabsTrigger value="cebas" className="py-2.5 px-4 text-xs sm:text-sm">
            CEBAS
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="regularidade" className="m-0 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle2 className="size-5 text-emerald-500" /> Semáforo de Prontidão Documental
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Acompanhe o checklist de documentos críticos para a manutenção da regularidade da
              organização perante os órgãos públicos.
            </p>

            <div className="border rounded-md bg-card overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Documento Requisitado</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Validade / Observação</TableHead>
                    <TableHead>Criticidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Estatuto Social (Adequado Lei 13.019/14)
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 shadow-none">
                        <CheckCircle2 className="size-3 mr-1" /> Apto
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">Indeterminado</TableCell>
                    <TableCell>
                      <Badge variant="destructive" className="uppercase text-[10px] tracking-wider">
                        Bloqueante
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CND Federal / Previdenciária</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 shadow-none">
                        <AlertTriangle className="size-3 mr-1" /> Atenção
                      </Badge>
                    </TableCell>
                    <TableCell className="text-amber-600 font-medium">Vence em 5 dias</TableCell>
                    <TableCell>
                      <Badge variant="destructive" className="uppercase text-[10px] tracking-wider">
                        Bloqueante
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Conselho Fiscal Ativo e Constituído
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200 shadow-none">
                        <AlertCircle className="size-3 mr-1" /> Bloqueado
                      </Badge>
                    </TableCell>
                    <TableCell className="text-red-600 font-medium">Pendente de Ata</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="uppercase text-[10px] text-muted-foreground border-muted-foreground tracking-wider bg-transparent"
                      >
                        Importante
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Portal da Transparência Ativa</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 shadow-none">
                        <CheckCircle2 className="size-3 mr-1" /> Apto
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">Online e atualizado</TableCell>
                    <TableCell>
                      <Badge variant="destructive" className="uppercase text-[10px] tracking-wider">
                        Bloqueante
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="parcerias" className="m-0 space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="size-5 text-primary" /> Ciclo de Vida da Parceria
            </h3>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {['Habilitação', 'Celebração', 'Execução', 'Prestação', 'Encerramento'].map(
                    (step, idx) => {
                      const isCurrent = idx === 2
                      const isPast = idx < 2

                      return (
                        <div key={step} className="flex items-center gap-4 w-full md:w-auto">
                          <div
                            className={`flex-1 md:flex-initial flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors min-w-[140px] text-center
                           ${isCurrent ? 'border-primary bg-primary/5 shadow-sm' : isPast ? 'border-emerald-500/30 bg-emerald-50/50' : 'border-dashed border-muted bg-muted/10'}
                         `}
                          >
                            {isPast && <CheckCircle2 className="size-4 text-emerald-500 mb-1" />}
                            <span
                              className={`text-sm font-bold ${isCurrent ? 'text-primary' : isPast ? 'text-emerald-700' : 'text-muted-foreground'}`}
                            >
                              {step}
                            </span>
                            {isCurrent && (
                              <Badge className="mt-2 bg-primary/20 text-primary hover:bg-primary/30 border-none shadow-none text-[10px] uppercase tracking-wider">
                                Fase Atual
                              </Badge>
                            )}
                          </div>
                          {idx < 4 && (
                            <ArrowRight
                              className={`hidden md:block ${isPast ? 'text-emerald-400' : 'text-muted-foreground/30'}`}
                            />
                          )}
                        </div>
                      )
                    },
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prestacao" className="m-0 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Wallet className="size-5 text-primary" /> Controles de Prestação de Contas
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Módulos especializados para acompanhamento financeiro e resposta a apontamentos.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="hover:border-primary/50 transition-colors cursor-default shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-primary">Conciliação Bancária</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  Importação de extratos OFX e batimento automatizado de despesas vinculadas à conta
                  específica do termo de fomento/colaboração.
                </CardContent>
              </Card>
              <Card className="hover:border-primary/50 transition-colors cursor-default shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-primary">DID Padrão CGU</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  Geração da Declaração de Ingresso e Dispêndio estruturada para importação nos
                  portais de transparência públicos.
                </CardContent>
              </Card>
              <Card className="hover:border-primary/50 transition-colors cursor-default shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-primary">Gestão de Diligências</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  Acompanhamento centralizado de notificações do ente público com controle rígido de
                  prazos para defesa e saneamento.
                </CardContent>
              </Card>
              <Card className="hover:border-primary/50 transition-colors cursor-default shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-primary">Controle de Glosas</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  Registro histórico de despesas impugnadas, cálculo de correções e estruturação do
                  plano de ressarcimento ao erário.
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cebas" className="m-0">
            <Card className="border-dashed border-2 bg-muted/10 shadow-none mt-2">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <div className="bg-muted/50 p-4 rounded-full mb-4">
                  <Lock className="size-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Módulo CEBAS Condicional</h3>
                <p className="text-sm text-muted-foreground max-w-md mt-3 leading-relaxed">
                  O Certificado de Entidade Beneficente de Assistência Social exige controle
                  governamental avançado. A ativação desta área é restrita e controlada
                  exclusivamente pelo Super Admin no painel de configurações do Tenant.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
