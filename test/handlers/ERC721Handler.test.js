const { assert } = require("chai");
const { accounts } = require("../../scripts/helpers/utils");
const truffleAssert = require("truffle-assertions");

const ERC721HandlerMock = artifacts.require("ERC721HandlerMock");
const ERC721MB = artifacts.require("ERC721MintableBurnable");

ERC721MB.numberFormat = "BigNumber";
ERC721HandlerMock.numberFormat = "BigNumber";

describe("ERC721Handler", () => {
  const baseId = "5000";
  const salt = "0x0000000000000000000000000000000000000000000000000000000000000002";

  let OWNER;
  let SECOND;
  let handler;
  let token;

  before("setup", async () => {
    OWNER = await accounts(0);
    SECOND = await accounts(1);
  });

  beforeEach("setup", async () => {
    token = await ERC721MB.new("Mock", "MK", OWNER, "");
    handler = await ERC721HandlerMock.new();

    await token.mintTo(OWNER, baseId, "URI");
    await token.approve(handler.address, baseId);

    await token.transferOwnership(handler.address);
  });

  describe("access", () => {
    it("only this should call this method", async () => {
      const tokenData = web3.eth.abi.encodeParameters(
        ["address", "uint256", "string", "uint256"],
        [token.address, 0, "", "1"]
      );

      await truffleAssert.reverts(
        handler.withdrawERC721Bundle(tokenData, { salt: salt, bundle: "0x" }, true),
        "Bundler: not this"
      );
    });
  });

  describe("depositERC721", () => {
    it("should deposit token, isWrapped = true", async () => {
      let tx = await handler.depositERC721(
        token.address,
        baseId,
        { salt: salt, bundle: "0x00" },
        "kovan",
        "receiver",
        true
      );

      const realSalt = web3.utils.soliditySha3({ value: salt, type: "bytes32" }, { value: OWNER, type: "address" });

      assert.equal(tx.receipt.logs[0].event, "DepositedERC721");
      assert.equal(tx.receipt.logs[0].args.token, token.address);
      assert.equal(tx.receipt.logs[0].args.tokenId, baseId);
      assert.equal(tx.receipt.logs[0].args.salt, realSalt);
      assert.equal(tx.receipt.logs[0].args.bundle, "0x00");
      assert.equal(tx.receipt.logs[0].args.network, "kovan");
      assert.equal(tx.receipt.logs[0].args.receiver, "receiver");
      assert.isTrue(tx.receipt.logs[0].args.isWrapped);

      await truffleAssert.reverts(token.ownerOf(baseId), "ERC721: owner query for nonexistent token");
    });

    it("should not burn token if it is not approved", async () => {
      await token.approve(token.address, baseId);

      await truffleAssert.reverts(
        handler.depositERC721(token.address, baseId, { salt: salt, bundle: "0x" }, "kovan", "receiver", true),
        "ERC721MintableBurnable: not approved"
      );
    });

    it("should not burn token if it is approved but not owned", async () => {
      await truffleAssert.reverts(
        handler.depositERC721(token.address, baseId, { salt: salt, bundle: "0x" }, "kovan", "receiver", true, {
          from: SECOND,
        }),
        "ERC721MintableBurnable: not approved"
      );
    });

    it("should deposit token, isWrapped = false", async () => {
      let tx = await handler.depositERC721(
        token.address,
        baseId,
        { salt: salt, bundle: "0x0123" },
        "kovan",
        "receiver",
        false
      );

      const realSalt = web3.utils.soliditySha3({ value: salt, type: "bytes32" }, { value: OWNER, type: "address" });

      assert.equal(await token.ownerOf(baseId), handler.address);

      assert.equal(tx.receipt.logs[0].event, "DepositedERC721");
      assert.equal(tx.receipt.logs[0].args.token, token.address);
      assert.equal(tx.receipt.logs[0].args.tokenId, baseId);
      assert.equal(tx.receipt.logs[0].args.salt, realSalt);
      assert.equal(tx.receipt.logs[0].args.bundle, "0x0123");
      assert.equal(tx.receipt.logs[0].args.network, "kovan");
      assert.equal(tx.receipt.logs[0].args.receiver, "receiver");
      assert.isFalse(tx.receipt.logs[0].args.isWrapped);
    });

    it("should revert when token address is 0", async () => {
      await truffleAssert.reverts(
        handler.depositERC721(
          "0x0000000000000000000000000000000000000000",
          baseId,
          { salt: salt, bundle: "0x00" },
          "kovan",
          "receiver",
          false
        ),
        "ERC721Handler: zero token"
      );
    });
  });

  describe("withdrawERC721", async () => {
    it("should withdraw token, wrapped = true", async () => {
      const tokenData = web3.eth.abi.encodeParameters(
        ["address", "uint256", "string", "uint256"],
        [token.address, baseId, "URI1", "1"]
      );

      assert.equal(await token.tokenURI(baseId), "URI");

      await handler.depositERC721(token.address, baseId, { salt: salt, bundle: "0x" }, "kovan", "receiver", true);
      await handler.withdrawERC721(tokenData, OWNER, true);

      assert.equal(await token.ownerOf(baseId), OWNER);
      assert.equal(await token.tokenURI(baseId), "URI1");
    });

    it("should withdraw token, wrapped = false", async () => {
      const tokenData = web3.eth.abi.encodeParameters(
        ["address", "uint256", "string", "uint256"],
        [token.address, baseId, "URI1", "1"]
      );

      await handler.depositERC721(token.address, baseId, { salt: salt, bundle: "0x" }, "kovan", "receiver", false);
      await handler.withdrawERC721(tokenData, OWNER, false);

      assert.equal(await token.ownerOf(baseId), OWNER);
      assert.equal(await token.tokenURI(baseId), "URI");
    });

    it("should revert when token address is 0", async () => {
      const tokenData = web3.eth.abi.encodeParameters(
        ["address", "uint256", "string", "uint256"],
        ["0x0000000000000000000000000000000000000000", baseId, "", "1"]
      );

      await truffleAssert.reverts(handler.withdrawERC721(tokenData, OWNER, false), "ERC721Handler: zero token");
    });

    it("should revert when receiver address is 0", async () => {
      const tokenData = web3.eth.abi.encodeParameters(
        ["address", "uint256", "string", "uint256"],
        [token.address, baseId, "", "1"]
      );

      await truffleAssert.reverts(
        handler.withdrawERC721(tokenData, "0x0000000000000000000000000000000000000000", false),
        "ERC721Handler: zero receiver"
      );
    });
  });
});
