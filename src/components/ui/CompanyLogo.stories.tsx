import type { Meta, StoryObj } from '@storybook/react-vite'
import { CompanyLogo } from './CompanyLogo'

const meta = {
  title: 'Components/Company logo',
  component: CompanyLogo,
  tags: ['autodocs'],
  args: { name: 'Contoso' },
} satisfies Meta<typeof CompanyLogo>

export default meta
type Story = StoryObj<typeof meta>

/** Without a logo image the company's first letter is shown. Pass `src` to show the logo. */
export const Initial: Story = {}
