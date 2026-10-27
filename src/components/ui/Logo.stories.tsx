import type { Meta, StoryObj } from '@storybook/react-vite'
import { Logo } from './Logo'

const meta = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: { tone: { control: 'inline-radio', options: ['light', 'brand', 'dark'] } },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

const onDark = (Story: () => React.ReactElement) => (
  <div className="rounded-sm bg-purple-800 p-8">
    <Story />
  </div>
)

export const Light: Story = { args: { tone: 'light' }, decorators: [onDark] }
export const Brand: Story = { args: { tone: 'brand' }, decorators: [onDark] }
export const Dark: Story = {
  args: { tone: 'dark' },
  decorators: [(Story) => <div className="rounded-sm bg-bg-subtle p-8"><Story /></div>],
}
