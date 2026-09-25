export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Pastikan format pesan bersih (hanya role dan content string)
    const sanitizedMessages = (messages || []).map((m) => ({
      role: m.role === 'user' ? 'user' : m.role === 'system' ? 'system' : 'assistant',
      content: String(m.content || ''),
    }));

    const apiKey = process.env.OPENROUTER_API_KEY || process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: { message: "OPENROUTER_API_KEY environment variable is not configured." } }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Meida Agent",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Model pilihan (bisa ganti sesuai kebutuhan, misal: "openai/gpt-4o-mini" atau "meta-llama/llama-3.3-70b-instruct:free")
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: sanitizedMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API Error:", errorText);
      return new Response(errorText, { status: response.status });
    }

    // Return the readable stream directly to the client
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(error.message, { status: 500 });
  }
}
