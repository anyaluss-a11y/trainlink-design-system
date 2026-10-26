import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Naledi Dlamini', size: 'lg' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

/** Without a photo the avatar shows the person's initials. Pass `src` to show an image. */
export const Initials: Story = {}
export const Medium: Story = { args: { size: 'md' } }
export const Small: Story = { args: { size: 'sm' } }
