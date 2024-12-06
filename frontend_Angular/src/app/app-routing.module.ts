import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpenseListComponent} from "./components/expense-list/expense-list.component";
import {AddExpenseComponent} from "./components/add-expense/add-expense.component";
import {SetBudgetComponent} from "./components/set-budget/set-budget.component";

const routes: Routes = [
  {
    path : '',
    component: ExpenseListComponent,

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
