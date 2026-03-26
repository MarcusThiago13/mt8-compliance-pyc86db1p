import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { FileText, Upload, Download, Search, ShieldCheck } from 'lucide-react'

const mockDocs = [
  {
    id: '1',
    name: 'Código de Conduta Ética v2.pdf',
    track: 'ISO Core',
    status: 'Aprovado',
    date: '25/10/2023',
    size: '2.4 MB',
  },
  {
    id: '2',
    name: 'Matriz de Riscos 2023.xlsx',
    track: 'ISO Core',
    status: 'Em Revisão',
    date: '28/10/2023',
    size: '1.1 MB',
  },
  {
    id: '3',
    name: 'Estatuto_Social_Registrado.pdf',
    track: 'Módulo OSC',
    status: 'Aprovado',
    date: '10/09/2023',
    size: '4.5 MB',
  },
  {
    id: '4',
    name: 'Regulamento_Compras_Assinado.pdf',
    track: 'Contratos Públicos',
    status: 'Aprovado',
    date: '15/10/2023',
    size: '3.2 MB',
  },
]

export default function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Repositório de Evidências</h1>
          <p className="text-muted-foreground mt-1">
            Gestão centralizada de documentos probatórios das trilhas ativas.
          </p>
        </div>
        <Button className="shrink-0 gap-2">
          <Upload className="size-4" /> Upload de Documento
        </Button>
      </div>

      <Card className="shadow-subtle border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Arquivos do Tenant</CardTitle>
              <CardDescription>Evidências associadas aos requisitos normativos</CardDescription>
            </div>
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar documentos..." className="pl-9 bg-muted/50" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Arquivo</TableHead>
                <TableHead>Trilha / Módulo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDocs.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="size-4 text-primary/70" />
                    {doc.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs bg-slate-50 font-normal">
                      {doc.track}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        doc.status === 'Aprovado'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }
                    >
                      {doc.status === 'Aprovado' && <ShieldCheck className="mr-1 size-3" />}
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{doc.date}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{doc.size}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" title="Download">
                      <Download className="size-4" />
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
