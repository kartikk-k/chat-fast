"use client"

import {
  Message,
  MessageAction,
  MessageActions,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message"
import { Button } from "@/components/ui/button"
import { Copy, ThumbsDown, ThumbsUp } from "lucide-react"
import { useState } from "react"
import { ResponseStream, useTextStream } from "./ui/response-stream"

interface MessageWithActionsProps {
  content: string;
  role: "user" | "assistant" | "system" | "data";
}

function MessageWithActions({ content, role }: MessageWithActionsProps) {
  const [liked, setLiked] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }


  return (
    <div className="flex flex-col gap-8">
      <Message className={role === "user" ? "self-end mt-16 py-2 px-4 bg-secondary rounded-xl" : "self-start mt-4 leading-loose"}>
        {role === "assistant" && <MessageAvatar src="/avatars/ai.png" alt="AI" fallback="AI" className="size-7 text-xs" />}
        <div className="flex w-full flex-col gap-2">
          <MessageContent markdown className="bg-transparent p-0">
            {/* {displayedText} */}
            {content}
          </MessageContent>

          {role === "assistant" && content?.trim() && (
            <MessageActions className="self-start">
              <MessageAction tooltip="Copy to clipboard">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={handleCopy}
                >
                  <Copy className={`size-4 ${copied ? "" : ""}`} />
                </Button>
              </MessageAction>

              <MessageAction tooltip="Helpful">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-full ${liked === true ? "" : ""}`}
                  onClick={() => setLiked(true)}
                >
                  <ThumbsUp className="size-4" />
                </Button>
              </MessageAction>

              <MessageAction tooltip="Not helpful">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-full ${liked === false ? "" : ""}`}
                  onClick={() => setLiked(false)}
                >
                  <ThumbsDown className="size-4" />
                </Button>
              </MessageAction>
            </MessageActions>
          )}
        </div>
      </Message>
    </div>
  )
}

export default MessageWithActions;
