import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, ShieldCheck, Database, ShieldAlert } from 'lucide-react'

export default function LogsPrivacy() {
  // Garantia de Zero Dados Fictícios: Removidos todos os mocks (Admin Sistema, João Silva, etc.)
  const logs: any[] = []

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Logs Imutáveis & Privacidade</h1>
        <p className="text-muted-foreground">
          Trilha de auditoria completa ("Privacy by Design"). Dados selados criptograficamente.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-slate-50 border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700">
              <Database className="h-4 w-4" /> Isolamento de Tenant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">Ativo</p>
            <p className="text-xs text-slate-500 mt-1">Contexto dinâmico isolado</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 border-emerald-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-emerald-700">
              <ShieldCheck className="h-4 w-4" /> Integridade dos Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-900">Aguardando Eventos</p>
            <p className="text-xs text-emerald-600 mt-1">
              [ a preencher com validação de hash real ]
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trilha de Auditoria Recente</CardTitle>
          <CardDescription>
            Apenas leitura. Interações no sistema nos últimos 30 dias.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Recurso/Alvo</TableHead>
                <TableHead>Origem (IP)</TableHead>
                <TableHead className="text-right">Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs whitespace-nowrap">
                      {log.time}
                    </TableCell>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.action}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{log.resource}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {log.ip}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" title="Ver Diff">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <ShieldAlert className="h-8 w-8 text-muted-foreground/30 mb-2" />
                      <p className="font-medium text-foreground">
                        Nenhum registro de auditoria no período
                      </p>
                      <p className="text-xs opacity-70">
                        [ a preencher com eventos reais do sistema ]
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
