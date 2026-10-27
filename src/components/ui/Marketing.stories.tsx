import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrandPanel } from './BrandPanel'
import { ButtonLink } from './Button'
import { CtaBanner } from './CtaBanner'
import { FeatureCard } from './FeatureCard'
import { Footer } from './Footer'
import { OptionCard } from './OptionCard'
import { PhotoPlaceholder } from './PhotoPlaceholder'
import { StepItem } from './StepItem'
import { TestimonialCard } from './TestimonialCard'

const meta = {
  title: 'Components/Marketing',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const OptionCards: Story = {
  render: () => (
    <div role="radiogroup" aria-label="Role" className="flex max-w-xl flex-col gap-4">
      <OptionCard
        lead="I’m a "
        title="Facilitator"
        description="I offer training services and want to get hired for workshops, courses, or consulting"
        selected
      />
      <OptionCard
        lead="I’m a "
        title="Client"
        description="I want to post training needs and find facilitators who can deliver the programmes we require"
      />
    </div>
  ),
}

export const Steps: Story = {
  render: () => (
    <ol className="flex list-none flex-col gap-5">
      <StepItem step={1}>Browse training jobs or facilitators.</StepItem>
      <StepItem step={2}>Submit applications or send offers.</StepItem>
      <StepItem step={3} active>
        Review terms, negotiate scope, and formalize contracts.
      </StepItem>
      <StepItem step={4}>Work together and deliver the training.</StepItem>
    </ol>
  ),
}

export const FeatureCards: Story = {
  render: () => (
    <FeatureCard
      className="max-w-xl"
      title="Trusted Network"
      description="Certified facilitators, approved clients, and transparent ratings."
    >
      <PhotoPlaceholder tone="mint" label="Product preview" className="h-40" />
    </FeatureCard>
  ),
}

export const Testimonial: Story = {
  render: () => (
    <div className="max-w-xl bg-bg-subtle p-8">
      <TestimonialCard
        quote="Jenny was an outstanding facilitator for our recent corporate training. We saw immediate improvements in both confidence and collaboration."
        name="Dan Blackman"
        role="Managing Director"
      />
    </div>
  ),
}

export const CallToAction: Story = {
  render: () => (
    <CtaBanner
      title="Join our certified community of facilitators and clients."
      description="Start collaborating with verified experts, manage jobs seamlessly, and enjoy secure payments—all in one platform."
      action={
        <ButtonLink variant="inverse" href="#">
          Get started
        </ButtonLink>
      }
    />
  ),
}

export const SiteFooter: Story = {
  render: () => (
    <Footer
      copyright="© 2025 TrainLink, all rights reserved."
      columns={[
        { title: 'Quick Links', links: [{ label: 'About', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Help Center', href: '#' }] },
        { title: 'Legal', links: [{ label: 'Terms of Service', href: '#' }, { label: 'Privacy Policy', href: '#' }, { label: 'Cookie Policy', href: '#' }] },
        { title: 'Resources', links: [{ label: 'FAQs', href: '#' }, { label: 'How It Works', href: '#' }, { label: 'Blog / Guides', href: '#' }] },
        { title: 'Contact', links: [{ label: 'LinkedIn', href: '#' }, { label: 'Facebook', href: '#' }, { label: 'Email Us', href: '#' }] },
      ]}
    />
  ),
}

export const BrandPanelStory: Story = {
  name: 'Brand panel',
  render: () => <BrandPanel className="h-96 w-80 rounded-sm" />,
}

export const PhotoPlaceholders: Story = {
  render: () => (
    <div className="flex gap-4">
      {(['mint', 'lilac', 'butter', 'green', 'teal', 'neutral'] as const).map((tone) => (
        <PhotoPlaceholder key={tone} tone={tone} label={`${tone} placeholder`} className="h-40 w-36" />
      ))}
    </div>
  ),
}
