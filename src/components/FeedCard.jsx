import { useState,useEffect } from 'react'
import ProvideHelpModal from './ProvideHelpModal'
import shield from '../assets/icons/shield.png';
import medal from '../assets/icons/medal.png';
import crown from '../assets/icons/crown.png';
import dream from '../assets/icons/dream.png';
import help from '../assets/icons/help.png';
import boost from '../assets/icons/boost.png';
import dropdown from '../assets/icons/dropdown.png';

import { polygon, polygonAmoy } from "wagmi/chains";
import Web3, { providers } from "web3";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useWeb3Modal,useWeb3ModalTheme } from '@web3modal/wagmi/react'
import { useAccount, useReadContract, useWriteContract,useWaitForTransactionReceipt } from "wagmi";

import { useSwitchChain, useDisconnect } from "wagmi";
const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const HandshakeIcon = () => (
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M7.5 12.5L5 15L3.5 13.5L7 10L9.5 8.5L12 10L14.5 8.5L18 10L20.5 13.5L19 15L16.5 12.5"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M7.5 12.5L10 15C10.6 15.6 11.6 15.6 12.2 15L13.5 13.7"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M13.5 13.7L15 15.2C15.6 15.8 16.6 15.8 17.2 15.2L18.5 13.9"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

)


import {
  token_abi, 
  USDT_address,  
  contract_address,
  contract_abi  

} from "../../src/components/configs/Contracts";

const avatarComponents = [shield, medal, crown]

const description = `I'm asking for orphanage so that we can purchase beds for the children. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.`

const btnDream =
  'flex items-center gap-1.5 whitespace-nowrap rounded-[7px] border-none bg-dream px-3.5 py-[7px] text-[13px] font-semibold text-dream-text transition-[opacity,transform] hover:bg-dream-hover active:scale-[0.97] max-sm:flex-1 max-sm:justify-center max-sm:py-2.5'
const btnProvide =
  'flex items-center gap-1.5 whitespace-nowrap rounded-[7px] border-none bg-teal px-3.5 py-[7px] text-[13px] font-semibold text-teal-dark transition-[opacity,transform] hover:bg-teal-hover active:scale-[0.97] max-sm:flex-1 max-sm:justify-center max-sm:py-2.5'
const btnBoost =
  'flex items-center gap-1.5 whitespace-nowrap rounded-[7px] border-none bg-boost px-3.5 py-[7px] text-[13px] font-semibold text-boost-text transition-[opacity,transform] hover:bg-boost-hover active:scale-[0.97] max-sm:flex-1 max-sm:justify-center max-sm:py-2.5'

