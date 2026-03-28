using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTOs;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _db;

    public TasksController(AppDbContext db) { _db = db; }

    private int UserId =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tasks = await _db.Tasks
            .Include(t => t.Category)
            .Where(t => t.UserId == UserId)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
        return Ok(tasks);
        //return Ok(tasks.Select(t => new {
        //    t.Id,
        //    t.Title,
        //    t.Description,
        //    t.Priority,
        //    t.Deadline,
        //    Category = new
        //    {
        //        t.Category.Id,
        //        t.Category.Name,
        //        t.Category.Color
        //    }
        //}));
    }

    [HttpPost]
    public async Task<IActionResult> Create(TaskDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            Priority = dto.Priority,
            Deadline = dto.Deadline,
            CategoryId = dto.CategoryId,
            UserId = UserId
        };

        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();
        return Ok(task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TaskDto dto)
    {
        var task = await _db.Tasks
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == UserId);
        if (task is null) return NotFound();

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.Priority = dto.Priority;
        task.Deadline = dto.Deadline;
        task.CategoryId = dto.CategoryId;

        await _db.SaveChangesAsync();
        return Ok(task);
    }

    [HttpPatch("{id}/complete")]
    public async Task<IActionResult> MarkComplete(int id)
    {
        var task = await _db.Tasks
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == UserId);
        if (task is null) return NotFound();

        task.IsCompleted = !task.IsCompleted;
        await _db.SaveChangesAsync();
        return Ok(task);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var task = await _db.Tasks
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == UserId);
        if (task is null) return NotFound();

        _db.Tasks.Remove(task);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var cats = await _db.Categories
            .Where(c => c.UserId == UserId)
            .ToListAsync();
        return Ok(cats);
    }

    [HttpPost("categories")]
    public async Task<IActionResult> CreateCategory([FromBody] Category dto)
    {
        var cat = new Category
        {
            Name = dto.Name,
            Color = dto.Color,
            UserId = UserId
        };
        _db.Categories.Add(cat);
        await _db.SaveChangesAsync();
        return Ok(cat);
    }
}