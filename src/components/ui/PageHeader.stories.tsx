import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, BriefcaseBusiness, Compass, House, MessagesSquare, ArrowRight } from 'lucide-react'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { Navigation, NavigationItem } from './Navigation'
import { PageHeader } from './PageHeader'

const meta = {
  title: 'Components/Page header',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'landing', 'light'] },
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

const icon = { dashboard: <House />, jobs: <BriefcaseBusiness />, explore: <Compass />, chats: <MessagesSquare /> }

const notifications = (className?: string) => (
  <Button variant="secondary" aria-label="Notifications" iconLeft={<Bell className="size-5" />} className={className} />
)
const avatar = <div className="flex items-center py-5"><Avatar name="Naledi Dlamini" /></div>

export const Default: Story = {
  args: {
    navigation: (
      <Navigation>
        <NavigationItem href="#" label="Dashboard" icon={icon.dashboard} active />
        <NavigationItem href="#" label="My Jobs" icon={icon.jobs} />
        <NavigationItem href="#" label="Explore" icon={icon.explore} />
        <NavigationItem href="#" label="Chats" icon={icon.chats} />
      </Navigation>
    ),
    actions: (
      <>
        {notifications()}
        {avatar}
      </>
    ),
  },
}

export const Mvp: Story = {
  args: {
    navigation: (
      <Navigation>
        <NavigationItem href="#" label="My Jobs" icon={icon.jobs} active />
        <NavigationItem href="#" label="Explore" icon={icon.explore} />
        <NavigationItem href="#" label="Chats" icon={icon.chats} />
      </Navigation>
    ),
    actions: (
      <>
        {notifications()}
        {avatar}
      </>
    ),
  },
}

export const Landing: Story = {
  args: {
    variant: 'landing',
    navigation: (
      <Navigation>
        <NavigationItem href="#" label="About" />
        <NavigationItem href="#" label="Pricing" />
        <NavigationItem href="#" label="How it works" />
      </Navigation>
    ),
    actions: (
      <Button size="lg" iconRight={<ArrowRight className="size-5" />}>
        Sign in
      </Button>
    ),
  },
}

export const Light: Story = {
  args: {
    variant: 'light',
    navigation: (
      <Navigation>
        <NavigationItem href="#" label="My Jobs" icon={icon.jobs} active />
        <NavigationItem href="#" label="Explore" icon={icon.explore} />
        <NavigationItem href="#" label="Chats" icon={icon.chats} />
      </Navigation>
    ),
    actions: (
      <>
        {notifications('bg-teal-100 text-green-35 hover:bg-teal-85')}
        {avatar}
      </>
    ),
  },
}
