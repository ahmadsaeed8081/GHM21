import { useState, useEffect } from 'react'
import dream from '../assets/icons/dream.png';
import boost from '../assets/icons/boost.png';
import dropdown from '../assets/icons/dropdown.png';
import diamond from '../assets/icons/diamond.png';
import TopupModal from "../components/TopupModal"
import shield from '../assets/icons/shield.png';
import medal from '../assets/icons/medal.png';
import crown from '../assets/icons/crown.png';

import Certificate from './Certificate';
import { polygon, polygonAmoy } from "wagmi/chains";
import Web3 from "web3";

import { useWeb3Modal,useWeb3ModalTheme } from '@web3modal/wagmi/react'
import { useAccount, useReadContract, useWriteContract,useWaitForTransactionReceipt } from "wagmi";
import { useSwitchChain, useDisconnect } from "wagmi";
import ProvideHelpModal from './ProvideHelpModal';

import { ToastContainer, toast } from 'react-toastify';
import NotificationTimer from "../components/NotificationTimer";
import {
  token_abi, 
  USDT_address,  
  contract_address,
  contract_abi  

} from "../../src/components/configs/Contracts";
import ReviewModal from './ReviewModal';

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const avatarComponents = [shield, medal, crown]


const cardSurface =
  'box-border flex flex-col gap-2.5 rounded-3xl border-[1.5px] border-white/[0.24] bg-white/[0.04]'

  function RecommitTimer({ initial,text }) {
    const getRemainingSeconds = () => {
      const now = Math.floor(Date.now() / 1000);
      return Math.max(Number(initial) - now, 0);
    };
  
    const [secs, setSecs] = useState(getRemainingSeconds);
  
    useEffect(() => {
      const updateTimer = () => {
        setSecs(getRemainingSeconds());
      };
  
      updateTimer();
  
      const t = setInterval(updateTimer, 1000);
  
      return () => clearInterval(t);
    }, [initial]);
  
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
  
    return (
      <div className="flex h-[84px] w-[84px] flex-col items-center justify-center gap-0.5 rounded-full border-[2.5px] border-teal">
        <span className="font-sans text-[10px] font-semibold tracking-[0.3px] text-teal">
          {text}
        </span>
  
        <span className="font-sans text-[13px] font-bold tracking-[0.5px] text-teal">
          {h}:{m}:{s}
        </span>
      </div>
    );
  }
const helpItems = [
  { status: 'timer' },
  { status: 'done' },
  { status: 'exit' },
]

const btnDream =
  'flex items-center gap-1.5 whitespace-nowrap rounded-[7px] border-none bg-dream px-3.5 py-[7px] text-[13px] font-semibold text-dream-text transition-[opacity,transform] hover:bg-dream-hover active:scale-[0.97]'
const btnBoost =
  'flex items-center gap-1.5 whitespace-nowrap rounded-[7px] border-none bg-boost px-3.5 py-[7px] text-[13px] font-semibold text-boost-text transition-[opacity,transform] hover:bg-boost-hover active:scale-[0.97]'

