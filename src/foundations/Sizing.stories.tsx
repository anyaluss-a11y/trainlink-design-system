import type { Meta, StoryObj } from '@storybook/react-vite'
import tokens from '../../tokens/figma-export.json'

const { spacing, radii, borders } = tokens.collections.Sizing as unknown as {
  spacing: [string, number][]
  radii: [string, number][]
  borders: [string, number][]
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h3 className="type-heading-xs mb-4">{children}</h3>
}

const meta = {
  title: 'Foundations/Sizing',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <section>
        <Heading>Spacing</Heading>
        <div className="flex flex-col gap-2">
          {spacing.map(([name, px]) => (
            <div key={name} className="flex items-center gap-4">
              <span className="type-label-xs w-24">spacing/{name}</span>
              <span className="type-body-xs w-12 text-text-secondary">{px}px</span>
              <div className="h-3 rounded-sm bg-teal-60" style={{ width: `var(--space-${name})` }} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <Heading>Radii</Heading>
        <div className="flex flex-wrap gap-6">
          {radii.map(([name, px]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="size-16 border-2 border-teal-70 bg-teal-30"
                style={{ borderRadius: `var(--radius-${name})` }}
              />
              <span className="type-label-xs">radii/{name}</span>
              <span className="type-body-xs text-text-secondary">{px === 9999 ? 'full' : `${px}px`}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Heading>Borders</Heading>
        <div className="flex flex-col gap-4">
          {borders.map(([name, px]) => (
            <div key={name} className="flex items-center gap-4">
              <span className="type-label-xs w-24">borders/{name}</span>
              <span className="type-body-xs w-12 text-text-secondary">{px}px</span>
              <div className="w-48 bg-teal-100" style={{ height: `var(--border-${name})` }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
}
