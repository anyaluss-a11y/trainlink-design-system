import type { Meta, StoryObj } from '@storybook/react-vite'
import tokens from '../../tokens/figma-export.json'

const slug = (name: string) => name.toLowerCase().replace(/\//g, '-')

type Primitive = [string, string]
type Semantic = [string, { alias: string }]

function Swatch({ name, caption, value }: { name: string; caption: string; value: string }) {
  return (
    <div className="flex w-44 flex-col gap-2">
      <div className="h-16 rounded-lg border border-border-default" style={{ background: value }} />
      <div className="flex flex-col">
        <span className="type-label-xs">{name}</span>
        <span className="type-body-xs text-text-secondary">{caption}</span>
      </div>
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-x-4 gap-y-6">{children}</div>
}

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Primitives: Story = {
  render: () => (
    <Grid>
      {(tokens.collections.Primitives as Primitive[]).map(([name, hex]) => (
        <Swatch key={name} name={name} caption={hex} value={`var(--color-${slug(name)})`} />
      ))}
    </Grid>
  ),
}

export const SemanticColors: Story = {
  name: 'Semantic',
  render: () => (
    <Grid>
      {(tokens.collections['Semantic colors'] as Semantic[]).map(([name, { alias }]) => (
        <Swatch key={name} name={name} caption={`→ ${alias}`} value={`var(--color-${slug(name)})`} />
      ))}
    </Grid>
  ),
}
