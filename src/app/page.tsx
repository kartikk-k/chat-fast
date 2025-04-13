"use client"

import { useChat } from "@ai-sdk/react"
import { useRef, useState } from "react"
import PromptInputWithActions from "@/components/Input"
import MessageWithActions from "@/components/MessageWithActions"
import { Loader } from "@/components/ui/loader"
import { ChatContainer } from "@/components/ui/chat-container"
import Link from "next/link"
import { ScrollButton } from "@/components/ui/scroll-button"
import { LinearBlur } from "progressive-blur";
import ModelSelector from "@/components/ModelSelector"
import { Plus } from "lucide-react"


export default function Chat() {

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini")

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    body: {
      model: selectedModel,
    },
  })

  return (
    <div className="flex flex-col items-center h-[100dvh]">
      <div className="w-full flex flex-col h-full">

        <div className="p-4 relative z-10">
          <div className="flex items-center justify-between relative z-10">
            {/* <Link href="/" className="bg-secondary rounded-md p-2 px-3 text-sm font-medium">
              <h1>Minimal AI Chat</h1>
            </Link> */}
            <div>
              {/* <ModelSelector
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              /> */}
            </div>
            <button onClick={() => setMessages([])} className="">
              <Plus className="size-5 opacity-70" />
            </button>
          </div>
          {/* <LinearBlur
            className="absolute top-0 left-0 w-full h-32"
            side="top"
          /> */}
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4 h-full">
          {messages.length === 0 && (
            <div className="flex justify-center h-full opacity-50 mt-20">
              <p>Start a conversation with the AI</p>
            </div>
          )}

          <ChatContainer ref={chatContainerRef} autoScroll={true} className="h-screen text-[15px] fixed top-0 left-0 w-full p-4 pb-[400px] pt-16">
            {messages.map((message) => (
              <MessageWithActions
                key={message.id}
                content={message.content}
                role={message.role}
              />
            ))}
          </ChatContainer>

          {isLoading && (
            <div className="flex w-full justify-center fixed bottom-28">
              <Loader variant="text-shimmer" text="Thinking..." />
            </div>
          )}

          <ScrollButton
            containerRef={chatContainerRef}
            scrollRef={chatContainerRef}
            threshold={0.5}
            className="fixed bottom-36 right-6"
          />

        </div>

        <div className="p-4 fixed bottom-0 w-full overflow-visible">
          <LinearBlur
            className="absolute bottom-0 left-0 w-full h-44"
            // Same props as RadialBlur, but with an additional side prop that specifies the direction of the gradient and the transform origin so it's easy to scale in the right direction. Default is "top".
            side="bottom"
          />
          <form onSubmit={handleSubmit} className="flex w-full space-x-2 rounded-3xl relative z-10">
            <PromptInputWithActions
              value={input}
              onValueChange={handleInputChange}
              isLoading={isLoading}
              onSubmit={handleSubmit}
            />
          </form>
        </div>

      </div>
    </div>
  )
}

