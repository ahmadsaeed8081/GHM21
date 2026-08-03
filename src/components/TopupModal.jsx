import { useEffect, useState } from 'react'

const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)
import { polygon, polygonAmoy } from "wagmi/chains";
import Web3, { providers } from "web3";

import { ToastContainer, toast } from 'react-toastify';

import { useWeb3Modal,useWeb3ModalTheme } from '@web3modal/wagmi/react'
import { useAccount, useReadContract, useWriteContract,useWaitForTransactionReceipt } from "wagmi";

import { useSwitchChain, useDisconnect } from "wagmi";


import {
  token_abi, 
  USDT_address,  
  contract_address,
  contract_abi  

} from "./configs/Contracts";

export default function ProvideHelpModal({ search,inner,user,CurrHalvingData,myLastOrder,onClose,usdt_balance,order,referral,is_suspended,isBlacklisted,allorders,index,total_Curr_market_seeking_ph }) {
  const [isEditing, setIsEditing] = useState(false)
  const [amount, setAmount] = useState(0)
  const [reason, setReason] = useState('')
  const [fee, setFee] = useState(null)

   const [count, set_count] = useState(0);
  const [method, set_method] = useState(0);
  const [loading, set_loading] = useState(0);

  const [order_no, set_order_no] = useState();

  const { isConnected,isDisconnected,chain } = useAccount()
  const { address } = useAccount();
  const chainId = import.meta.env.VITE_WC_ENV == "production" ? polygon.id : polygonAmoy.id;
  const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const { writeContractAsync,writeContract,data:hash, ...states } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed} =
  useWaitForTransactionReceipt({
    hash,
  })


  const notify = () => toast("Transaction Successfull!");



function ethToWei(amount) {
    const web3= new Web3(new Web3.providers.HttpProvider("https://poly.api.pocket.network"));

  return web3.utils.toWei(amount.toString(), "ether");
}
  // let order_no=[];

  async function USDT_approval () {
    try {
      set_loading(true)
        const tx = 
        await writeContractAsync({
          abi: token_abi,
          address: USDT_address,
          args: [contract_address,( amount ? ethToWei(amount): "0")],
          functionName: "approve",

        }); 
        // stake1();
  
       } catch (err) {
        console.error(err);
        set_loading(false)
    }
  }


  async function PH() {

    try {
        const tx = await writeContractAsync({
          abi: contract_abi,
          address: contract_address,
          functionName: "Top_up", 
          args: [
            (amount? ethToWei(amount) : 0),order?order.no:0
            ],

        });

        set_count(1)

    } catch (err) {
        console.error(err);
    }
    finally{
      set_loading(false)

    }
}


