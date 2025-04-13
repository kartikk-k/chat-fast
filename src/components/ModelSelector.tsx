import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "./ui/select"

interface ModelSelectorProps {
    selectedModel: string
    onModelChange: (model: string) => void
}

function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
    const models = [
        // OpenAI Models
        { id: "gpt-4o", name: "OpenAI - GPT-4o", group: "OpenAI" },
        { id: "gpt-4o-mini", name: "OpenAI - GPT-4o-mini", group: "OpenAI" },
        // { id: "gpt-3.5-turbo", name: "OpenAI - GPT-3.5 Turbo", group: "OpenAI" },

        // xAI Models
        // { id: "grok-3-beta", name: "xAI - Grok-3 Beta", group: "xAI" },
        // { id: "grok-3-fast-beta", name: "xAI - Grok-3 Fast Beta", group: "xAI" },
        // { id: "grok-3-mini-beta", name: "xAI - Grok-3 Mini Beta", group: "xAI" },
        // { id: "grok-3-mini-fast-beta", name: "xAI - Grok-3 Mini Fast Beta", group: "xAI" },
    ]

    // Group models by provider
    const groupedModels = models.reduce(
        (acc, model) => {
            if (!acc[model.group]) {
                acc[model.group] = []
            }
            acc[model.group].push(model)
            return acc
        },
        {} as Record<string, typeof models>,
    )

    return (
        <Select onValueChange={onModelChange} defaultValue={selectedModel || "gpt-4o-mini"}>
            <SelectTrigger className="w-[200px] bg-secondary border-none" defaultValue={selectedModel}>
                <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent className="relative float-end bg-white">
                {Object.keys(groupedModels).map((group) => (
                    <SelectGroup key={group}>
                        {groupedModels[group].map((model) => (
                            <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
        </Select>
    )
}

export default ModelSelector;