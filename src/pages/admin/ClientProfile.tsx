import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTenant, TenantState, TenantNature } from '@/contexts/TenantContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Save, Building2 } from 'lucide-react'

const AREAS = [
  { id: 'education', label: 'Educação' },
  { id: 'health', label: 'Saúde' },
  { id: 'social', label: 'Assistência Social' },
  { id: 'culture', label: 'Cultura' },
  { id: 'environment', label: 'Meio Ambiente' },
  { id: 'other', label: 'Outra' },
]

export default function ClientProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tenants, updateTenant } = useTenant()
  const { toast } = useToast()

  const [formData, setFormData] = useState<Partial<TenantState> | null>(null)

  useEffect(() => {
    const t = tenants.find((t) => t.id === id)
    if (t) setFormData(t)
    else navigate('/admin')
  }, [id, tenants, navigate])

  if (!formData) return null

  const handleSave = () => {
    updateTenant(id!, formData)
    toast({
      title: 'Configurações Salvas',
      description: 'Classificação do cliente e trilhas foram atualizadas com sucesso.',
    })
    navigate('/admin')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="text-muted-foreground size-8" />
            Edição de Cliente
          </h1>
          <p className="text-muted-foreground mt-1">
            Tenant ID: <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">{id}</span>
          </p>
        </div>
      </div>

      <Card className="shadow-subtle border-border/50">
        <CardHeader>
          <CardTitle>Classificação e Acessos</CardTitle>
          <CardDescription>
            A alteração dessas dimensões ativará ou ocultará módulos instantaneamente, sem perda de
            dados existentes no banco.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>Nome da Organização</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div className="space-y-3">
              <Label>Perfil de Acesso</Label>
              <Select
                value={formData.accessProfile}
                onValueChange={(v) => setFormData((p) => ({ ...p, accessProfile: v as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Perfil A (Standard)</SelectItem>
                  <SelectItem value="B">Perfil B (Avançado)</SelectItem>
                  <SelectItem value="C">Perfil C (Completo)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Natureza Jurídica</Label>
            <Select
              value={formData.nature}
              onValueChange={(v: TenantNature) => setFormData((p) => ({ ...p, nature: v }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Empresa Privada</SelectItem>
                <SelectItem value="osc">Organização da Sociedade Civil (OSC)</SelectItem>
                <SelectItem value="public">Órgão / Entidade Pública</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between border p-5 rounded-lg bg-muted/20">
            <div className="space-y-1">
              <Label className="text-base">Relação com Poder Público</Label>
              <p className="text-sm text-muted-foreground">
                A organização participa de licitações, parcerias, MROSC ou recebe fomento público?
              </p>
            </div>
            <Switch
              checked={formData.publicRelationship}
              onCheckedChange={(v) => setFormData((p) => ({ ...p, publicRelationship: v }))}
              disabled={formData.nature === 'public'}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-base">Áreas de Atuação Setorial</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {AREAS.map((area) => (
                <label
                  key={area.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    checked={formData.areas?.includes(area.id)}
                    onCheckedChange={(c) => {
                      const newAreas = c
                        ? [...(formData.areas || []), area.id]
                        : (formData.areas || []).filter((a) => a !== area.id)
                      setFormData((p) => ({ ...p, areas: newAreas }))
                    }}
                  />
                  <span className="font-medium">{area.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end">
            <Button onClick={handleSave} size="lg" className="gap-2 w-full sm:w-auto">
              <Save className="size-4" /> Atualizar Configurações do Tenant
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
