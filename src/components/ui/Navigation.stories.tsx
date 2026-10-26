import type { Meta, StoryObj } from '@storybook/react-vite'
import { BriefcaseBusiness, Compass, House, MessagesSquare } from 'lucide-react'
import { Navigation, NavigationItem } from './Navigation'

const meta = {
  title: 'Components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="rounded-sm bg-purple-800 px-10"><Story /></div>],
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj<typeof meta>

export const WithIcons: Story = {
  args: {
    children: (
      <>
        <NavigationItem href="#" label="Dashboard" icon={<House />} active />
        <NavigationItem href="#" label="My Jobs" icon={<BriefcaseBusiness />} />
        <NavigationItem href="#" label="Explore" icon={<Compass />} />
        <NavigationItem href="#" label="Chats" icon={<MessagesSquare />} />
      </>
    ),
  },
}

export const TextOnly: Story = {
  args: {
    children: (
      <>
        <NavigationItem href="#" label="About" />
        <NavigationItem href="#" label="Pricing" />
        <NavigationItem href="#" label="How it works" />
      </>
    ),
  },
}
