using TaskManagerAPI.Models;

namespace TaskManagerAPI.DTOs;

public class TaskDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public Priority Priority { get; set; } = Priority.Medium;
    public DateTime? Deadline { get; set; }
    public int? CategoryId { get; set; }
}