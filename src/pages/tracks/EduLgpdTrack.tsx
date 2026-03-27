import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GraduationCap, Lock, FileText, CheckSquare } from 'lucide-react'

export default function EduLgpdTrack() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      <Card className="border-l-4 border-l-purple-500 shadow-sm bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
                <GraduationCap className="size-6 text-purple-500" />
                LGPD no Ambiente Escolar
              </CardTitle>
              <CardDescription className="mt-1 text-base">
                Gestão de dados de menores, termo de consentimento de responsáveis e RoPA escolar.
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200 py-1"
            >
              Privacidade
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="size-5 text-muted-foreground" />
              RoPA Escolar (Registro de Operações)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {[
              {
                proc: 'Matrícula e Rematrícula',
                bases: 'Obrigação Legal / Contrato',
                status: 'Mapeado',
              },
              { proc: 'Ficha de Saúde e Alergias', bases: 'Proteção à Vida', status: 'Mapeado' },
              { proc: 'Uso de Imagem (Eventos)', bases: 'Consentimento', status: 'Atenção' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg bg-muted/20 gap-2"
              >
                <div>
                  <p className="font-medium text-sm">{item.proc}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Lock className="size-3" /> Base: {item.bases}
                  </p>
                </div>
                <Badge
                  variant={item.status === 'Mapeado' ? 'default' : 'secondary'}
                  className={
                    item.status === 'Mapeado'
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckSquare className="size-5 text-muted-foreground" />
              Consentimentos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 text-center flex flex-col h-[calc(100%-1.5rem)]">
            <div className="flex-1 flex flex-col justify-center mb-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">84%</div>
              <p className="text-sm text-muted-foreground px-2">
                Dos alunos possuem o Termo de Uso de Imagem assinado pelos responsáveis legais.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full text-purple-700 border-purple-200 hover:bg-purple-50 mt-auto"
            >
              Auditar Pendentes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
