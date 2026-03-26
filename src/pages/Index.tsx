import { useTenant } from '@/contexts/TenantContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProgressChart } from '@/components/dashboard/ProgressChart'
import { AlertCircle, Clock, ShieldAlert } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const Index = () => {
  const { tenant, activeTracks } = useTenant()

  // Guard clause para evitar erro ao acessar propriedades de null antes do carregamento
  if (!tenant) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-[300px]" />
          <Skeleton className="h-5 w-[400px]" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Classification Summary Skeleton */}
          <Card className="md:col-span-2 bg-gradient-to-br from-card to-muted/30 shadow-subtle border-border/50">
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview Skeleton */}
          <Card className="shadow-subtle border-border/50">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pb-6">
              <Skeleton className="h-[150px] w-[150px] rounded-full my-2" />
              <Skeleton className="h-8 w-16 mt-4" />
              <Skeleton className="h-3 w-32 mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Action Center Skeleton */}
          <Card className="shadow-subtle border-border/50">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full shrink-0 ml-4" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Logs Skeleton */}
          <Card className="shadow-subtle border-border/50">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="h-4 w-4 rounded-sm mt-1" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Comando de Compliance</h1>
        <p className="text-muted-foreground">
          Visão geral do programa de integridade e ações pendentes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Classification Summary */}
        <Card className="md:col-span-2 bg-gradient-to-br from-card to-muted/30 shadow-subtle border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Classificação do Tenant</CardTitle>
            <CardDescription>Parâmetros que definem as trilhas ativas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Natureza</span>
                <p className="font-semibold uppercase text-primary">{tenant.nature}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Rel. Poder Público
                </span>
                <p className="font-semibold">
                  {tenant.publicRelationship ? 'Sim (Aplicável)' : 'Não'}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Trilhas Ativadas</span>
                <div className="flex gap-2 mt-1">
                  {activeTracks.map((t) => (
                    <Badge key={t} variant="secondary" className="bg-primary/10 text-primary">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="shadow-subtle border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Aderência Global</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressChart />
            <div className="text-center mt-2 text-2xl font-bold text-emerald-600">65%</div>
            <p className="text-center text-xs text-muted-foreground">Nível de Conformidade</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Action Center */}
        <Card className="shadow-subtle border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="text-amber-500 h-5 w-5" />
              Ações Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: 1, title: 'Upload de Código de Conduta', track: 'ISO Core', priority: 'high' },
              {
                id: 2,
                title: 'Nomeação do Encarregado (DPO)',
                track: 'LGPD Escolar',
                priority: 'high',
              },
              { id: 3, title: 'Evidência de Treinamento', track: 'Módulo OSC', priority: 'medium' },
            ].map((action) => (
              <div
                key={action.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.track}</p>
                </div>
                <Badge variant={action.priority === 'high' ? 'destructive' : 'secondary'}>
                  {action.priority === 'high' ? 'Crítico' : 'Atenção'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Logs */}
        <Card className="shadow-subtle border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="text-slate-500 h-5 w-5" />
              Log de Atividades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                id: 1,
                user: 'Admin',
                action: 'Atualizou status',
                item: 'Req 4.1',
                time: '10 min atrás',
              },
              {
                id: 2,
                user: 'Consultor',
                action: 'Visualizou dado sensível',
                item: 'Canal de Denúncia',
                time: '1 hora atrás',
              },
              {
                id: 3,
                user: 'Sistema',
                action: 'Gerou Hash Seguro',
                item: 'Documento X',
                time: 'Ontem',
              },
            ].map((log) => (
              <div key={log.id} className="flex items-start gap-3 text-sm">
                <ShieldAlert className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p>
                    <span className="font-semibold">{log.user}</span> {log.action} em{' '}
                    <span className="font-medium text-indigo-600">{log.item}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{log.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Index
