import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HeartHandshake, Users, FileEdit, Building } from 'lucide-react'

export default function EduInclusiveTrack() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      <Card className="border-l-4 border-l-teal-500 shadow-sm bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
                <HeartHandshake className="size-6 text-teal-500" />
                Educação Especial Inclusiva
              </CardTitle>
              <CardDescription className="mt-1 text-base">
                Gestão de PAEE/PEI, equipe multiprofissional e adequação de recursos para alunos de
                inclusão.
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 py-1">
              Apoio Multidisciplinar
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileEdit className="size-5 text-slate-600" /> Planos Educacionais (PAEE/PEI)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {[
                { name: 'Estudo de Caso - Aluno A', date: 'Atualizado há 2 dias', status: 'Ativo' },
                { name: 'Revisão PEI - Aluno B', date: 'Pendente revisão', status: 'Atenção' },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 border rounded-lg bg-card"
                >
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{doc.date}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      doc.status === 'Ativo'
                        ? 'bg-teal-50 text-teal-700'
                        : 'bg-amber-50 text-amber-700'
                    }
                  >
                    {doc.status}
                  </Badge>
                </div>
              ))}
              <Button
                variant="ghost"
                className="w-full mt-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50"
              >
                Ver todos os planos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="size-5 text-slate-600" /> Recursos e Equipe
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="p-3 bg-muted/30 rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Equipe Multiprofissional</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs bg-background">
                    Psicopedagogo
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-background">
                    Fonoaudiólogo
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-background">
                    Terapeuta Ocupacional
                  </Badge>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Sala de Recursos Multifuncionais</span>
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none">
                    Disponível
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Espaço adaptado e equipado para suporte ao aprendizado, com capacidade para 15
                  atendimentos especializados por semana.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
