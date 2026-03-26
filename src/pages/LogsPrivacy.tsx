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
import { Eye, ShieldCheck, Database } from 'lucide-react'

const mockLogs = [
  {
    id: 'lg-001',
    time: '2023-10-27 14:32:01',
    user: 'Admin Sistema',
    action: 'UPDATE',
    resource: 'Tenant Config',
    ip: '192.168.1.1',
  },
  {
    id: 'lg-002',
    time: '2023-10-27 15:10:45',
    user: 'João Silva',
    action: 'READ',
    resource: 'Dados Sensíveis (Denúncia #8821)',
    ip: '10.0.0.5',
  },
  {
    id: 'lg-003',
    time: '2023-10-28 09:15:22',
    user: 'Maria Souza',
    action: 'CREATE',
    resource: 'Upload Evidência (Req 4.1)',
    ip: '10.0.0.8',
  },
  {
    id: 'lg-004',
    time: '2023-10-28 11:00:00',
    user: 'Admin Sistema',
    action: 'DELETE',
    resource: 'Usuário Inativo',
    ip: '192.168.1.1',
  },
]

export default function LogsPrivacy() {
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
            <p className="text-xs text-slate-500 mt-1">Contexto atual: t-123</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 border-emerald-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-emerald-700">
              <ShieldCheck className="h-4 w-4" /> Integridade dos Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-900">Verificada</p>
            <p className="text-xs text-emerald-600 mt-1">Hash SHA-256 Validado</p>
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
              {mockLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs whitespace-nowrap">{log.time}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        log.action === 'CREATE'
                          ? 'text-emerald-600 border-emerald-200'
                          : log.action === 'DELETE'
                            ? 'text-red-600 border-red-200'
                            : log.action === 'UPDATE'
                              ? 'text-amber-600 border-amber-200'
                              : 'text-indigo-600 border-indigo-200'
                      }
                    >
                      {log.action}
                    </Badge>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
