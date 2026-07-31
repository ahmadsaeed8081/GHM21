import { http, createConfig } from 'wagmi'
import { polygon, polygonAmoy } from "wagmi/chains";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { createClient } from 'viem'


const projectId = import.meta.env.VITE_WC_PROJECT_ID;
console.log("Project ID:", projectId);
const metadata = {  
    name: "GH-Marlketplace",
    description: "",
    url: "https://GH-Marlketplace.io/",
    icons: ["https://GH-Marlketplace.io/"]
    
};

export const config = defaultWagmiConfig({
    chains: import.meta.env.VITE_WC_ENV == "production" ? [polygon] : [polygonAmoy],
    projectId,
    metadata
});

createWeb3Modal({
    wagmiConfig: config,
    projectId,

});