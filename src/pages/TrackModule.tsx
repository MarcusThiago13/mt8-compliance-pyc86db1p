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
import { UploadCloud, FileCheck, ShieldAlert } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function TrackModule() {
  const { trackId } = useParams()
  const { toast } = useToast()

  const handleUpload = () => {
    toast({ title: 'Upload Iniciado', description: 'Arquivo será processado e verificado.' })
  }

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-primary shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl uppercase tracking-wide">
                Módulo: {trackId?.replace('-', ' ')}
              </CardTitle>
              <CardDescription className="mt-1">
                Requisitos baseados na legislação vigente para o perfil selecionado.
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200"
            >
              Ref. Normativa: Lei 14.133/21
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Checklist de Requisitos</h3>

        <Accordion
          type="single"
          collapsible
          className="w-full bg-card rounded-lg border shadow-subtle"
        >
          <AccordionItem value="req-1" className="px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-4 w-full pr-4">
                <div className="flex-1 text-left">
                  <span className="font-semibold mr-2">4.1</span>
                  Entendimento da Organização e seu Contexto
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                  Conforme
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6 space-y-6 border-t mt-2">
              <p className="text-muted-foreground text-sm">
                A organização deve determinar as questões externas e internas que são pertinentes
                para o seu propósito e que afetam sua capacidade de alcançar os resultados
                pretendidos.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Status do Requisito</label>
                  <Select defaultValue="conforme">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nao_conforme">Não Conforme</SelectItem>
                      <SelectItem value="em_andamento">Em Progresso</SelectItem>
                      <SelectItem value="conforme">Conforme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Responsável</label>
                  <Select defaultValue="joao">
                    <SelectTrigger>
                      <SelectValue placeholder="Atribuir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joao">João Silva (Compliance Officer)</SelectItem>
                      <SelectItem value="maria">Maria Souza (RH)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 border border-dashed rounded-lg bg-muted/20 text-center space-y-3">
                <UploadCloud className="mx-auto text-muted-foreground h-8 w-8" />
                <div>
                  <p className="text-sm font-medium">Arraste a evidência documental aqui</p>
                  <p className="text-xs text-muted-foreground">PDF, DOCX até 10MB</p>
                </div>
                <Button variant="secondary" size="sm" onClick={handleUpload}>
                  Selecionar Arquivo
                </Button>
                <div className="mt-4 flex justify-center items-center gap-2 text-sm text-emerald-600 bg-emerald-50 w-fit mx-auto px-3 py-1 rounded-md">
                  <FileCheck size={16} /> matriz_riscos_v2.pdf anexado
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="req-2" className="px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-4 w-full pr-4">
                <div className="flex-1 text-left flex items-center gap-2">
                  <span className="font-semibold">8.2</span>
                  Canal de Denúncias
                  <ShieldAlert className="h-4 w-4 text-amber-500" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800 hover:bg-amber-200"
                >
                  Atenção
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6 space-y-6 border-t mt-2">
              <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm border border-red-100 mb-4">
                <strong>Aviso de Privacidade:</strong> Dados de denunciantes estão sujeitos a
                rigorosa proteção. O acesso é auditado.
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Última Denúncia Registrada (Identidade Oculta)
                </label>
                <SensitiveData label="Nome do Denunciante (#8821)" value="Carlos Almeida Souza" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
