import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Naledi Dlamini', size: 'lg' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    shape: { control: 'inline-radio', options: ['circle', 'rounded', 'square'] },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

/** Without a photo the avatar shows the person's initials. Pass `src` to show an image. */
export const Initials: Story = {}
export const Medium: Story = { args: { size: 'md' } }
export const Small: Story = { args: { size: 'sm' } }
export const Large: Story = { args: { size: 'lg' } }
export const ExtraLargeRounded: Story = { args: { size: 'xl', shape: 'rounded' } }
