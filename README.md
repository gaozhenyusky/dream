# Dream Aptos 批量钱包与转账工具

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Aptos](https://img.shields.io/badge/Aptos-000000?style=for-the-badge&logo=aptos&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

**基于 TypeScript 的 Aptos 区块链批量操作工具**

[快速开始](#快速开始) • [功能特性](#功能特性) • [安装配置](#安装配置) • [使用指南](#使用指南) • [API 文档](#api-文档)

</div>

---

## 📋 目录

- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [安装配置](#安装配置)
- [使用指南](#使用指南)
- [API 文档](#api-文档)
- [配置说明](#配置说明)
- [数据库设计](#数据库设计)
- [安全注意事项](#安全注意事项)
- [故障排除](#故障排除)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## 🚀 项目简介

Dream Aptos 是一个基于 TypeScript 开发的区块链批量操作工具，专门为 Aptos 生态系统设计。该项目集成了 Aptos SDK 和 MySQL 数据库，提供了一套完整的钱包管理和批量转账解决方案。

### 核心功能
- 🔐 **批量钱包生成**：基于助记词批量生成钱包地址
- 💰 **批量转账**：支持多地址批量转账操作
- 🏦 **资金归集**：将多个地址的余额归集到指定地址
- 📊 **数据持久化**：自动存储钱包信息到 MySQL 数据库
- 🔄 **余额刷新**：实时查询和更新钱包余额

## ✨ 功能特性

| 功能 | 描述 | 状态 |
|------|------|------|
| 批量生成钱包 | 基于助记词生成多个钱包地址 | ✅ |
| 数据库存储 | 自动保存钱包信息到 MySQL | ✅ |
| 批量转账 | 支持多地址批量转账 APT | ✅ |
| 资金归集 | 将多个地址余额归集到主地址 | ✅ |
| 余额查询 | 实时查询钱包余额 | ✅ |
| 多网络支持 | 支持 mainnet/testnet/devnet | ✅ |
| 类型安全 | 完整的 TypeScript 类型定义 | ✅ |

## 🛠 技术栈

- **语言**: TypeScript 5.x
- **运行时**: Node.js 18+
- **区块链**: Aptos SDK
- **数据库**: MySQL 8.0+
- **包管理**: npm/yarn
- **开发工具**: ts-node

## 🚀 快速开始

### 环境要求

- Node.js 16.0 或更高版本
- MySQL 5.7 或更高版本
- Git

### 1. 克隆项目

```bash
git clone https://github.com/gaozhenyusky/dream.git
cd dream
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
# 复制环境变量模板
cp env.example .env

# 编辑配置文件
nano .env  # 或使用你喜欢的编辑器
```

### 4. 初始化数据库

```sql
CREATE DATABASE IF NOT EXISTS dream;
USE dream;
CREATE TABLE IF NOT EXISTS wallets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  address VARCHAR(128) NOT NULL UNIQUE,
  public_key VARCHAR(256) NOT NULL,
  private_key VARCHAR(256) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 5. 运行测试

```bash
# 生成测试钱包
npx ts-node src/scripts/aptos/generateWallets.ts
```

## 📁 项目结构

```
dream/
├── 📁 config/                 # 配置文件
│   ├── db.ts                 # 数据库配置
│   └── aptos.ts              # Aptos 配置
├── 📁 src/
│   ├── 📁 config/            # 源码配置
│   │   └── aptos.ts          # Aptos SDK 配置
│   ├── 📁 db/                # 数据库操作
│   │   └── mysql.ts          # MySQL 连接与操作
│   ├── 📁 scripts/           # 脚本文件
│   │   ├── 📁 aptos/         # Aptos 相关脚本
│   │   │   ├── generateWallets.ts      # 批量生成钱包
│   │   │   ├── batchTransferSingleBatch.ts  # 批量转账
│   │   │   ├── batchCollect.ts        # 批量归集
│   │   │   └── refreshAptBalance.ts   # 刷新余额
│   │   └── 📁 useless/       # 废弃脚本
│   └── 📁 types/             # 类型定义
│       └── wallet.ts         # 钱包类型
├── 📁 database/              # 数据库相关
│   └── schema.sql            # 数据库表结构
├── 📄 package.json           # 项目配置
├── 📄 tsconfig.json          # TypeScript 配置
├── 📄 .env.example           # 环境变量模板
├── 📄 .gitignore             # Git 忽略文件
└── 📄 README.md              # 项目文档
```

## ⚙️ 安装配置

### 环境变量配置

#### 基础配置

```bash
# Aptos 网络配置
NETWORK=mainnet              # 网络环境: mainnet/testnet/devnet

# 数据库配置
DB_HOST=localhost            # 数据库主机
DB_USER=root                 # 数据库用户名
DB_PASSWORD=your_password    # 数据库密码
DB_NAME=dream                # 数据库名称
DB_PORT=3306                 # 数据库端口
```

#### 钱包配置

```bash
# 助记词 (用于生成钱包)
MNEMONIC="word1 word2 word3 ... word12"

# 批量操作配置
BATCH_SIZE=10                # 批量生成钱包数量
```

#### 转账配置

```bash
# 发送方私钥 (支持 0x 开头)
SENDER_PRIVATE_KEY=0x1234567890abcdef...

# 转账金额 (APT)
SEND_AMOUNT=1.0              # 转账 1 APT
```

#### 归集配置

```bash
# 归集目标地址
COLLECT_ADDRESS=0x...
```

#### 高级配置 (可选)

```bash
# 自定义节点地址
APTOS_RPC_URL=https://fullnode.mainnet.aptoslabs.com/v1
APTOS_API_URL=https://fullnode.mainnet.aptoslabs.com

# 性能调优
TRANSACTION_TIMEOUT=30000    # 交易超时时间 (毫秒)
BATCH_INTERVAL=1000          # 批量操作间隔 (毫秒)
```

## 📖 使用指南

### 1. 批量生成钱包

生成指定数量的钱包地址并存储到数据库：

```bash
npx ts-node src/scripts/aptos/generateWallets.ts
```

**配置说明**：
- `MNEMONIC`: 用于生成钱包的助记词
- `BATCH_SIZE`: 生成钱包的数量

**输出示例**：
```
✅ 成功生成 10 个钱包地址
📝 已保存到数据库: dream.wallets
```

### 2. 批量转账

从指定地址批量转账到目标地址：

```bash
npx ts-node src/scripts/aptos/batchTransferSingleBatch.ts
```

**配置说明**：
- `SENDER_PRIVATE_KEY`: 发送方私钥
- `SEND_AMOUNT`: 转账金额 (APT)

**注意事项**：
- 确保发送方地址有足够的 APT 余额
- 转账金额会自动乘以 100000000 (APT 精度)

### 3. 批量归集

将多个地址的余额归集到主地址：

```bash
npx ts-node src/scripts/aptos/batchCollect.ts
```

**配置说明**：
- `COLLECT_ADDRESS`: 归集目标地址
- `MNEMONIC`: 用于查找钱包的助记词

### 4. 刷新余额

查询并更新数据库中钱包的余额：

```bash
npx ts-node src/scripts/aptos/refreshAptBalance.ts
```

## 📚 API 文档

### 数据库操作

#### 连接数据库

```typescript
import { connectDB } from '../db/mysql';

const connection = await connectDB();
```

#### 插入钱包

```typescript
import { insertWallet } from '../db/mysql';

const wallet = {
  address: '0x...',
  public_key: '0x...',
  private_key: '0x...'
};

await insertWallet(wallet);
```

#### 查询钱包

```typescript
import { getWallets } from '../db/mysql';

const wallets = await getWallets();
```

### Aptos 操作

#### 创建客户端

```typescript
import { AptosClient } from 'aptos';

const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/v1');
```

#### 查询余额

```typescript
const balance = await client.getAccountResource(
  accountAddress,
  '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
);
```

## 🔧 配置说明

### 网络配置

| 网络 | RPC URL | 用途 |
|------|---------|------|
| mainnet | https://fullnode.mainnet.aptoslabs.com/v1 | 生产环境 |
| testnet | https://fullnode.testnet.aptoslabs.com/v1 | 测试环境 |
| devnet | https://fullnode.devnet.aptoslabs.com/v1 | 开发环境 |

### 数据库配置

推荐使用 MySQL 8.0+ 版本，确保以下配置：

```sql
-- 创建专用用户
CREATE USER 'dream_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON dream.* TO 'dream_user'@'localhost';
FLUSH PRIVILEGES;
```

## 🗄️ 数据库设计

### wallets 表结构

```sql
CREATE TABLE wallets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  address VARCHAR(128) NOT NULL UNIQUE,
  public_key VARCHAR(256) NOT NULL,
  private_key VARCHAR(256) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_address (address),
  INDEX idx_created_at (created_at)
);
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键，自增 |
| address | VARCHAR(128) | 钱包地址，唯一 |
| public_key | VARCHAR(256) | 公钥 |
| private_key | VARCHAR(256) | 私钥 (加密存储) |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

## 🔒 安全注意事项

### ⚠️ 重要安全提醒

1. **私钥安全**
   - 永远不要将私钥提交到版本控制系统
   - 使用环境变量存储敏感信息
   - 定期更换私钥和助记词

2. **环境安全**
   - 生产环境使用专用数据库用户
   - 启用数据库 SSL 连接
   - 限制数据库访问 IP

3. **操作安全**
   - 先在测试网进行测试
   - 小额测试后再进行大额操作
   - 定期备份重要数据

### 安全最佳实践

```bash
# 1. 使用强密码
DB_PASSWORD=YourStrongPassword123!

# 2. 限制数据库权限
GRANT SELECT, INSERT, UPDATE ON dream.* TO 'dream_user'@'localhost';

# 3. 启用 SSL 连接
DB_SSL=true

# 4. 定期备份
mysqldump -u root -p dream > backup_$(date +%Y%m%d).sql
```

## 🐛 故障排除

### 常见问题

#### 1. 数据库连接失败

**错误信息**：
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**解决方案**：
```bash
# 检查 MySQL 服务状态
sudo systemctl status mysql

# 启动 MySQL 服务
sudo systemctl start mysql

# 检查端口监听
netstat -tlnp | grep 3306
```

#### 2. Aptos 网络连接超时

**错误信息**：
```
Error: timeout of 30000ms exceeded
```

**解决方案**：
```bash
# 增加超时时间
TRANSACTION_TIMEOUT=60000

# 使用备用节点
APTOS_RPC_URL=https://aptos-mainnet.pontem.network/v1
```

#### 3. 余额不足错误

**错误信息**：
```
Error: INSUFFICIENT_BALANCE_FOR_TRANSACTION_FEE
```

**解决方案**：
- 检查账户余额
- 确保有足够的 APT 支付手续费
- 减少转账金额

### 调试模式

启用详细日志输出：

```bash
# 设置调试环境变量
DEBUG=true
LOG_LEVEL=debug

# 运行脚本
npx ts-node src/scripts/aptos/generateWallets.ts
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 贡献方式

1. **报告 Bug**
   - 使用 GitHub Issues
   - 提供详细的错误信息和复现步骤

2. **功能建议**
   - 在 Issues 中提出建议
   - 描述功能需求和用例

3. **代码贡献**
   - Fork 项目
   - 创建功能分支
   - 提交 Pull Request

### 开发环境设置

```bash
# 1. Fork 并克隆项目
git clone https://github.com/your-username/dream.git
cd dream

# 2. 安装依赖
npm install

# 3. 创建开发分支
git checkout -b feature/your-feature

# 4. 运行测试
npm test

# 5. 提交代码
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature
```

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 添加适当的注释
- 编写单元测试

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

```
MIT License

Copyright (c) 2024 Dream Aptos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 联系我们

- **项目地址**: [https://github.com/gaozhenyusky/dream](https://github.com/gaozhenyusky/dream)
- **问题反馈**: [GitHub Issues](https://github.com/gaozhenyusky/dream/issues)
- **讨论交流**: [GitHub Discussions](https://github.com/gaozhenyusky/dream/discussions)

---

<div align="center">

**如果这个项目对你有帮助，请给它一个 ⭐️**

Made with ❤️ by the Dream Aptos Team

</div> 