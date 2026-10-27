import type { Meta, StoryObj } from '@storybook/react-vite'
import { portraits } from '../../assets/people'
import { ProfileCard } from './ProfileCard'

const meta = {
  title: 'Components/Profile card',
  component: ProfileCard,
  tags: ['autodocs'],
  args: {
    name: 'Sunil Bubramanial',
    role: 'Head of product at Northwind',
    rating: 4.9,
    jobsCompleted: 26,
    tags: ['Business', 'Product Management', 'Leadership', 'Strategy', 'Agile', 'Coaching', 'Facilitation'],
    maxTags: 2,
  },
} satisfies Meta<typeof ProfileCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const FewTags: Story = { args: { tags: ['Business', 'Product Management'] } }
export const NewFacilitator: Story = { args: { rating: undefined, jobsCompleted: undefined, tags: ['Business'] } }
export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  decorators: [(Story) => <div className="w-113"><Story /></div>],
}
export const WithPhoto: Story = { args: { avatarSrc: portraits[2] } }
