import { useState,useEffect } from 'react'





import { polygon, polygonAmoy } from "wagmi/chains";
import Web3 from "web3";

import { useWeb3Modal,useWeb3ModalTheme } from '@web3modal/wagmi/react'
import { useAccount, useReadContract, useWriteContract,useWaitForTransactionReceipt } from "wagmi";
import { useSwitchChain, useDisconnect } from "wagmi";


import { ToastContainer, toast } from 'react-toastify';

import {
  token_abi, 
  USDT_address,  
  school_contract_abi,
  contract_abi ,
  school_contract_address 

} from "../../src/components/configs/Contracts";



// ─── Curriculum modules (study view) ─────────────────────────────────────────
const curriculum = [
  { part: 'PART 1: CORE PROTOCOL & ARCHITECTURE', mods: [
    'MODULE 1: Core Architecture (Zero-Balance Smart Contract / Non-Custodial Router)',
    'MODULE 2: Settlement Layer (USDT on Binance Smart Chain – BEP20)',
    'MODULE 3: Asset Logic (Direct Peer-to-Peer Wallet-to-Wallet Settlement)',
    'MODULE 4: Scarcity Parameters (The 21M Global Hard Cap Ceiling)',
  ]},
  { part: 'PART 2: THE MATHEMATICAL SUSTAINABILITY COEFFICIENTS', mods: [
    'MODULE 5: Incentive Design (Starts at 30% per Cycle)',
    'MODULE 6: The Halving Mechanism (10% Programmatic Contraction)',
    'MODULE 7: Difficulty Adjustments (Programmatic Queue Pacing)',
    'MODULE 8: System Debt Management (The Elasticity Core)',
  ]},
  { part: 'PART 4: SECURITY PROTOCOLS & USER LOGICS', mods: [
    'MODULE 9: The Handshake (Continuous Circulation Loop)',
    'MODULE 10: 2-Hour Dash (The Disciplinary Matrix)',
    'MODULE 11: Anti-Whale Ladder (Defending Against System Extraction)',
    'MODULE 12: Exit Corridors (Partial Step-Down vs. Emergency Capitals Break)',
  ]},
  { part: 'PART 5: DECENTRALIZED DATA INTERFACES & PRIVACY', mods: [
    'MODULE 13: Identity Protection (The Alphanumeric Masking Engine)',
    'MODULE 14: Onboarding Logic (The Verification Gate Protocol)',
    'MODULE 15: Interface Indexing (Dashboard & Sorting Matrix Optimization)',
  ]},
  { part: 'PART 6: MICRO-ECONOMICS & NETWORK ADVANCEMENT', mods: [
    'MODULE 16: System Extractions (The 2% Fee & 0.5% Global Reserve Split)',
    'MODULE 17: Ledger Cleanup Gates (Bonus Burns & Testimony Locks)',
    'MODULE 18: Intellectual Capability (Rank Benchmarks & Certification Gates)',
  ]},
  { part: 'PART 7: ADVANCED MACROECONOMICS & TERMINAL GRADUATION', mods: [
    'MODULE 19: The Macroeconomics of Inflation, Banking, and Scarcity Design',
    'MODULE 20: Fractional Reserves vs. Decentralized Protocol Autonomy',
    'MODULE 21: Bitcoin and the Architecture of Decentralization',
    'MODULE 22: The Genesis Sunset Termination Protocol',
  ]},
  { part: 'PART 8: INITIALIZATION CIRCUITS (Pre-Launch Governance)', mods: [
    'MODULE 23: The Seed Map (5-Seed Cluster Liquidity Initiation)',
  ]},
  { part: 'PART 9: THE COMMUNITY COMPLIANCE & SAFETY PLEDGE', mods: [
    'MODULE 24: Responsible Participation & Collective Alignment',
  ]},
]

