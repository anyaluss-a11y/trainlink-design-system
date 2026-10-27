import type { Meta, StoryObj } from '@storybook/react-vite'
import { Review } from './Review'

const meta = {
  title: 'Components/Review',
  component: Review,
  tags: ['autodocs'],
  args: { rating: 4.9, jobsCompleted: 26 },
} satisfies Meta<typeof Review>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const RatingOnly: Story = { args: { jobsCompleted: undefined } }
export const NoReviewsYet: Story = { args: { rating: undefined, jobsCompleted: undefined } }
