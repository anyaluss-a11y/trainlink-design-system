import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Business', tone: 'brand', size: 'sm' },
  argTypes: {
    tone: {
      control: 'select',
      options: ['brand', 'warning', 'success', 'neutral', 'danger', 'info', 'muted', 'outline'],
    },
    size: { control: 'inline-radio', options: ['sm', 'lg'] },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Brand: Story = { args: { size: 'lg' } }
export const AwaitingSignature: Story = { args: { tone: 'warning', children: 'Awaiting facilitator’s signature' } }
export const Active: Story = { args: { tone: 'success', children: 'Active' } }
export const Closed: Story = { args: { tone: 'neutral', children: 'Closed' } }
export const Declined: Story = { args: { tone: 'danger', children: 'Declined' } }
export const Shortlisted: Story = { args: { tone: 'info', children: 'Shortlisted' } }
export const Muted: Story = { args: { tone: 'muted', children: 'Awaiting facilitator’s signature' } }
export const Outline: Story = { args: { tone: 'outline' } }
export const OutlineLarge: Story = { args: { tone: 'outline', size: 'lg' } }
