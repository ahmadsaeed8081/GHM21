export default function HeroStats({ CurrHalvingData,currHalvingPhase,totalBusiness}) {

  // console.log("helloo "+currHalvingPhase)
  // console.log(typeof currHalvingPhase);
  function secondsToHours(seconds) {
    return Number((Number(seconds) / 3600).toFixed(2));
  }
  
const halving =[ 
  { label: 'Halving:', value: (Number(currHalvingPhase>=0) ? (Number(currHalvingPhase)  ):0)},


  {
    label: 'Volume:',
    value:
      Number(currHalvingPhase) === 0 ? '0 – $2.1K' :
      Number(currHalvingPhase) === 1 ? '$2.1K – $4.2K' :
      Number(currHalvingPhase) === 2 ? '$4.2K – $6.3K' :
      Number(currHalvingPhase) === 3 ? '$6.3K – $8.4K' :
      Number(currHalvingPhase) === 4 ? '$8.4K – $10.5K' :
      Number(currHalvingPhase) === 5 ? '$10.5K – $12.6K' :
      Number(currHalvingPhase) === 6 ? '$12.6K – $14.7K' :
      Number(currHalvingPhase) === 7 ? '$14.7K – $16.8K' :
      Number(currHalvingPhase) === 8 ? '$16.8K – $18.9K' :
      Number(currHalvingPhase) === 9 ? '$18.9K – $21.0K' :
      '$21.0K'
  },

  // {
  //   label: 'Volume:',
  //   value:
  //     Number(currHalvingPhase) === 0 ? '0 – $2.1M' :
  //     Number(currHalvingPhase) === 1 ? '$2.1M – $4.2M' :
  //     Number(currHalvingPhase) === 2 ? '$4.2M – $6.3M' :
  //     Number(currHalvingPhase) === 3 ? '$6.3M – $8.4M' :
  //     Number(currHalvingPhase) === 4 ? '$8.4M – $10.5M' :
  //     Number(currHalvingPhase) === 5 ? '$10.5M – $12.6M' :
  //     Number(currHalvingPhase) === 6 ? '$12.6M – $14.7M' :
  //     Number(currHalvingPhase) === 7 ? '$14.7M – $16.8M' :
  //     Number(currHalvingPhase) === 8 ? '$16.8M – $18.9M' :
  //     Number(currHalvingPhase) === 9 ? '$18.9M – $21.0M' :
  //     '$21.0M'
  // },


// { label: 'Volume:', value: "$"+ 0  +" = $" + (CurrHalvingData? Number(CurrHalvingData.volume)/10**18:0) },
{ label: 'Returns:', value: CurrHalvingData? Number(CurrHalvingData.reward_percentage)/10**18 +"%" : 0 +"%" },
{ label: 'Delay:', value: CurrHalvingData?  secondsToHours(Number(CurrHalvingData.delay)) + ' Hrs': 0 + ' Hrs' },
{ label: 'Max PH:', value: '$'+( CurrHalvingData?  Number(CurrHalvingData.max_ph)/10**18 : 0 )}


]
  return (
    <section className="relative z-[1] mx-auto w-full max-w-7xl px-6 py-10 pb-4 text-center max-nav:px-4 max-nav:py-7 max-nav:pb-6 max-sm:px-3 max-sm:py-[22px] max-sm:pb-5">
      <div className="mb-5 flex items-baseline justify-center gap-2 max-sm:flex-wrap max-sm:gap-1">
        <span className="text-[clamp(32px,5vw,52px)] font-bold leading-none tracking-tight text-green max-sm:text-[28px]">
        {(Number(totalBusiness)/10**18).toFixed(2)}
        </span>
        <span className="text-[clamp(28px,4vw,46px)] font-bold leading-none tracking-wide text-white max-sm:text-[24px]">
          
        </span>
        <span className="text-[clamp(24px,3.5vw,42px)] font-bold leading-none text-white/60 max-sm:text-[22px]">
          /
        </span>
        <span className="text-[clamp(24px,3.5vw,42px)] font-bold leading-none text-white max-sm:text-[22px]">
          2100 <span className="  text-sm text-gray-400 max-sm:text-[15px]" > USDT</span>
        </span>
      </div>

      <div className="relative mx-auto mb-5 max-w-[720px]">
        <div className="relative flex h-[28px] w-full items-center overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${(((Number(totalBusiness) / 10 ** 18) / 2100) * 100)}%`,
              background: 'linear-gradient(90deg, #00e676 0%, #00c896 40%, #3b82f6 100%)',
            }}
          />
          <span className="relative z-[1] ml-4   w-full text-center text-[13px] font-medium text-gray-300">
          Halving progress:{" "}
{parseFloat(
  ((((Number(totalBusiness) / 10 ** 18) / 2100) * 100).toFixed())
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
