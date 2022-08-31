const { assert } = require("chai");
const { accounts } = require("../../scripts/helpers/utils");
const truffleAssert = require("truffle-assertions");

const ERC721HandlerMock = artifacts.require("ERC721HandlerMock");
const ERC721MB = artifacts.require("ERC721MintableBurnable");

ERC721MB.numberFormat = "BigNumber";
ERC721HandlerMock.numberFormat = "BigNumber";

describe("ERC721Handler", () => {
  const baseId = "5000";

  let OWNER;
  let handler;
  let token;

  before("setup", async () => {
    OWNER = await accounts(0);
  });

  beforeEach("setup", async () => {
    token = await ERC721MB.new("Mock", "MK", OWNER);
    handler = await ERC721HandlerMock.new();

    await token.mintTo(OWNER, baseId);
    await token.approve(handler.address, baseId);

    await token.transferOwnership(handler.address);
  });

  describe("depositERC721", () => {
    it("should deposit token, isWrapped = true", async () => {
      let tx = await handler.depositERC721(token.address, baseId, "receiver", "kovan", true);

      assert.equal(tx.receipt.logs[0].event, "DepositedERC721");
      assert.equal(tx.receipt.logs[0].args.token, token.address);
      assert.equal(tx.receipt.logs[0].args.tokenId, baseId);
      assert.equal(tx.receipt.logs[0].args.receiver, "receiver");
      assert.equal(tx.receipt.logs[0].args.network, "kovan");
      assert.isTrue(tx.receipt.logs[0].args.isWrapped);

      await truffleAssert.reverts(token.ownerOf(baseId), "ERC721: owner query for nonexistent token");
    });

    it("should deposit token, isWrapped = false", async () => {
      let tx = await handler.depositERC721(token.address, baseId, "receiver", "kovan", false);

      assert.equal(await token.ownerOf(baseId), handler.address);
      assert.equal(tx.receipt.logs[0].event, "DepositedERC721");
      assert.equal(tx.receipt.logs[0].args.token, token.address);
      assert.equal(tx.receipt.logs[0].args.tokenId, baseId);
      assert.equal(tx.receipt.logs[0].args.receiver, "receiver");
      assert.equal(tx.receipt.logs[0].args.network, "kovan");
      assert.isFalse(tx.receipt.logs[0].args.isWrapped);
    });

    it("should revert when token address is 0", async () => {
      await truffleAssert.reverts(
        handler.depositERC721("0x0000000000000000000000000000000000000000", baseId, "receiver", "kovan", false),
        "ERC721Handler: zero token"
      );
    });
  });

  describe("getERC721MerkleLeaf", () => {
    it("should encode args", async () => {
      let originHash = "0xc4f46c912cc2a1f30891552ac72871ab0f0e977886852bdd5dccd221a595647d";

      let merkleLeaf0 = await handler.getERC721MerkleLeaf(
        token.address,
        baseId,
        "1",
        OWNER,
        originHash,
        "ethereum",
        handler.address
      );

      assert.equal(
        merkleLeaf0,
        web3.utils.soliditySha3(
          { value: token.address, type: "address" },
          { value: baseId, type: "uint256" },
          { value: "1", type: "uint256" },
          { value: OWNER, type: "address" },
          { value: originHash, type: "bytes32" },
          { value: "ethereum", type: "string" },
          { value: handler.address, type: "address" }
        )
      );

      let merkleLeaf1 = await handler.getERC721MerkleLeaf(
        token.address,
        baseId,
        "1",
        OWNER,
        originHash,
        "BSC",
        handler.address
      );

      assert.equal(
        merkleLeaf1,
        web3.utils.soliditySha3(
          { value: token.address, type: "address" },
          { value: baseId, type: "uint256" },
          { value: "1", type: "uint256" },
          { value: OWNER, type: "address" },
          { value: originHash, type: "bytes32" },
          { value: "BSC", type: "string" },
          { value: handler.address, type: "address" }
        )
      );

      assert.notEqual(merkleLeaf0, merkleLeaf1);
    });
  });

  describe("withdrawERC721", async () => {
    it("should withdraw token, wrapped = true", async () => {
      await handler.depositERC721(token.address, baseId, "receiver", "kovan", true);
      await handler.withdrawERC721(token.address, baseId, OWNER, true);

      assert.equal(await token.ownerOf(baseId), OWNER);
    });

    it("should withdraw token, wrapped = false", async () => {
      await handler.depositERC721(token.address, baseId, "receiver", "kovan", false);
      await handler.withdrawERC721(token.address, baseId, OWNER, false);

      assert.equal(await token.ownerOf(baseId), OWNER);
    });

    it("should revert when token address is 0", async () => {
      await truffleAssert.reverts(
        handler.withdrawERC721("0x0000000000000000000000000000000000000000", baseId, OWNER, false),
        "ERC721Handler: zero token"
      );
    });

    it("should revert when receiver address is 0", async () => {
      await truffleAssert.reverts(
        handler.withdrawERC721(token.address, baseId, "0x0000000000000000000000000000000000000000", false),
        "ERC721Handler: zero receiver"
      );
    });
  });
});
