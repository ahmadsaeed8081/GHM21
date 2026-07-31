import { useState, useEffect } from "react";

import { polygon, polygonAmoy } from "wagmi/chains";
import Web3, { providers } from "web3";

import { ToastContainer, toast } from 'react-toastify';

import { useWeb3Modal, useWeb3ModalTheme } from '@web3modal/wagmi/react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { useSwitchChain, useDisconnect } from "wagmi";
import logo from "../../src/assets/image.png";

import {
  token_abi,
  USDT_address,
  contract_address,
  contract_abi

} from "../../src/components/configs/Contracts";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";

export default function Certificate({ onClose, user, userName }) {

  const [method, set_method] = useState(0);

  const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const chainId = import.meta.env.VITE_WC_ENV == "production" ? polygon.id : polygonAmoy.id;
  const [count, set_count] = useState(0);
  const [name, set_name] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const { writeContractAsync, writeContract, data: hash, ...states } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })
  const { address, isConnected, isDisconnected } = useAccount();


  const notify = () => toast("Transaction Successfull!");



  function ethToWei(amount) {
    const web3 = new Web3(new Web3.providers.HttpProvider("https://poly.api.pocket.network"));

    return web3.utils.toWei(amount.toString(), "ether");
  }


  useEffect(() => {

    if (isConfirmed && method == 0) {
      if (count == 1) {
        set_count(0)
        notify()

      }
    }


  }, [isConfirmed])

  useEffect(() => {
    if (!userName) return;
  
    const timer = setTimeout(async () => {
      setIsDownloading(true);
  
      // Wait for React to apply the new styles
      await new Promise(resolve => requestAnimationFrame(resolve));
  
      await downloadCertificate();
  
      setIsDownloading(false);
    }, 300);
  
    return () => clearTimeout(timer);
  }, [userName]);


  async function Name() {

    try {
      const tx = await writeContractAsync({
        abi: contract_abi,
        address: contract_address,
        functionName: "set_userName",
        args: [name],

      });

      set_count(1)

    } catch (err) {
      console.error(err);
    }
  }



  async function handleName() {
    if (isDisconnected) {
      alert("Kindly Connect your wallet");
      return
    }
    // if(user.ph_count==0)
    //   {
    //     alert("only registered members can do this, kindly do one PH to become a registered member");
    //     return;
    //   }

    if (chainId != currentChainId) {
      await switchChainAsync({ chainId });
      await Name?.();
    }
    else {
      await Name?.();
    }
  }


  //   async function downloadDivAsImage(fileName = "letter-of-happiness.png") {
  //     try {
  //         const element = document.getElementById("certificate");

  //         if (!element) {
  //             console.error("Certificate not found");
  //             return;
  //         }

  //         await new Promise(resolve => requestAnimationFrame(resolve));

  //         const dataUrl = await toPng(element, {
  //             cacheBust: true,
  //             pixelRatio: 3,
  //             backgroundColor: "#ffffff",
  //             canvasWidth: 1200,
  //             canvasHeight: 850,
  //             skipAutoScale: true,
  //         });

  //         const link = document.createElement("a");
  //         link.download = fileName;
  //         link.href = dataUrl;
  //         link.click();

  //     } catch (err) {
  //         console.error(err);
  //     }
  // }

  async function downloadCertificate() {
    try {
      const element = document.getElementById("certificate");
      if (!element) {
        console.error("Certificate not found");
        return;
      }
  
      await new Promise(resolve => requestAnimationFrame(resolve));
  
      const FIXED_WIDTH = 940;
  
      const prevWidth = element.style.width;
      const prevMaxWidth = element.style.maxWidth;
      element.style.width = `${FIXED_WIDTH}px`;
      element.style.maxWidth = `${FIXED_WIDTH}px`;
  
      await new Promise(resolve => requestAnimationFrame(resolve));
      const measuredHeight = element.scrollHeight;
  
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#000000",
        logging: false,
        imageTimeout: 0,
        width: FIXED_WIDTH,
        height: measuredHeight,
        windowWidth: FIXED_WIDTH,
        windowHeight: measuredHeight,
  
        // This is the key fix: modify the CLONED document (used only for
        // the screenshot) to remove/replace CSS html2canvas can't render.
        onclone: (clonedDoc) => {
          const clonedEl = clonedDoc.getElementById("certificate");
          if (!clonedEl) return;
  
          // Strip the mask-composite gradient-border trick — html2canvas
          // can't compute it and instead renders the raw gradient as a
          // solid block. Replace with a plain CSS border for capture only.
          clonedEl.style.setProperty("--tw-content", "none");
          clonedEl.classList.remove(
            "before:content-['']",
            "before:absolute",
            "before:inset-0",
            "before:rounded-[18px]",
            "before:p-[2px]",
            "before:opacity-55",
          );
  
          // Inject an override style so the ::before is fully disabled
          // during capture (safer than trying to strip individual classes,
          // since Tailwind's before: classes compile to a real ::before rule).
          const style = clonedDoc.createElement("style");
          style.textContent = `
            #certificate::before {
              content: none !important;
              display: none !important;
            }
            #certificate {
              border: 1px solid rgba(55, 232, 164, 0.35) !important;
            }
          `;
          clonedDoc.head.appendChild(style);
        },
      });
  
      element.style.width = prevWidth;
      element.style.maxWidth = prevMaxWidth;
  
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = "GHM21-Certificate.png";
      link.href = image;
      link.click();
    } catch (err) {
      console.error(err);
    }
  }
  return (

    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-5">

      <button
        onClick={onClose}
        className="absolute right-4 top-4 h-10 w-10 rounded-full bg-black/60 text-white hover:bg-black"
      >
        ✕
      </button>

      <div className="fixed inset-0 z-[-9999] flex items-center justify-center bg-black/70 p-5 backdrop-blur-md">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
        >
          ✕
        </button>

        {user.is_exam_passed  && userName==="" && (
          <div className="mb-8 w-full max-w-[920px] rounded-[14px] border border-[#1c352d] bg-[#081310] p-6 font-sans text-[#dff2ea]">

            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.14em] text-[#37e8a4]">
              Generate Certificate
            </h2>

            <div className="mb-3 flex flex-wrap gap-4">

              <div className="min-w-[220px] flex-1">

                <label className="mb-[5px] block text-[11px] uppercase tracking-[0.05em] text-[#7fa89a]">
                  Write your name
                </label>

                <input
                  type="text"
                  maxLength={20}
                  value={name}
                  onChange={(e) => set_name(e.target.value)}
                  placeholder="Write your name to show on certificate"
                  className="w-full rounded-lg border border-[#1c352d] bg-[#04100c] px-3 py-[9px] font-mono text-sm text-[#eafff5] outline-none focus:outline-2 focus:outline-[#2bc7ec]"
                />

              </div>

            </div>

            <button
              onClick={handleName}
              className="rounded-lg bg-gradient-to-r from-[#37e8a4] to-[#2bc7ec] px-6 py-3 text-[13px] font-bold text-[#03110c] transition hover:brightness-110"
            >
              Submit
            </button>

            <p className="mt-3 text-[11.5px] leading-6 text-[#4f7d6c]">
              ⚠️ Important: Your username can only be submitted once.
              After it has been saved, it cannot be changed or updated.
              Please make sure you enter the correct name before submitting.
            </p>

          </div>
        )}
      </div>

      
      <div

        id="certificate"
        className="relative w-[940px] max-w-full rounded-[18px] p-[2px] shadow-[0_40px_90px_rgba(0,0,0,0.55)] bg-[radial-gradient(ellipse_700px_300px_at_50%_0%,rgba(43,199,236,0.10),transparent_60%),linear-gradient(180deg,#0d1a17,#0f201b)] before:content-[''] before:absolute before:inset-0 before:rounded-[18px] before:p-[2px] before:opacity-55 before:bg-[linear-gradient(135deg,#37e8a4,transparent_30%,transparent_70%,#2bc7ec)] before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] before:[mask-composite:exclude] before:[-webkit-mask-composite:xor]"
      >
        <div className="relative rounded-[16px] pt-10 px-[46px] pb-0 bg-[linear-gradient(180deg,rgba(5,15,13,0.4),rgba(5,15,13,0.85))]">

          <div className="flex flex-col items-center gap-[10px] mb-[6px]">
            <img className="h-14" src={logo} alt="GHM21" />
          </div>

          <div className="text-center font-mono text-[10.5px] tracking-[0.18em] text-[#7fa89a] uppercase mt-[2px] mb-[22px]">
            Decentralized Governance · P2P Protocol Framework · Verification System
          </div>

          <div className="h-px mb-[26px] bg-[linear-gradient(90deg,transparent,#37e8a4,#2bc7ec,transparent)] opacity-55" />

          <div className="text-center font-['Orbitron'] text-[15px] font-bold uppercase tracking-[0.22em] mb-[10px]  bg-clip-text text-white">
            Certificate of Accomplishment
          </div>

          <div className="text-center text-sm text-[#7fa89a] mb-5 tracking-[0.02em]">
            This on-chain credential officially verifies that:
          </div>

          <div
            className="text-center font-['Orbitron'] font-bold text-[38px] max-[640px]:text-[28px] tracking-[0.02em] mt-1 mb-[14px] leading-[1.25] break-words text-[linear-gradient(180deg,#f2f4f6_20%,#9aa6ac_55%,#f2f4f6_90%)] bg-clip-text  [filter:drop-shadow(0_0_18px_rgba(55,232,164,0.18))]"
            id="outName"
          >
            {userName == "" ? address : userName}
          </div>

          <div className="w-[120px] h-[2px] mx-auto mb-[26px] bg-[linear-gradient(90deg,#37e8a4,#2bc7ec)] opacity-70 rounded-[2px]" />

          <div className="text-center text-[15px] leading-[1.65] text-[#cfe9df] max-w-[660px] mx-auto mb-2 font-medium">
            Has successfully completed the comprehensive evaluation and passed the:
          </div>

          <span className="block text-center font-['Orbitron'] text-lg tracking-[0.08em] font-bold text-[#f2f4f6] mt-4 mb-3">
            GHM21 Certification Exam
          </span>

          <div className="text-center text-[13px] italic text-[#7fa89a] max-w-[600px] mx-auto mb-[30px] leading-[1.6]">
            "Proving competence in decentralized mechanics, the 2.5X rule, and the importance of speed credits within the GHM Marketplace."
          </div>

          <div className="relative mx-[-46px] px-[46px] h-[34px] flex items-center justify-center before:content-[''] before:absolute before:left-[46px] before:right-[46px] before:top-1/2 before:h-px before:bg-[#1c352d]">
            <span className="relative  px-[14px] font-['Orbitron'] text-base tracking-[0.1em] text-[linear-gradient(90deg,#37e8a4,#2bc7ec)] bg-clip-text ">
              ∞
            </span>
          </div>

          <div className="mx-[-46px] px-[46px] pt-6 pb-8 font-mono bg-[linear-gradient(180deg,rgba(43,199,236,0.03),transparent)]">
            <div className="text-center font-['Orbitron'] text-[11px] tracking-[0.2em] uppercase text-[#2bc7ec] mb-[18px] font-bold">
              Blockchain Verification Log
            </div>
            <table className="w-full border-collapse text-[12.5px]">
              <tbody>
                <tr>
                  <td className="py-[9px] px-[6px] border-b border-[#1c352d] align-top text-[#7fa89a] w-[250px] max-[640px]:w-[150px] tracking-[0.02em]">
                    Participant ID / Wallet Address
                  </td>
                  <td className="py-[9px] px-[6px] border-b border-[#1c352d] align-top text-[#eafff5] break-all" id="outWallet">
                    {address}
                  </td>
                </tr>
                <tr>
                  <td className="py-[9px] px-[6px] border-b border-[#1c352d] align-top text-[#7fa89a] w-[250px] max-[640px]:w-[150px] tracking-[0.02em]">
                    Exam Status
                  </td>
                  <td className="py-[9px] px-[6px] border-b border-[#1c352d] align-top text-[#eafff5] break-all">
                    <span className="inline-block bg-[rgba(55,232,164,0.10)] text-[#37e8a4] border border-[rgba(55,232,164,0.4)] px-[11px] py-[3px] rounded-[20px] text-[11px] tracking-[0.06em] font-semibold">
                      VERIFIED — SUCCESSFUL COMPLETION
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-[9px] px-[6px] border-b border-[#1c352d] align-top text-[#7fa89a] w-[250px] max-[640px]:w-[150px] tracking-[0.02em]">
                    Issue Timestamp (UTC)
                  </td>
                  <td className="py-[9px] px-[6px] border-b border-[#1c352d] align-top text-[#eafff5] break-all" id="outTs">
                    2026-07-20 14:32:09 UTC
                  </td>
                </tr>
                <tr>
                  <td className="py-[9px] px-[6px] border-b border-[#1c352d] align-top text-[#7fa89a] w-[250px] max-[640px]:w-[150px] tracking-[0.02em]">
                    Smart Contract Address
                  </td>
                  <td className="py-[9px] px-[6px] border-b border-[#1c352d] align-top text-[#eafff5] break-all" id="outContract">
                    {contract_address.slice(0, 6) + "...." + contract_address.slice(36, 42)} (GHM21CertificateRegistry)
                  </td>
                </tr>
                {/* <tr><td>Verification Transaction Hash</td><td id="outTx">0x4b8d1a...9f02c7</td></tr> */}
              </tbody>
            </table>
          </div>

          <div className="mt-[22px] pt-[22px] pb-[30px] flex justify-between items-end max-[640px]:flex-col max-[640px]:items-center max-[640px]:gap-4 max-[640px]:text-center">
            <div className="text-[13px] text-[#cfe9df]">
              <strong className="block font-['Orbitron'] font-bold text-[10.5px] tracking-[0.16em] text-[#37e8a4] uppercase mb-[6px]">
                GHM21 Core Principle
              </strong>
              Code is Law. In Math We Trust.
            </div>
            <div className="text-right text-[11.5px] text-[#7fa89a] leading-[1.6] max-[640px]:text-center">
              Issued by:<br />
              <strong className="block text-[#f2f4f6] text-[12.5px] font-semibold">
                GHM21 Autonomous Smart Contract Engine
              </strong>
              (A purely algorithmic entity)
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};