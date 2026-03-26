import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTenant, TenantState, TenantNature, AccessProfile } from '@/contexts/TenantContext'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { ArrowRight, ArrowLeft, CheckCircle2, Building, Landmark, Building2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const AREAS = [
  { id: 'education', label: 'Educação' },
  { id: 'health', label: 'Saúde' },
  { id: 'social', label: 'Assistência Social' },
  { id: 'culture', label: 'Cultura' },
  { id: 'environment', label: 'Meio Ambiente' },
  { id: 'other', label: 'Outra' },
]

export default function NewClientWizard() {
  const [step, setStep] = useState(1)
  const { addTenant, getActiveTracksFor } = useTenant()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [formData, setFormData] = useState<Partial<TenantState> & { name: string }>({
    name: '',
    nature: 'private',
    publicRelationship: false,
    areas: [],
    accessProfile: 'A',
  })

  const updateForm = (updates: Partial<typeof formData>) =>
    setFormData((prev) => ({ ...prev, ...updates }))

  const handleNext = () => setStep((s) => Math.min(5, s + 1))
  const handleBack = () => setStep((s) => Math.max(1, s - 1))

  const handleFinish = () => {
    if (!formData.name)
      return toast({
        title: 'Erro',
        description: 'O nome do cliente é obrigatório.',
        variant: 'destructive',
      })
    addTenant(formData as any)
    toast({
      title: 'Provisionamento Concluído',
      description: 'Cliente criado e ambiente isolado gerado com sucesso.',
    })
    navigate('/admin')
  }

  const tracks = getActiveTracksFor(formData as Partial<TenantState>)

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Onboarding de Cliente</h1>
        <p className="text-muted-foreground mt-1">
          Classificação em 4 dimensões para provisionamento automático do ambiente.
        </p>
        <div className="flex gap-2 mt-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>

      <Card className="shadow-subtle border-border/50">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>1. Dados e Natureza Jurídica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Nome da Organização</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  placeholder="Ex: Tech Corp"
                />
              </div>
              <div className="space-y-3">
                <Label>Natureza</Label>
                <RadioGroup
                  value={formData.nature}
                  onValueChange={(v: TenantNature) => updateForm({ nature: v })}
                  className="grid sm:grid-cols-3 gap-4"
                >
                  <Label
                    className={`flex flex-col items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.nature === 'private' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                  >
                    <RadioGroupItem value="private" className="sr-only" />
                    <Building className="size-8 text-slate-500" />
                    <span className="font-semibold text-center">Empresa Privada</span>
                  </Label>
                  <Label
                    className={`flex flex-col items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.nature === 'osc' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                  >
                    <RadioGroupItem value="osc" className="sr-only" />
                    <Building2 className="size-8 text-slate-500" />
                    <span className="font-semibold text-center">OSC (3º Setor)</span>
                  </Label>
                  <Label
                    className={`flex flex-col items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.nature === 'public' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                  >
                    <RadioGroupItem value="public" className="sr-only" />
                    <Landmark className="size-8 text-slate-500" />
                    <span className="font-semibold text-center">Órgão Público</span>
                  </Label>
                </RadioGroup>
              </div>
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>2. Relacionamento com Administração Pública</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.nature === 'public' ? (
                <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground border">
                  Para Órgãos e Entidades Públicas, o relacionamento com o Poder Público é
                  intrínseco e os módulos aplicáveis são ativados automaticamente.
                </div>
              ) : (
                <div className="flex items-center justify-between border p-4 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="space-y-0.5">
                    <Label className="text-base cursor-pointer">
                      Possui Contratos ou Parcerias Públicas?
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Inclui licitações, parcerias MROSC, termos de fomento, etc.
                    </p>
                  </div>
                  <Switch
                    checked={formData.publicRelationship}
                    onCheckedChange={(v) => updateForm({ publicRelationship: v })}
                  />
                </div>
              )}
            </CardContent>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>3. Áreas de Atuação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {AREAS.map((area) => (
                  <label
                    key={area.id}
                    className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  >
                    <Checkbox
                      checked={formData.areas?.includes(area.id)}
                      onCheckedChange={(checked) => {
                        const newAreas = checked
                          ? [...(formData.areas || []), area.id]
                          : (formData.areas || []).filter((a) => a !== area.id)
                        updateForm({ areas: newAreas })
                      }}
                    />
                    <span className="font-medium">{area.label}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </>
        )}

        {step === 4 && (
          <>
            <CardHeader>
              <CardTitle>4. Perfil de Acesso e Permissões</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.accessProfile}
                onValueChange={(v: AccessProfile) => updateForm({ accessProfile: v })}
                className="space-y-3"
              >
                {[
                  {
                    id: 'A',
                    title: 'Perfil A (Standard)',
                    desc: 'Acesso às trilhas de compliance, upload de evidências e dashboard.',
                  },
                  {
                    id: 'B',
                    title: 'Perfil B (Avançado)',
                    desc: 'Inclui gestão de usuários internos e aprovação de fluxos.',
                  },
                  {
                    id: 'C',
                    title: 'Perfil C (Completo)',
                    desc: 'Acesso total, relatórios gerenciais em PDF e integrações via API.',
                  },
                ].map((p) => (
                  <Label
                    key={p.id}
                    className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${formData.accessProfile === p.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                  >
                    <RadioGroupItem value={p.id} className="mt-1" />
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-sm text-muted-foreground font-normal mt-1">{p.desc}</div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </>
        )}

        {step === 5 && (
          <>
            <CardHeader className="text-center pb-2">
              <CheckCircle2 className="size-16 text-emerald-500 mx-auto mb-4" />
              <CardTitle>Confirmação de Provisionamento</CardTitle>
              <CardDescription>
                Revise a classificação e os módulos que serão implantados no ambiente deste cliente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="bg-muted/50 p-6 rounded-lg space-y-3 text-sm border">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Organização:</span>{' '}
                  <strong className="text-base">{formData.name}</strong>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Natureza Jurídica:</span>{' '}
                  <strong className="uppercase">{formData.nature}</strong>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Relação Pública:</span>{' '}
                  <strong>
                    {formData.nature === 'public'
                      ? 'Intrínseco'
                      : formData.publicRelationship
                        ? 'Sim'
                        : 'Não'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Perfil:</span>{' '}
                  <strong>{formData.accessProfile}</strong>
                </div>
              </div>
              <div>
                <Label className="mb-3 block text-base">
                  Trilhas Inteligentes que serão ativadas:
                </Label>
                <div className="flex flex-wrap gap-2">
                  {tracks.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 text-sm"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </>
        )}

        <CardFooter className="flex justify-between pt-6 border-t mt-4 bg-muted/20">
          <Button variant="ghost" onClick={handleBack} disabled={step === 1}>
            <ArrowLeft className="mr-2 size-4" /> Voltar
          </Button>
          {step < 5 ? (
            <Button onClick={handleNext} disabled={step === 1 && !formData.name}>
              Próximo <ArrowRight className="ml-2 size-4" />
            </Button>
          ) : (
            <Button onClick={handleFinish} className="bg-emerald-600 hover:bg-emerald-700">
              Concluir e Criar Cliente
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
