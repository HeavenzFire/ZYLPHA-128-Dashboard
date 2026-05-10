import { AuditLog } from '../components/AuditTrail';

/**
 * Pseudo-implementation of the SHA-256 hashing for the Ledger.
 * In production, this would use SubtleCrypto or a library like 'crypto-js'.
 */
export async function generateHash(data: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export interface LedgerBlock {
  index: number;
  timestamp: string;
  payload: any;
  previousHash: string;
  hash: string;
}

export class ImmutableLedger {
  private chain: LedgerBlock[] = [];

  constructor(genesisPayload: any) {
    this.initialize(genesisPayload);
  }

  private async initialize(genesisPayload: any) {
    const hash = await generateHash(JSON.stringify(genesisPayload) + '0');
    this.chain.push({
      index: 0,
      timestamp: new Date().toISOString(),
      payload: genesisPayload,
      previousHash: '0',
      hash
    });
  }

  async addBlock(payload: any): Promise<LedgerBlock> {
    const previousBlock = this.chain[this.chain.length - 1];
    const index = previousBlock.index + 1;
    const timestamp = new Date().toISOString();
    const previousHash = previousBlock.hash;
    const hash = await generateHash(JSON.stringify(payload) + index + timestamp + previousHash);
    
    const newBlock = { index, timestamp, payload, previousHash, hash };
    this.chain.push(newBlock);
    return newBlock;
  }

  getChain() {
    return [...this.chain].reverse();
  }
}

/**
 * W3C DID / VC Schema Definitions (Simplified)
 */
export interface VerifiableCredential {
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: {
    id: string; // The DID
    status: string;
    jurisdiction: string;
    meta: any;
  };
  proof: {
    type: string;
    created: string;
    proofPurpose: string;
    verificationMethod: string;
    jws: string;
  };
}