export default function FeedCard({
  
  CurrHalvingData,
  order,usdt_balance,referral,allorders,
  boostCharges,
  user,
  myLastOrder,
  isBlackListed,
  isSuspended,
  total_Curr_market_seeking_ph,
  index,
  expanded = false,
  onToggleDream,
  search,
  inner,
  handle_orders_feed,
  currTime


}) {
  const avatarComp = avatarComponents;
  const [showModal, setShowModal] = useState(false)
  const [method, set_method] = useState(0);

const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const chainId = import.meta.env.VITE_WC_ENV == "production" ? polygon.id : polygonAmoy.id;
  const [count, set_count] = useState(0);

  const { writeContractAsync,writeContract,data:hash, ...states } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed} =
  useWaitForTransactionReceipt({
    hash,
  })
  const { address,isConnected,isDisconnected } = useAccount();

  const [boostLoading, setBoostLoading] = useState(false);

  const notify = () => toast("Transaction Successfull!");
  const notify1 = () => toast("Address Copied");


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
          toast.success("Transaction Successfull!");
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
        setBoostLoading(false)

        console.error(err);
    }
  }


  async function Boost() {

    try {
        const tx = await writeContractAsync({
          abi: contract_abi,
          address: contract_address,
          functionName: "Boost", 
          args: [Number(order.no)],

        });

        set_count(1)

    } catch (err) {
        console.error(err);
    }
    finally{
      setBoostLoading(false)

    }
}
async function like() {

  try {
      const tx = await writeContractAsync({
        abi: contract_abi,
        address: contract_address,
        functionName: "set_like", 
        args: [(order.seeker)],

      });

      set_count(1)

  } catch (err) {
      console.error(err);
  }
}


  
  async function handleLike()
  {
    if(isDisconnected)
    {
      alert("Kindly Connect your wallet");
      return
    }
    if(user.ph_count==0)
      {
        alert("only registered members can do this, kindly do one PH to become a registered member");
        return;
      }
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
      if( order.seeker == address )
        {
          alert("You cant like yourself");
          return
        }
      if(Number(user.rank_no) == 4  )
        {
          alert("You cant perform this, you exit the system");
          return
        }

      const web3= new Web3(new Web3.providers.HttpProvider("https://poly.api.pocket.network"));

      const contract = new web3.eth.Contract(contract_abi, contract_address);
      const isliked = await contract.methods.is_liked(order.seeker,address).call();

        if(isliked)
        {
          alert("You have already liked ");
          return;
        }
      if(chainId != currentChainId )
        {
          await switchChainAsync({ chainId });
          await like?.();
        } 
        else 
        {
          await like?.();
        }
  }

  async function HandleBoost()
  {
    if(isDisconnected)
      {
        alert("Kindly Connect your wallet");
        return
      }
      if(Number(user.ph_count)==0)
        {
          alert("only registered members can do this, kindly do one PH to become a registered member");
          return;
        }
      if(Number(usdt_balance)<Number(boostCharges))
      {
        alert("You dont have "+Number(boostCharges)/10**18+" to Boost");
        return
      }
      if(isSuspended)
      {
        alert("You cant perform this, you are suspended");
        return
      }
      if(isBlackListed )
        {
          alert("YYou cant perform this, you are Balcklisted");
          return
        }
      if(Number(user.rank_no) == 4  )
        {
          alert("You cant perform this, You have exited the system");
          return
        }

        const confirmed = confirm("Boosting this order incurs a $2 fee. Would you like to proceed?");

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
    
      <div className="flex items-start gap-4 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-5 py-2 transition-[border-color] hover:border-white/[0.22] max-nav:flex-col max-nav:gap-2.5 max-nav:rounded-[20px] max-nav:p-[18px] max-sm:gap-2.5 max-sm:p-4 cursor-pointer" onClick={onToggleDream}>
        {/* Avatar - desktop only */}


        {Number(order.rank_no)>0 && Number(order.rank_no)!=4 ?          
        
        <div className="flex h-10 w-10 shrink-0 items-center justify-center max-nav:hidden">
          <img src={avatarComp[Number(order.rank_no)]} alt="avatar" className="w-8 h-8" />
        </div> 
        
        :"" }
                
        {Number(order.rank_no)==4 ?          
        
        <div className="flex shrink-0 items-center justify-center max-nav:hidden">
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-red-900 bg-red-950">
            
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>

          </div>
        </div> 


        :"" }
        {/* User info */}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-1">
            {/* Avatar - mobile only, inline with User-ID */}
            {Number(order.rank_no)>0  && Number(order.rank_no)!=4 ? (
            <img src={avatarComp[Number(order.rank_no)]} alt="avatar" className="w-6 h-6 nav:hidden" />

            ):("")   }

          {Number(order.rank_no)==4 ?          

<div className="flex nav:hidden h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-red-900 bg-red-950">
<svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>

</div>


        :"" }


            
          <button onClick={e => {e.stopPropagation();copyToClipboard(order.seeker)}} className="flex shrink-0 cursor-pointer items-center border-none bg-transparent text-teal transition-opacity hover:opacity-70">
            <CopyIcon onClick={e => {e.stopPropagation();copyToClipboard(order.seeker)}} />
          </button>
            <span className="text-sm font-semibold text-cyan-400 max-[400px]:text-[13px]">{order.seeker.slice(0,3)+"..."+order.seeker.slice(39,42)}</span>
           {Number(order.speedstar_time)>0? <span className="text-sm tracking-[2px]">🔥</span>:""}
           {Number(order.boost_time)>0 && (Number(currTime)- Number(order.boost_time))<900 ?<span className="text-sm tracking-[2px]">🚀</span>:""}
           {Number(order.rank_no)>0? <span className="text-sm tracking-[2px]">🛡️</span>:""}
           {/* {Number(order.boost_time)>0? <span className="text-sm tracking-[2px]">💎</span>:""} */}

          </div>
          <span className="text-[11px] text-gray-500"></span>
          <div className="mt-0.5 flex flex-wrap items-center gap-0.5 text-[13px] text-white max-[400px]:text-xs">
            <span>PH: ${Number(order.total_ph)/10**18}</span>
            <span className="px-1 text-gray-700">|</span>
            <span>GH: ${Number(order.total_gh)/10**18}</span>
            <span className="px-1 text-gray-700">|</span>
            <span>👥 {Number(order.total_team)}</span>
            <span className="px-1 text-gray-700">|</span>
            <span  onClick={e => { e.stopPropagation(); handleLike(); }}>👍 </span> <span>{Number(order.likes)}</span>
          </div>
          <p
            className={`text-[13px] leading-[1.5] text-gray-400 ${
              expanded ? '' : 'hidden'
            }`}
          >
            {order.Dream}
          </p>
        </div>

        {/* Price */}
        <div className="flex flex-1 justify-center items-center max-nav:flex-none">
          <span className="text-sm text-white">Seeking:</span>
          <span className="whitespace-nowrap text-[20px] font-bold text-white max-nav:text-[18px]">${Number(order.remaining_amount)/10**18}</span>
        </div>

        {/* Buttons */}
        <div className="flex shrink-0 items-center gap-2 max-nav:w-full max-nav:flex-wrap">
          <button
            type="button"
            className={btnDream}
            onClick={e => { e.stopPropagation(); onToggleDream(); }}
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse dream text' : 'Expand dream text'}
          >
            <img src={dream} alt="" className="w-4 h-4" />
            <span className="text-white">Dream</span>
            <img
              src={dropdown}
              alt=""
              className={`w-2 h-[6px] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
          <button className={btnProvide} onClick={e => { e.stopPropagation(); setShowModal(true); }}>
          🤝
            <span>Provide Help</span>
          </button>


          {boostLoading?(

          <button className={`${btnBoost} disabled:cursor-not-allowed disabled:opacity-40 disabled:saturate-50`} onClick={e => {e.stopPropagation(); HandleBoost();}}>
          {/* <span>processing</span> */}
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

        </button>

          ):(
            <button disabled={order.rank_no==4}  className={`${btnBoost} disabled:cursor-not-allowed disabled:opacity-40 disabled:saturate-50`} onClick={e => {e.stopPropagation(); HandleBoost();}}>
            <img src={boost} alt="boost" className="w-4 h-4" />
            <span>Boost</span>
          </button>
          )}

        </div>
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

      {showModal && <ProvideHelpModal isBlacklisted={isBlackListed} is_Suspended={isSuspended} handle_orders_feed={handle_orders_feed} inner={inner} search={search} user={user} myLastOrder={myLastOrder} CurrHalvingData={CurrHalvingData} total_Curr_market_seeking_ph={total_Curr_market_seeking_ph}  allorders={allorders} index={index} referral={referral} usdt_balance={usdt_balance} order={order} onClose={() => setShowModal(false)} />}
    </>
  )
}
