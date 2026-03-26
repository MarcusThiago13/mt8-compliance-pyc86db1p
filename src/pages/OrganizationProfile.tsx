import { useState } from 'react'
import { useTenant } from '@/contexts/TenantContext'
import { Button } from '@/components/ui/button'
import { Building, ArrowRight } from 'lucide-react'
import { ProfileWizard } from '@/components/profile/ProfileWizard'

export default function OrganizationProfile() {
  const { tenant } = useTenant()
  const [isWizardOpen, setIsWizardOpen] = useState(false)

  const isComplete = tenant?.isoProfileData?.profileComplete

  if (!tenant) return null

  if (isWizardOpen || isComplete) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <ProfileWizard onCancel={() => setIsWizardOpen(false)} isComplete={!!isComplete} />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 text-center space-y-6 animate-fade-in-up">
      <div className="bg-muted p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6 shadow-sm">
        <Building className="size-12 text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">Perfil da Organização</h1>
      <p className="text-muted-foreground text-lg max-w-xl mx-auto">
        Centralize os dados institucionais e de governança do seu tenant. As informações preenchidas
        aqui alimentarão automaticamente os requisitos do núcleo ISO 37301.
      </p>

      <Button size="lg" onClick={() => setIsWizardOpen(true)} className="mt-8 gap-2">
        Iniciar Perfil da Organização <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}
