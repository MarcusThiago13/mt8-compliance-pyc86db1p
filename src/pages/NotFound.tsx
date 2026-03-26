import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FileQuestion, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const location = useLocation()

  useEffect(() => {
    console.error('404 Error: Rota inexistente acessada:', location.pathname)
  }, [location.pathname])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in-up">
      <div className="bg-muted p-6 rounded-full mb-6 shadow-sm">
        <FileQuestion className="size-16 text-muted-foreground/70" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-3">Página não encontrada</h1>
      <p className="text-muted-foreground mb-8 max-w-md text-lg">
        A rota{' '}
        <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">
          {location.pathname}
        </span>{' '}
        não existe neste ambiente ou foi movida.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg" variant="default">
          <Link to="/">
            <ArrowLeft className="mr-2 size-4" />
            Voltar ao Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
