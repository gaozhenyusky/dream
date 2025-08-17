import { Account, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import { aptos, APTOS_DECIMALS } from '../../config/aptos';
import { getWallets, updateAptBalance } from '../../db/mysql';


async function main() {
  try {
    // 从数据库读取钱包地址
    const wallets = await getWallets() as any[];
    console.log(`Found ${wallets.length} wallets in database`);
    
    for (const wallet of wallets) {
      try {
        // 从私钥创建账户
        const privateKeyBytes = Buffer.from(wallet.private_key, 'hex');
        const privateKey = new Ed25519PrivateKey(privateKeyBytes);
        const account = Account.fromPrivateKey({ privateKey });
        console.log(`account: ${account.accountAddress}`);
        
        // 查询余额
        const aptBalance = await aptos.getAccountAPTAmount({ accountAddress: account.accountAddress })/APTOS_DECIMALS;
        console.log(`Address: ${wallet.address}, APT Balance: ${aptBalance}`);
        
        // 更新数据库中的余额
        await updateAptBalance(wallet.address, aptBalance);
        console.log(`Updated balance for ${wallet.address} to ${aptBalance}`);
        
      } catch (e) {
        console.error(`Failed to update balance for ${wallet.address}:`, e);
      }
    }
  } catch (e) {
    console.error('Failed to get wallets from database:', e);
  }
  process.exit(0);
}

main().catch(console.error);