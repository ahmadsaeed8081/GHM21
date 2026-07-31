import { useState } from 'react'

const faqs = [
  {
    q: 'What is GH Marketplace and how does it work?',
    a: 'GH Marketplace is a decentralized blockchain platform where users can invest, earn rewards, and support community needs. It operates through smart contracts — meaning all transactions are transparent, automatic, and governed by code. The platform runs on the GH21 token and follows the principle: Code is Law.',
  },
  {
    q: 'What is the GH21 token and what is it used for?',
    a: 'GH21 is the native utility token of GH Marketplace. It powers all platform activity including providing help, boosting listings, accessing premium features, and earning halving rewards.',
  },
  {
    q: 'How does the referral system work?',
    a: 'GH Marketplace features a 3-level referral system. You earn commissions from your Direct referrals (Level 1), their referrals (Level 2), and one level beyond (Level 3). Your unique referral link is available on your Profile page.',
  },
  {
    q: 'What is the Velocity Timer and why does it matter?',
    a: 'The Velocity Timer (Recommit Timer) is a countdown that defines how long you have to recommit to an active help cycle. Failing to recommit within the window may result in losing your position in the queue.',
  },
  {
    q: 'What is the Needs Feed and how can I use it?',
    a: 'The Needs Feed is the main Marketplace Feed where all active help seekers post their requests. You can search, filter, Dream, Boost, or Provide Help directly from any listing on the feed.',
  },
  {
    q: 'Is GH Marketplace safe and audited?',
    a: 'GH Marketplace operates entirely on smart contracts that are transparent and immutable on the blockchain. Every transaction is publicly verifiable — upholding our core principle: Code is Law.',
  },
  {
    q: 'How do I get started on GH Marketplace?',
    a: 'Connect your crypto wallet using the Connect Wallet button, browse the Marketplace Feed, select a listing, and click "Provide Help". To receive help, post your own listing and wait for providers to respond.',
  },
]

const ChevronIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export default function FaqPage() {
  const [open, setOpen] = useState(0)

  return (
    <section className="relative z-[1] flex-1 px-4 py-12 pb-[60px] max-sm:px-4 max-sm:py-12 max-sm:pb-12">
      <div className="mx-auto max-w-[900px]">
        <h2 className="mb-10 text-center font-sans text-[32px] font-bold tracking-tight text-white max-sm:mb-7 max-sm:text-2xl">
          Frequently Asked Questions
        </h2>
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-feed">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`border-b border-white/[0.08] last:border-b-0 ${isOpen ? '' : ''}`}
              >
                <button
                  className={`flex w-full cursor-pointer items-center justify-between gap-5 border-none bg-transparent px-7 py-[22px] text-left transition-colors hover:bg-white/[0.03] max-sm:px-5 max-sm:py-[18px] ${isOpen ? 'bg-teal/[0.04]' : ''}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-sans text-[15px] font-medium leading-normal text-white max-sm:text-sm">
                    Q{i + 1}. {item.q}
                  </span>
                  <span
                    className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-teal text-teal-dark transition-transform duration-250 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <ChevronIcon />
                  </span>
                </button>
                {isOpen && (
                  <p className="max-w-[760px] px-7 pb-6 font-sans text-sm leading-[1.75] text-gray-400 max-sm:px-5 max-sm:pb-5 max-sm:text-[13px]">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
