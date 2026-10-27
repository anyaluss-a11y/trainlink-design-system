import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pencil } from 'lucide-react'
import { Button } from './Button'
import { ExperienceItem, ProfileSection } from './ProfileSection'

const meta = {
  title: 'Components/Profile section',
  component: ProfileSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
} satisfies Meta<typeof ProfileSection>

export default meta
type Story = StoryObj<typeof meta>

export const WorkExperience: Story = {
  args: {
    title: 'Work experience',
    action: (
      <Button variant="secondary" iconOnly aria-label="Edit work experience" iconLeft={<Pencil className="size-5" />} />
    ),
    children: (
      <>
        <ExperienceItem title="Senior Product Owner" company="Contoso" description="Description" />
        <ExperienceItem title="I.T Training Facilitator" company="Fabrikam" description="Description" />
      </>
    ),
  },
}

export const ReadOnly: Story = {
  args: {
    title: 'Work experience',
    children: <ExperienceItem title="Senior Product Owner" company="Contoso" description="Description" />,
  },
}
