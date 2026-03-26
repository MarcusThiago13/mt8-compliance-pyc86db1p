import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ShieldAlert,
  UploadCloud,
  MessageSquare,
  History,
  FileText,
  CheckCircle2,
  Zap,
} from 'lucide-react'
import { SensitiveData } from '@/components/SensitiveData'
import { useToast } from '@/hooks/use-toast'
import { useTenant } from '@/contexts/TenantContext'

const ISO_ITEMS = [
  '4.1 Entendimento da organização e de seu contexto',
  '4.2 Entendimento das necessidades e expectativas das partes interessadas',
  '4.3 Determinação do escopo do sistema de gestão de compliance',
  '4.4 Sistema de gestão de compliance',
  '5.1 Liderança e comprometimento',
  '5.1.1 Órgão diretivo e alta direção',
  '5.1.2 Cultura de compliance',
  '5.2 Política de compliance',
  '5.3 Papéis, responsabilidades e autoridades',
  '6.1 Ações para abordar riscos e oportunidades',
  '6.2 Objetivos de compliance e planejamento para alcançá-los',
  '6.3 Planejamento de alterações',
  '7.1 Recursos',
  '7.2 Competência',
  '7.3 Conscientização',
  '7.4 Comunicação',
  '7.5 Informação documentada',
  '8.1 Planejamento e controle operacionais',
  '8.2 Estabelecendo controles e procedimentos',
  '8.3 Levantamento de preocupações (Canal de denúncias)',
  '8.4 Processos de investigação',
  '9.1 Monitoramento, medição, análise e avaliação',
  '9.2 Auditoria interna',
  '9.3 Revisão pela direção',
  '10.1 Melhoria contínua',
  '10.2 Não conformidade e ação corretiva',
]

