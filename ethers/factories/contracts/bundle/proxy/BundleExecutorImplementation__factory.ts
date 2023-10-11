/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  BundleExecutorImplementation,
  BundleExecutorImplementationInterface,
} from "../../../../contracts/bundle/proxy/BundleExecutorImplementation";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "wrappedNative_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "WRAPPED_NATIVE",
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
        internalType: "bytes",
        name: "bundle_",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
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
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
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
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
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
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b50604051610a8f380380610a8f83398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b6080516109fd6100926000396000818161013101526103f301526109fd6000f3fe6080604052600436106100595760003560e01c806301ffc9a71461006557806309c5eabe1461009a578063150b7a02146100af578063bc197c81146100f3578063d999984d1461011f578063f23a6e611461016b57600080fd5b3661006057005b600080fd5b34801561007157600080fd5b5061008561008036600461046d565b610197565b60405190151581526020015b60405180910390f35b6100ad6100a836600461049e565b6101ce565b005b3480156100bb57600080fd5b506100da6100ca3660046105e3565b630a85bd0160e11b949350505050565b6040516001600160e01b03199091168152602001610091565b3480156100ff57600080fd5b506100da61010e3660046106da565b63bc197c8160e01b95945050505050565b34801561012b57600080fd5b506101537f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610091565b34801561017757600080fd5b506100da610186366004610784565b63f23a6e6160e01b95945050505050565b60006001600160e01b03198216630271189760e51b14806101c857506301ffc9a760e01b6001600160e01b03198316145b92915050565b600080806101de84860186610869565b925092509250815183511480156101f6575080518251145b61025e5760405162461bcd60e51b815260206004820152602e60248201527f42756e646c654578656375746f72496d706c656d656e746174696f6e3a206c6560448201526d0dccee8d0e640dad2e6dac2e8c6d60931b60648201526084015b60405180910390fd5b82516102be5760405162461bcd60e51b815260206004820152602960248201527f42756e646c654578656375746f72496d706c656d656e746174696f6e3a207a65604482015268726f2062756e646c6560b81b6064820152608401610255565b60005b83518110156103ea5760008482815181106102de576102de61094d565b60200260200101516001600160a01b03168483815181106103015761030161094d565b602002602001015184848151811061031b5761031b61094d565b60200260200101516040516103309190610963565b60006040518083038185875af1925050503d806000811461036d576040519150601f19603f3d011682016040523d82523d6000602084013e610372565b606091505b50509050806103d75760405162461bcd60e51b815260206004820152602b60248201527f42756e646c654578656375746f72496d706c656d656e746174696f6e3a20636160448201526a1b1b081c995d995c9d195960aa1b6064820152608401610255565b50806103e28161099e565b9150506102c1565b504715610466577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663d0e30db0476040518263ffffffff1660e01b81526004016000604051808303818588803b15801561044c57600080fd5b505af1158015610460573d6000803e3d6000fd5b50505050505b5050505050565b60006020828403121561047f57600080fd5b81356001600160e01b03198116811461049757600080fd5b9392505050565b600080602083850312156104b157600080fd5b823567ffffffffffffffff808211156104c957600080fd5b818501915085601f8301126104dd57600080fd5b8135818111156104ec57600080fd5b8660208285010111156104fe57600080fd5b60209290920196919550909350505050565b80356001600160a01b038116811461052757600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561056b5761056b61052c565b604052919050565b600082601f83011261058457600080fd5b813567ffffffffffffffff81111561059e5761059e61052c565b6105b1601f8201601f1916602001610542565b8181528460208386010111156105c657600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080608085870312156105f957600080fd5b61060285610510565b935061061060208601610510565b925060408501359150606085013567ffffffffffffffff81111561063357600080fd5b61063f87828801610573565b91505092959194509250565b600067ffffffffffffffff8211156106655761066561052c565b5060051b60200190565b600082601f83011261068057600080fd5b813560206106956106908361064b565b610542565b82815260059290921b840181019181810190868411156106b457600080fd5b8286015b848110156106cf57803583529183019183016106b8565b509695505050505050565b600080600080600060a086880312156106f257600080fd5b6106fb86610510565b945061070960208701610510565b9350604086013567ffffffffffffffff8082111561072657600080fd5b61073289838a0161066f565b9450606088013591508082111561074857600080fd5b61075489838a0161066f565b9350608088013591508082111561076a57600080fd5b5061077788828901610573565b9150509295509295909350565b600080600080600060a0868803121561079c57600080fd5b6107a586610510565b94506107b360208701610510565b93506040860135925060608601359150608086013567ffffffffffffffff8111156107dd57600080fd5b61077788828901610573565b600082601f8301126107fa57600080fd5b8135602061080a6106908361064b565b82815260059290921b8401810191818101908684111561082957600080fd5b8286015b848110156106cf57803567ffffffffffffffff81111561084d5760008081fd5b61085b8986838b0101610573565b84525091830191830161082d565b60008060006060848603121561087e57600080fd5b833567ffffffffffffffff8082111561089657600080fd5b818601915086601f8301126108aa57600080fd5b813560206108ba6106908361064b565b82815260059290921b8401810191818101908a8411156108d957600080fd5b948201945b838610156108fe576108ef86610510565b825294820194908201906108de565b9750508701359250508082111561091457600080fd5b6109208783880161066f565b9350604086013591508082111561093657600080fd5b50610943868287016107e9565b9150509250925092565b634e487b7160e01b600052603260045260246000fd5b6000825160005b81811015610984576020818601810151858301520161096a565b81811115610993576000828501525b509190910192915050565b60006000198214156109c057634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212204af8f091f8205f02e5a95dcadd3b1a7e18154d7c93c0c41618b3bca85924ad1864736f6c63430008090033";

type BundleExecutorImplementationConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BundleExecutorImplementationConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BundleExecutorImplementation__factory extends ContractFactory {
  constructor(...args: BundleExecutorImplementationConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "BundleExecutorImplementation";
  }

  override deploy(
    wrappedNative_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BundleExecutorImplementation> {
    return super.deploy(
      wrappedNative_,
      overrides || {}
    ) as Promise<BundleExecutorImplementation>;
  }
  override getDeployTransaction(
    wrappedNative_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(wrappedNative_, overrides || {});
  }
  override attach(address: string): BundleExecutorImplementation {
    return super.attach(address) as BundleExecutorImplementation;
  }
  override connect(signer: Signer): BundleExecutorImplementation__factory {
    return super.connect(signer) as BundleExecutorImplementation__factory;
  }
  static readonly contractName: "BundleExecutorImplementation";

  public readonly contractName: "BundleExecutorImplementation";

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BundleExecutorImplementationInterface {
    return new utils.Interface(_abi) as BundleExecutorImplementationInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BundleExecutorImplementation {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as BundleExecutorImplementation;
  }
}
