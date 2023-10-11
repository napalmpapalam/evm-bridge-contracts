/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  NativeHandler,
  NativeHandlerInterface,
} from "../../../contracts/handlers/NativeHandler";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "bundle",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "string",
        name: "network",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "receiver",
        type: "string",
      },
    ],
    name: "DepositedNative",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "bundle",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "originHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "proof",
        type: "bytes",
      },
    ],
    name: "WithdrawnNative",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "bundleExecutorImplementation_",
        type: "address",
      },
      {
        internalType: "address",
        name: "facade_",
        type: "address",
      },
    ],
    name: "__Bundler_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "bundleExecutorImplementation",
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
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "salt",
                type: "bytes32",
              },
              {
                internalType: "bytes",
                name: "bundle",
                type: "bytes",
              },
            ],
            internalType: "struct IBundler.Bundle",
            name: "bundle",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "network",
            type: "string",
          },
          {
            internalType: "string",
            name: "receiver",
            type: "string",
          },
        ],
        internalType: "struct INativeHandler.DepositNativeParameters",
        name: "params_",
        type: "tuple",
      },
    ],
    name: "depositNative",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt_",
        type: "bytes32",
      },
    ],
    name: "determineProxyAddress",
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
    name: "facade",
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
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "salt",
                type: "bytes32",
              },
              {
                internalType: "bytes",
                name: "bundle",
                type: "bytes",
              },
            ],
            internalType: "struct IBundler.Bundle",
            name: "bundle",
            type: "tuple",
          },
          {
            internalType: "bytes32",
            name: "originHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "proof",
            type: "bytes",
          },
        ],
        internalType: "struct INativeHandler.WithdrawNativeParameters",
        name: "params_",
        type: "tuple",
      },
    ],
    name: "withdrawNative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "salt",
                type: "bytes32",
              },
              {
                internalType: "bytes",
                name: "bundle",
                type: "bytes",
              },
            ],
            internalType: "struct IBundler.Bundle",
            name: "bundle",
            type: "tuple",
          },
          {
            internalType: "bytes32",
            name: "originHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "proof",
            type: "bytes",
          },
        ],
        internalType: "struct INativeHandler.WithdrawNativeParameters",
        name: "params_",
        type: "tuple",
      },
    ],
    name: "withdrawNativeBundle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

export class NativeHandler__factory {
  static readonly abi = _abi;
  static createInterface(): NativeHandlerInterface {
    return new utils.Interface(_abi) as NativeHandlerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NativeHandler {
    return new Contract(address, _abi, signerOrProvider) as NativeHandler;
  }
}
