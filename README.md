# 🥷 NinjaCoin (NJC)

NinjaCoin is a fixed-supply ERC-20 token built with Solidity and Hardhat.

The goal of NinjaCoin is to create a fast, secure and simple digital payment system.

---

## Token Information

- Name: NinjaCoin
- Symbol: NJC
- Version: NinjaCoin V2
- Network: Ethereum Sepolia Testnet
- Total Supply: 210,000,000 NJC
- Decimals: 18
- Supply: Fixed (no minting)

Contract Address:

```
0x45F6301AD360e6a6F567DbF65371e6aEB10b4EBE
```

---

## Features

- ERC-20 compatible
- Transfer NJC between users
- Approve and transferFrom support
- Transfer and Approval events
- Fixed total supply
- Burn mechanism
- Ownership management
- Fully tested with Hardhat

---

## Development

Built with:

- Solidity 0.8.28
- Hardhat
- Ethers.js
- Ethereum Sepolia Testnet

---

## Smart Contract

Main contract:

```
contracts/contracts/NinjaCoinV2.sol
```

Contract verification:

- Blockscout ✅
- Sourcify ✅

---

## Testing

Run tests:

```bash
npx hardhat test
```

Current test status:

```
12 passing
```

Tests include:

- Supply verification
- Token transfers
- Approve and transferFrom
- Transfer events
- Burn functionality
- Ownership transfer

---

## Whitepaper

Documentation:

[NinjaCoin Whitepaper v0.2](Whitepaper/NinjaCoin_Whitepaper_v0.2.md)

---

## Roadmap

### Phase 1 ✅

- Create smart contract
- Deploy token on Sepolia
- Verify contract
- Add MetaMask support
- Create automated tests

### Phase 2 🚧

- Create official website
- Improve documentation
- Build community

### Phase 3 🔮

- Mainnet preparation
- Wallet integration
- NinjaCoin ecosystem

---

## License

MIT License