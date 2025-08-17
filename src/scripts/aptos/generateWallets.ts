import { Ed25519PrivateKey, mnemonicToSeed, splitPath, AccountAddress, CKDPriv , Account} from '@aptos-labs/ts-sdk';
import { insertWallet } from '../../db/mysql';
import dotenv from 'dotenv';
import { log } from 'console';
dotenv.config();

const BATCH_SIZE = Number(process.env.BATCH_SIZE) || 10;
const MNEMONIC = process.env.MNEMONIC || '';

async function main() {
  for (let i = 0; i < BATCH_SIZE; i++) {
    const mnemonic = MNEMONIC;
    const account = Account.fromDerivationPath({ path: `m/44'/637'/${i}'/0'/0'`, mnemonic });
    const privateKey = account.privateKey;
    const publicKey = account.accountAddress;
    const address = new AccountAddress(publicKey.toUint8Array());
    const privateKeyHex = Buffer.from(privateKey.toUint8Array()).toString('hex');
    await insertWallet(i + 1, address.toString(), "aptos", privateKeyHex, 0);
    console.log(`Wallet ${i + 1}: ${publicKey.toString()}`);
    // console.log(`Wallet ${i + 1}: ${privateKeyHex.toString()}`);

  }
  process.exit(0);
}

main().catch(console.error); 