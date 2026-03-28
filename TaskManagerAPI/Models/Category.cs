using System.Text.Json.Serialization;

namespace TaskManagerAPI.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = "#6366f1";
    public int UserId { get; set; }
    [JsonIgnore]
    public User? User { get; set; }

    [JsonIgnore] // 🔥 THIS FIXES YOUR ISSUE
    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();

}