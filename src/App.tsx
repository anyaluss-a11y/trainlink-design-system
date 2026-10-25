import { ChevronDown, Heart, MessageCircleMore, Pencil } from 'lucide-react'
import { Badge, Button, Input, SearchInput, Textarea } from './components/ui'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="type-heading-sm">{title}</h2>
      {children}
    </section>
  )
}

export default function App() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="type-heading-lg">TrainLink design system</h1>
        <p className="type-body-md text-text-secondary">
          Tokens and components generated from the TrainLink Figma file.
        </p>
      </header>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" iconLeft={<MessageCircleMore className="size-5" />}>Start chat</Button>
          <Button size="lg" disabled iconLeft={<MessageCircleMore className="size-5" />}>Start chat</Button>
          <Button iconRight={<MessageCircleMore className="size-5" />}>Start chat</Button>
          <Button variant="secondary" size="lg" iconLeft={<MessageCircleMore className="size-5" />}>Start chat</Button>
          <Button variant="secondary" iconLeft={<ChevronDown className="size-5" />}>View more</Button>
          <Button variant="secondary" iconOnly aria-label="Edit" iconLeft={<Pencil className="size-5" />} />
          <Button variant="secondary" size="lg" iconOnly aria-label="Favourite" iconLeft={<Heart className="size-5" />} />
          <Button variant="tertiary" iconRight={<ChevronDown className="size-5" />}>Location</Button>
          <Button variant="tertiary" selected iconRight={<ChevronDown className="size-5" />}>Location</Button>
          <Button variant="link" iconRight={<ChevronDown className="size-5" />}>Sort by: Recently posted</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap items-center gap-4">
          <Badge size="lg">Business</Badge>
          <Badge tone="warning">Awaiting facilitator’s signature</Badge>
          <Badge tone="success">Active</Badge>
          <Badge tone="neutral">Closed</Badge>
          <Badge tone="danger">Declined</Badge>
          <Badge tone="info">Shortlisted</Badge>
          <Badge tone="outline">Business</Badge>
          <Badge tone="outline" size="lg">Business</Badge>
          <Badge tone="muted">Awaiting facilitator’s signature</Badge>
        </div>
      </Section>

      <Section title="Inputs">
        <div className="flex max-w-md flex-col gap-6">
          <SearchInput />
          <Input label="Email address" placeholder="Text" />
          <Textarea label="Job description" placeholder="Text" hint="A short description of yourself" />
        </div>
      </Section>
    </main>
  )
}
