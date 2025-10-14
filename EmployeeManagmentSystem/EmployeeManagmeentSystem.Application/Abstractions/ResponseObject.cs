
namespace EmployeeManagmeentSystem.Application.Abstractions
{
    public class ResponseObject<T>
    {
        public string Status { get; set; } = "200";
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
        public List<string> Errors { get; set; } = [];

        public ResponseObject() { }

        public ResponseObject(string status, string title, bool success, string message, T? data = default, List<string> errors = null!)
        {
            Status = status;
            IsSuccess = success;
            Message = message;
            Data = data;
            Errors = errors ?? new List<string>();
        }
    }
}