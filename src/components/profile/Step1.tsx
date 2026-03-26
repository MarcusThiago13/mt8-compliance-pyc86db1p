import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function Step1({ data, update, tenant }: any) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Razão Social</Label>
          <Input
            value={data.razaoSocial || ''}
            onChange={(e) => update({ razaoSocial: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Nome Fantasia</Label>
          <Input
            value={data.nomeFantasia || ''}
            onChange={(e) => update({ nomeFantasia: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>CNPJ</Label>
          <Input value={data.cnpj || ''} onChange={(e) => update({ cnpj: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Natureza Jurídica</Label>
          <Input value={tenant?.nature?.toUpperCase() || ''} disabled className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label>Data de Fundação</Label>
          <Input
            type="date"
            value={data.dataFundacao || ''}
            onChange={(e) => update({ dataFundacao: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>CEP</Label>
          <Input value={data.cep || ''} onChange={(e) => update({ cep: e.target.value })} />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2 col-span-2">
          <Label>Logradouro</Label>
          <Input
            value={data.logradouro || ''}
            onChange={(e) => update({ logradouro: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Número</Label>
          <Input value={data.numero || ''} onChange={(e) => update({ numero: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Complemento</Label>
          <Input
            value={data.complemento || ''}
            onChange={(e) => update({ complemento: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Bairro</Label>
          <Input value={data.bairro || ''} onChange={(e) => update({ bairro: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Cidade / Estado</Label>
          <Input
            value={data.cidadeEstado || ''}
            onChange={(e) => update({ cidadeEstado: e.target.value })}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Site Institucional</Label>
          <Input value={data.site || ''} onChange={(e) => update({ site: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>E-mail Institucional</Label>
          <Input
            type="email"
            value={data.email || ''}
            onChange={(e) => update({ email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Telefone</Label>
          <Input
            value={data.telefone || ''}
            onChange={(e) => update({ telefone: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
