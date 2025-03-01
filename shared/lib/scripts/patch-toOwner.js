#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Assuming this script is in crypto-wallet/shared/lib/scripts, go up 3 directories to reach the project root
const projectRoot = path.join(__dirname, '../../../');

// Construct the target path relative to the project root
const targetPath = path.join(
  projectRoot,
  'node_modules',
  '.pnpm',
  'permissionless@0.2.23_viem@2.23.5_bufferutil@4.0.9_typescript@5.3.3_utf-8-validate@5.0._95c89e48b6855667583b13c8ba6c825d',
  'node_modules',
  'permissionless',
  'utils',
  'toOwner.ts'
);

const newContent = `import {
    type Account,
    type Address,
    type Chain,
    type LocalAccount,
    type OneOf,
    type Transport,
    type WalletClient,
    createWalletClient,
    custom, Hex,
} from 'viem';
import { toAccount } from "viem/accounts"

import { signTypedData } from "viem/actions"
import { getAction } from "viem/utils"

export type EthereumProvider = { request(...args: any): Promise<any> }

export async function toOwner<provider extends EthereumProvider>({
    owner,
    address
}: {
    owner: OneOf<
        | provider
        | WalletClient<Transport, Chain | undefined, Account>
        | LocalAccount
    >
    address?: Address
}): Promise<LocalAccount> {
    if ("type" in owner && owner.type === "local") {
        return owner as LocalAccount
    }

    let walletClient:
        | WalletClient<Transport, Chain | undefined, Account>
        | undefined = undefined

    if ("request" in owner) {
        if (!address) {
            try {
                ;[address] = await (owner as EthereumProvider).request({
                    method: "eth_requestAccounts"
                })
            } catch {
                ;[address] = await (owner as EthereumProvider).request({
                    method: "eth_accounts"
                })
            }
        }
        if (!address) {
            // For TS to be happy
            throw new Error("address is required")
        }
        walletClient = createWalletClient({
            account: address,
            transport: custom(owner as EthereumProvider)
        })
    }

    if (!walletClient) {
        walletClient = owner as WalletClient<
            Transport,
            Chain | undefined,
            Account
        >
    }

    return toAccount({
        address: walletClient.account.address,
        async signMessage({ message }) {
            return walletClient?.signMessage({ message }) as Promise<Hex>
        },
        async signTypedData(typedData) {
            return getAction(
                walletClient!,
                signTypedData,
                "signTypedData"
            )(typedData as any) as Promise<Hex>
        },
        async signTransaction(_) {
            throw new Error(
                "Smart account signer doesn't need to sign transactions"
            )
        }
    })
}
`;

try {
  fs.writeFileSync(targetPath, newContent, { encoding: 'utf8' });
  console.log(`Successfully updated: ${targetPath}`);
} catch (error) {
  console.error(`Failed to update file at ${targetPath}:`, error);
}
