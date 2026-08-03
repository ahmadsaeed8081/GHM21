import { useState,useEffect } from 'react'

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

} from "../../src/components/configs/Contracts";



const StarIcon = ({ filled }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export default function ReviewModal({ onClose, onLater, onReview,is_suspended,isBlacklisted }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState('')
  const [media, setMedia] = useState(null);
  const [count, set_count] = useState(0);
  const [method, set_method] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [bypassLoading, setBypassLoading] = useState(false);



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
  


  const activeRating = hoverRating || rating

  useEffect(()=>{
    if(isConfirmed && method==0)
    {
      if(count==0)
      {
        bypass_letter();
  
      }
      if(count==1)
      {
        set_count(0)
        notify()

      }
    }
    else if(isConfirmed && method==1)
      {
        next_submit();
        notify()
        onClose()
      }

  
  },[isConfirmed])

    async function USDT_approval () {
      setBypassLoading(true);

      try {
        
          const tx = await writeContractAsync({
            abi: token_abi,
            address: USDT_address,
            args: [contract_address, 2*10**18 ],
            functionName: "approve",
  
          }); 
    
         } catch (err) {
          setBypassLoading(false)
          console.error(err);
      }
      // finally{
      //   setBypassLoading(false)
      // }
    }





async function bypass_letter() {

  try {
      const tx = await writeContractAsync({
        abi: contract_abi,
        address: contract_address,
        functionName: "bypass_letter", 
      });

      set_count(1)

  } catch (err) {
      console.error(err);
  }
  finally{
    setBypassLoading(false)
  }
}

async function submission_of_letter() 
{
  setSubmitLoading(true)

  try {
      const tx = await writeContractAsync({
        abi: contract_abi,
        address: contract_address,
        functionName: "submission_of_letter", 
        args: [1234],

      });

      set_method(1)

  } catch (err) {
      console.error(err);
  }
  finally{
    setSubmitLoading(false)

  }
}



  async function handleSubmit() { 

    if(review.length<25)
    {
      alert("kindly write a letter that contain atleast 25 characters ")
      return
    }
    if(isDisconnected)
      {
        alert("Kindly Connect your wallet");
        return
      }
  
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
      if(chainId != currentChainId )
        {
          await switchChainAsync({ chainId });
          await submission_of_letter?.();
        } 
        else 
        {
          await submission_of_letter?.();
        }
  


  }



  async function next_submit() {
    try
    {


      const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 10 MB
      const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 20 MB


      const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const GROUP_ID = import.meta.env.VITE_TELEGRAM_GROUP_ID;

      const caption = `
      📝 New Letter of Happiness
      
      💬 Review:
      ${review || "No text provided"}
      `;
  
      // Case 1: No media (Text only)
      if (!media) {
        await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: GROUP_ID,
              text: caption,
            }),
          }
        );
        onClose();

        return;
      }
  
  
      // Case 2: Image
      if (media.type.startsWith("image/")) {
        
        // if (file.size > MAX_IMAGE_SIZE)
        // {
        //   alert("Image size must be less than 2 MB.");
        //   return;
        // }

        const formData = new FormData();
  
        formData.append("chat_id", GROUP_ID);
        formData.append("photo", media);
        formData.append("caption", caption);
  
        console.log(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`);

        await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
          {
            method: "POST",
            body: formData,
          }
        );
        onClose();
        return;
      }
  
  
      // Case 3: Video
      if (media.type.startsWith("video/")) {
  
        // if (file.size > MAX_VIDEO_SIZE ) {
        //   alert("Video size must be less than 10 MB.");
        //   return;
        // }

        const formData = new FormData();
  
        formData.append("chat_id", GROUP_ID);
        formData.append("video", media);
        formData.append("caption", caption);
  
  
        await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendVideo`,
          {
            method: "POST",
            body: formData,
          }
        );
        onClose();

        return;
      }
  
      
      console.log("Unsupported file type");
  
    } catch (error) {
      console.error("Telegram Error:", error);
    }
    finally{
      setSubmitLoading(false)

    }
  }

  async function handleBypass() 
  {
    const confirmed = confirm("Bypassing this step incurs a $2 fee. Would you like to proceed?");

    if (!confirmed) {
        return;
    }

    if(isDisconnected)
    {
      alert("Kindly Connect your wallet");
      return
    }

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
            Letter of Happiness
          </h3>
          <button
            type="button"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border text-sm text-white transition-[background,color] hover:bg-white/[0.14] hover:text-white"
            onClick={onClose}
            aria-label="Close review modal"
          >
            ✕
          </button>
        </div>

      

        <div className="my-1.5 h-px bg-white/[0.08]" />

        <div className="flex flex-col">
          {/* <label className="mb-2.5 block font-sans text-[13px] font-medium text-gray-500">
            Write review
          </label> */}
          <div className="flex flex-col">
  <label className="mb-2.5 block font-sans text-[13px] font-medium text-gray-500">
    Write review
  </label>

  <div className="relative">

    <textarea
      className="box-border min-h-[200px] w-full resize-none rounded-[14px] border border-white/10 bg-white/[0.04] px-6 pt-5 pb-14 font-sans text-[15px] font-normal leading-relaxed text-white outline-none transition-[border-color] placeholder:text-gray-600 focus:border-white/[0.22]"
      placeholder="Write your happiness here.."
      maxLength={1000}
      value={review}
      onChange={e => setReview(e.target.value)}
    />


    {/* Character Counter */}
    <span className="pointer-events-none absolute right-[18px] bottom-3.5 font-sans text-[13px] text-gray-600">
      {1000 - review.length}
    </span>


    {/* Hidden File Input */}
    <input
  id="review-media"
  type="file"
  accept="image/*,video/*"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Allow only one media file
    setMedia(file);

    // Reset input so same file can be selected again after remove
    e.target.value = "";
  }}
