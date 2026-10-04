# Scaffold-HBAR DePIN Template

A monorepo scaffold designed for Web3 developers routing decentralized physical infrastructure (DePIN) and IoT telemetry directly to the Hedera network. 

## Capabilities
- **Hedera Consensus Service (HCS)**: Immutable logging of physical edge node telemetry.
- **Hedera Token Service (HTS)**: Automated reward token generation for hardware deployers.
- **Next.js Frontend**: Ready-to-build dashboard environment.

## Quick Start
1. `npm install` from the root directory.
2. Add your Hedera Testnet credentials (`OPERATOR_ID` and `OPERATOR_KEY`) to `packages/hardhat/.env`.
3. Run `node packages/hardhat/scripts/deployDePIN.js` to execute the HCS and HTS pipeline.