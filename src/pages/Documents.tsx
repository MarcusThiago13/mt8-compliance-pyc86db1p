import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, FolderOpen } from 'lucide-react'
import { useTenant } from '@/contexts/TenantContext'

export default function Documents() {
  const { tenant } = useTenant()

  // Ensure robust null guard so the layout never breaks if tenant is undefined
  if (!tenant) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Carregando repositório...</p>
      </div>
    )
  }

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
          <CardTitle className="text-lg">Arquivos do Tenant</CardTitle>
          <CardDescription>
            Evidências associadas aos requisitos normativos isoladas por cliente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-lg bg-muted/10">
            <FolderOpen className="size-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Nenhum documento encontrado
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              O repositório de <strong>{tenant.name}</strong> está vazio. Faça o upload do primeiro
              documento para iniciar a gestão de evidências.
            </p>
            <Button className="gap-2" variant="outline">
              <Upload className="size-4" /> Fazer Upload Local
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
