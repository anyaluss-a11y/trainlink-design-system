import type { Meta, StoryObj } from '@storybook/react-vite'
import tokens from '../../tokens/figma-export.json'

const slug = (name: string) => name.toLowerCase().replace(/\//g, '-')

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TextStyles: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {tokens.textStyles.map((s) => (
        <div key={s.name} className="grid grid-cols-[12rem_1fr] items-baseline gap-6">
          <div className="flex flex-col">
            <span className="type-label-xs">{s.name}</span>
            <span className="type-body-xs text-text-secondary">
              {s.size}px / {s.lh === 'auto' ? 'auto' : `${s.lh}px`} · {s.weight}
              {s.ls ? ` · ${s.ls}%` : ''}
            </span>
            <code className="type-body-xs text-text-secondary">type-{slug(s.name)}</code>
          </div>
          <p className={`type-${slug(s.name)} overflow-hidden`}>
            {s.size >= 100 ? 'Aa' : 'Book a training session'}
          </p>
        </div>
      ))}
    </div>
  ),
}
