import { useState } from 'react'


const faqs = [
  {
    q: 'What is GHM21?',
    a: 'GHM21 is a global community of mutual financial aid. It is a social financial network where people help each other directly.',
  },
  {
    q: 'Is GHM21 a bank or an investment?',
    a: 'No. GHM21 is not a bank, an investment, or a business. There is no central bank account. It is a system that connects people who want to provide help to those who need it.',
  },
  {
    q: 'How does GHM21 work?',
    a: 'GHM21 works through the "Circle of Help." You donate USDT directly to another member, and later, other members donate USDT directly to you.',
  },
  {
    q: 'Where do the 30% returns come from?',
    a: 'There is no "magic" profit-making machine. The 30% comes from the flow of new donations and re-commitments from existing members.',
  },
  {
    q: 'What is the "Zero-Balance" logic, and why should I trust it?',
    a: 'Most systems hold your money in a central bank account. In GHM21, the Smart Contract balance is always $0, meaning no one can run away with your money.',
  },
  {
    q: 'Who created GHM21?',
    a: 'Every member of the launch team is anonymous. You do not need to trust a person; you put your trust in the decentralized blockchain smart contract where "Code is Law."',
  },
  {
    q: 'Will the Smart Contract be open or closed? Does it matter?',
    a: 'The code is transparent and decentralized. This means no one, not even the creators, can change the rules, steal fees, or stop the counter.',
  },
  {
    q: 'Why do I have a random referral code like 8KzP2n9Qx?',
    a: 'This is "Privacy Logic." It prevents outsiders from tracking exactly when you joined or how many people are in the system.',
  },
  {
    q: 'How do I join, and what wallet should I use?',
    a: 'You join by connecting a Web3 wallet such as MetaMask or Trust Wallet and donating between the $10 minimum and $5,000 maximum.',
  },
  {
    q: 'Can I start with any amount, or must I start with $5?',
    a: 'You can start with any amount between $10 and $5,000.',
  },
  {
    q: 'What is the "2-Hour Dash," and what happens if I miss it?',
    a: 'When you choose to help, you have exactly 120 minutes to send the USDT. This keeps the marketplace moving.',
  },
  {
    q: 'What happens when the 21 Million Cap is reached?',
    a: 'The system does not "break"; it completes. No new members can join, but existing members finish their last cycles using the re-commitments already pledged.',
  },
  {
    q: 'In what year will the Halving end and the 21M Cap be reached?',
    a: 'We estimate this will be reached between Year 5 and Year 8. The "Halving" logic acts like a brake on a car. The closer we get to 21M, the slower the profit becomes (30% → 10%), stretching the life of the project.',
  },
  {
    q: 'If the profit drops during a "Halving," is it still worth it?',
    a: 'Yes. Lower profit means higher safety and stability.',
  },
  {
    q: 'Why must I "Re-Commit" before I can take my profit?',
    a: 'This is the "Pinky Promise" logic. It ensures that no one can "Hit and Run."',
  },
  {
    q: 'What is "Anti-Whale" Protection?',
    a: 'It stops one rich person from hogging all the help.',
  },
  {
    q: 'What happens if I want to recommit $100 but seekers only need small amounts?',
    a: 'The system uses "Overflow Routing" to help many people at once.',
  },
  {
    q: 'What is "Bonus Burn"?',
    a: 'It ensures leaders are actually helping, not just "collecting." If a Manager does not have an active contribution (PH) that matches their team\'s energy, bonuses are deleted.',
  },
  {
    q: 'With re-commitment, everyone is technically "active." Is Bonus Burn still useful?',
    a: 'Yes. It targets leaders who try to "play small" while their team plays big.',
  },
  {
    q: 'How many friends do I need to unlock Level 9?',
    a: 'You must be a Manager with 50 Direct Active Referrals and a Team Volume of $100,000.',
  },
  {
    q: 'Is GHM21 a Ponzi/Pyramid scheme, is it legal, and how do Tasks/Reserves work?',
    a: 'Scheme Check: No. In a pyramid, the top takes everything. In GHM21, because of the 21M Cap and Re-Commitment, the top must go to the back of the line to help the bottom.\n\nLegality: Giving money to another person is not prohibited by law. GHM21 is simply a platform that facilitates personal transfers.\n\nGuarantees: There are no guarantees. Participate only with spare money. The system depends on the honesty and activity of its members.\n\nTestimony Lock: You cannot start a new help cycle until you say "Thank You" by uploading a "Letter of Happiness" to attract new members.\n\nGlobal Reserve (0.5%): Community insurance used for manual tasks and system health, such as clearing long-waiting small nodes.',
  },
];



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
