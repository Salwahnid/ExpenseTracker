import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Budget} from "../models/budget.model";

// Modèle pour le budget


@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private baseUrl = 'http://localhost:5045/api/budget'; // URL de l'API backend
  private budgetSource = new BehaviorSubject<any>(null); // Stocke le budget actuel
  currentBudget$ = this.budgetSource.asObservable();

  constructor(private http: HttpClient) {}

  // Ajouter un nouveau budget
  addBudget(budget: Budget): Observable<Budget> {
    console.log("je suis service add",budget)
    return this.http.post<Budget>(this.baseUrl, budget);
  }

  getBudgetForCurrentMonth(): Observable<Budget> {
    const currentMonth = new Date().getMonth() + 1; // Mois courant (base 1)
    const currentYear = new Date().getFullYear(); // Année courante
    const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

    return this.http.get<Budget>(
      `${this.baseUrl}/${formattedMonth}/${currentYear}`
    );
  }


  // Modifier un budget existant
  updateBudget(): void {
    this.getBudgetForCurrentMonth().subscribe((budget) => {
      this.budgetSource.next(budget); // Met à jour les données
    });
  }

  // Récupérer le budget d'un mois spécifique
  getBudget(month: string): Observable<Budget> {
    return this.http.get<Budget>(`${this.baseUrl}/${month}`);
  }
}
