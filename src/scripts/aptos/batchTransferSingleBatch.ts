import { Account, Ed25519PrivateKey, InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import { aptos, APTOS_DECIMALS } from '../../config/aptos';
import { getWallets } from '../../db/mysql';

const SENDER_PRIVATE_KEY = process.env.SENDER_PRIVATE_KEY || '';
const SEND_AMOUNT = Number(process.env.SEND_AMOUNT) * APTOS_DECIMALS || APTOS_DECIMALS;

async function main() {
  try {
    const privateKeyBytes = Buffer.from(SENDER_PRIVATE_KEY, 'hex');
    const privateKey = new Ed25519PrivateKey(privateKeyBytes);
    let sender = Account.fromPrivateKey({ privateKey });
    console.log(`sender is ${sender.accountAddress} `);
    // 从数据库读取钱包地址
    const wallets = await getWallets() as any[];
    console.log(`Found ${wallets.length} wallets in database`);


    
    // 批量转账
    for (const wallet of wallets) {
      const address = wallet.address;
      const transaction = await aptos.transaction.build.simple({
          sender: sender.accountAddress,
          data: {
          // Aptos 上所有交易都通过智能合约实现
          function: "0x1::aptos_account::transfer",
          functionArguments: [address, SEND_AMOUNT],
          },
      });
      const senderAuthenticator = aptos.transaction.sign({
          signer: sender,
          transaction,
      });
      const submittedTransaction = await aptos.transaction.submit.simple({
          transaction,
          senderAuthenticator,
      });
      const executedTransaction = await aptos.waitForTransaction({ transactionHash: submittedTransaction.hash });
      console.log(`tx: ${executedTransaction.hash}`)
    }

    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

  } catch (e) {
    console.error('Failed to get wallets from database:', e);
  }
  process.exit(0);
}

main().catch(console.error); 