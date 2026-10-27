import { portraits } from '../assets/people'
import { BrandPanel } from '../components/ui/BrandPanel'
import { ButtonLink } from '../components/ui/Button'
import { CtaBanner } from '../components/ui/CtaBanner'
import { FeatureCard } from '../components/ui/FeatureCard'
import { Footer } from '../components/ui/Footer'
import type { FooterColumn } from '../components/ui/Footer'
import { Navigation, NavigationItem } from '../components/ui/Navigation'
import { PageHeader } from '../components/ui/PageHeader'
import { StepItem } from '../components/ui/StepItem'
import { TestimonialCard } from '../components/ui/TestimonialCard'
import {
  SecureWorkflowIllustration,
  SmartMatchingIllustration,
  TrustedNetworkIllustration,
} from './landing/Illustrations'

const scrollTo = (id: string) => (event: React.MouseEvent) => {
  event.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

interface Tile {
  src: string
  /** Position as a share of the section width, so the tiles keep their layout at any desktop size. */
  left: string
  top: number
  width: number
  height: number
}

const heroTiles: Tile[] = [
  { src: portraits[0], left: '1.9%', top: 308, width: 144, height: 163 },
  { src: portraits[4], left: '7%', top: 61, width: 144, height: 163 },
  { src: portraits[2], left: '17.3%', top: 497, width: 144, height: 163 },
  { src: portraits[5], left: '77.2%', top: 475, width: 144, height: 163 },
  { src: portraits[1], left: '82.7%', top: 0, width: 144, height: 163 },
  { src: portraits[3], left: '87.9%', top: 257, width: 144, height: 163 },
]

const ctaTiles: Tile[] = [
  { src: portraits[3], left: '4.7%', top: 95, width: 112, height: 145 },
  { src: portraits[5], left: '11.9%', top: 353, width: 105, height: 136 },
  { src: portraits[1], left: '86.6%', top: 73, width: 108, height: 122 },
  { src: portraits[0], left: '81%', top: 341, width: 110, height: 125 },
]

/** Decorative photos scattered around a section. Hidden on small screens. */
function TileField({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="hidden xl:block" aria-hidden>
      {tiles.map((tile) => (
        <img
          key={`${tile.left}-${tile.top}`}
          src={tile.src}
          alt=""
          loading="lazy"
          className="absolute rounded-sm object-cover"
          style={{ left: tile.left, top: tile.top, width: tile.width, height: tile.height }}
        />
      ))}
    </div>
  )
}

const footerColumns: FooterColumn[] = [
  { title: 'Quick Links', links: [{ label: 'About', href: '#/' }, { label: 'Pricing', href: '#/' }, { label: 'Help Center', href: '#/' }] },
  { title: 'Legal', links: [{ label: 'Terms of Service', href: '#/' }, { label: 'Privacy Policy', href: '#/' }, { label: 'Cookie Policy', href: '#/' }] },
  { title: 'Resources', links: [{ label: 'FAQs', href: '#/' }, { label: 'How It Works', href: '#/' }, { label: 'Blog / Guides', href: '#/' }] },
  { title: 'Contact', links: [{ label: 'LinkedIn', href: '#/' }, { label: 'Facebook', href: '#/' }, { label: 'Email Us', href: '#/' }] },
]

const testimonial =
  'Jenny was an outstanding facilitator for our recent corporate training on digital transformation. She clearly explained complex IT concepts, encouraged open discussion, and tailored exercises to our team’s needs. We saw immediate improvements in both confidence and collaboration—highly recommend Anna for any organization seeking expert guidance and a positive learning experience!'

export function Landing() {
  return (
    <div className="mx-auto flex max-w-360 flex-col gap-30 bg-bg-default p-5">
      <div className="flex flex-col gap-15">
        <PageHeader
          variant="subtle"
          logoHref="#/"
          navigation={
            <Navigation className="hidden md:flex">
              <NavigationItem href="#/" label="About" onClick={scrollTo('about')} />
              <NavigationItem href="#/" label="Pricing" onClick={scrollTo('pricing')} />
              <NavigationItem href="#/" label="How it works" onClick={scrollTo('how-it-works')} />
            </Navigation>
          }
          actions={
            <ButtonLink variant="outline" href="#/login">
              Sign in
            </ButtonLink>
          }
        />

        <section className="relative flex h-165 flex-col items-center justify-center gap-4 overflow-clip pt-35 pb-40">
          <TileField tiles={heroTiles} />
          <div className="relative flex flex-col items-center gap-10 px-6">
            <div className="flex flex-col items-center gap-10 text-center">
              <h1 className="type-display-hero max-w-163.5 text-neutral-black max-sm:text-[40px]!">Smart connections that move people forward</h1>
              <p className="type-body-xl max-w-152.5 text-gray-500">
                Access the world’s top independent trainers and facilitators. Collaborate with verified experts, manage
                training programs, and ensure results — with secure project management and payment, all in one place.
              </p>
            </div>
            <ButtonLink variant="accent" href="#/signup">
              Get started
            </ButtonLink>
          </div>
        </section>
      </div>

      <section id="how-it-works" className="flex flex-col gap-15 rounded-sm bg-bg-subtle p-7.5 lg:flex-row">
        <BrandPanel className="min-h-100 w-full rounded-sm lg:min-h-0 lg:w-154.75 lg:shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="type-display-title text-text-primary max-sm:text-[32px]!">
              Your Secure, All-in-One Training Marketplace
            </h2>
            <p className="type-body-xl max-w-137.5 text-gray-500">
              Connect with top independent trainers and facilitators. Post or apply for training jobs, collaborate with
              verified experts, manage training projects end-to-end, and handle secure payments—all in one seamless
              platform.
            </p>
          </div>
          <ol className="flex list-none flex-col gap-5">
            <StepItem step={1}>Browse training jobs or facilitators.</StepItem>
            <StepItem step={2}>Submit applications or send offers.</StepItem>
            <StepItem step={3} active>
              Review terms, negotiate scope, and formalize contracts.
            </StepItem>
            <StepItem step={4}>Work together and deliver the training.</StepItem>
            <StepItem step={5}>Confirm completion and release secure payment.</StepItem>
          </ol>
        </div>
      </section>

      <section id="about" className="flex flex-col gap-10 px-0 lg:px-7.5">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="type-display-title max-w-137.25 text-text-primary max-sm:text-[32px]!">Empowering Better Training Connections</h2>
          <ButtonLink variant="accent" href="#/signup">
            Get started
          </ButtonLink>
        </div>
        <div className="flex flex-col gap-3.75">
          <div className="grid gap-3.75 lg:grid-cols-2">
            <FeatureCard
              title="Trusted Network"
              description="Certified facilitators, approved clients, and transparent ratings."
            >
              <TrustedNetworkIllustration />
            </FeatureCard>
            <FeatureCard
              title="Secure Workflows"
              description="Escrow payments, easy contracts, guaranteed satisfaction."
            >
              <SecureWorkflowIllustration />
            </FeatureCard>
          </div>
          <FeatureCard
            title="Smart Matching"
            description="Find the right fit by skills, experience, and training needs—across any format or location."
            className="min-h-90 p-10 md:flex-row md:items-stretch"
          >
            <SmartMatchingIllustration />
          </FeatureCard>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-10 rounded-sm bg-bg-subtle p-7.5 lg:flex-row">
        <h2 className="type-display-title max-w-137.25 text-text-primary max-sm:text-[32px]!">Why companies choose TrainLink</h2>
        <div className="flex w-full flex-col gap-3.75 lg:w-165.5">
          <TestimonialCard quote={testimonial} name="Dan Blackman" role="Managing Director" avatarSrc={portraits[3]} />
          <TestimonialCard
            quote={testimonial}
            name="Priya Naidoo"
            role="Head of Learning & Development"
            avatarSrc={portraits[5]}
          />
        </div>
      </section>

      <div id="pricing" className="flex flex-col rounded-sm">
        <CtaBanner
          title="Join our certified community of facilitators and clients."
          description="Start collaborating with verified experts, manage jobs seamlessly, and enjoy secure payments—all in one platform."
          decoration={<TileField tiles={ctaTiles} />}
          action={
            <ButtonLink variant="inverse" href="#/signup">
              Get started
            </ButtonLink>
          }
        />
        <Footer
          columns={footerColumns}
          copyright="© 2025 TrainLink, all rights reserved."
          className="rounded-b-sm"
        />
      </div>
    </div>
  )
}

