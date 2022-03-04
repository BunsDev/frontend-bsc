/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  BunnySpecialLottery,
  BunnySpecialLotteryInterface,
} from "../BunnySpecialLottery";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_pancakeSwapLotteryAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_bunnyMintingStationAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_pancakeProfileAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_endBlock",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_tokenURI1",
        type: "string",
      },
      {
        internalType: "string",
        name: "_tokenURI2",
        type: "string",
      },
      {
        internalType: "string",
        name: "_tokenURI3",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_numberPoints1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numberPoints2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numberPoints3",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_campaignId1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_campaignId2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_campaignId3",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_startLotteryRound",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_finalLotteryRound",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint8",
        name: "bunnyId",
        type: "uint8",
      },
    ],
    name: "BunnyMint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
    ],
    name: "NewAddressWhitelisted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "bunnyId",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
    ],
    name: "NewCampaignId",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "endBlock",
        type: "uint256",
      },
    ],
    name: "NewEndBlock",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "startLotteryRound",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "finalLotteryRound",
        type: "uint256",
      },
    ],
    name: "NewLotteryRounds",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "bunnyId",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberPoints",
        type: "uint256",
      },
    ],
    name: "NewNumberPoints",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "bunnyId",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "NewTokenURI",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "bunnyMintingStation",
    outputs: [
      {
        internalType: "contract BunnyMintingStation",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "campaignIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
    ],
    name: "canClaimNft1",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cursor",
        type: "uint256",
      },
    ],
    name: "canClaimNft2",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "canClaimNft3",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_bunnyId",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_campaignId",
        type: "uint256",
      },
    ],
    name: "changeCampaignId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_endBlock",
        type: "uint256",
      },
    ],
    name: "changeEndBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_startLotteryRound",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_finalLotteryRound",
        type: "uint256",
      },
    ],
    name: "changeLotteryRounds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_bunnyId",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_numberPoints",
        type: "uint256",
      },
    ],
    name: "changeNumberPoints",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_bunnyId",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "changeTokenURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "endBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "finalLotteryRound",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "hasClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_bunnyId",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cursor",
        type: "uint256",
      },
    ],
    name: "mintNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "numberPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pancakeProfile",
    outputs: [
      {
        internalType: "contract ChampagneProfile",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pancakeSwapLottery",
    outputs: [
      {
        internalType: "contract IChampagneSwapLottery",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startLotteryRound",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "tokenURIs",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userWhitelistForNft3",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_users",
        type: "address[]",
      },
    ],
    name: "whitelistAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class BunnySpecialLottery__factory {
  static readonly abi = _abi;
  static createInterface(): BunnySpecialLotteryInterface {
    return new utils.Interface(_abi) as BunnySpecialLotteryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BunnySpecialLottery {
    return new Contract(address, _abi, signerOrProvider) as BunnySpecialLottery;
  }
}
