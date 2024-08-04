import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { createClient, encryption, IClient, newSignatureProvider } from 'postchain-client';
import { environment } from '../../environments/environment';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class ChrClientService {
  private readonly privKey = Buffer.from(environment.blockchain.privKey, 'hex');
  private readonly adminKeyPair = encryption.makeKeyPair(this.privKey);
  public readonly adminSignatureProvider = newSignatureProvider(this.adminKeyPair);

  private clientSubject: BehaviorSubject<IClient | null> = new BehaviorSubject<IClient | null>(null);

  constructor() {
    this.initializeClient();
  }

  private async initializeClient() {
    try {
      const client = await createClient({
        nodeUrlPool: environment.blockchain.nodeUrlPool,
        blockchainRid: environment.blockchain.blockchainRID,
      });
      this.clientSubject.next(client);
    } catch (error) {
      console.error('Failed to initialize client:', error);
      this.clientSubject.error(error);
    }
  }

  getClient(): Observable<IClient> {
    return this.clientSubject.asObservable().pipe(
      switchMap(client => {
        if (client) {
          return from(Promise.resolve(client));
        } else {
          throw new Error('Client is not initialized');
        }
      }),
      catchError(error => {
        console.error('Error fetching client:', error);
        throw error;
      })
    );
  }
}