export default function ProfilePage({
  totalOrder,
  totalBusiness,
  totalUsers,
  currHalvingPhase,
  boostCharges,
  letterBypassCharges,
  marketDay,
  user,
  isBlackListed,
  isSuspended,
  outflowVelocityCheck,
  totalSuspension,
  myCompletedOrders,
  myUnlockedOrders,
  myLockedOrders,
  my_choosedOrders,
  usdt_balance,
  allorders,
  referral,
  total_Curr_market_seeking_ph,
  closeReviewModal,
  handleReviewLater,
  handleReviewSubmit,
  myLastOrder,
  setShowReviewModal,
  showReviewModal,
  refData,
  userName,
  handlePH,
  handle_orders_feed,
  currTime,
  CurrHalvingData

}) {
  const [expandedItems, setExpandedItems] = useState({})
  const avatarComp = avatarComponents;

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const { isConnected,isDisconnected,chain } = useAccount()
  const { address } = useAccount();
  const chainId = import.meta.env.VITE_WC_ENV == "production" ? polygon.id : polygonAmoy.id;
  const { chainId: currentChainId } = useAccount();
  const [showModal, setShowModal] = useState(false)
  const [showphModal, setShow_PHModal] = useState(false)

  const [showCertificate, setShowCertificate] = useState(false);

  const [method, set_method] = useState(0);
  const [no, set_no] = useState(0);
  const [count, set_count] = useState(0);

  const [topup_no, set_topup_no] = useState();


  const [topUpLoading, setTopUpLoading] = useState(false);
  const [boostLoading, setBoostLoading] = useState(false);
  const [exitLoading, setExitLoading] = useState(false);



const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync,writeContract,data:hash, ...states } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed} =
  useWaitForTransactionReceipt({
    hash,
  })

  // const [showReviewModal, setShowReviewModal] = useState(false)

  const notify = () => toast("Transaction Successfull!");
  const [topUpIndex, setTopUpIndex] = useState(null);
  const [topUpAmount, setTopUpAmount] = useState("");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied successfully!");
      console.log("Copied!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
function ethToWei(amount) {
    const web3= new Web3(new Web3.providers.HttpProvider("https://poly.api.pocket.network"));

  return web3.utils.toWei(amount.toString(), "ether");
}
  // let order_no=[];
  function blockchainTimeToDate(blockchainTime) {
    const date = new Date(Number(blockchainTime) * 1000);
  
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    });
  }


  const handleTeamScroll = (e) => {
    e.currentTarget.scrollLeft += e.deltaY;

  };
    useEffect(()=>{
  
      if(isConfirmed && method==0)
      {
        if(count==0)
        {
          // alert("ninkn")
          Boost();
    
        }
        if(count==1)
        {
          set_count(0)
          toast.success("Transaction Successful")
          handlePH;

          notify()
          // setInvestment(0)
          // mount();
        }
      }
  
    
    },[isConfirmed])
  async function USDT_approval () {
    try {
      
        setBoostLoading(true)

        const tx = await writeContractAsync({
          abi: token_abi,
          address: USDT_address,
          args: [contract_address,( boostCharges ? Number(boostCharges) : "0")],
          functionName: "approve",

        }); 
        // stake1();
  
       } catch (err) {
        console.error(err);
        setBoostLoading(false)
    }
  }


  async function Boost() {

    try {
        const tx = await writeContractAsync({
          abi: contract_abi,
          address: contract_address,
          functionName: "Boost", 
          args: [Number(no)],

        });

        set_count(1)

    } catch (err) {
        console.error(err);
    }
    finally{
      setBoostLoading(false)
    }
}
async function exit(no) {

  try {
    setExitLoading(true)
      const tx = await writeContractAsync({
        abi: contract_abi,
        address: contract_address,
        functionName: "exit_order", 
        args: [Number(no)],

      });

      set_count(1)

  } catch (err) {
      console.error(err);
  }
  finally{
    setExitLoading(false)

  }
}


  
  async function handleExit(no)
  {
    if(isSuspended)
      {
        alert("You cant perform this, you are suspended");
        return
      }
      if(isBlackListed )
      {
        alert("You cant perform this, you are Balcklisted");
        return
      }

      const confirmed=confirm("🚨 Confirm Emergency Exit! This action resets your account and cannot be undone. Proceed?")
     
      if (!confirmed) 
      {
        return;
      } 
      
      // const web3= new Web3(new Web3.providers.HttpProvider("https://poly.api.pocket.network"));

      // const contract = new web3.eth.Contract(contract_abi, contract_address);
      // const isliked = await contract.methods.is_liked(address,order.seeker).call();

      //   if(isliked)
      //   {
      //     alert("You have already liked ");
      //     return;
      //   }
      if(chainId != currentChainId )
        {
          await switchChainAsync({ chainId });
          await exit?.(no);
        } 
        else 
        {
          await exit?.(no);
        }
  }

  async function HandleBoost()
  {
      if(Number(usdt_balance)<Number(boostCharges))
      {
        alert("You dont have "+Number(boostCharges)/10**18+" to Boost");
        return
      }
      if(isSuspended)
      {
        alert("YYou cant perform this, you are suspended");
        return
      }
      if(isBlackListed )
        {
          alert("You cant perform this, you are Balcklisted");
          return
        }
        if(user.rank_no==4 )
        {
          alert("Exit system user can't boost");
          return
        }

        const confirmed = confirm("🚀 Confirm Boost: This action requires a $2 fee. Proceed?");

        if (!confirmed) {
            return;
        }    

        
      if(chainId != currentChainId )
        {
          await switchChainAsync({ chainId });
          await USDT_approval?.();
        } 
        else 
        {
          await USDT_approval?.();
        }
  }

  return (
    <>


    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-4 py-4 pb-12 md:gap-4 md:px-6 md:py-5">
    {myLastOrder && Number(myLastOrder.remaining_amount)==0 && Number(currTime) > (Number  (myLastOrder.close_time) + 1800)? 
            <NotificationTimer
            initialSeconds={ (Number(myLastOrder.close_time) + 1800)- Number(currTime) }
            message="Recommit within this Time Period will make you a speedstar"
          />:""
    }
        {user && Number(user.choosed_time)>0 && Number(currTime) > (Number(user.choosed_time) + 7200) && isSuspended? 
            <NotificationTimer
            initialSeconds={ (Number(user.choosed_time) + 93600)- Number(currTime) }
            message="You are Suspended, will be active after this time period"
          />:""
    }
      <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1 md:gap-4">
        {[
          { label: 'Total PH', value: "$"+(user!=null ? (Number(user.Total_Ph)/10**18).toFixed(2):0 )},
          { label: 'Total GH', value:"$"+( user!=null ?(Number(user.Total_GH)/10**18).toFixed(2):0 )},
          { label: 'Total Team', value: (user!=null ?Number(user.total_team):0 )},
          { label: 'Team Volume', value: (user!=null ?(Number(user.totalteam_business)/10**18).toFixed(2):0 )},

        ].map(({ label, value }) => (
          <div key={label} className={`${cardSurface} gap-1.5 px-5 py-5 md:h-[174px] md:gap-2.5 md:py-10 md:pr-[43px] md:pl-8`}>
            <span className="font-sans text-[13px] font-normal text-gray-500 md:text-sm">{label}</span>
            <span className="font-sans text-[36px] font-bold leading-none text-green md:text-[40px]">{value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 items-start gap-3 max-profile:grid-cols-1 md:gap-4">
        <div className="flex flex-col gap-3 md:gap-4">
          {/* <div className={`${cardSurface} gap-3 px-5 py-5 md:min-h-[266px] md:gap-4 md:py-10 md:pr-[43px] md:pl-8`}>
            <span className="font-sans text-[13px] font-normal text-gray-500 md:text-sm">Total Team</span>
            <div className="-mx-1 flex gap-3 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-3 [&::-webkit-scrollbar]:hidden">
              {refData.map(( val, index ) => (
                <div
                  key={index}
                  className="flex min-w-[5.5rem] flex-1 shrink-0 flex-col items-center gap-1.5 rounded-xl border-[1.5px] border-white/[0.24] bg-white/[0.04] px-3 py-4 md:min-w-[6.5rem] md:gap-2.5 md:py-[22px]"
                >
                  <span className="font-sans text-[28px] font-bold leading-none text-white md:text-[32px]">{val.count}</span>
                  <span className="font-sans text-[12px] text-gray-500 md:text-[13px]">Level {index+1}</span>
                  
                  {!val.unlocked?<span className="font-sans text-[12px] text-gray-500 md:text-[13px]">🔒</span>:""}

                </div>
              ))}
            </div>
          </div> */}

<div className={`${cardSurface} gap-3 px-5 py-5 md:min-h-[266px] md:gap-4 md:py-10 md:pr-[43px] md:pl-8`}>
  
  <span className="font-sans text-[13px] font-normal text-gray-500 md:text-sm">
    Total Team
  </span>

  <div
    onWheel={handleTeamScroll}
    className="-mx-1 flex gap-3 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-3 [&::-webkit-scrollbar]:hidden"
  >
    {refData.map((val, index) => (
      <div
        key={index}
        className="flex min-w-[5.5rem] flex-1 shrink-0 flex-col items-center gap-1.5 rounded-xl border-[1.5px] border-white/[0.24] bg-white/[0.04] px-3 py-4 md:min-w-[6.5rem] md:gap-2.5 md:py-[22px]"
      >
        <span className="font-sans text-[28px] font-bold leading-none text-white md:text-[32px]">
          {val.count}
        </span>

        <span className="font-sans text-[12px] text-gray-500 md:text-[13px]">
          Level {index + 1}
        </span>

        {!val.unlocked && (
          <span className="font-sans text-[12px] text-gray-500 md:text-[13px]">
            🔒
          </span>
        )}
      </div>
    ))}
  </div>

</div>
          <div className={`${cardSurface} gap-3 px-5 py-5 md:min-h-[194px] md:gap-4 md:py-10 md:pr-[43px] md:pb-[50px] md:pl-8`}>
            <span className="font-sans text-[13px] font-normal text-gray-500 md:text-sm">Referral Link</span>
            <div className="flex items-center justify-between gap-3 rounded-[10px] border-[1.5px] border-white/[0.24] bg-white/[0.04] px-4 py-3">
            <span className="font-sans text-[13px] font-normal text-gray-300 md:text-sm">
  {`${window.location.origin}/?ref=`}{ address? address.slice(0, 6)+"..."+address.slice(39,42):0}</span>              

    <button onClick={() => copyToClipboard( `${window.location.origin}/?ref=${address}`)} className="flex shrink-0 cursor-pointer items-center border-none bg-transparent text-teal transition-opacity hover:opacity-70">
                <CopyIcon onClick={() => copyToClipboard( `${window.location.origin}/?ref=${address}`)} />
              </button>
            </div>
{
 user && user.upliner!="0x0000000000000000000000000000000000000000"?
  <>
  <span className="font-sans text-[13px] font-normal text-gray-500 md:text-sm">Upliner Address</span>
  <div className="flex items-center justify-between gap-3 rounded-[10px] border-[1.5px] border-white/[0.24] bg-white/[0.04] px-4 py-3">
  <span className="font-sans text-[13px] font-normal text-gray-300 md:text-sm">
{ user.upliner? user.upliner.slice(0, 6)+"....."+user.upliner.slice(36,42):0} </span>              

<button onClick={() => copyToClipboard( `${user.upliner}`)} className="flex shrink-0 cursor-pointer items-center border-none bg-transparent text-teal transition-opacity hover:opacity-70">
      <CopyIcon onClick={() => copyToClipboard( `${user.upliner}`)} />
    </button> 
  </div>
  </>:""
}


          </div>

          
        </div>

        <div className="flex  flex-col gap-3 md:gap-4">
          <div className={`${cardSurface} box-border justify-between px-5 py-5 md:min-h-[266px] md:py-10 md:pr-[43px] md:pl-8`}>
            <span className="font-sans text-[13px] font-normal text-gray-500 md:text-sm">Current Badge</span>
            
            
            {user!=null ? (Number(user.rank_no)>0 && Number(user.rank_no)<4 ?          
        
        <div className="flex flex-1 justify-center  shrink-0 items-center justify-center ">
          <img src={avatarComp[Number(user.rank_no)]} alt="avatar" className=" w-22 h-22" />
        </div> 
        
        :            
        
        <span className="flex flex-1 font-sans text-[13px]  items-center justify-center text-white font-normal  md:text-sm">You dont own any Badge</span>
      ):""} 

    {user!=null ? (Number(user.rank_no)==4 ?          
        
        <div className="flex shrink-0 items-center justify-center ">
        <div className="flex h-[95px] w-[95px] items-center justify-center rounded-full border-2 border-red-900 bg-red-950">
        
        <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-red-500"
  >
    <path d="M5 21V4" />
    <path d="M5 4c5-3 9 3 14 0v9c-5 3-9-3-14 0" />
  </svg>

      </div>
    </div> 
        
        :            
        
""      ):""} 

      
            {/* <div className="flex min-h-32 flex-1 items-center justify-center md:min-h-40">
              <img src={diamond} alt="diamond" className="h-32 w-32 md:h-40 md:w-40" />
            </div> */}

          
          {user!=null? (user.is_exam_passed?
          <>
            <span className="font-sans text-[13px] font-normal text-gray-500 md:text-sm">
              Guider School: <span className="text-teal font-semibold">PASSED</span> (100% Score)
            </span>

            <div className="flex items-center mb-2 mt-1 justify-center">
                <button
                onClick={()=>setShowCertificate(true)}
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border-[1.5px] border-white/90 bg-transparent px-4 py-4 font-sans text-center text-[15px] font-medium leading-tight text-white transition-colors hover:bg-white/[0.06] md:py-5 md:text-[18px]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/80 text-white">
                    ↓
                  </span>
                  Download Blockchain Certificate
                </button>
              </div>
          </>

            
            :""):""}

{
  myLastOrder? myLastOrder.remaining_amount==0 && !myLastOrder.letter? (

    <button
    type="button"
    className="w-full rounded-2xl bg-teal px-4 py-3 font-sans text-[14px] font-semibold text-teal-dark transition-colors hover:bg-teal-hover md:py-5 md:text-[18px]"
  onClick={  
    ()=>setShowReviewModal(true)
  }
  >
    Submit Letter of Happiness
  </button>


  ):(""):("")
  
}





          </div>
        </div>
      </div>
 

      <h2 className="mt-1 font-sans text-[26px] font-bold text-white md:mt-3">Current Helps</h2>

      <div className="flex flex-col gap-3">
        {myLockedOrders.map((item, i) => (
          <div
            key={i}
            className={` box-border flex min-h-[142px] cursor-pointer items-center justify-between gap-4 rounded-3xl border-[1.5px] border-white/[0.24] bg-white/[0.12] p-6 max-md:flex-col max-md:items-start${
              !item.is_unlocked ? "tw-bg-black opacity-40" : "bg-white/20"
            } `}
            onClick={() => toggleExpand(i)}
          >
<div>
<div className="grid grid-cols-4 gap-2 max-sm:gap-0.5">

  <div className="flex flex-col gap-1">
    <span className="font-sans text-[11px] font-medium uppercase tracking-wide text-gray-500">
      Invest
    </span>
    <span className="font-sans text-[15px] font-semibold leading-none text-white">
      ${Number(item.ph_amount) / 10**18}
    </span>
  </div>

  <div className="flex flex-col gap-1">
    <span className="font-sans text-[11px] font-medium uppercase tracking-wide text-gray-500">
      Reward
    </span>
    <span className="font-sans text-[15px] font-semibold leading-none text-teal">
      ${Number(item.reward_amount) / 10**18}
    </span>
  </div>

  <div className="flex flex-col gap-1">
    <span className="font-sans text-[11px] font-medium uppercase tracking-wide text-gray-500">
      Remaining
    </span>
    <span className="font-sans text-[16px] font-bold leading-none text-green">
      ${Number(item.remaining_amount) / 10**18}
    </span>
  </div>
  <div className="flex flex-col gap-1">
    <span className="font-sans text-[11px] font-medium uppercase tracking-wide text-gray-500">
    Start Date
    </span>
    <span className="font-sans text-[16px] font-bold leading-none text-green">
    {blockchainTimeToDate(Number(item.create_time) )}
    </span>
  </div>
</div>
<p className={`font-sans text-[13px] font-normal leading-relaxed text-gray-500 ${ expandedItems[i] ? '' : 'hidden' }`} > {item.Dream} </p>

</div>


            <div className="flex shrink-0 items-right gap-2 max-md:flex-wrap">
              
            {item.is_unlocked && Number(item.remaining_amount)/10**18 < 10 ?
            
            <button 
            disabled={!item.is_unlocked || item.remaining_amount==0} className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[7px] border-none bg-green-500 px-3.5 py-[7px] text-[13px] font-semibold text-white transition-colors hover:bg-green-400" 
            onClick={e => { e.stopPropagation(); set_topup_no(item) ; setShowModal(true); }}>
              <span>Top UP</span>
            </button>

            :
""

          }




              
              <button  className={btnDream} onClick={e => { e.stopPropagation(); toggleExpand(i); }}>
                <img src={dream} alt="dream" className="w-4 h-4" />
                <span className="text-white">Dream</span>
                <img
                  src={dropdown}
                  alt="toggle"
                  className={`w-2 h-[6px] transition-transform duration-200 ${expandedItems[i] ? 'rotate-180' : ''}`}
                />
              </button>


              {
          boostLoading?(
            <button className={`${btnBoost} gap-2`}>
              {/* <span>Processing</span>       */}
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

          </button>

          ):(
            <button disabled={!item.is_unlocked || item.remaining_amount==0 || currTime < item.halving_delay} className={btnBoost} onClick={e => {set_no(item.no);e.stopPropagation();HandleBoost()}}>
            <img src={boost} alt="boost" className="w-4 h-4" />
            <span>Boost</span>
          </button>
          )
        }


            {!item.is_unlocked && myLockedOrders.length==1? 


                        exitLoading?
                          <button 
                          className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[7px] border-none bg-red-500 px-3.5 py-[7px] text-[13px] font-semibold text-white transition-colors hover:bg-red-400" 
                         >
                        {/* <span>Processing</span>       */}
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          </button>
                          :              
            
                          <button 
                           className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[7px] border-none bg-red-500 px-3.5 py-[7px] text-[13px] font-semibold text-white transition-colors hover:bg-red-400" 
                          onClick={e => {e.stopPropagation();handleExit(item.no)}}>
                            <span>Exit</span>
                          </button>
                          
            
            :
            ""
            
          }


            </div>

            <div className="flex shrink-0 items-center justify-center max-md:self-end">
              {Number(item.halving_delay)> Number(currTime )&& <RecommitTimer initial={Number(item.halving_delay)} text="Halving Delay" />}
              {(Number(user.choosed_time) + 7200) >  Number(currTime )&& <RecommitTimer initial={(Number(user.choosed_time) + 7200)- Number(currTime)} text="Choosed" />}

              {/* {item.status === 'done' && (
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-teal">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
              {item.status === 'exit' && (
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-red-900 bg-red-950">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>


      {myCompletedOrders.length>0?(      <h2 className="mt-1 font-sans text-[26px] font-bold text-white md:mt-3"> Completed Helps</h2>
):("")}
      <div className="flex flex-col gap-3">
        {myCompletedOrders.map((item, i) => (
          <div
            key={i}
            className={` box-border flex min-h-[142px] cursor-pointer items-center justify-between gap-4 rounded-3xl border-[1.5px] border-white/[0.24] bg-white/[0.12] p-6 max-md:flex-col max-md:items-start${
              item.is_unlocked ? "tw-bg-black opacity-40" : "bg-white/20"
            } `}
            onClick={() => toggleExpand(i)}
          >
<div>
<div className="grid grid-cols-4 gap-2 max-sm:gap-0.5">

  <div className="flex flex-col gap-1">
    <span className="font-sans text-[11px] font-medium uppercase tracking-wide text-gray-500">
      Invest
    </span>
    <span className="font-sans text-[15px] font-semibold leading-none text-white">
      ${Number(item.ph_amount) / 10**18}
    </span>
  </div>

  <div className="flex flex-col gap-1">
    <span className="font-sans text-[11px] font-medium uppercase tracking-wide text-gray-500">
      Earned
    </span>
    <span className="font-sans text-[15px] font-semibold leading-none text-teal">
      ${Number(item.reward_amount) / 10**18}
    </span>
  </div>

  <div className="flex flex-col gap-1">
    <span className="font-sans text-[11px] font-medium uppercase tracking-wide text-gray-500">
      Start Date
    </span>
    <span className="font-sans text-[16px] font-bold leading-none text-green">
      {blockchainTimeToDate(Number(item.create_time) )}
    </span>
  </div> 
  <div className="flex flex-col gap-1">
    <span className="font-sans text-[11px] font-medium uppercase tracking-wide text-gray-500">
      End Date
    </span>
    <span className="font-sans text-[16px] font-bold leading-none text-green">
      {blockchainTimeToDate(Number(item.close_time))}
    </span>
  </div> 
</div>
<p className={`font-sans text-[13px] font-normal leading-relaxed text-gray-500 ${ expandedItems[i] ? '' : 'hidden' }`} > {item.Dream} </p>

</div>




          </div>
        ))}
      </div>





      {my_choosedOrders.length>0?(      <h2 className="mt-1 font-sans text-[26px] font-bold text-white md:mt-3">Your choosed Helps</h2>
):("")}

<div className="flex flex-col gap-3">
  {my_choosedOrders.map((item, i) => (
    <div
      key={i}
      className="box-border flex min-h-[142px] cursor-pointer items-center justify-between gap-4 rounded-3xl border-[1.5px] border-white/[0.24] bg-white/[0.12] p-6 max-md:flex-col max-md:items-start"
      onClick={() => toggleExpand(i)}
    >
      
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <span className="font-sans text-sm  leading-none text-blue">{(item.seeker).slice(0,4)+"..."+(item.seeker).slice(38,42)}</span>

        <div className="flex items-center gap-1.5">
          
          <span className="font-sans text-lg font-bold leading-none text-green">${Number(item.remaining_amount)/10**18}</span>
          {/* <span className="text-[15px] leading-none"> 🔥🚀</span> */}
        </div>
        <div className="flex items-center gap-1.5">
          
          {/* <span className="font-sans text-xs font-bold leading-none">{Number(item.total_ph)}</span>
          <span className="text-[15px] leading-none"> 🔥🚀</span> */}
        </div>
        <div className="flex items-center gap-1 font-sans text-[13px] font-normal text-gray-400">
          {/* <span>👍 {item.likes}</span> */}
        </div>
        <p className={`font-sans text-[13px] font-normal leading-normal text-gray-500 ${expandedItems[i] ? '' : 'hidden'}`}>
         {item.Dream}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 max-md:flex-wrap">
        <button className={btnDream} onClick={e => { e.stopPropagation(); toggleExpand(i); }}>
          <img src={dream} alt="dream" className="w-4 h-4" />
          <span className="text-white">Dream</span>
          <img
            src={dropdown}
            alt="toggle"
            className={`w-2 h-[6px] transition-transform duration-200 ${expandedItems[i] ? 'rotate-180' : ''}`}
          />
        </button>
        <button 
            disabled={!item.is_unlocked || item.remaining_amount==0} className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[7px] border-none bg-green-500 px-3.5 py-[7px] text-[13px] font-semibold text-white transition-colors hover:bg-green-400" 
            onClick={e => { e.stopPropagation(); set_topup_no(item) ; setShow_PHModal(true); }}>
              <span>🤝 Provide Help</span>
            </button>

        {
          boostLoading?(
            <button className={btnBoost} >
            <img src={boost} alt="boost" className="w-4 h-4" />
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            
          </button> 

          ):(

            <button disabled={!item.is_unlocked || item.remaining_amount==0} className={btnBoost} onClick={e => {set_no(item.no);e.stopPropagation();HandleBoost()}}>
            <img src={boost} alt="boost" className="w-4 h-4" />
            <span>Boost</span>
          </button> 
          )
        }

      </div>

      <div className="flex shrink-0 items-center justify-center max-md:self-end">
        {item.choosed_time > 0 && <RecommitTimer initial={(Number(item.choosed_time)+7200)}  text="Recommit Time" />}
        {item.status === 'done' && (
          <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-teal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
        {item.status === 'exit' && (
          <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-red-900 bg-red-950">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        )}
      </div>
    </div>
  ))}
</div>

{showCertificate && (
        <Certificate
        userName={userName}
        onClose={() => setShowCertificate(false)}
        user={user}
        handlePH={handlePH}
        />
      )}

{showReviewModal && (
        <ReviewModal
          onClose={closeReviewModal}
          onLater={handleReviewLater}
          onReview={handleReviewSubmit}
          isSuspended={isSuspended}
          isBlackListed={isBlackListed}
        />
      )}



<ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        className=" z-[200]"
        // theme="dark"
      />   


    </div>
      {showModal && <TopupModal   CurrHalvingData={CurrHalvingData}   user={user} myLastOrder={myLastOrder}  total_Curr_market_seeking_ph={total_Curr_market_seeking_ph}  allorders={allorders}  referral={referral} usdt_balance={usdt_balance} order={topup_no} onClose={() => setShowModal(false)} />}
      {showphModal && <ProvideHelpModal myLockedOrders={myLockedOrders}  referral={referral} CurrHalvingData={CurrHalvingData} isBlacklisted={isBlackListed} isSuspended={isSuspended}handle_orders_feed={handle_orders_feed}  user={user}  total_Curr_market_seeking_ph={total_Curr_market_seeking_ph} order={my_choosedOrders[0]} allorders={allorders}   usdt_balance={usdt_balance}  onClose={() => setShow_PHModal(false)} />}

    </>
  )
}
