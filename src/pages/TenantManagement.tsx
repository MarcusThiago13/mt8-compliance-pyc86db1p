import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTenant, TenantNature } from '@/contexts/TenantContext'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const formSchema = z.object({
  nature: z.enum(['private', 'osc', 'public'] as const),
  publicRelationship: z.boolean(),
  areas: z.array(z.string()).refine((value) => value.length > 0, {
    message: 'Selecione pelo menos uma área de atuação.',
  }),
})

export default function TenantManagement() {
  const { tenant, updateTenant, activeTracks } = useTenant()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nature: tenant.nature,
      publicRelationship: tenant.publicRelationship,
      areas: tenant.areas,
    },
  })

  const watchNature = form.watch('nature')

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateTenant(values)
    toast({
      title: 'Configuração Salva',
      description: 'As trilhas foram atualizadas com sucesso. Log de auditoria gerado.',
    })
  }

  const areasList = [
    { id: 'education', label: 'Educação (Escolas, Universidades)' },
    { id: 'health', label: 'Saúde (Clínicas, Hospitais)' },
    { id: 'social', label: 'Assistência Social' },
    { id: 'tech', label: 'Tecnologia / SaaS' },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Gestão do Tenant</h1>
        <p className="text-muted-foreground">
          Classifique a organização para ativar os módulos corretos.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Dimensões de Classificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="nature"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>1. Natureza Jurídica</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-md flex-1 cursor-pointer hover:bg-muted/50 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="private" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer w-full">
                            Empresa Privada
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-md flex-1 cursor-pointer hover:bg-muted/50 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="osc" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer w-full">
                            OSC (Terceiro Setor)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-md flex-1 cursor-pointer hover:bg-muted/50 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="public" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer w-full">
                            Órgão Público
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              {watchNature !== 'public' && (
                <FormField
                  control={form.control}
                  name="publicRelationship"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          2. Relacionamento com Administração Pública
                        </FormLabel>
                        <FormDescription>
                          A organização participa de licitações, parcerias, MROSC ou recebe fomento
                          público?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="areas"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">3. Área de Atuação</FormLabel>
                      <FormDescription>
                        Selecione todas as aplicáveis para habilitar trilhas setoriais.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {areasList.map((area) => (
                        <FormField
                          key={area.id}
                          control={form.control}
                          name="areas"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={area.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(area.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, area.id])
                                        : field.onChange(
                                            field.value?.filter((value) => value !== area.id),
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{area.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Trilhas que serão ativadas:</p>
                  <div className="flex gap-2 flex-wrap">
                    {activeTracks.map((t) => (
                      <Badge key={t} variant="outline" className="bg-background">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button type="submit" size="lg">
                  Aplicar Classificação
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
