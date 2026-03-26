import { useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SensitiveData } from '@/components/SensitiveData'
import { UploadCloud, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const ISO_ITEMS = [
  '4.1 Entendimento da organização',
  '4.2 Partes interessadas',
  '4.3 Escopo do sistema',
  '4.4 Sistema de gestão',
  '5.1 Liderança e comprometimento',
  '5.1.1 Órgão diretivo',
  '5.1.2 Cultura de compliance',
  '5.2 Política de compliance',
  '5.3 Funções e responsabilidades',
  '5.3.1 Alta direção',
  '5.3.2 Função de compliance',
  '6.1 Riscos e oportunidades',
  '6.2 Objetivos de compliance',
  '6.3 Planejamento de alterações',
  '7.1 Recursos',
  '7.2 Competência',
  '7.3 Conscientização',
  '7.4 Comunicação',
  '7.5 Informação documentada',
  '8.1 Controle operacional',
  '8.2 Canal de denúncias',
  '9.1 Monitoramento e medição',
  '9.2 Auditoria interna',
  '9.3 Revisão pela direção',
  '10.1 Melhoria contínua',
  '10.2 Ação corretiva',
]

const OSC_ITEMS = [
  '1. Estatuto Social (Adequação Lei 13.019/14)',
  '2. Transparência Ativa (Portal na Internet)',
  '3. Conselho Fiscal Ativo e Constituído',
  '4. Regulamento de Compras e Contratações',
  '5. Política de Prevenção a Conflito de Interesses',
  '6. Conformidade de Prestação de Contas',
]

export default function TrackModule() {
  const { trackId } = useParams()
  const { toast } = useToast()

  const isOsc = trackId === 'osc-track'
  const isIso = trackId === 'iso-core'

  const items = isOsc
    ? OSC_ITEMS
    : isIso
      ? ISO_ITEMS
      : ['1. Requisito Genérico Módulo Específico', '2. Validação Documental']
  const title = isOsc
    ? 'Módulo OSC (Terceiro Setor)'
    : isIso
      ? 'ISO Core 37001/37301'
      : `Módulo: ${trackId}`
  const desc = isOsc
    ? 'Requisitos específicos de transparência e governança para Organizações da Sociedade Civil.'
    : isIso
      ? 'Núcleo base de conformidade e integridade corporativa, contendo os 26 itens normativos.'
      : 'Requisitos baseados na legislação vigente para o perfil selecionado.'

  const handleUpload = () => {
    toast({
      title: 'Upload Iniciado',
      description: 'O arquivo será processado, armazenado com hash seguro e verificado.',
    })
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Card className="border-l-4 border-l-primary shadow-sm bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
                {isIso && <ShieldAlert className="size-6 text-primary" />}
                {title}
              </CardTitle>
              <CardDescription className="mt-1 text-base">{desc}</CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-indigo-50 text-indigo-700 border-indigo-200 uppercase tracking-widest text-[10px]"
            >
              {items.length} Requisitos Ativos
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <CheckCircle2 className="size-5 text-emerald-500" />
          Checklist de Avaliação
        </h3>

        <Accordion
          type="single"
          collapsible
          className="w-full bg-card rounded-lg border shadow-subtle"
        >
          {items.map((item, idx) => {
            const isDenuncia = item.toLowerCase().includes('denúncia')
            const isConforme = idx === 0 || idx === 4

            return (
              <AccordionItem value={`req-${idx}`} key={idx} className="px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4 w-full pr-4">
                    <div className="flex-1 text-left flex items-center gap-2 font-medium">
                      {item}
                      {isDenuncia && <ShieldAlert className="size-4 text-amber-500" />}
                    </div>
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
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 space-y-6 border-t mt-2">
                  <p className="text-muted-foreground text-sm">
                    Requisito de avaliação para determinar a conformidade e aderência da organização
                    em relação à cláusula especificada na norma ou lei aplicável.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Status da Avaliação</label>
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

                    <div className="space-y-3">
                      <label className="text-sm font-medium">Responsável</label>
                      <Select defaultValue="unassigned">
                        <SelectTrigger>
                          <SelectValue placeholder="Atribuir responsável..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">Não atribuído</SelectItem>
                          <SelectItem value="joao">João Silva (Compliance)</SelectItem>
                          <SelectItem value="maria">Maria Souza (Diretoria)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {isDenuncia ? (
                    <div className="bg-red-50 text-red-800 p-4 rounded-lg text-sm border border-red-100 space-y-4">
                      <div>
                        <strong>Aviso de Privacidade Nível Crítico:</strong> Dados vinculados a este
                        módulo estão sujeitos a rigorosa proteção criptográfica.
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Exemplo de Acesso Restrito (Log Auditado)
                        </label>
                        <SensitiveData
                          label="Dados do Denunciante (#902)"
                          value="Criptografado AES-256"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 border border-dashed rounded-lg bg-muted/30 text-center space-y-3 transition-colors hover:bg-muted/50">
                      <UploadCloud className="mx-auto text-muted-foreground/60 size-10" />
                      <div>
                        <p className="text-sm font-medium">Arraste a evidência documental aqui</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Arquivos em PDF ou Excel até 15MB
                        </p>
                      </div>
                      <Button variant="secondary" size="sm" onClick={handleUpload} className="mt-2">
                        Procurar Arquivo
                      </Button>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