useEffect(()=>{
  setFee((Number(order.remaining_amount)/10**18)*2/100)
},[])

  useEffect(()=>{
    if(isConfirmed && method==0)
    {
      if(count==0)
      {
        PH();
  
      }
      if(count==1)
      {
        set_count(0)
        notify()
        onClose();

      }
    }

  
  },[isConfirmed])


  async function handlePH()
  {
    // alert((Number(total_Curr_market_seeking_ph)/10**18))
    // alert(total_Curr_market_seeking_ph)
    if(isDisconnected)
      {
        alert("Kindly Connect your wallet");
        return
      }
      // if(order.seeker==address)
      // {
      //   alert("you cant provide help to your own order");
      //   return;
      // }

      if(is_suspended)
      {
        alert("You are suspended, You cant perform this action");
        return;
      }
      if(isBlacklisted)
      {
        alert("You are Blacklisted, You cant perform this action");
        return;
      }
      // if(myLastOrder!=null)
      // {
      //   if(myLastOrder.remaining_amount>0 && user.ph_count>=2)
      //     {
      //       alert("Your PH Request is already in the queue");
      //       return;
      //     }
      //     if(myLastOrder.remaining_amount==0 && user.ph_count>=2 && !myLastOrder.letter)
      //     {
      //       alert("Kindly write a letter of happiness first then you will be allowed to PH");
      //       return;
      //     }
      //     if(myLastOrder.close_time>0 && user.ph_count>=2 && !myLastOrder.letter)
      //       {
      //         alert("Kindly write a Letter of Happiness to continue with system");
      //         return;
      //       }
      // }

      if(amount==0)
      {
        alert("please write amount");
        return;
      }
      // if(reason==0)
      // {
      //   alert("please write Reason to help");
      //   return;
      // }
      if(amount < 10-(Number(order.remaining_amount)/10**18))
        {
          alert("Minimum PH smount is $" +( Number(10) - (Number(order.remaining_amount)/10**18)));
          return;
        }

      if(amount > (Number(order.ph_amount)/10**18)*2.5)
        {
          alert("Maximum PH amount is $"+(Number(order.ph_amount)/10**18)*2.5);
          return;
        }

      if(amount > (Number(total_Curr_market_seeking_ph)/10**18))
      {
        alert("Kindly choose a different amount,You cant invest more than the market need "+  (Number(total_Curr_market_seeking_ph)/10**18));
        return;
      }

      if(amount > (Number(CurrHalvingData.max_ph)/10**18))
      {
        alert("Kindly choose a different amount,You cant invest more than the current halving max PH Amount");
        return;
      }


      if( (Number(usdt_balance)/10**18) < Number(amount+(amount*2/100)) )
        {
          alert("You don't have enough usdt to Provide Help")
          return;
        }

      setFee(amount*2/100);
      set_method(0)
      // set_order_no([]);
      // let temp=[];
      // temp.push(order.no);

      // if(Number(amount) > Number(order.remaining_amount)/10**18 )
      // {
        
      //     let temp_amount=Number(order.remaining_amount);
      //     let _index=index+1;
      //     let start_check=false;

      //     if(index==0)
      //     {
      //       start_check=true;
      //     }
      //     while(Number(amount)>Number(temp_amount)/10**18)
      //     {
      //       if(_index >= allorders.length && start_check)
      //       {
      //         break;
      //       }
      //       else if(_index >= allorders.length && !start_check)
      //       {
      //         _index=0;
      //       }
            
      //       temp_amount += Number(allorders[_index].remaining_amount);
      //       temp.push(allorders[_index].no);

      //       _index++; 
      //     }


      // }

      set_order_no(order.no);


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
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex w-full min-w-0 max-w-[800px] flex-col gap-2.5 overflow-hidden rounded-[32px] bg-[#000C14] p-10 pt-12 max-sm:rounded-3xl max-sm:p-5 max-sm:pt-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-3.5 flex items-center justify-between">
          <h3 className="font-sans text-[26px] font-bold tracking-normal text-white max-sm:text-[22px]">
            TopUp 
          </h3>
          <button
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border  text-sm text-white transition-[background,color] hover:bg-white/[0.14] hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="flex min-w-0 flex-col">
          <label className="mb-2.5 block font-sans text-[13px] font-medium text-gray-500">
            Donation amount
          </label>
          <div className="flex min-h-[72px] min-w-0 items-center gap-2 overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.04] px-4 py-5 sm:gap-3 sm:px-6">
            {isEditing ? (
              <input
                type="text"
                inputMode="decimal"
                className="min-w-0 flex-1 border-none bg-transparent font-sans text-lg font-bold text-white outline-none sm:text-[22px]"
                value={amount}
                onChange={(e) => {setAmount(e.target.value); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setIsEditing(false)
                }}
                autoFocus
                aria-label="Donation amount"
              />
            ) : (
              <span className="min-w-0 flex-1 truncate font-sans text-lg font-bold text-white sm:text-[22px]">
                ${amount}
              </span>
            )}
            <button
              type="button"
              className="flex shrink-0 cursor-pointer items-center gap-1 border-none bg-transparent pl-1 font-sans text-sm font-bold text-teal transition-opacity hover:opacity-80 sm:gap-1.5 sm:text-[15px]"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setIsEditing((prev) => !prev)}
              aria-label={isEditing ? 'Finish editing amount' : 'Edit donation amount'}
            >
              <EditIcon />
              <span className="whitespace-nowrap">Edit</span>
            </button>
          </div>

          {/* <div className="mt-2 flex flex-col items-end text-[11px] leading-5">
    <span className="text-gray-500">
      2% Fee: <span className="text-white">${fee}</span>
    </span>

    <span className="text-gray-500">
      Total amount:
      <span className="ml-1 font-semibold text-teal">
        ${Number(amount)+Number(fee)}
      </span>
    </span>
  </div> */}
        </div>

        

        <div className="my-1.5 h-px bg-white/[0.08]" />

        {/* <div className="flex flex-col">
          <label className="mb-2.5 block font-sans text-[13px] font-medium text-gray-500">
            Reason for help
          </label>
          <div className="relative">
            <textarea
              className="box-border min-h-[200px] w-full resize-none rounded-[14px] border border-white/10 bg-white/[0.04] px-6 pt-5 pb-11 font-sans text-[15px] font-normal leading-relaxed text-white outline-none transition-[border-color] placeholder:text-gray-600 focus:border-white/[0.22]"
              placeholder="Write reason..."
              maxLength={80}
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
            <span className="pointer-events-none absolute right-[18px] bottom-3.5 font-sans text-[13px] text-gray-600">
              {80 - reason.length}
            </span>
          </div>
        </div> */}

          <div className="mt-2.5 flex items-center gap-3 max-sm:flex-col">

         {loading?(
          <button 
          className="flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[14px] border-none bg-teal px-6 py-[18px] font-sans text-base font-bold text-teal-dark transition-colors hover:bg-teal-hover max-sm:w-full"
          >
            <span>Processing</span>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

          </button>
         ):(

          <button 
          className="flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[14px] border-none bg-teal px-6 py-[18px] font-sans text-base font-bold text-teal-dark transition-colors hover:bg-teal-hover max-sm:w-full"
          onClick={handlePH}
          >
            <span>Confirm</span>
            <ArrowIcon />
          </button>

         )}




        </div> 


      </div>
    </div>
  )
}
