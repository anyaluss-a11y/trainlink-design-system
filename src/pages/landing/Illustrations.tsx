import '@fontsource/qwitcher-grypen'
import { Quote, ShieldCheck, Star } from 'lucide-react'
import { portraits } from '../../assets/people'
import { ProfileCard } from '../../components/ui/ProfileCard'

/** Product preview for "Trusted Network": a facilitator card with rating and certification pills. */
export function TrustedNetworkIllustration() {
  return (
    <div className="relative mx-auto h-54 w-full max-w-150.5">
      <ProfileCard
        orientation="horizontal"
        name="Sunil Bubramanial"
        avatarSrc={portraits[2]}
        role="Head of product at Northwind"
        tags={['Business', 'Product Management', 'Leadership', 'Strategy', 'Coaching', 'Agile', 'Facilitation']}
        className="absolute top-0 left-0 sm:left-[12%] sm:w-[75%]"
      />
      <div className="type-body-md absolute top-41.5 left-[8%] flex items-center gap-1 rounded-full bg-green-35 px-2 py-3.75 text-neutral-black sm:left-[47%]">
        <Star aria-hidden className="size-4 fill-current text-icon-rating" />
        <span className="font-bold!">4.9</span>
        <span>(26 verified reviews)</span>
      </div>
      <div className="type-body-md absolute top-29 left-[55%] flex h-11.5 items-center gap-2 rounded-full bg-teal-100 px-4.5 text-green-100 sm:left-[61%]">
        <ShieldCheck aria-hidden className="size-5" />
        Certified
      </div>
    </div>
  )
}

/** Product preview for "Secure Workflows": a contract, an invoice and a review stacked together. */
export function SecureWorkflowIllustration() {
  return (
    <div className="relative mx-auto h-58 w-full max-w-150.5">
      <div className="absolute top-0 left-0 flex h-33.75 w-[25%] min-w-32 flex-col gap-4 rounded-sm border border-black-5 bg-bg-default p-3">
        <p className="type-body-xl text-center text-gray-500">Contract</p>
        <div className="flex flex-col gap-2.5">
          <span className="h-1.5 w-[72%] bg-black-10" />
          <span className="h-1.5 w-[64%] bg-black-10" />
        </div>
        <p className="mt-auto text-right font-['Qwitcher_Grypen'] text-3xl text-neutral-black">Jenny Lee</p>
      </div>

      <div className="absolute top-2 right-0 flex h-25 w-[40%] min-w-52 items-center justify-between rounded-sm border border-black-5 bg-bg-default py-3 pr-3 pl-8">
        <div className="flex flex-col gap-1">
          <p className="type-body-md text-gray-500">Invoice</p>
          <p className="type-heading-lg flex gap-2 text-gray-800">
            <span>$</span>
            <span>3000</span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <span aria-hidden className="size-9 rounded-sm bg-purple-200" />
          <span className="type-label-xs rounded-full bg-green-45 px-2.5 py-1 text-neutral-black">PAID</span>
        </div>
      </div>

      <div className="absolute top-10 left-[18%] z-10 flex h-48 w-[47%] min-w-60 flex-col items-center justify-between rounded-sm bg-bg-default px-3 py-6 shadow-[0_5px_5px_rgba(24,24,27,0.1),0_0_1px_rgba(24,24,27,0.3)]">
        <div className="flex gap-1" aria-label="Rated 5 out of 5" role="img">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} aria-hidden className="size-6 fill-current text-icon-rating" />
          ))}
        </div>
        <div className="relative">
          <Quote aria-hidden className="absolute -top-10 right-2 size-6 text-gray-500" />
          <p className="type-body-md max-w-58 text-center leading-snug! text-gray-500">
            Delivered beyond expectations and kept us informed every step of the way. Highly recommended!
          </p>
        </div>
      </div>
    </div>
  )
}

const matchChips = [
  { label: 'Expertise:', value: 'Business', className: 'left-0 top-0' },
  { label: 'Location:', value: 'South Africa', className: 'left-14.5 top-14' },
  { label: 'Languages:', value: 'English, Afrikaans', className: 'left-45.5 top-0' },
  { label: 'Training format:', value: 'Hybrid', className: 'left-63.5 top-14' },
]

/** Product preview for "Smart Matching": scattered filter chips and a match count. */
export function SmartMatchingIllustration() {
  return (
    <div className="relative hidden min-h-70 flex-1 md:block" aria-hidden>
      <div className="absolute top-[30%] left-[10%] h-30 w-120">
        {matchChips.map((chip) => (
          <span
            key={chip.label}
            className={`type-label-sm absolute flex h-11.75 items-center gap-1 rounded-full border-2 border-black-5 bg-bg-default px-5 whitespace-nowrap text-text-primary ${chip.className}`}
          >
            <span>{chip.label}</span>
            <span className="font-medium!">{chip.value}</span>
          </span>
        ))}
        <span className="type-body-2xl absolute top-24 left-32 flex h-16 items-center rounded-full bg-green-45 px-8 font-bold! whitespace-nowrap text-neutral-black">
          We’ve found 75 matches
        </span>
      </div>
    </div>
  )
}
