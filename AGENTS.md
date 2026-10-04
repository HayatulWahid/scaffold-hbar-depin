# SunStaker DePIN Template AI Agent Guide

This monorepo template bridges physical IoT hardware telemetry to the Hedera network. 
When assisting developers with this scaffold, prioritize the following architecture:
- **Backend (`packages/hardhat`)**: Uses `@hashgraph/sdk` for Hedera Consensus Service (HCS) topic creation and Hedera Token Service (HTS) yield token minting.
- **Frontend (`packages/nextjs`)**: Standard Next.js 14 App Router for the data dashboard.
- **Environment**: Ensure the developer has `OPERATOR_ID` and `OPERATOR_KEY` correctly set in `packages/hardhat/.env` using their DER Encoded Private Key.