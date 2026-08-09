
export const USDT_address="0x1E537F8BD3228d4EfBF20bD837a48a96649A8D5A"
export const contract_address="0xd6435EccB8f5c75314df56d327434fF992b283FA"
export const school_contract_address="0x1fbcDDe9a1ff2AeEE1a2fA0D43EF006D7cE79f1b"
export const token_abi=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export const contract_abi=[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "orderNo",
				"type": "uint256"
			}
		],
		"name": "Boost",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bypass_letter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "no",
				"type": "uint256"
			}
		],
		"name": "exit_order",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "no",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fee",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Dream",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "referral",
				"type": "address"
			}
		],
		"name": "Provide_Help",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"name": "set_examcontract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"name": "set_examPassed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"name": "set_like",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "no",
				"type": "uint256"
			}
		],
		"name": "set_onlyChoose",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"name": "set_sunsetcontract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "set_userName",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_key",
				"type": "uint256"
			}
		],
		"name": "submission_of_letter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "system_sweep",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "no",
				"type": "uint256"
			}
		],
		"name": "Top_up",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_key",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bigList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "prev",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "next",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "boost_charges",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "curr_halvingPhase",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "find_curr_day",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "get_OrderDetail",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "no",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "seeker",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "total_ph",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "total_gh",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "likes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "total_team",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rank_no",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ph_amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reward_amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "remaining_amount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Dream",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "letter",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "boost_time",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "is_unlocked",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "exit_fee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "choosed_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "speedstar_time",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "is_partialExit",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_exam_passed",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "create_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "close_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "halving_delay",
						"type": "uint256"
					}
				],
				"internalType": "struct GHM21.FeedOrder[]",
				"name": "feed",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"name": "get_refData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "business",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reward",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "count",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "is_unlocked",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "unlock_time",
						"type": "uint256"
					}
				],
				"internalType": "struct GHM21.ref_data[9]",
				"name": "data",
				"type": "tuple[9]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"name": "get_userOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "no",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "seeker",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "total_ph",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "total_gh",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "likes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "total_team",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rank_no",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ph_amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reward_amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "remaining_amount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Dream",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "letter",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "boost_time",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "is_unlocked",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "exit_fee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "choosed_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "speedstar_time",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "is_partialExit",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_exam_passed",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "create_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "close_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "halving_delay",
						"type": "uint256"
					}
				],
				"internalType": "struct GHM21.FeedOrder[]",
				"name": "feed",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getDirectUnlockedFeed",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "no",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "seeker",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "total_ph",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "total_gh",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "likes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "total_team",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rank_no",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ph_amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reward_amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "remaining_amount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Dream",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "letter",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "boost_time",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "is_unlocked",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "exit_fee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "choosed_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "speedstar_time",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "is_partialExit",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_exam_passed",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "create_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "close_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "halving_delay",
						"type": "uint256"
					}
				],
				"internalType": "struct GHM21.FeedOrder[]",
				"name": "feed",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "halving",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "volume",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reward_percentage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "delay",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_ph",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "start_time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "end_time",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "by",
				"type": "address"
			}
		],
		"name": "is_liked",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"name": "isBlackListed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "decision",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "isPartialOrder",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "no",
				"type": "uint256"
			}
		],
		"name": "isReleased",
		"outputs": [
			{
				"internalType": "bool",
				"name": "decision",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"name": "isSuspended",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "letter_bypass_charges",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "market_day",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "total_ph",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "total_gh",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "listType",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "cursor",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "limit",
				"type": "uint256"
			}
		],
		"name": "marketplaceFeed",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "no",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "seeker",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "total_ph",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "total_gh",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "likes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "total_team",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rank_no",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ph_amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reward_amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "remaining_amount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Dream",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "letter",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "boost_time",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "is_unlocked",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "exit_fee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "choosed_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "speedstar_time",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "is_partialExit",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_exam_passed",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "create_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "close_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "halving_delay",
						"type": "uint256"
					}
				],
				"internalType": "struct GHM21.FeedOrder[]",
				"name": "feed",
				"type": "tuple[]"
			},
			{
				"internalType": "uint8",
				"name": "nextList",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "nextCursor",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "hasMore",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "order",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ph_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reward_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "remaining_amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Dream",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "letter",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "boost_time",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "is_unlocked",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "seeker",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "total_helpers",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "create_time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "close_time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "exit_fee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "choosed_time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "speedstar_time",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "order_halvingDelay",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "outflow_velocity_check",
		"outputs": [
			{
				"internalType": "bool[3]",
				"name": "record",
				"type": "bool[3]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "smallList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "prev",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "next",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "total_Curr_market_seeking_ph",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "total_order",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "total_suspension",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalbusiness",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalusers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "user",
		"outputs": [
			{
				"internalType": "bool",
				"name": "investBefore",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "Total_Ph",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Total_GH",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ph_count",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gh_count",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "upliner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "likes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rank_no",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalteam_business",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "total_team",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "unlocked_ph_no",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "choosed_ph_no",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "is_exam_passed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "user_name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export const school_contract_abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "AlreadyInitialized",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "AlreadyPassed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidAnswer",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidAnswerCount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "nextAttemptTime",
				"type": "uint256"
			}
		],
		"name": "RetryAfter",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalQuestions",
				"type": "uint256"
			}
		],
		"name": "AnswersInitialized",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "passed",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "attempts",
				"type": "uint32"
			}
		],
		"name": "ExamSubmitted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint8[]",
				"name": "answers",
				"type": "uint8[]"
			}
		],
		"name": "initializeAnswers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "cont_add",
				"type": "address"
			}
		],
		"name": "set_MLMContractAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8[]",
				"name": "answers",
				"type": "uint8[]"
			}
		],
		"name": "submitAnswers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "canAttempt",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCorrectAnswers",
		"outputs": [
			{
				"internalType": "uint8[]",
				"name": "",
				"type": "uint8[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getResult",
		"outputs": [
			{
				"internalType": "bool",
				"name": "passed",
				"type": "bool"
			},
			{
				"internalType": "uint32",
				"name": "attempts",
				"type": "uint32"
			},
			{
				"internalType": "uint64",
				"name": "lastAttempt",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GH_MLM_contract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "nextRetryTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "results",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "attempts",
				"type": "uint32"
			},
			{
				"internalType": "uint64",
				"name": "lastAttempt",
				"type": "uint64"
			},
			{
				"internalType": "bool",
				"name": "passed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "RETRY_DELAY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "timeUntilRetry",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalQuestions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];