import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const data = [
  { name: 'Concluído', value: 65, color: 'hsl(var(--chart-2))' },
  { name: 'Em Progresso', value: 25, color: 'hsl(var(--chart-3))' },
  { name: 'Pendente', value: 10, color: 'hsl(var(--muted-foreground))' },
]

const chartConfig = {
  value: { label: 'Progresso' },
  Concluído: { color: 'hsl(var(--chart-2))' },
  'Em Progresso': { color: 'hsl(var(--chart-3))' },
  Pendente: { color: 'hsl(var(--muted-foreground))' },
}

export function ProgressChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
