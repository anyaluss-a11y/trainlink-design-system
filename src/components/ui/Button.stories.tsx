import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDown, Heart, MessageCircleMore, Pencil } from 'lucide-react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Start chat', variant: 'primary', size: 'sm', disabled: false },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'tertiary', 'link'] },
    size: { control: 'inline-radio', options: ['sm', 'lg'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

const chat = <MessageCircleMore className="size-5" />
const chevron = <ChevronDown className="size-5" />

export const Primary: Story = { args: { variant: 'primary', iconLeft: chat } }
export const PrimaryLarge: Story = { args: { variant: 'primary', size: 'lg', iconLeft: chat } }
export const PrimaryInactive: Story = { args: { variant: 'primary', size: 'lg', iconLeft: chat, disabled: true } }
export const PrimaryIconRight: Story = { args: { variant: 'primary', iconRight: chat } }
export const Secondary: Story = { args: { variant: 'secondary', iconLeft: chat } }
export const SecondaryIconRight: Story = { args: { variant: 'secondary', children: 'View more', iconRight: chevron } }
export const SecondaryIconOnly: Story = {
  args: { variant: 'secondary', iconOnly: true, 'aria-label': 'Edit', iconLeft: <Pencil className="size-5" /> },
}
export const SecondaryIconOnlyLarge: Story = {
  args: { variant: 'secondary', size: 'lg', iconOnly: true, 'aria-label': 'Favourite', iconLeft: <Heart className="size-5" /> },
}
export const Tertiary: Story = { args: { variant: 'tertiary', children: 'Location', iconRight: chevron } }
export const TertiarySelected: Story = { args: { variant: 'tertiary', children: 'Location', iconRight: chevron, selected: true } }
export const Link: Story = { args: { variant: 'link', children: 'Sort by: Recently posted', iconRight: chevron } }
