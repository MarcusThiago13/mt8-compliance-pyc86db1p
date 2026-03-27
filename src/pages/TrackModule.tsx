import { useParams } from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Info } from 'lucide-react'
import IsoCoreTrack from './tracks/IsoCoreTrack'
import OscTrack from './tracks/OscTrack'
import EduComplianceTrack from './tracks/EduComplianceTrack'
import EduEcaTrack from './tracks/EduEcaTrack'
import EduLgpdTrack from './tracks/EduLgpdTrack'
import EduInclusiveTrack from './tracks/EduInclusiveTrack'

export default function TrackModule() {
  const { trackId } = useParams()

  if (trackId === 'iso-core') return <IsoCoreTrack />
  if (trackId === 'osc-track') return <OscTrack />
  if (trackId === 'edu-compliance') return <EduComplianceTrack />
  if (trackId === 'edu-eca') return <EduEcaTrack />
  if (trackId === 'lgpd-education') return <EduLgpdTrack />
  if (trackId === 'edu-inclusive') return <EduInclusiveTrack />

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Card className="border-l-4 border-l-primary shadow-sm bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl tracking-tight flex items-center gap-2">
                <Info className="size-6 text-primary" />
                Módulo: {trackId}
              </CardTitle>
              <CardDescription className="mt-1 text-base">
                Requisitos baseados na legislação vigente para o perfil selecionado.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="p-12 text-center text-muted-foreground bg-card border rounded-lg border-dashed">
        <p className="font-medium text-lg text-foreground mb-2">
          1. Requisito Genérico Módulo Específico
        </p>
        <p className="font-medium text-lg text-foreground mb-4">2. Validação Documental</p>
        <div className="max-w-md mx-auto mt-6 p-4 bg-muted/50 rounded-md">
          <p className="text-sm font-medium text-foreground">Aviso de Construção</p>
          <p className="text-sm mt-1">
            Este módulo encontra-se na fila de implantação de requisitos específicos.
          </p>
          <p className="text-sm mt-1">
            Aguarde instruções e especificações detalhadas para o preenchimento de conteúdo real.
          </p>
        </div>
      </div>
    </div>
  )
}
