import { Component, OnInit } from '@angular/core';
import {Account} from '../list-accounts/list-accounts.component';
import {AccountListService} from '../services/account-list/account-list.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication/authenticationservice.service';
import {TransactionHistoryService} from '../services/transaction/transaction-history.service';
import {MatDialog} from '@angular/material/dialog';
import {DepositComponent} from '../deposit/deposit.component';
import {WithdrawComponent} from  '../withdraw/withdraw.component';
import {TransferComponent} from '../transfer/transfer.component';

export class AccountHist{

  constructor(public accountNumber: string,
              public balance: string,
              public transactions: TransactionHist[],
              private dialog: MatDialog) {
  }
}

export class TransactionHist {

  constructor(public transactionDescription: string,
              public transactionAmount: string,
              public transactionBalance: string,
              public transactionDate: string) {}

}

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  account: Account;
  url: string;
  numOfAccounts: number;
  urlMyAccount = 'https://unzipbank.herokuapp.com/myaccount';
  constructor(private router: Router, public listService: AccountListService,
              public accountService: TransactionHistoryService,
              private dialog: MatDialog,
              public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.getAllAccounts();
    this.url = this.router.url;
    this.getAccount(this.url);

  }

  private getAccount(url: string): void {
    this.accountService.fetchAccount(url).subscribe(account => {
        this.account = account;
        // console.log(account);
      }
    );
  }
// sorry kyle I needed to make this to test the html
  openDeposit(): void{
    this.dialog.open(DepositComponent);
    this.dialog.afterAllClosed.subscribe(() => this.getAccount(this.url));
   }

  openWithdraw(): void{
    this.dialog.open(WithdrawComponent);
    this.dialog.afterAllClosed.subscribe(() => this.getAccount(this.url));
  }

  openTransfer(): void{
    this.dialog.open(TransferComponent);
    this.dialog.afterAllClosed.subscribe(() => this.getAccount(this.url));
  }

  getAllAccounts()
  {
    this.listService.retrieveAllAccounts(this.urlMyAccount).subscribe(
      response => {
        // console.log(response);
        // @ts-ignore
        // this.accountsArray = response;
        this.numOfAccounts = response.length;}
    );
  }
}
