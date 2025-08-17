import mysql from 'mysql2/promise';
import { dbConfig } from '../../config/db';

export const pool = mysql.createPool(dbConfig);

export async function insertWallet(serialNo: Number, address: string, type: string, privateKey: string, apt_balance: number) {
  const sql = 'INSERT INTO aptos_wallets (serial_no, address, type, private_key, apt_balance) VALUES (?, ?, ?, ?, ?)';
  const [result] = await pool.execute(sql, [serialNo, address, type, privateKey, apt_balance]);
  return result;
}

export async function getWallets() {
  const sql = 'SELECT * FROM aptos_wallets';
  const [rows] = await pool.query(sql);
  return rows;
}

export async function updateAptBalance(address: string, balance: number) {
  const sql = 'UPDATE aptos_wallets SET apt_balance = ? WHERE address = ?';
  const [result] = await pool.execute(sql, [balance, address]);
  return result;
} 