import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Expense} from "../models/expense.model";

@Injectable({
  providedIn: 'root' // Le service est disponible dans toute l'application
})
export class ExpenseService {
  private baseUrl = 'http://localhost:5045/api/expenses'; // URL du backend

  constructor(private http: HttpClient) {}



  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  addExpense(expense: Expense): Observable<any> {
    return this.http.post(this.baseUrl, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getExpenseById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }


  updateExpense(id: number, updatedExpense: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedExpense);
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // patient error
      errorMessage = `Error : ${error.error.message}`;
    } else {
      // server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getTotalExpenses(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total`);

  }

}
