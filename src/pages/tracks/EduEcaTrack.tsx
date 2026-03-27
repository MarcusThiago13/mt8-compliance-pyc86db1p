import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Baby, ShieldAlert, Plus, EyeOff, BellRing } from 'lucide-react'

export default function EduEcaTrack() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      <Card className="border-l-4 border-l-rose-500 shadow-sm bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
                <Baby className="size-6 text-rose-500" />
                Proteção Infantil e Inclusão (ECA)
              </CardTitle>
              <CardDescription className="mt-1 text-base">
                Gestão rigorosa e sigilosa de incidentes, suspeitas e notificações ao Conselho
                Tutelar.
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 py-1">
              Alta Sensibilidade
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                <EyeOff className="size-5 text-muted-foreground" />
                Registro de Incidentes
              </CardTitle>
              <Button size="sm" className="gap-2 bg-rose-600 hover:bg-rose-700">
                <Plus className="size-4" /> Novo Relato
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center p-6 border-2 border-dashed rounded-lg bg-muted/10">
              <ShieldAlert className="size-10 text-rose-500/50 mx-auto mb-3" />
              <p className="font-medium text-sm text-foreground">Acesso Restrito</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-[250px] mx-auto">
                Registros anonimizados e protegidos por criptografia. Apenas usuários com perfil
                adequado podem visualizar.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <BellRing className="size-5 text-amber-500" />
              Notificações (Conselho Tutelar)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                    Aguardando Envio
                  </Badge>
                  <span className="text-xs text-muted-foreground">Hoje, 09:41</span>
                </div>
                <p className="text-sm font-medium text-amber-900">Relatório Consolidado #882</p>
                <p className="text-xs text-amber-800/80 mt-1">
                  Evasão escolar / Suspeita de negligência
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-4 w-full bg-white text-amber-900 border-amber-300 hover:bg-amber-100"
                >
                  Gerar Ofício
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
