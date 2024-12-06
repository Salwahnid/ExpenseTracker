import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from "../../services/budget.service";
import { ExpenseService } from "../../services/expense.service";
import { Expense } from "../../models/expense.model";

@Component({
  selector: 'app-set-budget',
  templateUrl: './set-budget.component.html',
  styleUrls: ['./set-budget.component.css']
})
export class SetBudgetComponent implements OnInit {
  budgetForm!: FormGroup;
  expenses: Expense[] = [];
  months = [
    { value: '01', label: 'Janvier' },
    { value: '02', label: 'Février' },
    { value: '03', label: 'Mars' },
    { value: '04', label: 'Avril' },
    { value: '05', label: 'Mai' },
    { value: '06', label: 'Juin' },
    { value: '07', label: 'Juillet' },
    { value: '08', label: 'Août' },
    { value: '09', label: 'Septembre' },
    { value: '10', label: 'Octobre' },
    { value: '11', label: 'Novembre' },
    { value: '12', label: 'Décembre' }
  ];

  totalBudget: number = 0;
  totalExpenses: number = 0;

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private expenseService: ExpenseService // Injection du service des dépenses
  ) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    // Initialisation du formulaire réactif
    this.budgetForm = this.fb.group({
      totalBudget: [null, [Validators.required, Validators.min(1)]],
      currentMonth: [null, Validators.required],
      currentYear: [currentYear, Validators.required],
      totalExpanse: [0, Validators.required] // Initialisé à 0, mis à jour dynamiquement
    });




    // Charger les données pour le mois courant
    this.loadCurrentMonthBudget();
    this.calculateTotalExpenses();
  }

  // Charger les données du budget pour le mois courant
  loadCurrentMonthBudget(): void {
    this.budgetService.getBudgetForCurrentMonth().subscribe({
      next: (budget) => {
        this.totalBudget = budget.totalBudget;
        this.budgetForm.patchValue({ totalBudget: this.totalBudget });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du budget mensuel :', err);
      }
    });
  }



  // Calculer le total des dépenses
  calculateTotalExpenses(): void {
    this.expenseService.getTotalExpenses().subscribe({
      next: (total) => {
        this.totalExpenses = total;
        this.budgetForm.patchValue({ totalExpanse: this.totalExpenses });
      },
      error: (err) => {
        console.error('Erreur lors du calcul des dépenses totales :', err);
      }
    });
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.budgetForm.valid) {
      const budgetData = this.budgetForm.value;
      this.budgetService.addBudget(budgetData).subscribe({
        next: (response) => {
          console.log('Budget ajouté avec succès :', response);
          this.budgetService.updateBudget(); // Mettre à jour le BehaviorSubject
        },
        error: (err) => {
          console.error('Erreur lors de l’ajout du budget :', err);
        }
      });
    }
  }


}
