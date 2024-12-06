import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ExpenseService} from "../../services/expense.service";
import {Expense} from "../../models/expense.model";
import {Router} from "@angular/router";
import {BudgetService} from "../../services/budget.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-expenses',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent implements OnInit {
  totalExpenses: number = 0; // Total des dépenses
  totalBudget: number = 0; // Budget total
  categories: any[] = []; // Liste des catégories avec dépenses
  expenses : Expense[] = [] ;

  constructor(private http: HttpClient,private expenseService: ExpenseService,    private router: Router,private budgetService :BudgetService,
              private toastr: ToastrService ) {}


 ngOnInit(): void {
   this.loadExpenses();
   this.budgetService.currentBudget$.subscribe((budget) => {
     if (budget) {
       this.totalBudget = budget.totalBudget;
     }
   });

   // Charger les données initiales si nécessaire
   this.budgetService.updateBudget();
    this.getTotalExpenses();
    this.loadTotalExpenses();

 }


  // Charger les dépenses et les regrouper par catégorie
  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe((data) => {
      const categoryMap: { [key: string]: any } = {};

      // Regrouper les dépenses par catégorie
      data.forEach((expense) => {
        if (!categoryMap[expense.Category]) {
          categoryMap[expense.Category] = {
            name: expense.Category,
            total: 0,
            items: [],
          };
        }
        categoryMap[expense.Category].total += expense.Amount;
        categoryMap[expense.Category].items.push(expense);
      });

      // Transformer le map en tableau
      this.categories = Object.values(categoryMap);

    });
  }

  loadTotalExpenses(): void {
    this.expenseService.getTotalExpenses().subscribe({
      next: (data) => {
        this.totalExpenses = data; // Stocke le total des dépenses
        console.log('Total expenses:', this.totalExpenses); // Affiche le total dans la console

        // Vérifiez si les dépenses dépassent le budget
        if (this.totalExpenses > this.totalBudget) {
          this.showBudgetAlert(); // Affiche une alerte si le budget est dépassé
        }
      },
      error: (error) => {
        console.error('Error fetching total expenses:', error); // Gestion des erreurs
      },
    });
  }
  showBudgetAlert(): void {
    this.toastr.warning('Les dépenses ont dépassé le budget prévu!', 'Alerte Budget', {
      closeButton: true, // Bouton pour fermer l'alerte
      progressBar: true, // Barre de progression
      timeOut: 5000, // Durée avant que l'alerte disparaisse
    });
  }


  deleteExpense(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
      this.expenseService.deleteExpense(id) .subscribe({
        next: () => {
          // Met à jour la liste en supprimant la ligne localement
          this.expenses = this.expenses.filter(expense => expense.Id !== id);
          this.router.navigate([``]).then();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression :', error);
        }
      });
    }
  }

  getTotalExpenses(): void {
    this.expenseService.getTotalExpenses().subscribe({
    next: (data) => {
      this.totalExpenses = data; // Stocke le total des dépenses
      console.log('Total expenses:', this.totalExpenses); // Affiche le total dans la console
    },
    error: (error) => {
      console.error('Error fetching total expenses:', error); // Gestion des erreurs
    },
  });

  }









  showAddExpenseModal = false;
  showManageBudgetModal = false;

  openAddExpenseModal() {
    if(this.showManageBudgetModal == true){
      this.closeManageBudgetModal();
    }
    this.showAddExpenseModal = true;
  }

  closeAddExpeseModal() {
    this.showAddExpenseModal = false;
  }
  openManageBudgetModal() {
    if(this.showAddExpenseModal == true){
      this.closeAddExpeseModal();
    }
    this.showManageBudgetModal = true;
  }

  closeManageBudgetModal() {
    this.showManageBudgetModal = false;
  }

}
