import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { FilterBar } from './FilterBar'
import { FilterChip } from './FilterChip'
import { SearchInput } from './Input'

const meta = {
  title: 'Components/Filter bar',
  component: FilterBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

const search = <SearchInput className="w-92.5" />
const saved = <FilterChip label="Saved" icon={<Heart className="size-5" aria-hidden />} chevron={false} />

export const Default: Story = {
  args: {
    search,
    actions: saved,
    children: (
      <>
        <FilterChip label="Expertise" value="Business" />
        <FilterChip label="Location" />
        <FilterChip label="Languages" />
        <FilterChip label="Training format" />
      </>
    ),
  },
}

export const NoFiltersApplied: Story = {
  args: {
    search,
    actions: saved,
    children: (
      <>
        <FilterChip label="Expertise" />
        <FilterChip label="Location" />
        <FilterChip label="Languages" />
        <FilterChip label="Training format" />
      </>
    ),
  },
}

const options = ['Business', 'Technology', 'Healthcare']

function InteractiveExample() {
  const [expertise, setExpertise] = useState<string | undefined>('Business')
  const next = () => {
    const i = expertise ? options.indexOf(expertise) : -1
    setExpertise(i + 1 < options.length ? options[i + 1] : undefined)
  }
  return (
    <FilterBar search={search} actions={saved}>
      <FilterChip label="Expertise" value={expertise} onClick={next} />
      <FilterChip label="Location" />
      <FilterChip label="Languages" />
      <FilterChip label="Training format" />
    </FilterBar>
  )
}

/** Click a chip to cycle through values and back to empty. In your app this is where a dropdown would open. */
export const Interactive: Story = {
  render: () => <InteractiveExample />,
}
