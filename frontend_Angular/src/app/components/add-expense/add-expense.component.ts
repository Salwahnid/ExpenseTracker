import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {
  expenses: Expense[] = [];
  expenseForm: FormGroup;

  constructor(private expenseService: ExpenseService, private fb: FormBuilder,    private router: Router) {
    // Initialisation du formulaire avec des validations
    this.expenseForm = this.fb.group({
      Amount: ['', [Validators.required, Validators.min(1)]], // Validation : montant requis et supérieur à 0
      Description: ['', [Validators.required]], // Validation : description requise
      Category: ['', [Validators.required]], // Validation : catégorie requise
    });
  }






  // Méthode pour envoyer le formulaire
  addExpense(): void {
    if (this.expenseForm.valid) {
      const newExpense: Expense = this.expenseForm.value;
      console.log('Adding expense:', newExpense);
      this.expenseService.addExpense(newExpense).subscribe((response) => {
        console.log('Expense added:', response);
        this.expenseForm.reset(); // Réinitialiser le formulaire
        this.router.navigate([``]).then();
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
