import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpenCheck, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react'

const DOCS_EDUCACIONAIS = [
  { id: 1, nome: 'Ato de Autorização de Funcionamento', status: 'Apto', critico: true },
  { id: 2, nome: 'Aprovação do Projeto Político Pedagógico (PPP)', status: 'Apto', critico: true },
  { id: 3, nome: 'Alvará Sanitário (Vigilância Sanitária)', status: 'Atenção', critico: true },
  {
    id: 4,
    nome: 'Auto de Vistoria do Corpo de Bombeiros (AVCB)',
    status: 'Bloqueado',
    critico: true,
  },
  { id: 5, nome: 'Regimento Escolar Atualizado', status: 'Apto', critico: false },
  { id: 6, nome: 'Certificado de Acessibilidade', status: 'Atenção', critico: false },
]

export default function EduComplianceTrack() {
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
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      <Card className="border-l-4 border-l-blue-500 shadow-sm bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
                <BookOpenCheck className="size-6 text-blue-500" />
                Conformidade Educacional
              </CardTitle>
              <CardDescription className="mt-1 text-base">
                Gestão de licenças, autorizações pedagógicas e prontidão estrutural escolar.
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 py-1">
              Trilha Educação
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            Semáforo de Prontidão Escolar
          </CardTitle>
          <CardDescription>
            Acompanhamento dos alvarás e licenças obrigatórias para o regular funcionamento da
            instituição.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-3">
            {DOCS_EDUCACIONAIS.map((doc) => (
              <div
                key={doc.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-md border gap-2 transition-colors ${getStatusColor(doc.status)}`}
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
                <span className="text-xs font-semibold uppercase tracking-wider">{doc.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
