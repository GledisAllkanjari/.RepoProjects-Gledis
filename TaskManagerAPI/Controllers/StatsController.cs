using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StatsController : ControllerBase
{
    private readonly AppDbContext _db;

    public StatsController(AppDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> GetStats()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var tasks = await _db.Tasks.Where(t => t.UserId == userId).ToListAsync();

        var now = DateTime.UtcNow;

        return Ok(new
        {
            Total = tasks.Count,
            Completed = tasks.Count(t => t.IsCompleted),
            Pending = tasks.Count(t => !t.IsCompleted),
            Overdue = tasks.Count(t => !t.IsCompleted && t.Deadline.HasValue && t.Deadline < now),
            HighPriority = tasks.Count(t => t.Priority == Priority.High && !t.IsCompleted),
            CompletionRate = tasks.Count == 0 ? 0 : (int)((double)tasks.Count(t => t.IsCompleted) / tasks.Count * 100),
            ByPriority = new
            {
                Low = tasks.Count(t => t.Priority == Priority.Low),
                Medium = tasks.Count(t => t.Priority == Priority.Medium),
                High = tasks.Count(t => t.Priority == Priority.High)
            }
        });
    }
}