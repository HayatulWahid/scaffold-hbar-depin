const { 
    Client, 
    TopicCreateTransaction, 
    TopicMessageSubmitTransaction, 
    TokenCreateTransaction, 
    TokenType, 
    PrivateKey 
} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    // 1. Initialize Hedera Testnet Client
    const client = Client.forTestnet();
    client.setOperator(process.env.OPERATOR_ID, process.env.OPERATOR_KEY);
    const operatorKey = PrivateKey.fromString(process.env.OPERATOR_KEY);

    console.log("🚀 Initializing SunStaker DePIN Scaffold...");

    // 2. Create HCS Topic for Hardware Telemetry
    console.log("\n📡 1. Creating HCS Topic for ESP32 Telemetry...");
    const topicTx = await new TopicCreateTransaction().execute(client);
    const topicReceipt = await topicTx.getReceipt(client);
    const topicId = topicReceipt.topicId;
    console.log(`✅ HCS Topic Created! ID: ${topicId}`);

    // 3. Log Mock Telemetry Data immutably to HCS
    console.log("\n⚡ 2. Logging Physical IoT Voltage to HCS...");
    const telemetryPayload = {
        deviceId: "ESP32_ABU_HOSTEL_01",
        voltage: 12.4,
        energy_kWh: 0.026,
        timestamp: new Date().toISOString()
    };
    const msgTx = await new TopicMessageSubmitTransaction({
        topicId: topicId,
        message: JSON.stringify(telemetryPayload),
    }).execute(client);
    const msgReceipt = await msgTx.getReceipt(client);
    console.log(`✅ Telemetry Logged! Message Status: ${msgReceipt.status}`);

    // 4. Trigger HTS to Create the $S^2 Yield Token
    console.log("\n🪙 3. Triggering HTS to generate DePIN Reward Token...");
    const tokenTx = await new TokenCreateTransaction()
        .setTokenName("SunStaker Yield Scaffold")
        .setTokenSymbol("S2")
        .setTokenType(TokenType.FungibleCommon)
        .setTreasuryAccountId(process.env.OPERATOR_ID)
        .setSupplyKey(operatorKey)
        .execute(client);
    const tokenReceipt = await tokenTx.getReceipt(client);
    console.log(`✅ HTS Token Created! Token ID: ${tokenReceipt.tokenId}`);
    
    console.log("\n🎯 Scaffold execution complete. Verify on Hashscan.io!");
    process.exit();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});