// ─── 72 questions from PDF — answer = correct option index (0=A,1=B,2=C,3=D) ─
const questions = [
  // MODULE 1
  { mod: 'Module 1: Core Architecture', q: 'Why can an external entity or administrator not execute a "pool drain" or exit-scam on the GHM21 contract base?', opts: ['Because the contract architecture maintains a permanent pool balance of exactly $0.00, holding zero collective custody.', 'Because the code is hidden from the public blockchain network ledger.', 'Because the contract requires a 100-person multi-signature key to move assets.', 'Because the contract is backed by a global insurance fund.'], answer: 0 },
  { mod: 'Module 1: Core Architecture', q: 'What is the primary operational vulnerability eliminated by GHM21\'s Zero-Balance Smart Contract Architecture?', opts: ['Manual alphanumeric identity verification delays.', 'Centralized contract wallet drainage, admin exit-scams, and asset freezes.', 'Blockchain network transaction gas fee spikes.', 'Public ledger transaction tracing transparency.'], answer: 1 },
  { mod: 'Module 1: Core Architecture', q: 'In the GHM21 architecture, what is the exact physical function of the primary deployed smart contract code?', opts: ['It acts as a long-term interest-bearing decentralized savings vault.', 'It mints custom inflationary community tokens to pay out cycle returns.', 'It functions exclusively as an automated algorithmic data matching router and referee.', 'It manually collects and exchanges native assets for regional fiat currencies.'], answer: 2 },
  // MODULE 2
  { mod: 'Module 2: Settlement Layer', q: 'What structural advantage does deploying on the Binance Smart Chain (BEP20) network offer to small network nodes?', opts: ['It automatically replaces the alphanumeric masking protocols with KYC steps.', 'It delivers high block execution velocity coupled with micro-penny transaction gas fees.', 'It permits transactions to be executed without any internet connectivity.', 'It allows the smart contract to store physical fiat currency notes safely.'], answer: 1 },
  { mod: 'Module 2: Settlement Layer', q: 'Why does GHM21 utilize a stablecoin (USDT) instead of a volatile asset like Bitcoin or BNB for system settlement?', opts: ['To hide the transaction data history from public blockchain trackers.', 'To bypass the requirement of connecting a Web3 non-custodial wallet.', 'To preserve user purchasing power and eliminate mid-cycle asset volatility.', 'To completely eliminate the need for network transaction gas fees.'], answer: 2 },
  { mod: 'Module 2: Settlement Layer', q: 'What must a participant hold in their connected Web3 wallet to successfully process a BEP20 USDT transaction?', opts: ['A small reserve of native BNB tokens to pay for blockchain network gas fees.', 'Equal values of Ethereum (ERC20) tokens.', 'A verified administrative approval passport code.', 'A minimum of 10 completed Letters of Happiness uploaded to the dashboard.'], answer: 0 },
  // MODULE 3
  { mod: 'Module 3: Asset Logic', q: 'How does the GHM21 platform detect and log that a wallet-to-wallet transfer has occurred?', opts: ['By routing interface graphics through closed administrative Telegram channels.', 'By tracking automated on-chain cryptographic event logs and transaction hash confirmations.', 'By requiring users to email screenshots of transactions to customer support.', 'By relying on an honor system where users manually check a confirmation box.'], answer: 1 },
  { mod: 'Module 3: Asset Logic', q: 'What does the phrase "Contract Balance = $0.00" mean for the ecosystem\'s longevity?', opts: ['The system is mathematically broke and cannot process incoming member queue requests.', 'The platform has run out of operational funding and is facing immediate shutdown.', 'The smart contract holds zero custody of user funds, keeping the system permanently clear of pool drain risks.', 'Users must pay exactly $0.00 in platform fee structures to clear their matrix lines.'], answer: 2 },
  { mod: 'Module 3: Asset Logic', q: 'When a user clicks "Provide Help" on a card, where do the USDT tokens physically route?', opts: ['Into a temporary platform escrow vault account managed by senior managers.', 'Straight from the sender\'s non-custodial wallet to the matched receiver\'s non-custodial wallet.', 'Into a centralized cold storage layout owned by the platform founders.', 'They are converted to gas fees and distributed to network validators.'], answer: 1 },
  // MODULE 4
  { mod: 'Module 4: Scarcity Parameters', q: 'What is the primary purpose of building a strict 21,000,000 USDT Global Hard Cap limit into GHM21?', opts: ['To prevent infinite systemic liability inflation by establishing absolute mathematical scarcity.', 'To ensure the creators can manually withdraw the pool assets once reached.', 'To increase the network transaction gas fees for exiting members.', 'To transition the system from a stablecoin base over to a volatile crypto asset base.'], answer: 0 },
  { mod: 'Module 4: Scarcity Parameters', q: 'How does this scarcity model protect late-stage participants compared to traditional systems?', opts: ['It guarantees they receive an automatic 100% sign-up bonus.', 'It prevents the system from running infinitely into an inescapable mathematical debt wall.', 'It hides their transaction nodes from the public marketplace grid.', 'It allows them to execute unlimited allocations without doing the mandatory Handshake.'], answer: 1 },
  { mod: 'Module 4: Scarcity Parameters', q: 'What occurs automatically when the GHM21 protocol ticker reaches the 21,000,000 USDT boundary?', opts: ['The system expands the limit ceiling by another 21 million to keep expanding.', 'All connected Web3 wallets are permanently locked and blacklisted.', 'The platform fee structures automatically double across all active leadership tiers.', 'The contract hits its Mission Completion Point, closing entry gates and finalizing the cycle maps cleanly.'], answer: 3 },
  // MODULE 5
  { mod: 'Module 5: Incentive Design', q: 'If a user initiates a testing node allocation of exactly $100 USDT, what is their maximum claimable GH value upon cycle completion at baseline parameters?', opts: ['$110 USDT.', '$200 USDT.', '$130 USDT.', '$103 USDT.'], answer: 2 },
  { mod: 'Module 5: Incentive Design', q: 'How does the GHM21 smart contract physically generate the 30% cycle return value?', opts: ['By trading user deposits on high-risk external crypto exchanges.', 'By minting new inflationary platform tokens directly to the user\'s dashboard.', 'It does not generate it centrally; it routes it through subsequent node transaction velocity.', 'By deducting funds from the platform\'s global reserve safety net.'], answer: 2 },
  { mod: 'Module 5: Incentive Design', q: 'What must happen to a node\'s baseline 30% profit parameter as the global system volume scales upward through milestones?', opts: ['It remains fixed at 30% forever without any structural alterations.', 'It automatically doubles to reward late-stage participants.', 'It is entirely replaced by a flat $2 fee structure platform wide.', 'It decreases programmatically at specific volume targets to defend system longevity.'], answer: 3 },
  // MODULE 6
  { mod: 'Module 6: The Halving Mechanism', q: 'If Phase 1 delivers a 30% cycle return, what is the exact programmatic yield percentage during Phase 2?', opts: ['20.00%.', '27.00%.', '29.00%.', '15.00%.'], answer: 1 },
  { mod: 'Module 6: The Halving Mechanism', q: 'What specific event triggers an automated 10% relative halving of the GHM21 system yield?', opts: ['Every time 30 calendar days pass from the initial launch date.', 'When more than 50% of the community leaders execute an emergency exit.', 'Every time the global platform volume increases by an accumulation of 2,100,000 USDT.', 'When the internal contract balance drops below a critical threshold.'], answer: 2 },
  { mod: 'Module 6: The Halving Mechanism', q: 'What is the mathematical goal of the relative halving step-down algorithm?', opts: ['To compress systemic liability margins as the network size scales, guaranteeing structural longevity.', 'To enrich early creators at the expense of new incoming users.', 'To increase the total supply of tokens available for trading on public exchanges.', 'To force all ordinary members to apply for Manager status within 2 hours.'], answer: 0 },
  // MODULE 7
  { mod: 'Module 7: Difficulty Adjustments', q: 'The Difficulty Adjustment algorithm modifies queue parameters every time the system hits what specific volume mark?', opts: ['5,000 USDT.', '21,000,000 USDT.', '2,100,000 USDT.', '100,000 USDT.'], answer: 2 },
  { mod: 'Module 7: Difficulty Adjustments', q: 'Why does the contract increase matching queue delays by 5% as system volume scales up?', opts: ['To pace out capital movement velocity and shield the platform against sudden liquidity bottleneck shocks.', 'To intentionally annoy users so they perform an early platform exit.', 'To give developers more time to manually process transactions.', 'To reduce the amount of BNB gas fees required for transaction confirmations.'], answer: 0 },
  { mod: 'Module 7: Difficulty Adjustments', q: 'What baseline operational parameter is altered by the GHM21 Difficulty Adjustment algorithm?', opts: ['The maximum allocation limit allowed for entry.', 'The time delay across matching queues, which increases by 5% at every milestone.', 'The percentage of direct referral fee structures distributed to Guiders.', 'The alphanumeric masking length of user profile IDs.'], answer: 1 },
  // MODULE 8
  { mod: 'Module 8: System Debt Management', q: 'What happens to the system\'s global liability profile when a user triggers an Emergency Exit?', opts: ['The system debt increases because the platform must pay out massive bonuses.', '100% of that user\'s profit liability is instantly erased and burned by the contract code.', 'The contract balance automatically increases past its $0.00 anchor.', 'The entire platform halts matching protocols for exactly 24 hours.'], answer: 1 },
  { mod: 'Module 8: System Debt Management', q: 'How does the GHM21 protocol achieve structural stability where legacy matrix models collapse?', opts: ['By continuously printing core reserve tokens to cover matching deficits.', 'By forcing users to pay manual administrative recovery fees every 30 days.', 'By making system debt highly elastic and utilizing automated reduction and burn algorithms to erase liabilities.', 'By extending the 2-Hour Dash window out to 15 calendar days.'], answer: 2 },
  { mod: 'Module 8: System Debt Management', q: 'Which combination of code elements forms the GHM21 Math Debt Management framework?', opts: ['Infinite entry caps, fixed 30% yields, and manual queue sorting.', 'KYC verification, automated bank routing, and manual chat tracking.', 'Ethereum gas bridging, multi-sig admin approvals, and public user profile listings.', 'Halving adjustments, Bonus Burns, Autonomous on-chain pool balancing, and Emergency Exit profit-erasure protocols.'], answer: 3 },
  // MODULE 9
  { mod: 'Module 9: The Handshake', q: 'Where do a user\'s previous cycle funds sit if they refuse to perform the mandatory Handshake re-commitment?', opts: ['They are automatically moved into the platform founders\' private wallet.', 'They stay locked in an un-matched, un-payout state on the ledger until the rule is satisfied.', 'They are distributed as direct bonuses to their immediate upline Manager.', 'They used to pay for the global network gas fees of active Speed Stars.'], answer: 1 },
  { mod: 'Module 9: The Handshake', q: 'User A completes a $100 cycle and wants to withdraw their $130 total value. What is the minimum PH re-commitment required to satisfy the Handshake?', opts: ['$10 USDT.', '$100 USDT.', '$30 USDT.', '$130 USDT.'], answer: 1 },
  { mod: 'Module 9: The Handshake', q: 'What is the exact behavioral rule enforced by the Handshake Circulation Principle?', opts: ['A user must recruit 10 new individuals before they can request any withdrawal.', 'A user must leave their profits in the central pool vault for a minimum of 6 months.', 'A user must execute a fresh re-commitment equal to or greater than their original amount to unlock their GH eligibility.', 'A user must pass a manual video verification interview inside the Guiders School.'], answer: 2 },
  // MODULE 10
  { mod: 'Module 10: 2-Hour Dash', q: 'What strict penalty occurs automatically if a user lets their 2-Hour Dash timer hit zero without a confirmed transfer?', opts: ['Their allocation limit is increased by 2.5x.', 'Their wallet is permanently blacklisted from the internet.', 'They face an immediate 24-hour account ban and lose 100% of accumulated bonuses via a Bonus Burn.', 'They are required to pay a manual $50 bypass fee to their upline Manager.'], answer: 2 },
  { mod: 'Module 10: 2-Hour Dash', q: 'What is the operational goal of enforcing the strict 120-minute countdown rule?', opts: ['To ensure rapid transaction velocity and immediately clear lazy or inactive entries from blocking the matching lines.', 'To maximize the platform fee structures collected by the developers.', 'To give users more time to coordinate external bank wire transfers.', 'To reward users with "Speed Star" status automatically.'], answer: 0 },
  { mod: 'Module 10: 2-Hour Dash', q: 'How much time does a participant have to complete an on-chain wallet transfer once paired on the marketplace feed?', opts: ['24 hours.', 'Exactly 120 minutes (2 Hours).', '12 hours.', '30 minutes.'], answer: 1 },
  // MODULE 11
  { mod: 'Module 11: Anti-Whale Ladder', q: 'What predatory behavior is neutralized by the combination of the initial cap and the 2.5x ladder limit?', opts: ['Alphanumeric profile identity tracking by third-party search tools.', 'High-volume capital dumping and extraction manipulation by wealthy "whales".', 'Fast transaction execution by elite Speed Stars.', 'Direct referral bonus generation across generational downlines.'], answer: 1 },
  { mod: 'Module 11: Anti-Whale Ladder', q: 'What is the absolute maximum limit allowed for an initial Provide Help (PH) entry in GHM21?', opts: ['$100 USDT.', '$5,000 USDT.', '$21,000 USDT.', '$2,100 USDT.'], answer: 3 },
  { mod: 'Module 11: Anti-Whale Ladder', q: 'If a participant\'s previous completed cycle commitment was exactly $200 USDT, what is the maximum value they can scale to in their next sequential cycle?', opts: ['$1,000 USDT.', '$200 USDT.', '$500 USDT.', '$5,000 USDT.'], answer: 2 },
  // MODULE 12
  { mod: 'Module 12: Exit Corridors', q: 'What financial penalty does a user face if they execute a complete Emergency Exit on the GHM21 platform?', opts: ['They lose 50% of their raw principal capital to their immediate upline Leader.', 'They are forced to complete the Guiders School exam within 120 minutes.', '100% of their accumulated cycle profits and yields are burned, returning only their raw principal capital.', 'Their transaction queue delay is increased by an absolute 5% adjustment.'], answer: 2 },
  { mod: 'Module 12: Exit Corridors', q: 'What occurs under the Partial Exit logic if a user steps down their re-commitment amount compared to their previous cycle?', opts: ['The contract processes a "Proportional Release," unlocking only the capital covered by the new entry while locking the remainder.', 'The entire previous balance is instantly burned and blacklisted by the platform.', 'The user is automatically elevated to Guider status to offset their lower entry.', 'The 2-Hour Dash countdown timer for their row is permanently disabled.'], answer: 0 },
  { mod: 'Module 12: Exit Corridors', q: 'Once an Emergency Exit is confirmed on the blockchain ledger, what happens to that specific user wallet string?', opts: ['It is placed on an immutable contract blacklist, permanently blocking it from ever participating again.', 'It is granted automatic Priority Score entry if they return with a $10 node.', 'It is rewarded with a 1% Speed Credit bypass token.', 'It is assigned to a 5-Seed Cluster map automatically.'], answer: 0 },
  // MODULE 13
  { mod: 'Module 13: Identity Protection', q: 'How does the GHM21 platform protect user transaction rows from public identification on the feed?', opts: ['By delaying transaction data publication by exactly 24 hours.', 'By charging a $2 bypass fee structure to keep metrics hidden.', 'By processing wallet addresses through an automated 9-character random alphanumeric masking engine.', 'By routing interface graphics through closed administrative Telegram channels.'], answer: 2 },
  { mod: 'Module 13: Identity Protection', q: 'What personal information is required to successfully register an account profile on the GHM21 platform?', opts: ['Absolutely zero personal data; onboarding requires only connecting a Web3 wallet.', 'A verified mobile phone number and active email address.', 'A government-issued passport ID verification scan.', 'A manual validation signature from an active regional Manager.'], answer: 0 },
  { mod: 'Module 13: Identity Protection', q: 'What data format represents a user\'s identity signature across the public Marketplace Feed ledger?', opts: ['Their full first and last name accompanied by an achievement rank badge.', 'A completely unmasked, raw public blockchain wallet string.', 'A randomized 9-character mask like "User-ID-9X47A".', 'An interactive link routing straight to their personal Facebook profile page.'], answer: 2 },
  // MODULE 14
  { mod: 'Module 14: Onboarding Logic', q: 'What specific database vulnerability is neutralized by this onboarding framework?', opts: ['Blockchain network transaction gas fee spikes.', 'Automated 10% relative step-down halving adjustments.', 'Mass creation of empty "ghost nodes" or spam registrations intended to block queue channels.', 'Direct multi-level fee structure tracking across L1-L9 tiers.'], answer: 2 },
  { mod: 'Module 14: Onboarding Logic', q: 'When does the GHM21 system engine officially generate and unlock a new user\'s referral link?', opts: ['The exact second they connect their MetaMask or Trust Wallet keys to the interface dashboard.', 'Once they complete the full 4-stage Guiders School examination matrix.', 'After their upline leader uploads a Letter of Happiness to their profile feed.', 'Only after their first initial Provide Help (PH) transaction is fully confirmed on the blockchain network.'], answer: 3 },
  { mod: 'Module 14: Onboarding Logic', q: 'If a new user connects their wallet but does not initiate a transaction, what can they do within the interface?', opts: ['They can view basic layout items, but their account features remain restricted and unactivated.', 'They can generate unlimited referral codes to share with external P2P traders.', 'They can execute an immediate Get Help request for up to $5,000.', 'They are automatically assigned to the top of the Priority Score sorting queue.'], answer: 0 },
  // MODULE 15
  { mod: 'Module 15: Interface Indexing', q: 'Why does the GHM21 sorting engine prioritize "Small Orders" over standard baseline FIFO entries?', opts: ['To collect higher transaction gas fees from smaller participants.', 'To force large-scale managers to split their accounts into 10 separate wallet entries.', 'To keep micro-node testing lines moving rapidly, ensuring continuous baseline community momentum.', 'To automatically bypass the mandatory Handshake re-commitment rules.'], answer: 2 },
  { mod: 'Module 15: Interface Indexing', q: 'How does the GHM21 dashboard layout display real-time data metrics without an admin panel?', opts: ['By utilizing decentralized indexing via The Graph to stream raw smart contract events onto the UI.', 'By reading manual text inputs submitted via community support teams.', 'By executing estimated projection graphs using offline database assets.', 'By integrating centralized bank accounting books into the web software.'], answer: 0 },
  { mod: 'Module 15: Interface Indexing', q: 'How does a participant achieve "Speed Star Status" to advance their position in the Priority Score sorting queue?', opts: ['By paying a $2 bypass fee structure straight to the smart contract address.', 'By executing their verified transaction and securing network confirmation within the first 30 minutes of matching.', 'By recruiting exactly 50 ordinary members into their frontline downline.', 'By keeping their dashboard page open for a continuous 24-hour tracking window.'], answer: 1 },
  // MODULE 16
  { mod: 'Module 16: System Extractions', q: 'How is the 1% Generational Fee component programmatically distributed by the contract code?', opts: ['It is collected into a centralized vault to fund external advertising campaigns.', 'It is awarded entirely to the oldest active Speed Star user row on the feed.', 'It is split evenly and routed up 9 sequential levels of active leadership downline mapping (L1-L9).', 'It is converted to BNB to automatically cover network transaction gas fees.'], answer: 2 },
  { mod: 'Module 16: System Extractions', q: 'What security mechanism protects Wallet 1 resources during normal system operation?', opts: ['A manual approval block controlled exclusively by the primary project founder.', 'A hardcoded 10% Anti-Drain Ceiling spending limit per execution block.', 'A rule stating it can only be accessed after the 21M hard cap is achieved.', 'An automated system that burns 100% of its tokens every 2.1 Million in volume.'], answer: 1 },
  { mod: 'Module 16: System Extractions', q: 'How is the 0.5% Global Reserve Deduction split across the system multi-sig accounts?', opts: ['50% to Wallet 1 / 50% to Wallet 2 / 0% to Wallet 3.', '40% to Wallet 1 / 40% to Wallet 2 / 20% to Wallet 3.', '80% to Wallet 1 / 10% to Wallet 2 / 10% to Wallet 3.', 'It is transferred completely into a master administrative cashout wallet.'], answer: 1 },
  // MODULE 17
  { mod: 'Module 17: Ledger Cleanup Gates', q: 'What occurs under the Gap Burn rule if a leader maintains a low personal entry tier while their downline processes a large-scale allocation?', opts: ['The percentage credit difference is instantly cut ("burned") from their pending leadership lines by the contract code.', 'The leader\'s account is automatically upgraded to Manager status.', 'The downline member\'s transaction is blocked and placed in the bottom FIFO queue.', 'The leader is given an extended 15-day grace window to pay an equalization fee.'], answer: 0 },
  { mod: 'Module 17: Ledger Cleanup Gates', q: 'What user action is required to clear the dashboard "Testimony Lock" after a successful payout?', opts: ['Completing a mandatory 120-minute countdown challenge in the Guiders School.', 'Executing an immediate emergency exit and blacklisting their Web3 wallet key.', 'Increasing their next initial Provide Help entry by a 2.5x ladder step.', 'Uploading a verified Letter of Happiness testimony to the feed, or paying a flat $2 USDT bypass fee.'], answer: 3 },
  { mod: 'Module 17: Ledger Cleanup Gates', q: 'What is the strategic marketing goal of the Testimony Lock logic?', opts: ['To capture personal identifying information like passwords and emails.', 'To generate a continuous wave of verified social proof to power recruitment and scale community footprint channels.', 'To slow down the matching queue velocity by forcing a 5% time delay increase.', 'To force all active leaders to perform a Partial Exit step-down.'], answer: 1 },
  // MODULE 18
  { mod: 'Module 18: Intellectual Capability', q: 'What score must a community builder achieve on the technical examination paper to graduate from the school and lift the ledger block?', opts: ['An absolute, perfect score of 100%.', 'A baseline passing score of 70% within a 24-hour tracking window.', 'Any score, as long as they pay a $2 bypass fee structure to their Manager.', 'The exam is purely voluntary and does not affect database status parameters.'], answer: 0 },
  { mod: 'Module 18: Intellectual Capability', q: 'What specific requirements must a user\'s database entry satisfy to successfully unlock the status of "Guider Rank"?', opts: ['3 active referrals and $500 USDT total downline volume.', '50 active referrals and $100,000 USDT total downline structural volume.', '10 verified active referrals and an accumulation of $5,000 USDT in total downline structural volume.', 'Completion of 10 letters of happiness and 2 direct emergency exits.'], answer: 2 },
  { mod: 'Module 18: Intellectual Capability', q: 'What programmatic block does the GHM21 smart contract apply to a leader who hits volume metrics but has not passed the Guiders School?', opts: ['Their wallet address is permanently blacklisted and placed in an emergency exit state.', 'Their personal account allocation limit is dropped down to a flat $10 minimum.', 'Their advanced generational leadership fee tiers remain locked until their wallet completes the exam.', 'Their 9-character alphanumeric masking username is displayed in bright red text.'], answer: 2 },
  // MODULE 19
  { mod: 'Module 19: Macroeconomics of Inflation & Scarcity', q: 'What is the true economic impact of unbacked fiat currency inflation on ordinary families?', opts: ['It predictably multiplies their absolute purchasing power and reduces local cost structures.', 'It operates as a hidden tax that erodes the purchasing power of cash balances.', 'It completely shields savings against institutional banking or market crashes.', 'It enables community members to retire early without rendering economic value.'], answer: 1 },
  { mod: 'Module 19: Macroeconomics of Inflation & Scarcity', q: 'What historical shift in modern monetary systems authorized the mechanism of infinite paper money printing?', opts: ['The introduction of digital bank ledgers and automated teller interfaces.', 'The total decoupling of fiat currencies from tangible commodity backing like gold.', 'The migration of local municipal bank accounts onto cloud-based storage servers.', 'The establishment of international trade organizations to balance global shipping lanes.'], answer: 1 },
  { mod: 'Module 19: Macroeconomics of Inflation & Scarcity', q: 'How does GHM21 structurally prevent the system inflation that typically destroys traditional matrix systems?', opts: ['It permits contract managers to print manual balance adjustments whenever supply runs low.', 'It mandates that all program participants swap their personal assets for volatile altcoins.', 'It deploys an unbending 21M hard cap and implements 10% relative yield Halvings every 2.1M in volume.', 'It converts all pending dashboard bonuses into standard Web2 credit points.'], answer: 2 },
  // MODULE 20
  { mod: 'Module 20: Fractional Reserves vs. Protocol Autonomy', q: 'How does GHM21 eliminate the structural risk of centralized custodial mismanagement?', opts: ['It stores the community\'s cash reserves inside a secure private vault monitored by managers.', 'It leverages a zero-balance smart contract that moves assets purely wallet-to-wallet.', 'It relies on an administrative team to approve individual withdrawal lines manually.', 'It limits participation exclusively to licensed commercial banking partners.'], answer: 1 },
  { mod: 'Module 20: Fractional Reserves vs. Protocol Autonomy', q: 'What fundamental structural vulnerability defines fractional reserve banking systems?', opts: ['They allow users to inspect accounting files transparently using public block explorers.', 'They prevent local commercial banks from charging arbitrary transaction processing fees.', 'Institutions lend out the vast majority of user deposits, making them vulnerable to bank runs.', 'They strictly require that all transactions be settled using physical gold notes.'], answer: 2 },
  { mod: 'Module 20: Fractional Reserves vs. Protocol Autonomy', q: 'Why do traditional peer-to-peer projects that deploy centralized admin panels consistently fail?', opts: ['Because their user interfaces are too technically complex for ordinary non-programmers.', 'They force participants to store their private keys inside non-custodial software wallets.', 'They are programmatically restricted from scaling beyond a single regional municipality.', 'Admins hold absolute control and can manually freeze dashboards, alter records, or exit-rug.'], answer: 3 },
  // MODULE 21
  { mod: 'Module 21: Bitcoin & Decentralization', q: 'Why is GHM21 referred to as the "Bitcoin of Community Support"?', opts: ['It allows the administrative core team to manually mint extra USDT rewards at any time.', 'It mirrors Bitcoin\'s 21M cap, automated halvings, and difficulty adjustments directly inside a P2P router.', 'It forces users to buy specialized, expensive computer mining chips to access their dashboards.', 'It is managed and audited by the exact same group of corporate commercial banking partners.'], answer: 1 },
  { mod: 'Module 21: Bitcoin & Decentralization', q: 'What primary architectural innovation did Bitcoin introduce to the global financial landscape?', opts: ['The capability for centralized bank managers to monitor cash distributions via internet links.', 'A digital credit platform backed and managed by international sovereign governments.', 'A decentralized, trustless peer-to-peer currency system operating purely on mathematical logic.', 'The complete replacement of digital signatures with paper-based authentication stamps.'], answer: 2 },
  { mod: 'Module 21: Bitcoin & Decentralization', q: 'What three automated parameters define the scarcity and issuance framework of Bitcoin?', opts: ['Variable interest rates, human credit scoring systems, and manual balance adjustment gates.', 'Open-ended production limits, central bank approvals, and daily processing windows.', 'A fixed 21M hard cap, block reward Halving events, and dynamic Difficulty Adjustments.', 'Corporate tracking cookies, user registration limits, and manual identity verification checks.'], answer: 2 },
  // MODULE 22
  { mod: 'Module 22: Genesis Sunset Termination Protocol', q: 'What happens during Stage 1 of the Genesis Sunset Exit Program?', opts: ['The 30% cycle profit rate increases automatically to clear outstanding lines.', 'New registrations permanently freeze and referral link code generation drops to 0.', 'Wallet 1 transfers all of its stored reserve capital directly into the 5-Seed Cluster.', 'The 120-minute payment window is extended to 24 hours for all active lines.'], answer: 1 },
  { mod: 'Module 22: Genesis Sunset Termination Protocol', q: 'Which accounts are targeted and removed during the Stage 2 Profit Purge phase?', opts: ['Accounts with net-positive historical records where total GH exceeds total PH.', 'Accounts that have failed to complete their mandatory Guider School training.', 'Small orders that have been placed in the sorting queue for more than 72 hours.', 'Wallets that have used the $2 bypass option to clear the testimony block check.'], answer: 0 },
  { mod: 'Module 22: Genesis Sunset Termination Protocol', q: 'How does Stage 3 ensure protection for the final rows in the system queue?', opts: ['It prints new governance tokens to distribute to users as alternative compensation.', 'It transfers the remaining users onto a separate Web2 corporate backup ledger.', 'It allows managers to manually redistribute funds based on individual team volume.', 'It deactivates the 10% ceiling and uses 100% of reserves to clear net-negative accounts.'], answer: 3 },
  // MODULE 23
  { mod: 'Module 23: The Seed Map', q: 'What database state is achieved by running the Seed Map cycle loop prior to public deployment?', opts: ['It automatically blacklists all volatile Binance Smart Chain wallet strings.', 'It sets the primary contract balance to a fixed positive pool value.', 'It populates the marketplace feed with active transaction lines and tests matching velocity parameters.', 'It triggers an immediate 10% step-down halving on baseline outputs.'], answer: 2 },
  { mod: 'Module 23: The Seed Map', q: 'What is the primary operational function of the hardcoded 5-Seed Cluster Map (A1-A5) at launch?', opts: ['To allow the platform founders to extract all early referral incentives cleanly.', 'To initiate an enclosed, high-velocity liquidity loop that generates system momentum before opening to the public.', 'To bypass the 21,000,000 USDT global hard cap restriction parameter.', 'To perform an immediate emergency exit burn across all leadership tiers.'], answer: 1 },
  { mod: 'Module 23: The Seed Map', q: 'Who participates in the initial Seed Map transaction loops prior to global public onboarding?', opts: ['Anonymous unverified automated web bots created by external miners.', 'Exactly 5 foundational core builder nodes executing enclosed, verified matching paths.', 'Any ordinary member who completes the dashboard registration using a $10 node.', 'Exiting members who carry a red flag warning tag on their row layout.'], answer: 1 },
  // MODULE 24
  { mod: 'Module 24: Responsible Participation', q: 'What type of financial community model defines the operational framework of GH Marketplace?', opts: ['A high-risk centralized corporate stock investing venture.', 'A decentralized peer-to-peer horizontal mutual aid community.', 'A fractional reserve legacy commercial banking institution.', 'A government-backed micro-lending insurance facility.'], answer: 1 },
  { mod: 'Module 24: Responsible Participation', q: 'Why does the long-term success of the GHM21 protocol depend solely on the community?', opts: ['Because a centralized administrative board controls the daily queue sorting.', 'Because developers manually handle transaction adjustments every 24 hours.', 'Because there is no admin panel, meaning community execution of code rules fuels the entire engine.', 'Because the system relies on external corporate marketing agencies to scale.'], answer: 2 },
  { mod: 'Module 24: Responsible Participation', q: 'What rule governs capital allocations inside the GHM21 social contract framework?', opts: ['Members must borrow commercial banking loans to reach the max entry cap.', 'Members should prioritize converting all structural assets into volatile altcoins.', 'Capital allocations can be expanded infinitely without completing a Handshake.', 'Members must participate strictly with spare money to ensure systemic safety.'], answer: 3 }
];
const LABELS = ['A', 'B', 'C', 'D']

