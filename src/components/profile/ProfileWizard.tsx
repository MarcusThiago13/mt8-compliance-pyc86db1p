import { useState } from 'react'
import { useTenant } from '@/contexts/TenantContext'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { Step4 } from './Step4'
import { Step5 } from './Step5'
import { Step6 } from './Step6'
import { Summary } from './Summary'
import { ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react'

export function ProfileWizard({
  onCancel,
  isComplete,
}: {
  onCancel: () => void
  isComplete: boolean
}) {
  const { tenant, updateTenant } = useTenant()
  const { toast } = useToast()
  const [step, setStep] = useState(isComplete ? 7 : 1)
  const [data, setData] = useState<any>(tenant?.isoProfileData || {})

  const handleSaveDraft = async () => {
    await updateTenant(tenant!.id, { isoProfileData: data })
    toast({ title: 'Rascunho salvo', description: 'Progresso salvo com sucesso.' })
  }

  const handleFinish = async () => {
    await updateTenant(tenant!.id, { isoProfileData: { ...data, profileComplete: true } })
    toast({
      title: 'Perfil Concluído',
      description: 'O perfil foi aplicado com sucesso e já está integrado à ISO.',
    })
    setStep(7)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 data={data} update={(d: any) => setData({ ...data, ...d })} tenant={tenant} />
      case 2:
        return <Step2 data={data} update={(d: any) => setData({ ...data, ...d })} />
      case 3:
        return <Step3 data={data} update={(d: any) => setData({ ...data, ...d })} />
      case 4:
        return <Step4 data={data} update={(d: any) => setData({ ...data, ...d })} />
      case 5:
        return <Step5 data={data} update={(d: any) => setData({ ...data, ...d })} />
      case 6:
        return <Step6 data={data} update={(d: any) => setData({ ...data, ...d })} />
      case 7:
        return <Summary data={data} tenant={tenant} onEdit={() => setStep(1)} />
      default:
        return null
    }
  }

  const STEPS = [
    { id: 1, title: 'Identificação' },
    { id: 2, title: 'Governança' },
    { id: 3, title: 'Vínculos' },
    { id: 4, title: 'Efetivo' },
    { id: 5, title: 'Setor Público' },
    { id: 6, title: 'Compliance' },
  ]

  const showStep5 = tenant?.nature === 'public' || tenant?.publicRelationship

  const nextStep = () => {
    if (step === 4 && !showStep5) setStep(6)
    else setStep((s) => Math.min(6, s + 1))
  }

  const prevStep = () => {
    if (step === 6 && !showStep5) setStep(4)
    else setStep((s) => Math.max(1, s - 1))
  }

  return (
    <Card className="shadow-subtle border-border/50">
      <CardHeader>
        <div className="flex justify-between items-start sm:items-center mb-4 gap-4 flex-col sm:flex-row">
          <div>
            <CardTitle>Perfil Institucional e de Governança</CardTitle>
            <CardDescription>
              Mapeamento de dados estruturais da organização para alimentação ISO
            </CardDescription>
          </div>
          {step < 7 && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onCancel}>
                Fechar
              </Button>
              <Button variant="outline" size="sm" onClick={handleSaveDraft} className="gap-2">
                <Save className="size-4" /> Salvar Rascunho
              </Button>
            </div>
          )}
        </div>

        {step < 7 && (
          <div>
            <div className="flex gap-2 mt-2">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  title={s.title}
                  className={`h-2 flex-1 rounded-full transition-colors ${s.id < step ? 'bg-primary' : s.id === step ? 'bg-primary/60' : 'bg-muted'} ${s.id === 5 && !showStep5 ? 'opacity-20' : ''}`}
                />
              ))}
            </div>
            <div className="mt-2 text-sm font-medium text-muted-foreground">
              Etapa {step} de 6: {STEPS.find((s) => s.id === step)?.title}
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="py-4">{renderStep()}</CardContent>

      {step < 7 && (
        <CardFooter className="flex justify-between border-t pt-6 bg-muted/20 rounded-b-lg">
          <Button variant="ghost" onClick={prevStep} disabled={step === 1}>
            <ArrowLeft className="mr-2 size-4" /> Anterior
          </Button>
          {step === 6 ? (
            <Button onClick={handleFinish} className="bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle className="mr-2 size-4" /> Concluir e Aplicar
            </Button>
          ) : (
            <Button onClick={nextStep}>
              Próximo <ArrowRight className="ml-2 size-4" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