/>


    {/* Attach Button */}
    <label
      htmlFor="review-media"
      className="absolute right-[60px] bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      title="Attach image or video"
    >
      📎
    </label>

  </div>


  {/* Selected File Preview */}
  {media && (
    <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2">

      <div className="flex items-center gap-2 text-sm text-gray-300">
        {media.type.startsWith("image") ? "🖼️" : "🎥"}
        <span className="max-w-[250px] truncate">
          {media.name}
        </span>
      </div>


      <button
        type="button"
        onClick={() => setMedia(null)}
        className="text-red-400 hover:text-red-300"
      >
        ✕
      </button>

    </div>
  )}

</div>
        </div>

        <div className="mt-2.5 flex items-center gap-3 max-sm:flex-col">


          {bypassLoading ? (
            <button disabled={bypassLoading}
  type="button"
  className="flex flex-1 gap-2 cursor-pointer items-center justify-center rounded-[14px] border-[1.5px] border-white/20 bg-transparent px-10 py-[18px] font-sans text-base font-bold text-white transition-colors hover:bg-white/[0.06] max-sm:w-full"
  // onClick={handleBypass}
>Processing 
  <span className="h-4 w-4 animate-spin  rounded-full border-2 border-white/30 border-t-white" />
</button>
  ) : (
    <>
          <button
            type="button"
            className="flex-1 cursor-pointer rounded-[14px] border-[1.5px] border-white/20 bg-transparent px-6 py-[18px] font-sans text-base font-bold text-white transition-colors hover:bg-white/[0.06] max-sm:w-full"
            onClick={handleBypass}
          >
            Bypass
          </button>
    </>
  )}
  {submitLoading ? (
          <button
            type="button"
            className="flex gap-2 flex-1 cursor-pointer items-center justify-center rounded-[14px] border-none bg-teal px-6 py-[18px] font-sans text-base font-bold text-teal-dark transition-colors hover:bg-teal-hover max-sm:w-full"
            >
            Processing
            <span className="h-4 w-4 animate-spin  rounded-full border-2 border-white/30 border-t-white" />

          </button>

  ):(
          <button
            type="button"
            className="flex flex-1 cursor-pointer items-center justify-center rounded-[14px] border-none bg-teal px-6 py-[18px] font-sans text-base font-bold text-teal-dark transition-colors hover:bg-teal-hover max-sm:w-full"
            onClick={handleSubmit}
          >
            Submit
          </button>
    
  )}
          
        </div>
      </div>
    </div>
  )
}
