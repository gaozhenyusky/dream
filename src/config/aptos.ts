import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Aptos 代币精度常量 (8位小数)
export const APTOS_DECIMALS = 100000000;

// 从环境变量读取网络配置
const NETWORK = process.env.NETWORK || 'mainnet';

// 配置客户端
const config = new AptosConfig({ 
  network: NETWORK === 'mainnet' ? Network.MAINNET : 
           NETWORK === 'testnet' ? Network.TESTNET : Network.DEVNET
});

// 创建 Aptos 实例
export const aptos = new Aptos(config);

// 导出网络配置
export const networkConfig = {
  network: NETWORK,
  isMainnet: NETWORK === 'mainnet',
  isTestnet: NETWORK === 'testnet',
  isDevnet: NETWORK === 'devnet'
};

// 使用示例：
// import { aptos, networkConfig } from '../config/aptos';
// 
// // 检查当前网络
// console.log('Current network:', networkConfig.network);
// 
// // 使用 aptos 实例
// const resources = await aptos.getAccountResources({ accountAddress: address }); 