export default function SchoolPage({user}) {
  const [view, setView] = useState('study')
  const [selected, setSelected] = useState([])
  const [score, setScore] = useState(null)
  const [wrongIdx, setWrongIdx] = useState([])
  const [count, set_count] = useState([])

  // [
  //   0, 1, 2, 1, 2, 0, 1, 2, 1, 0, 1, 3,
  //   2, 2, 3, 1, 2, 0, 2, 0, 1, 1, 2, 3,
  //   1, 1, 2, 2, 0, 1, 1, 3, 2, 2, 0, 0,
  //   2, 0, 2, 2, 3, 0, 2, 0, 1, 2, 1, 1,
  //   0, 3, 1, 0, 2, 2, 1, 1, 2, 1, 2, 3,
  //   1, 2, 2, 1, 0, 3, 2, 1, 1, 1, 2, 3
  // ]




  const { isConnected,isDisconnected,chain } = useAccount()
  const { address } = useAccount();
  const chainId = import.meta.env.VITE_WC_ENV == "production" ? polygon.id : polygonAmoy.id;
  const { chainId: currentChainId } = useAccount();


  const [method, set_method] = useState(0);

const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync,writeContract,data:hash, ...states } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed} =
  useWaitForTransactionReceipt({
    hash,
  })

  // const [showReviewModal, setShowReviewModal] = useState(false)

  const notify = () => toast("Transaction Successfull!");



    useEffect(()=>{
  
      if(isConfirmed && method==0)
      {
        if(count==1)
        {
          // alert("ninkn")
          next();
    
        }
        if(count==2)
        {
          set_count(0)
          notify()
          // setInvestment(0)
          // mount();
        }
      }
  
    
    },[isConfirmed])


  async function submitAnswer() {
    try {
        const tx = await writeContractAsync({
          abi: school_contract_abi,
          address: school_contract_address,
          functionName: "submitAnswers", 
          args: [selected],

        });

        set_count(1)

    } catch (err) {
        console.error(err);
    }
}




  const total = questions.length
  const answered = Object.keys(selected).length

  const handleSelect = (qi, oi) => setSelected(prev => ({ ...prev, [qi]: oi }))

   async function handleSubmit() 
  {
    // alert(user.is_exam_passed)
    if(!isConnected)
    {
      alert("kindly connect your wallet")
      return;
    }

    if(user.is_exam_passed)
    {
      alert("You have already passed the exam")
      return;
    }

    if(chainId != currentChainId )
      {
        await switchChainAsync({ chainId });
        await submitAnswer?.();
      } 
      else 
      {
        await submitAnswer?.();
      }



    
  }

  function next()
  {
    let correct = 0
    const wrong = []
    
    questions.forEach((q, i) => {
      if (selected[i] === q.answer) correct++
      else wrong.push(i)
    })
    set_count(2)

    setScore(correct)
    setWrongIdx(wrong)
    setView('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRetake = () => {
    setSelected({})
    setScore(null)
    setWrongIdx([])
    setView('quiz')
    window.scrollTo({ top: 0, behavior: 'smooth' })

  }
  

  return (
    <>
    {user ? (user.is_exam_passed ?(
      <>
       <section className="relative z-[1] flex-1 px-4 pb-16 pt-6 max-nav:px-2.5 max-sm:px-3 max-sm:pt-4 max-sm:pb-12">
       <div className="mx-auto flex max-w-[740px] flex-col gap-4 max-sm:gap-3">
       <div className="flex flex-col items-center gap-4 rounded-3xl border border-teal/40 bg-teal/[0.06] px-8 py-10 text-center max-sm:gap-3 max-sm:rounded-2xl max-sm:px-5 max-sm:py-7">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal max-sm:h-14 max-sm:w-14">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#003d2e" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div>
        <h3 className="text-[24px] font-bold text-white max-sm:text-[20px]">Certification Passed!</h3>
        <p className="mt-1 text-[13px] text-gray-400 max-sm:text-[12px]">Perfect Score — Guider School Complete</p>
      </div>
      <div className="rounded-2xl border border-teal/30 bg-teal/[0.08] px-8 py-4 max-sm:w-full max-sm:px-5 max-sm:py-3">
        <span className="text-[38px] font-bold text-green max-sm:text-[32px]">72/{total}</span>
        <p className="mt-1 text-[13px] text-gray-300 max-sm:text-[12px]">100% — On-Chain Leadership Fee Tiers Unlocked</p>
      </div>
      <p className="max-w-[440px] text-[13px] leading-relaxed text-gray-400 max-sm:text-[12px]">
        Your wallet is now eligible to sign the Guider School database module, verifying your protocol knowledge and lifting the advanced generational commission gate on-chain.
      </p>
    </div>
    </div>
</section>
</>
    ):(
      <section className="relative z-[1] flex-1 px-4 pb-16 pt-6 max-nav:px-2.5 max-sm:px-3 max-sm:pt-4 max-sm:pb-12">
      <div className="mx-auto flex max-w-[740px] flex-col gap-4 max-sm:gap-3">

        {/* ── Header ── */}
        <div className="text-center">
          <h2 className="font-sans text-[26px] font-bold text-white max-sm:text-[21px]">
            GHM21 Guider's School
          </h2>
          <p className="mt-1 text-sm text-gray-500 max-sm:text-[12px]">
            Comprehensive Training Curriculum — On-Chain Leadership Certification
          </p>
        </div>

        {/* ════════════════════════════
            STUDY VIEW
        ════════════════════════════ */}
        {view === 'study' && (
          <>
            {/* Intro */}
            <div className="rounded-2xl border border-white/[0.12] bg-white/[0.04] px-6 py-5 max-sm:px-4 max-sm:py-4">
              <p className="mb-3 text-[14px] leading-relaxed text-gray-300 max-sm:text-[13px]">
                Welcome to the <span className="font-bold text-white">GHM21 Guider's School</span>. This curriculum covers all core protocol mechanics, security logic, and mathematical sustainability coefficients of GH Marketplace.
              </p>
              <p className="text-[13px] leading-relaxed text-gray-500 max-sm:text-[12px]">
                A perfect <span className="font-semibold text-green">100%</span> score across all{' '}
                <span className="font-semibold text-white">72 questions</span> (24 modules) is mandatory to unlock advanced on-chain leadership fee tiers. Study each module, then click <span className="font-semibold text-teal">Ready for Test</span>.
              </p>
            </div>

            {/* Curriculum */}
            <div className="flex flex-col gap-3 max-sm:gap-2.5">
              {curriculum.map((section, si) => (
                <div key={si} className="rounded-2xl border border-white/[0.10] bg-white/[0.04] px-5 py-4 max-sm:px-4 max-sm:py-3">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-teal max-sm:text-[10px] max-sm:tracking-wide max-sm:mb-2">
                    {section.part}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {section.mods.map((mod, mi) => (
                      <li key={mi} className="flex items-start gap-2">
                        <span className="mt-[3px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-teal/20 text-[8px] text-teal">✓</span>
                        <span className="text-[13px] text-gray-300 max-sm:text-[12px]">{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-4 flex flex-col items-center gap-3 max-sm:mt-2 max-sm:gap-2.5">
              <p className="text-[12px] text-gray-600 max-sm:text-[11px] max-sm:text-center">Read all modules carefully before attempting the exam.</p>

              {/* Download PDF */}
              <a
                href="/GHM21-Guiders-School.pdf"
                download="GHM21-Guiders-School.pdf"
                className="flex w-auto items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-8 py-3 font-sans text-[14px] font-semibold text-gray-200 transition-colors hover:border-white/30 hover:bg-white/[0.10] active:scale-[0.98] max-sm:w-full max-sm:py-3.5 max-sm:text-[13px]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Curriculum PDF
              </a>

              {/* Ready for test */}
              <button
                onClick={() => { setView('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="rounded-full bg-teal px-10 py-3.5 font-sans text-[15px] font-semibold text-teal-dark transition-colors hover:bg-teal-hover active:scale-[0.98] max-sm:w-full max-sm:py-4 max-sm:text-[14px]"
              >
                I'm Ready for Test →
              </button>
            </div>
          </>
        )}

        {/* ════════════════════════════
            QUIZ VIEW
        ════════════════════════════ */}
        {view === 'quiz' && (
          <>
            {/* Progress */}
            <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] px-5 py-4 max-sm:px-4 max-sm:py-3.5">
              <div className="mb-2 flex justify-between text-[12px] text-gray-500">
                <span>Progress</span>
                <span className="font-semibold text-gray-300">{answered} / {total} answered</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${(answered / total) * 100}%`, background: 'linear-gradient(90deg,#00e676,#00c896)' }}
                />
              </div>
            </div>

            {/* Questions */}
            <div className="flex flex-col gap-7 max-sm:gap-6">
              {questions.map((item, qi) => {
                const showHeader = qi === 0 || item.mod !== questions[qi - 1].mod
                return (
                  <div key={qi}>
                    {showHeader && (
                      <div className="mb-2 mt-1 max-sm:mb-1.5">
                        <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal max-sm:px-2.5 max-sm:text-[10px]">
                          {item.mod}
                        </span>
                      </div>
                    )}
                    <p className="mb-3 text-[14px] font-bold leading-snug text-white max-sm:text-[13px] max-sm:mb-2.5">
                      <span className="mr-1 text-gray-600">{qi + 1}.</span>{item.q}
                    </p>
                    <div className="flex flex-col gap-2 max-sm:gap-1.5">
                      {item.opts.map((opt, oi) => {
                        const isSel = selected[qi] === oi
                        return (
                          <button
                            key={oi}
                            type="button"
                            onClick={() => handleSelect(qi, oi)}
                            className={`flex w-full items-center gap-3 rounded-full border px-4 py-3 text-left transition-all duration-150 max-sm:px-3.5 max-sm:py-3.5 ${
                              isSel
                                ? 'border-teal bg-teal/[0.12] text-white'
                                : 'border-white/[0.10] bg-white/[0.04] text-gray-300 hover:border-white/[0.22] hover:bg-white/[0.07]'
                            }`}
                          >
                            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold max-sm:h-5 max-sm:w-5 max-sm:text-[10px] ${
                              isSel ? 'border-teal bg-teal text-teal-dark' : 'border-white/[0.20] text-gray-500'
                            }`}>
                              {LABELS[oi]}
                            </span>
                            <span className="text-[13px] max-sm:text-[12px]">{opt}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Submit */}
            <div className="mt-6 flex flex-col items-center gap-2.5 max-sm:mt-4">
              {answered < total && (
                <p className="text-[12px] text-yellow-500 max-sm:text-center">
                  {total - answered} question{total - answered !== 1 ? 's' : ''} still unanswered
                </p>
              )}
              <button
                onClick={handleSubmit}
                disabled={answered < total}
                className={`rounded-full px-10 py-3.5 font-sans text-[15px] font-semibold transition-all active:scale-[0.98] max-sm:w-full max-sm:py-4 max-sm:text-[14px] ${
                  answered === total
                    ? 'bg-teal text-teal-dark hover:bg-teal-hover'
                    : 'cursor-not-allowed bg-white/[0.06] text-gray-600'
                }`}
              >
                Submit Exam
              </button>
              <button
                onClick={() => setView('study')}
                className="text-[12px] text-gray-600 underline hover:text-gray-400"
              >
                ← Back to Curriculum
              </button>
            </div>
          </>
        )}

        {/* ════════════════════════════
            RESULT VIEW
        ════════════════════════════ */}
        {view === 'result' && score !== null && (
          <div className="flex flex-col gap-5 max-sm:gap-4">
            {/* Score card */}
            {score === total ? (
              <div className="flex flex-col items-center gap-4 rounded-3xl border border-teal/40 bg-teal/[0.06] px-8 py-10 text-center max-sm:gap-3 max-sm:rounded-2xl max-sm:px-5 max-sm:py-7">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal max-sm:h-14 max-sm:w-14">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#003d2e" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-white max-sm:text-[20px]">Certification Passed!</h3>
                  <p className="mt-1 text-[13px] text-gray-400 max-sm:text-[12px]">Perfect Score — Guider School Complete</p>
                </div>
                <div className="rounded-2xl border border-teal/30 bg-teal/[0.08] px-8 py-4 max-sm:w-full max-sm:px-5 max-sm:py-3">
                  <span className="text-[38px] font-bold text-green max-sm:text-[32px]">{score}/{total}</span>
                  <p className="mt-1 text-[13px] text-gray-300 max-sm:text-[12px]">100% — On-Chain Leadership Fee Tiers Unlocked</p>
                </div>
                <p className="max-w-[440px] text-[13px] leading-relaxed text-gray-400 max-sm:text-[12px]">
                  Your wallet is now eligible to sign the Guider School database module, verifying your protocol knowledge and lifting the advanced generational commission gate on-chain.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-3xl border border-red-500/30 bg-red-950/20 px-8 py-10 text-center max-sm:gap-3 max-sm:rounded-2xl max-sm:px-5 max-sm:py-7">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500 bg-red-950 max-sm:h-14 max-sm:w-14">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[22px] font-bold text-white max-sm:text-[18px]">Exam Not Passed</h3>
                  <p className="mt-1 text-[13px] text-gray-400 max-sm:text-[12px]">A perfect 100% score is required</p>
                </div>
                <div className="rounded-2xl border border-red-500/20 bg-red-950/20 px-8 py-4 max-sm:w-full max-sm:px-5 max-sm:py-3">
                  <span className="text-[38px] font-bold text-red-400 max-sm:text-[32px]">{score}/{total}</span>
                  <p className="mt-1 text-[13px] text-gray-400 max-sm:text-[12px]">
                    {total - score} incorrect · {Math.round((score / total) * 100)}% score
                  </p>
                </div>
              </div>
            )}

            {/* Wrong count only — correct answers not revealed */}
            {wrongIdx.length > 0 && (
              <div className="rounded-2xl border border-red-500/20 bg-red-950/10 px-5 py-4 text-center max-sm:px-4 max-sm:py-3">
                <p className="text-[13px] text-gray-400 max-sm:text-[12px]">
                  You got <span className="font-bold text-red-400">{wrongIdx.length}</span> question{wrongIdx.length !== 1 ? 's' : ''} wrong. Study the curriculum and retake the exam to achieve 100%.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col items-center gap-2.5 max-sm:gap-2">
              {score < total && (
                <button
                  onClick={handleRetake}
                  className="rounded-full bg-teal px-10 py-3.5 font-sans text-[15px] font-semibold text-teal-dark transition-colors hover:bg-teal-hover max-sm:w-full max-sm:py-4 max-sm:text-[14px]"
                >
                  Retake Exam
                </button>
              )}
              <button
                onClick={() => { setSelected({}); setScore(null); setWrongIdx([]); setView('study') }}
                className="text-[12px] text-gray-600 underline hover:text-gray-400"
              >
                ← Back to Curriculum
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
    )) : (




          <section className="relative z-[1] flex-1 px-4 pb-16 pt-6 max-nav:px-2.5 max-sm:px-3 max-sm:pt-4 max-sm:pb-12">
      <div className="mx-auto flex max-w-[740px] flex-col gap-4 max-sm:gap-3">

        {/* ── Header ── */}
        <div className="text-center">
          <h2 className="font-sans text-[26px] font-bold text-white max-sm:text-[21px]">
            GHM21 Guider's School
          </h2>
          <p className="mt-1 text-sm text-gray-500 max-sm:text-[12px]">
            Comprehensive Training Curriculum — On-Chain Leadership Certification
          </p>
        </div>

        {/* ════════════════════════════
            STUDY VIEW
        ════════════════════════════ */}
        {view === 'study' && (
          <>
            {/* Intro */}
            <div className="rounded-2xl border border-white/[0.12] bg-white/[0.04] px-6 py-5 max-sm:px-4 max-sm:py-4">
              <p className="mb-3 text-[14px] leading-relaxed text-gray-300 max-sm:text-[13px]">
                Welcome to the <span className="font-bold text-white">GHM21 Guider's School</span>. This curriculum covers all core protocol mechanics, security logic, and mathematical sustainability coefficients of GH Marketplace.
              </p>
              <p className="text-[13px] leading-relaxed text-gray-500 max-sm:text-[12px]">
                A perfect <span className="font-semibold text-green">100%</span> score across all{' '}
                <span className="font-semibold text-white">72 questions</span> (24 modules) is mandatory to unlock advanced on-chain leadership fee tiers. Study each module, then click <span className="font-semibold text-teal">Ready for Test</span>.
              </p>
            </div>

            {/* Curriculum */}
            <div className="flex flex-col gap-3 max-sm:gap-2.5">
              {curriculum.map((section, si) => (
                <div key={si} className="rounded-2xl border border-white/[0.10] bg-white/[0.04] px-5 py-4 max-sm:px-4 max-sm:py-3">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-teal max-sm:text-[10px] max-sm:tracking-wide max-sm:mb-2">
                    {section.part}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {section.mods.map((mod, mi) => (
                      <li key={mi} className="flex items-start gap-2">
                        <span className="mt-[3px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-teal/20 text-[8px] text-teal">✓</span>
                        <span className="text-[13px] text-gray-300 max-sm:text-[12px]">{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-4 flex flex-col items-center gap-3 max-sm:mt-2 max-sm:gap-2.5">
              <p className="text-[12px] text-gray-600 max-sm:text-[11px] max-sm:text-center">Read all modules carefully before attempting the exam.</p>

              {/* Download PDF */}
              <a
                href="/GHM21-Guiders-School.pdf"
                download="GHM21-Guiders-School.pdf"
                className="flex w-auto items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-8 py-3 font-sans text-[14px] font-semibold text-gray-200 transition-colors hover:border-white/30 hover:bg-white/[0.10] active:scale-[0.98] max-sm:w-full max-sm:py-3.5 max-sm:text-[13px]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Curriculum PDF
              </a>

              {/* Ready for test */}
              <button
                onClick={() => { setView('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="rounded-full bg-teal px-10 py-3.5 font-sans text-[15px] font-semibold text-teal-dark transition-colors hover:bg-teal-hover active:scale-[0.98] max-sm:w-full max-sm:py-4 max-sm:text-[14px]"
              >
                I'm Ready for Test →
              </button>
            </div>
          </>
        )}

        {/* ════════════════════════════
            QUIZ VIEW
        ════════════════════════════ */}
        {view === 'quiz' && (
          <>
            {/* Progress */}
            <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] px-5 py-4 max-sm:px-4 max-sm:py-3.5">
              <div className="mb-2 flex justify-between text-[12px] text-gray-500">
                <span>Progress</span>
                <span className="font-semibold text-gray-300">{answered} / {total} answered</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${(answered / total) * 100}%`, background: 'linear-gradient(90deg,#00e676,#00c896)' }}
                />
              </div>
            </div>

            {/* Questions */}
            <div className="flex flex-col gap-7 max-sm:gap-6">
              {questions.map((item, qi) => {
                const showHeader = qi === 0 || item.mod !== questions[qi - 1].mod
                return (
                  <div key={qi}>
                    {showHeader && (
                      <div className="mb-2 mt-1 max-sm:mb-1.5">
                        <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal max-sm:px-2.5 max-sm:text-[10px]">
                          {item.mod}
                        </span>
                      </div>
                    )}
                    <p className="mb-3 text-[14px] font-bold leading-snug text-white max-sm:text-[13px] max-sm:mb-2.5">
                      <span className="mr-1 text-gray-600">{qi + 1}.</span>{item.q}
                    </p>
                    <div className="flex flex-col gap-2 max-sm:gap-1.5">
                      {item.opts.map((opt, oi) => {
                        const isSel = selected[qi] === oi
                        return (
                          <button
                            key={oi}
                            type="button"
                            onClick={() => handleSelect(qi, oi)}
                            className={`flex w-full items-center gap-3 rounded-full border px-4 py-3 text-left transition-all duration-150 max-sm:px-3.5 max-sm:py-3.5 ${
                              isSel
                                ? 'border-teal bg-teal/[0.12] text-white'
                                : 'border-white/[0.10] bg-white/[0.04] text-gray-300 hover:border-white/[0.22] hover:bg-white/[0.07]'
                            }`}
                          >
                            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold max-sm:h-5 max-sm:w-5 max-sm:text-[10px] ${
                              isSel ? 'border-teal bg-teal text-teal-dark' : 'border-white/[0.20] text-gray-500'
                            }`}>
                              {LABELS[oi]}
                            </span>
                            <span className="text-[13px] max-sm:text-[12px]">{opt}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Submit */}
            <div className="mt-6 flex flex-col items-center gap-2.5 max-sm:mt-4">
              {answered < total && (
                <p className="text-[12px] text-yellow-500 max-sm:text-center">
                  {total - answered} question{total - answered !== 1 ? 's' : ''} still unanswered
                </p>
              )}
              <button
                onClick={handleSubmit}
                disabled={answered < total}
                className={`rounded-full px-10 py-3.5 font-sans text-[15px] font-semibold transition-all active:scale-[0.98] max-sm:w-full max-sm:py-4 max-sm:text-[14px] ${
                  answered === total
                    ? 'bg-teal text-teal-dark hover:bg-teal-hover'
                    : 'cursor-not-allowed bg-white/[0.06] text-gray-600'
                }`}
              >
                Submit Exam
              </button>
              <button
                onClick={() => setView('study')}
                className="text-[12px] text-gray-600 underline hover:text-gray-400"
              >
                ← Back to Curriculum
              </button>
            </div>
          </>
        )}

        {/* ════════════════════════════
            RESULT VIEW
        ════════════════════════════ */}
        {view === 'result' && score !== null && (
          <div className="flex flex-col gap-5 max-sm:gap-4">
            {/* Score card */}
            {score === total ? (
              <div className="flex flex-col items-center gap-4 rounded-3xl border border-teal/40 bg-teal/[0.06] px-8 py-10 text-center max-sm:gap-3 max-sm:rounded-2xl max-sm:px-5 max-sm:py-7">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal max-sm:h-14 max-sm:w-14">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#003d2e" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-white max-sm:text-[20px]">Certification Passed!</h3>
                  <p className="mt-1 text-[13px] text-gray-400 max-sm:text-[12px]">Perfect Score — Guider School Complete</p>
                </div>
                <div className="rounded-2xl border border-teal/30 bg-teal/[0.08] px-8 py-4 max-sm:w-full max-sm:px-5 max-sm:py-3">
                  <span className="text-[38px] font-bold text-green max-sm:text-[32px]">{score}/{total}</span>
                  <p className="mt-1 text-[13px] text-gray-300 max-sm:text-[12px]">100% — On-Chain Leadership Fee Tiers Unlocked</p>
                </div>
                <p className="max-w-[440px] text-[13px] leading-relaxed text-gray-400 max-sm:text-[12px]">
                  Your wallet is now eligible to sign the Guider School database module, verifying your protocol knowledge and lifting the advanced generational commission gate on-chain.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-3xl border border-red-500/30 bg-red-950/20 px-8 py-10 text-center max-sm:gap-3 max-sm:rounded-2xl max-sm:px-5 max-sm:py-7">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500 bg-red-950 max-sm:h-14 max-sm:w-14">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[22px] font-bold text-white max-sm:text-[18px]">Exam Not Passed</h3>
                  <p className="mt-1 text-[13px] text-gray-400 max-sm:text-[12px]">A perfect 100% score is required</p>
                </div>
                <div className="rounded-2xl border border-red-500/20 bg-red-950/20 px-8 py-4 max-sm:w-full max-sm:px-5 max-sm:py-3">
                  <span className="text-[38px] font-bold text-red-400 max-sm:text-[32px]">{score}/{total}</span>
                  <p className="mt-1 text-[13px] text-gray-400 max-sm:text-[12px]">
                    {total - score} incorrect · {Math.round((score / total) * 100)}% score
                  </p>
                </div>
              </div>
            )}

            {/* Wrong count only — correct answers not revealed */}
            {wrongIdx.length > 0 && (
              <div className="rounded-2xl border border-red-500/20 bg-red-950/10 px-5 py-4 text-center max-sm:px-4 max-sm:py-3">
                <p className="text-[13px] text-gray-400 max-sm:text-[12px]">
                  You got <span className="font-bold text-red-400">{wrongIdx.length}</span> question{wrongIdx.length !== 1 ? 's' : ''} wrong. Study the curriculum and retake the exam to achieve 100%.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col items-center gap-2.5 max-sm:gap-2">
              {score < total && (
                <button
                  onClick={handleRetake}
                  className="rounded-full bg-teal px-10 py-3.5 font-sans text-[15px] font-semibold text-teal-dark transition-colors hover:bg-teal-hover max-sm:w-full max-sm:py-4 max-sm:text-[14px]"
                >
                  Retake Exam
                </button>
              )}
              <button
                onClick={() => { setSelected({}); setScore(null); setWrongIdx([]); setView('study') }}
                className="text-[12px] text-gray-600 underline hover:text-gray-400"
              >
                ← Back to Curriculum
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
      )
      }

  
  </>
  );
}
