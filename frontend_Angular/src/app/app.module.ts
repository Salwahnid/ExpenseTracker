import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {ExpenseListComponent} from "./components/expense-list/expense-list.component";
import {AddExpenseComponent} from "./components/add-expense/add-expense.component";
import {SetBudgetComponent} from "./components/set-budget/set-budget.component";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    ExpenseListComponent,
    AddExpenseComponent,
    SetBudgetComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // Ajoutez cette ligne
    ToastrModule.forRoot(),


  ],
  providers: [
    provideHttpClient(withFetch())




  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

