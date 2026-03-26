import { Link, useNavigate } from 'react-router-dom'
import { useTenant } from '@/contexts/TenantContext'
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
import { PlusCircle, Edit, ExternalLink, ShieldCheck } from 'lucide-react'

export default function AdminDashboard() {
  const { tenants, switchTenant } = useTenant()
  const navigate = useNavigate()

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ShieldCheck className="text-primary size-8" /> Portal Super Admin
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestão centralizada de clientes e ambientes isolados via RLS.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link to="/admin/novo-cliente">
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Cliente
          </Link>
        </Button>
      </div>

      <Card className="shadow-subtle border-border/50">
        <CardHeader>
          <CardTitle>Tenants Cadastrados</CardTitle>
          <CardDescription>
            Acesse as instâncias, modifique classificações e gerencie permissões dos clientes mt8.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Cliente</TableHead>
                <TableHead>Natureza</TableHead>
                <TableHead>Rel. Pública</TableHead>
                <TableHead>Perfil de Acesso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="uppercase text-[10px] bg-slate-50">
                      {t.nature}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {t.publicRelationship ? (
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                        Sim
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Não</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-slate-100">
                      {t.accessProfile}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/admin/clientes/${t.id}`}>
                        <Edit className="h-3 w-3 mr-1" /> Editar
                      </Link>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        switchTenant(t.id)
                        navigate('/')
                      }}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" /> Entrar no Tenant
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
