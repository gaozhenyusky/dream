import { Account, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import { aptos } from '../../config/aptos';
import { getWallets } from '../../db/mysql';

const COLLECT_ADDRESS = process.env.COLLECT_ADDRESS || '';

// 获取序号
async function getCorrectSequenceNumber(accountAddress: string) {
  try {
      const accountData = await aptos.getAccountInfo({
          accountAddress: accountAddress
      });
      return BigInt(accountData.sequence_number);
  } catch (error) {
      console.error(`获取账户 ${accountAddress} 信息失败，可能是新账户:`, error);
      return BigInt(0);
  }
}

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
        const aptBalance = await aptos.getAccountAPTAmount({ accountAddress: account.accountAddress });
        
        // 获取gas预测
        const gasEstimation = await aptos.getGasPriceEstimation();
        const gasPrice = gasEstimation.gas_estimate;
        console.log(`aptBalance: ${aptBalance}, gasPrice: ${gasPrice}`);

        // 计算预估 Gas 费用
        const maxGasAmount = 1000;
        const estimatedGasFee = gasPrice * maxGasAmount;
        
        // 保留额外的缓冲 (建议保留 0.001 APT = 1,000,000 octas)
        const RESERVE_AMOUNT = 1000; // 0.000001 APT
        const totalReserve = estimatedGasFee + RESERVE_AMOUNT;
        
        // console.log(`预估Gas费用: ${estimatedGasFee} octas`);
        // console.log(`保留缓冲: ${RESERVE_AMOUNT} octas`);
        // console.log(`总保留: ${totalReserve} octas`);
        
        // 检查余额是否足够转账
        if (aptBalance <= totalReserve) {
          console.log(`Account ${wallet.address} balance too low (${aptBalance} <= ${totalReserve}), skip.`);
          continue;
        }
        
        // 计算实际转账金额 = 总余额 - 保留金额
        const transferAmount = aptBalance - totalReserve;
        console.log(`转账金额: ${transferAmount} octas (${transferAmount / 100000000} APT)`);

        // 获取正确的序列号
        const sequenceNumber = await getCorrectSequenceNumber(account.accountAddress.toString());
        console.log(`账户序列号: ${sequenceNumber}`);
        
        // 构建交易
        const transaction = await aptos.transaction.build.simple({
          sender: account.accountAddress,
          data: {
            function: "0x1::aptos_account::transfer",
            functionArguments: [COLLECT_ADDRESS, transferAmount], // ✅ 转账扣除费用后的金额
          },
          options: {
            gasUnitPrice: gasPrice,
            maxGasAmount: maxGasAmount,
            accountSequenceNumber: sequenceNumber,
            expireTimestamp: Math.floor(Date.now() / 1000) + 600, // 10分钟后过期
          }
        });
        
        // 签名交易
        const senderAuthenticator = aptos.transaction.sign({
          signer: account,
          transaction,
        });
        
        // 提交交易
        const submittedTransaction = await aptos.transaction.submit.simple({
          transaction,
          senderAuthenticator,
        });
        
        // 等待交易确认
        const executedTransaction = await aptos.waitForTransaction({ 
          transactionHash: submittedTransaction.hash 
        });
        
        if (executedTransaction.success) {
          console.log(`✅ Collect from ${wallet.address} success: ${executedTransaction.hash}`);
          // console.log(`Gas used: ${executedTransaction.gas_used}`);
        } else {
          console.error(`❌ Transaction failed: ${executedTransaction.vm_status}`);
        }
        
        // 在处理下一个钱包前等待一段时间
        await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
        
      } catch (e) {
        console.error(`Collect from ${wallet.address} failed:`, e);
      }
    }
  } catch (e) {
    console.error('Failed to get wallets from database:', e);
  }
  process.exit(0);
}

main().catch(console.error);