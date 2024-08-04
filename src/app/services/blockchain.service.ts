import { Injectable } from '@angular/core';
import { ChrClientService } from './chr-client.service';
import { encryption, newSignatureProvider } from 'postchain-client';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  private readonly privKey = Buffer.from('bbb', 'hex');
  private readonly adminKeyPair = encryption.makeKeyPair(this.privKey);
  private readonly adminSignatureProvider = newSignatureProvider(this.adminKeyPair);

  constructor(private chrClientService: ChrClientService) {}

  createBook(isbn: string, title: string, author: string) {
    return this.chrClientService.getClient().pipe(
      switchMap(client =>
        client.signAndSendUniqueTransaction(
          { name: 'create_book', args: [isbn, title, author] },
          this.adminSignatureProvider
        )
      )
    );
  }
}

type Book = {
  isbn: string;
  title: string;
  author: string;
}

type BookReview = {
  book: Book;
  reviewer_name: string;
}

type TxOp = {
  op_name: string;
  op_args: any[];
}

type TxBody = {
  tx_rid: Buffer;
  ops: TxOp[];
  signers: Buffer[];
}

type Tx = {
  tx_body: TxBody;
  signatures: Buffer[];
}
