using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private static List<Expense> expenses = new List<Expense>();
    private static Budget budget = new Budget { MonthlyLimit = 1000, TotalExpenses = 0, Month = DateTime.Now };

    [HttpGet("GetAll")]
    public IActionResult GetAllExpenses()
    {
        return Ok(expenses);
    }

    [HttpPost("Add")]
    public IActionResult AddExpense([FromBody] Expense expense)
    {
        expenses.Add(expense);
        budget.TotalExpenses += expense.Amount;

        if (budget.TotalExpenses > budget.MonthlyLimit)
        {
            return Ok(new { message = "Warning: Monthly budget exceeded!" });
        }

        return Ok(expense);
    }

    [HttpDelete("Delete/{id}")]
    public IActionResult DeleteExpense(int id)
    {
        var expense = expenses.FirstOrDefault(e => e.Id == id);
        if (expense == null)
        {
            return NotFound("Expense not found");
        }

        expenses.Remove(expense);
        budget.TotalExpenses -= expense.Amount;
        return Ok(expense);
    }

    [HttpGet("Budget")]
    public IActionResult GetBudget()
    {
        return Ok(budget);
    }

    [HttpPut("SetBudget")]
    public IActionResult SetBudget([FromBody] decimal newLimit)
    {
        budget.MonthlyLimit = newLimit;
        return Ok(budget);
    }
}
