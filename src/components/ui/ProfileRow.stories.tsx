import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProfileRow } from './ProfileRow'

const meta = {
  title: 'Components/Profile row',
  component: ProfileRow,
  tags: ['autodocs'],
  args: { name: 'Sunil Bubramanial', role: 'Head of product at Northwind', rating: 4.9, jobsCompleted: 26 },
} satisfies Meta<typeof ProfileRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const NoReviewsYet: Story = { args: { rating: undefined, jobsCompleted: undefined } }
