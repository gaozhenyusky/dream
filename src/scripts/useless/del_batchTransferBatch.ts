// import { Account, Ed25519PrivateKey, InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
// import { aptos } from '../../config/aptos';
// import { getWallets } from '../../db/mysql';

// const SENDER_PRIVATE_KEY = process.env.SENDER_PRIVATE_KEY || '';
// const SEND_AMOUNT = Number(process.env.SEND_AMOUNT) || 1;

// async function main() {
//   try {
//     const privateKeyBytes = Buffer.from(SENDER_PRIVATE_KEY, 'hex');
//     const privateKey = new Ed25519PrivateKey(privateKeyBytes);
//     let sender = Account.fromPrivateKey({ privateKey });
//     console.log(`sender is ${sender.accountAddress} `);
//     // 从数据库读取钱包地址
//     const wallets = await getWallets() as any[];
//     console.log(`Found ${wallets.length} wallets in database`);

//     // 创建向每个账户发送 APT 的交易
//     const transactions: InputGenerateTransactionPayloadData[] = [];
    
//     // 批量转账
//     for (const wallet of wallets) {
//       const address = wallet.address;
//       console.log(`address: ${address} `);
//       const transaction: InputGenerateTransactionPayloadData = {
//         function: "0x1::aptos_account::transfer",
//         functionArguments: [address, SEND_AMOUNT],
//       };
//       transactions.push(transaction);
//     }
    
//     console.log(`Preparing to send ${SEND_AMOUNT} APT to ${transactions.length} addresses`);
    
//     // 签名并尽可能快地提交所有交易（任一错误都会抛出）
//     await aptos.transaction.batch.forSingleAccount({ sender: sender, data: transactions });
//     console.log('Batch transfer completed successfully');
//   } catch (e) {
//     console.error('Failed to get wallets from database:', e);
//   }
//   process.exit(0);
// }

// main().catch(console.error); 