export default function IsoCoreTrack() {
  const { toast } = useToast()
  const { tenant } = useTenant()

  const profile = tenant?.isoProfileData || {}
  const hasProfile = !!profile.profileComplete

  const handleUpload = () => {
    toast({
      title: 'Upload Iniciado',
      description: 'A evidência será processada e anexada ao requisito com segurança.',
    })
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Card className="border-l-4 border-l-primary shadow-sm bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
                <ShieldAlert className="size-6 text-primary" />
                ISO Core 37001/37301
              </CardTitle>
              <CardDescription className="mt-1 text-base">
                Núcleo base de conformidade e integridade corporativa, contendo os 26 itens
                normativos.
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              {ISO_ITEMS.length} Requisitos
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <CheckCircle2 className="size-5 text-emerald-500" />
          Checklist de Avaliação
        </h3>

        <Accordion type="single" collapsible className="w-full bg-card rounded-lg border shadow-sm">
          {ISO_ITEMS.map((item, idx) => {
            const isDenuncia = item.toLowerCase().includes('denúncia')
            const isConforme = idx === 0 || idx === 4

            return (
              <AccordionItem value={`req-${idx}`} key={idx} className="px-4">
                <AccordionTrigger className="hover:no-underline text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full pr-4">
                    <div className="flex-1 flex items-center gap-2 font-medium">
                      <span className="line-clamp-2">{item}</span>
                      {isDenuncia && <ShieldAlert className="size-4 text-amber-500 shrink-0" />}
                    </div>
                    <div className="shrink-0">
                      {isConforme ? (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                          Conforme
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-slate-100 font-normal">
                          Pendente
                        </Badge>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 border-t mt-2">
                  <Tabs defaultValue="conteudo" className="w-full mt-4">
                    <TabsList className="grid w-full sm:grid-cols-4 grid-cols-2 bg-muted/50 p-1 h-auto gap-1">
                      <TabsTrigger value="conteudo" className="text-xs sm:text-sm py-2">
                        <FileText className="size-4 mr-2 hidden sm:block" /> Conteúdo
                      </TabsTrigger>
                      <TabsTrigger value="evidencias" className="text-xs sm:text-sm py-2">
                        <UploadCloud className="size-4 mr-2 hidden sm:block" /> Evidências
                      </TabsTrigger>
                      <TabsTrigger value="comentarios" className="text-xs sm:text-sm py-2">
                        <MessageSquare className="size-4 mr-2 hidden sm:block" /> Comentários
                      </TabsTrigger>
                      <TabsTrigger value="historico" className="text-xs sm:text-sm py-2">
                        <History className="size-4 mr-2 hidden sm:block" /> Histórico
                      </TabsTrigger>
                    </TabsList>

                    <div className="mt-4 border rounded-md p-4 bg-background/50">
                      <TabsContent value="conteudo" className="m-0 space-y-4">
                        <div className="text-sm text-muted-foreground leading-relaxed p-3 bg-muted/30 rounded-md">
                          Descreva o detalhamento estrutural, a política aplicada e o status atual
                          de maturidade da organização no que tange a cláusula normativa{' '}
                          <strong>{item}</strong>.
                        </div>

                        {/* AUTO-FILL SECTIONS */}
                        {idx === 0 && hasProfile && (
                          <div className="bg-primary/5 p-4 rounded-md border border-primary/20 mt-4 animate-fade-in">
                            <h4 className="font-medium text-primary text-sm flex items-center gap-2 mb-3">
                              <Zap className="size-4" /> Dados sincronizados via Perfil da
                              Organização
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground block text-xs">
                                  Razão Social
                                </span>
                                <strong>{profile.razaoSocial}</strong>
                              </div>
                              <div>
                                <span className="text-muted-foreground block text-xs">
                                  Natureza
                                </span>
                                <strong className="uppercase">{tenant?.nature}</strong>
                              </div>
                              <div>
                                <span className="text-muted-foreground block text-xs">
                                  Fundação
                                </span>
                                <strong>{profile.dataFundacao || '-'}</strong>
                              </div>
                            </div>
                          </div>
                        )}
                        {idx === 2 && hasProfile && profile.escopoGestao && (
                          <div className="bg-primary/5 p-4 rounded-md border border-primary/20 mt-4 animate-fade-in">
                            <h4 className="font-medium text-primary text-sm flex items-center gap-2 mb-3">
                              <Zap className="size-4" /> Escopo do Sistema (Sincronizado)
                            </h4>
                            <p className="text-sm bg-background/50 p-2 rounded border border-primary/10">
                              {profile.escopoGestao}
                            </p>
                          </div>
                        )}
                        {idx === 4 && hasProfile && (
                          <div className="bg-primary/5 p-4 rounded-md border border-primary/20 mt-4 animate-fade-in">
                            <h4 className="font-medium text-primary text-sm flex items-center gap-2 mb-3">
                              <Zap className="size-4" /> Liderança Sincronizada
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground block text-xs">
                                  Representante Legal
                                </span>
                                <strong>
                                  {profile.repNome || '-'}{' '}
                                  {profile.repCargo ? `(${profile.repCargo})` : ''}
                                </strong>
                              </div>
                              <div>
                                <span className="text-muted-foreground block text-xs">
                                  Responsável Compliance
                                </span>
                                <strong>{profile.compNome || '-'}</strong>
                              </div>
                            </div>
                          </div>
                        )}
                        {idx === 8 && hasProfile && (
                          <div className="bg-primary/5 p-4 rounded-md border border-primary/20 mt-4 animate-fade-in">
                            <h4 className="font-medium text-primary text-sm flex items-center gap-2 mb-3">
                              <Zap className="size-4" /> Papéis e Responsabilidades Sincronizados
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground block text-xs">
                                  Órgão Diretivo
                                </span>
                                <strong>
                                  {Array.isArray(profile.diretoria) && profile.diretoria.length > 0
                                    ? profile.diretoria.map((d: any) => d.nome).join(', ')
                                    : '-'}
                                </strong>
                              </div>
                              <div>
                                <span className="text-muted-foreground block text-xs">
                                  Compliance Officer
                                </span>
                                <strong>{profile.complianceOfficer || 'Não designado'}</strong>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="grid sm:grid-cols-2 gap-6 pt-2">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                              Status da Avaliação
                            </label>
                            <Select defaultValue={isConforme ? 'conforme' : 'pendente'}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pendente">Pendente / Não Iniciado</SelectItem>
                                <SelectItem value="em_andamento">Em Progresso</SelectItem>
                                <SelectItem value="conforme">Conforme</SelectItem>
                                <SelectItem value="nao_conforme">Não Conforme</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                              Responsável
                            </label>
                            <Select defaultValue="unassigned">
                              <SelectTrigger>
                                <SelectValue placeholder="Atribuir..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="unassigned">Não atribuído</SelectItem>
                                <SelectItem value="compliance">Comitê de Compliance</SelectItem>
                                <SelectItem value="diretoria">Alta Direção</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {isDenuncia && (
                          <div className="bg-red-50 text-red-800 p-4 rounded-lg text-sm border border-red-100 mt-4 space-y-3">
                            <div>
                              <strong>Aviso de Privacidade Nível Crítico:</strong> Este requisito
                              manipula dados de denúncias sujeitos a rigorosa proteção
                              criptográfica.
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-red-900/70 uppercase">
                                Log Auditado Restrito
                              </label>
                              <SensitiveData
                                label="Dados do Denunciante (#902)"
                                value="Criptografia AES-256 ativa"
                              />
                            </div>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="evidencias" className="m-0">
                        <div className="p-8 border-2 border-dashed rounded-lg bg-muted/20 text-center space-y-4 transition-colors hover:bg-muted/40 hover:border-primary/50">
                          <UploadCloud className="mx-auto text-muted-foreground/50 size-10" />
                          <div>
                            <p className="text-sm font-medium">
                              Arraste a evidência documental aqui
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Formatos suportados: PDF, Excel, Imagens (até 15MB)
                            </p>
                          </div>
                          <Button variant="secondary" onClick={handleUpload}>
                            Procurar Arquivo
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent
                        value="comentarios"
                        className="m-0 py-8 text-center text-sm text-muted-foreground flex flex-col items-center"
                      >
                        <MessageSquare className="size-8 text-muted-foreground/30 mb-3" />
                        Nenhum comentário registrado para este requisito normativo.
                      </TabsContent>

                      <TabsContent value="historico" className="m-0 py-4">
                        <ul className="space-y-4 border-l-2 border-muted ml-3 pl-5 relative">
                          <li className="relative">
                            <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background"></span>
                            <p className="font-medium text-sm text-foreground">
                              Requisito gerado pelo sistema
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Automação mt8 • 01/10/2023 14:00
                            </p>
                          </li>
                          {isConforme && (
                            <li className="relative">
                              <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-background"></span>
                              <p className="font-medium text-sm text-foreground">
                                Status alterado para Conforme
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Super Admin • 15/10/2023 09:30
                              </p>
                            </li>
                          )}
                        </ul>
                      </TabsContent>
                    </div>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
