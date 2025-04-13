import { openai } from "@ai-sdk/openai"
import { xai } from "@ai-sdk/xai"
import { streamText, smoothStream } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
    const { messages, model } = await req.json()

    // Default to gpt-4o if no model is specified
    const selectedModel = model || "gpt-4o"

    // Determine which provider to use based on the model name
    let modelProvider
    if (selectedModel.startsWith("grok")) {
        modelProvider = xai(selectedModel)
    } else {
        modelProvider = openai(selectedModel)
    }

    const result = streamText({
        model: modelProvider,
        messages,
        experimental_transform: smoothStream({
            delayInMs: 20,
            chunking: 'line'
        })
    })

    return result.toDataStreamResponse()
}
