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
import { PlusCircle, Edit, ExternalLink, ShieldCheck, Building2 } from 'lucide-react'

const NATURE_LABELS: Record<string, string> = {
  private: 'Empresa Privada',
  osc: 'OSC',
  public: 'Órgão Público',
}

const AREA_LABELS: Record<string, string> = {
  education: 'Educação',
  health: 'Saúde',
  social: 'Assistência Social',
  culture: 'Cultura',
  environment: 'Meio Ambiente',
  other: 'Outra',
}

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
          {tenants.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold">Nenhum cliente cadastrado</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Comece adicionando seu primeiro cliente para provisionar um ambiente.
              </p>
              <Button asChild>
                <Link to="/admin/novo-cliente">
                  <PlusCircle className="mr-2 h-4 w-4" /> Novo Cliente
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Cliente</TableHead>
                  <TableHead>Natureza</TableHead>
                  <TableHead>Áreas de Atuação</TableHead>
                  <TableHead>Rel. Pública</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[11px] bg-slate-50 font-medium">
                        {NATURE_LABELS[t.nature] || t.nature}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {t.areas?.length ? (
                          t.areas.map((a) => (
                            <Badge key={a} variant="secondary" className="text-[10px] font-normal">
                              {AREA_LABELS[a] || a}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {t.publicRelationship ? (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                          Sim
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="font-normal">
                          Não
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-slate-100 font-normal">
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
