import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input, SearchInput, Textarea } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-110"><Story /></div>],
  args: { label: 'Email address', placeholder: 'Text', disabled: false },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'We’ll never share your email' } }
export const Disabled: Story = { args: { disabled: true } }

export const TextArea: StoryObj<typeof Textarea> = {
  render: (args) => <Textarea {...args} />,
  args: { label: 'Job description', placeholder: 'Text', hint: 'A short description of yourself' },
}

export const Search: StoryObj<typeof SearchInput> = {
  render: (args) => <SearchInput {...args} />,
}
