# Dream Aptos 批量钱包与转账工具

## 项目简介
本项目基于 TypeScript，集成 Aptos SDK 和 MySQL，实现：
- 助记词批量生成钱包地址并存储到数据库
- 批量转账 Token
- 批量归集 Token

## 目录结构
```
├── config/           # 配置文件
│   └── db.ts         # 数据库配置
├── src/
│   ├── db/           # 数据库操作
│   │   └── mysql.ts  # MySQL 连接与操作
│   ├── scripts/      # 各类脚本
│   │   ├── generateWallets.ts  # 批量生成钱包
│   │   ├── batchTransfer.ts    # 批量转账
│   │   └── batchCollect.ts     # 批量归集
│   └── types/        # 类型定义
│       └── wallet.ts # 钱包类型
├── package.json
├── tsconfig.json
└── .env              # 环境变量配置（需自行创建）
```

## 依赖安装
```bash
npm install
```

## 环境变量配置

### 快速开始
1. 复制环境变量示例文件：
```bash
cp env.example .env
```

2. 编辑 `.env` 文件，填入您的实际配置值

### 环境变量说明

#### Aptos 区块链配置
- `NETWORK`: Aptos 网络环境 (mainnet/testnet/devnet)，默认: mainnet

#### 数据库配置
- `DB_HOST`: MySQL 数据库主机地址，默认: localhost
- `DB_USER`: MySQL 数据库用户名，默认: root
- `DB_PASSWORD`: MySQL 数据库密码，默认: gao
- `DB_NAME`: MySQL 数据库名称，默认: dream
- `DB_PORT`: MySQL 数据库端口，默认: 3306

#### 钱包管理配置
- `MNEMONIC`: 助记词，用于 generateWallets.ts 脚本生成批量钱包
- `BATCH_SIZE`: 批量生成钱包数量，默认: 10

#### 转账配置
- `SENDER_PRIVATE_KEY`: 发送方私钥，用于 batchTransferSingleBatch.ts 脚本
- `SEND_AMOUNT`: 转账金额 (APT)，注意实际转账金额 = SEND_AMOUNT * 100000000，默认: 1 APT

#### 资金归集配置
- `COLLECT_ADDRESS`: 归集目标地址，用于 batchCollect.ts 脚本

#### 高级配置 (可选)
- `APTOS_RPC_URL`: 自定义 Aptos 节点 RPC 地址
- `APTOS_API_URL`: 自定义 Aptos 节点 API 地址
- `TRANSACTION_TIMEOUT`: 交易超时时间 (毫秒)，默认: 30000
- `BATCH_INTERVAL`: 批量操作间隔时间 (毫秒)，默认: 1000

### 完整配置示例
参考 `env.example` 文件获取完整的配置示例和详细注释。

## 数据库表结构
请先在 MySQL 中创建数据库和表：
```sql
CREATE DATABASE IF NOT EXISTS dream;
USE dream;
CREATE TABLE IF NOT EXISTS wallets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  address VARCHAR(128) NOT NULL,
  public_key VARCHAR(256) NOT NULL,
  private_key VARCHAR(256) NOT NULL
);
```

## 脚本说明与用法

### 1. 批量生成钱包地址
```bash
npx ts-node src/scripts/generateWallets.ts
```
- 根据 BATCH_SIZE 生成钱包，自动存入数据库。

### 2. 批量转账 Token
```bash
npx ts-node src/scripts/batchTransfer.ts
```
- 使用同一助记词下的多个地址，批量向 RECEIVER 地址转账。
- 支持自定义转账数量 AMOUNT。

### 3. 批量归集 Token
```bash
npx ts-node src/scripts/batchCollect.ts
```
- 将助记词下所有地址的余额归集到 COLLECT_ADDRESS。

## 注意事项
- 请确保 .env 配置正确，且 MySQL 服务已启动。
- Aptos 节点地址可根据需要更换。
- 助记词、私钥等敏感信息请妥善保管。

## License
MIT 