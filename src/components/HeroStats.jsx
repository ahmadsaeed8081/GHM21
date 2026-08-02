export default function HeroStats({ CurrHalvingData,currHalvingPhase,totalBusiness}) {

  // console.log("helloo "+currHalvingPhase)
  // console.log(typeof currHalvingPhase);

  
const halving =[ 
  { label: 'Halving:', value: (Number(currHalvingPhase>=0) ? (Number(currHalvingPhase)  ):0)},
{ label: 'Volume:', value: "$"+(Number(totalBusiness) / 10 ** 18)  +" = $" + (CurrHalvingData? Number(CurrHalvingData.volume)/10**18:0) },
{ label: 'Returns:', value: CurrHalvingData? Number(CurrHalvingData.reward_percentage)/10**18 +"%" : 0 +"%" },
{ label: 'Delay:', value: CurrHalvingData?  Number(CurrHalvingData.delay)/10**18 + ' Hrs': 0 + ' Hrs' },
{ label: 'Max PH:', value: '$'+( CurrHalvingData?  Number(CurrHalvingData.max_ph)/10**18 : 0 )}]
  return (
    <section className="relative z-[1] mx-auto w-full max-w-7xl px-6 py-10 pb-4 text-center max-nav:px-4 max-nav:py-7 max-nav:pb-6 max-sm:px-3 max-sm:py-[22px] max-sm:pb-5">
      <div className="mb-5 flex items-baseline justify-center gap-2 max-sm:flex-wrap max-sm:gap-1">
        <span className="text-[clamp(32px,5vw,52px)] font-bold leading-none tracking-tight text-green max-sm:text-[28px]">
        {Number(totalBusiness)/10**18}
        </span>
        <span className="text-[clamp(28px,4vw,46px)] font-bold leading-none tracking-wide text-white max-sm:text-[24px]">
          
        </span>
        <span className="text-[clamp(24px,3.5vw,42px)] font-bold leading-none text-white/60 max-sm:text-[22px]">
          /
        </span>
        <span className="text-[clamp(24px,3.5vw,42px)] font-bold leading-none text-white max-sm:text-[22px]">
          21,000,000 <span className="  text-sm text-gray-400 max-sm:text-[15px]" > USDT</span>
        </span>
      </div>

      <div className="relative mx-auto mb-5 max-w-[720px]">
        <div className="relative flex h-[28px] w-full items-center overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${(((Number(totalBusiness) / 10 ** 18) / 21000000) * 100)}%`,
              background: 'linear-gradient(90deg, #00e676 0%, #00c896 40%, #3b82f6 100%)',
            }}
          />
          <span className="relative z-[1] ml-4   w-full text-center text-[13px] font-medium text-gray-300">
          Halving progress:{" "}
{parseFloat(
  ((((Number(totalBusiness) / 10 ** 18) / 21000000) * 100).toFixed(5))
)}
%          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-sm text-gray-400 max-sm:text-[13px]">
        {halving.map(({ label, value }, i) => (
          <span key={label} className="flex items-center gap-1 whitespace-nowrap">
            {i > 0 && <span className="mr-1 text-gray-600">|</span>}
            <span className="font-normal">{label}</span>
            <span className="font-semibold text-gray-300">{value}</span>
          </span>
        ))}
      </div>
    </section>
  )
}
