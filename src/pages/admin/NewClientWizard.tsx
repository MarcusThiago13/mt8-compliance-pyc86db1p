import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTenant, TenantNature, AccessProfile } from '@/contexts/TenantContext'
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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

const STEPS = [
  { id: 1, title: 'Identificação e Setores' },
  { id: 2, title: 'Governança e Estrutura' },
  { id: 3, title: 'Participações e Grupos' },
  { id: 4, title: 'Quadro de Efetivo' },
  { id: 5, title: 'Relação com Setor Público' },
  { id: 6, title: 'Sistema de Compliance' },
]

export default function NewClientWizard() {
  const [step, setStep] = useState(1)
  const { addTenant, getActiveTracksFor } = useTenant()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    nature: 'private' as TenantNature,
    areas: [] as string[],
    accessProfile: 'A' as AccessProfile,
    // Step 2
    governanceHasBoard: false,
    governanceDecisionBody: '',
    governanceStructureDesc: '',
    // Step 3
    groupIsMember: false,
    groupHasBranches: false,
    // Step 4
    headcount: '',
    headcountHasOutsourced: false,
    // Step 5
    publicRelationship: false,
    publicReceivesFunds: false,
    // Step 6
    complianceHasProgram: false,
    complianceHasCode: false,
    complianceHasOfficer: false,
  })

  const updateForm = (updates: Partial<typeof formData>) =>
    setFormData((prev) => ({ ...prev, ...updates }))

  const handleNext = () => {
    if (step === 1 && !formData.name) {
      return toast({
        title: 'Atenção',
        description: 'Preencha o nome da organização.',
        variant: 'destructive',
      })
    }
    setStep((s) => Math.min(STEPS.length + 1, s + 1))
  }
  const handleBack = () => setStep((s) => Math.max(1, s - 1))

  const handleFinish = () => {
    const isoProfileData = {
      governanceHasBoard: formData.governanceHasBoard,
      governanceDecisionBody: formData.governanceDecisionBody,
      governanceStructureDesc: formData.governanceStructureDesc,
      groupIsMember: formData.groupIsMember,
      groupHasBranches: formData.groupHasBranches,
      headcount: formData.headcount,
      headcountHasOutsourced: formData.headcountHasOutsourced,
      publicReceivesFunds: formData.publicReceivesFunds,
      complianceHasProgram: formData.complianceHasProgram,
      complianceHasCode: formData.complianceHasCode,
      complianceHasOfficer: formData.complianceHasOfficer,
    }

    addTenant({
      name: formData.name,
      nature: formData.nature,
      publicRelationship: formData.nature === 'public' ? true : formData.publicRelationship,
      areas: formData.areas,
      accessProfile: formData.accessProfile,
      isoProfileData,
    })

    toast({
      title: 'Provisionamento Concluído',
      description: 'Cliente criado e dados mapeados para o núcleo ISO 37301 com sucesso.',
    })
    navigate('/admin')
  }

  const tracks = getActiveTracksFor({
    nature: formData.nature,
    publicRelationship: formData.publicRelationship,
    areas: formData.areas,
  })

  const renderStepIndicator = () => (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">Onboarding: Perfil da Organização</h1>
      <p className="text-muted-foreground mt-1">
        6 etapas para classificar o cliente e alimentar automaticamente o núcleo ISO 37301.
      </p>
      <div className="flex gap-2 mt-6">
        {STEPS.map((s) => (
          <div
            key={s.id}
            title={s.title}
            className={`h-2 flex-1 rounded-full transition-colors ${
              s.id < step ? 'bg-primary' : s.id === step ? 'bg-primary/60' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <div className="mt-2 text-sm font-medium text-muted-foreground">
        Etapa {Math.min(step, 6)} de 6: {STEPS.find((s) => s.id === step)?.title || 'Confirmação'}
      </div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto py-4">
      {renderStepIndicator()}

      <Card className="shadow-subtle border-border/50">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>1. Identificação e Setores</CardTitle>
              <CardDescription>Dados básicos para classificar as trilhas ativas.</CardDescription>
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
                <Label>Natureza Jurídica</Label>
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

              <div className="space-y-3">
                <Label>Áreas de Atuação</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {AREAS.map((area) => (
                    <label
                      key={area.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                    >
                      <Checkbox
                        checked={formData.areas.includes(area.id)}
                        onCheckedChange={(checked) => {
                          const newAreas = checked
                            ? [...formData.areas, area.id]
                            : formData.areas.filter((a) => a !== area.id)
                          updateForm({ areas: newAreas })
                        }}
                      />
                      <span className="font-medium text-sm">{area.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Perfil de Acesso do Cliente no Sistema</Label>
                <Select
                  value={formData.accessProfile}
                  onValueChange={(v) => updateForm({ accessProfile: v as AccessProfile })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Perfil A (Standard - Dashboards e Upload)</SelectItem>
                    <SelectItem value="B">
                      Perfil B (Avançado - Gestão de Usuários Internos)
                    </SelectItem>
                    <SelectItem value="C">
                      Perfil C (Completo - Relatórios e Integrações)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>2. Governança e Estrutura</CardTitle>
              <CardDescription>
                Mapeamento automático para ISO 37301 (Itens 5.1 e 5.3)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base cursor-pointer">
                    Possui Conselho de Administração ou equivalente?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Órgão colegiado de alta governança independente da diretoria executiva.
                  </p>
                </div>
                <Switch
                  checked={formData.governanceHasBoard}
                  onCheckedChange={(v) => updateForm({ governanceHasBoard: v })}
                />
              </div>

              <div className="space-y-2">
                <Label>Principal órgão de tomada de decisão</Label>
                <Input
                  value={formData.governanceDecisionBody}
                  onChange={(e) => updateForm({ governanceDecisionBody: e.target.value })}
                  placeholder="Ex: Diretoria Executiva, Assembleia Geral, Gabinete do Secretário"
                />
              </div>

              <div className="space-y-2">
                <Label>Descreva brevemente a estrutura de alta direção</Label>
                <Textarea
                  value={formData.governanceStructureDesc}
                  onChange={(e) => updateForm({ governanceStructureDesc: e.target.value })}
                  placeholder="Como está organizada a liderança máxima? Quem responde a quem?"
                  className="h-24"
                />
              </div>
            </CardContent>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>3. Participações e Grupos</CardTitle>
              <CardDescription>Mapeamento automático para ISO 37301 (Item 4.1)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base cursor-pointer">
                    Faz parte de um grupo econômico ou rede?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Holdings, redes associativas internacionais, ou conglomerações.
                  </p>
                </div>
                <Switch
                  checked={formData.groupIsMember}
                  onCheckedChange={(v) => updateForm({ groupIsMember: v })}
                />
              </div>

              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base cursor-pointer">
                    Possui filiais, subsidiárias ou unidades descentralizadas?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Impacta a abrangência do sistema de compliance.
                  </p>
                </div>
                <Switch
                  checked={formData.groupHasBranches}
                  onCheckedChange={(v) => updateForm({ groupHasBranches: v })}
                />
              </div>
            </CardContent>
          </>
        )}

        {step === 4 && (
          <>
            <CardHeader>
              <CardTitle>4. Quadro de Efetivo</CardTitle>
              <CardDescription>Mapeamento automático para ISO 37301 (Item 4.1)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Faixa de Colaboradores (CLT, Estatutários, etc.)</Label>
                <Select
                  value={formData.headcount}
                  onValueChange={(v) => updateForm({ headcount: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o porte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">Até 50 colaboradores</SelectItem>
                    <SelectItem value="51-200">51 a 200 colaboradores</SelectItem>
                    <SelectItem value="201-1000">201 a 1.000 colaboradores</SelectItem>
                    <SelectItem value="1000+">Mais de 1.000 colaboradores</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base cursor-pointer">
                    Possui força de trabalho terceirizada nas dependências?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Segurança, limpeza, TI, serviços operacionais contínuos.
                  </p>
                </div>
                <Switch
                  checked={formData.headcountHasOutsourced}
                  onCheckedChange={(v) => updateForm({ headcountHasOutsourced: v })}
                />
              </div>
            </CardContent>
          </>
        )}

        {step === 5 && (
          <>
            <CardHeader>
              <CardTitle>5. Relação com Setor Público</CardTitle>
              <CardDescription>
                Mapeamento automático para ISO 37301 (Item 4.1) e definição de trilhas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.nature === 'public' ? (
                <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground border">
                  Para Órgãos e Entidades Públicas, o relacionamento com o Poder Público é
                  intrínseco.
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-base cursor-pointer">
                        Possui Contratos, Parcerias ou Convênios Públicos?
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Licitações (Lei 14.133), MROSC, Termos de Fomento/Colaboração.
                      </p>
                    </div>
                    <Switch
                      checked={formData.publicRelationship}
                      onCheckedChange={(v) => updateForm({ publicRelationship: v })}
                    />
                  </div>

                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-base cursor-pointer">
                        Recebe subvenções ou recursos públicos diretos?
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Bolsas, fundos de incentivo, leis de renúncia fiscal.
                      </p>
                    </div>
                    <Switch
                      checked={formData.publicReceivesFunds}
                      onCheckedChange={(v) => updateForm({ publicReceivesFunds: v })}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </>
        )}

        {step === 6 && (
          <>
            <CardHeader>
              <CardTitle>6. Sistema de Compliance</CardTitle>
              <CardDescription>Mapeamento automático para ISO 37301 (Item 5.3.2)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base cursor-pointer">
                    Já possui um programa de integridade formalizado?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Mesmo que incipiente ou em estruturação inicial.
                  </p>
                </div>
                <Switch
                  checked={formData.complianceHasProgram}
                  onCheckedChange={(v) => updateForm({ complianceHasProgram: v })}
                />
              </div>

              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base cursor-pointer">
                    Possui Código de Conduta aprovado?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Documento oficial divulgado aos colaboradores.
                  </p>
                </div>
                <Switch
                  checked={formData.complianceHasCode}
                  onCheckedChange={(v) => updateForm({ complianceHasCode: v })}
                />
              </div>

              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base cursor-pointer">
                    Existe pessoa ou área designada para a função de compliance?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Compliance Officer, Comitê de Integridade, etc.
                  </p>
                </div>
                <Switch
                  checked={formData.complianceHasOfficer}
                  onCheckedChange={(v) => updateForm({ complianceHasOfficer: v })}
                />
              </div>
            </CardContent>
          </>
        )}

        {step === 7 && (
          <>
            <CardHeader className="text-center pb-2">
              <CheckCircle2 className="size-16 text-emerald-500 mx-auto mb-4" />
              <CardTitle>Mapeamento ISO 37301 Concluído</CardTitle>
              <CardDescription>
                Os dados alimentarão automaticamente os itens 4.1, 5.1, 5.3 e 5.3.2 do núcleo
                normativo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="bg-muted/50 p-6 rounded-lg space-y-3 text-sm border">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Organização:</span>
                  <strong className="text-base">{formData.name}</strong>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Natureza:</span>
                  <strong className="uppercase">{formData.nature}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Alimentação ISO 37301:</span>
                  <strong className="text-emerald-600">Sincronizada</strong>
                </div>
              </div>

              <div>
                <Label className="mb-3 block text-base">
                  Trilhas que serão ativadas no ambiente:
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
          {step <= 6 ? (
            <Button onClick={handleNext}>
              Próximo <ArrowRight className="ml-2 size-4" />
            </Button>
          ) : (
            <Button onClick={handleFinish} className="bg-emerald-600 hover:bg-emerald-700">
              Gerar Ambiente Cliente
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
