using System;
using System.Configuration;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Runtime.Caching;

namespace Dynamic_Site_Server_Instance.Controllers
{
    /// <summary>
    /// API endpoints for AI Assists features.
    /// Plumbed for LLM integration — replace TODO sections with actual service calls.
    ///
    /// Configuration (Web.config appSettings):
    ///   AIAssists.Enabled       = "true"
    ///   AIAssists.ApiEndpoint   = "https://api.anthropic.com/v1/messages" (or your proxy)
    ///   AIAssists.ApiKey        = "sk-..."
    ///   AIAssists.Model         = "claude-sonnet-4-20250514"
    ///   AIAssists.CacheDuration = "3600" (seconds)
    /// </summary>
    public class AIAssistsController : Controller
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        private static readonly MemoryCache _cache = MemoryCache.Default;

        private bool IsEnabled => ConfigurationManager.AppSettings["AIAssists.Enabled"] == "true";
        private string ApiEndpoint => ConfigurationManager.AppSettings["AIAssists.ApiEndpoint"] ?? "";
        private string ApiKey => ConfigurationManager.AppSettings["AIAssists.ApiKey"] ?? "";
        private string Model => ConfigurationManager.AppSettings["AIAssists.Model"] ?? "claude-sonnet-4-20250514";
        private int CacheDuration => int.TryParse(ConfigurationManager.AppSettings["AIAssists.CacheDuration"], out int d) ? d : 3600;

        // ── Summary ──────────────────────────────────────────────

        [HttpPost]
        [Route("api/ai-assists/summary")]
        public async Task<ActionResult> Summary(string pageId, string content)
        {
            if (!IsEnabled)
                return Json(new { error = "AI Assists is not enabled" });

            if (string.IsNullOrWhiteSpace(content))
                return Json(new { error = "No content provided" });

            // Check cache
            var cacheKey = "ai-summary-" + (pageId ?? content.GetHashCode().ToString());
            var cached = _cache.Get(cacheKey) as string;
            if (cached != null)
                return Json(new { summary = cached, cached = true });

            // TODO: Replace with actual LLM call or Ingeniux AI Summary service
            // var summary = await CallLLM(
            //     "You are a technical documentation assistant. Summarize this article in 2-3 sentences.",
            //     content
            // );
            var summary = "AI summary will appear here when the LLM service is connected.";

            // Cache the result
            _cache.Set(cacheKey, summary, DateTimeOffset.Now.AddSeconds(CacheDuration));

            return Json(new { summary, cached = false });
        }

        // ── Code Explain ─────────────────────────────────────────

        [HttpPost]
        [Route("api/ai-assists/explain")]
        public async Task<ActionResult> Explain(string code, string language)
        {
            if (!IsEnabled)
                return Json(new { error = "AI Assists is not enabled" });

            if (string.IsNullOrWhiteSpace(code))
                return Json(new { error = "No code provided" });

            // Check cache
            var cacheKey = "ai-explain-" + code.GetHashCode();
            var cached = _cache.Get(cacheKey) as string;
            if (cached != null)
                return Json(new { explanation = cached, cached = true });

            // TODO: Replace with actual LLM call
            // var explanation = await CallLLM(
            //     $"Explain this {language ?? "code"} code clearly and concisely for a developer audience.",
            //     code
            // );
            var explanation = "Code explanation will appear here when the LLM service is connected.";

            _cache.Set(cacheKey, explanation, DateTimeOffset.Now.AddSeconds(CacheDuration));

            return Json(new { explanation, cached = false });
        }

        // ── Chat ─────────────────────────────────────────────────

        [HttpPost]
        [Route("api/ai-assists/chat")]
        public async Task<ActionResult> Chat(string message, string pageContent, string pageTitle)
        {
            if (!IsEnabled)
                return Json(new { error = "AI Assists is not enabled" });

            if (string.IsNullOrWhiteSpace(message))
                return Json(new { error = "No message provided" });

            // No caching for chat — each message is unique

            // TODO: Replace with actual LLM call with page context
            // var systemPrompt = $"You are a helpful documentation assistant. " +
            //     $"The user is reading '{pageTitle}'. Use the following page content as context:\n\n{pageContent}";
            // var response = await CallLLM(systemPrompt, message);
            var response = "Chat responses will appear here when the LLM service is connected.";

            return Json(new { response });
        }

        // ── Health / Status ──────────────────────────────────────

        [HttpGet]
        [Route("api/ai-assists/status")]
        public ActionResult Status()
        {
            return Json(new
            {
                enabled = IsEnabled,
                hasApiKey = !string.IsNullOrEmpty(ApiKey),
                model = IsEnabled ? Model : null,
                cacheEntries = _cache.GetCount()
            }, JsonRequestBehavior.AllowGet);
        }

        // ── LLM Client (uncomment when ready to connect) ────────

        // private async Task<string> CallLLM(string systemPrompt, string userContent)
        // {
        //     var requestBody = new
        //     {
        //         model = Model,
        //         max_tokens = 1024,
        //         messages = new[]
        //         {
        //             new { role = "user", content = userContent }
        //         },
        //         system = systemPrompt
        //     };
        //
        //     var json = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);
        //     var request = new HttpRequestMessage(HttpMethod.Post, ApiEndpoint);
        //     request.Headers.Add("x-api-key", ApiKey);
        //     request.Headers.Add("anthropic-version", "2023-06-01");
        //     request.Content = new StringContent(json, Encoding.UTF8, "application/json");
        //
        //     var response = await _httpClient.SendAsync(request);
        //     var responseBody = await response.Content.ReadAsStringAsync();
        //
        //     if (!response.IsSuccessStatusCode)
        //         throw new Exception($"LLM API error: {response.StatusCode} - {responseBody}");
        //
        //     dynamic result = Newtonsoft.Json.JsonConvert.DeserializeObject(responseBody);
        //     return result.content[0].text;
        // }
    }
}
