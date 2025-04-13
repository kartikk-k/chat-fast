import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"

interface ModelSelectorProps {
    selectedModel: string
    onModelChange: (model: string) => void
  }
  
  function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
    const models = [
      // OpenAI Models
      { id: "gpt-4o", name: "OpenAI - GPT-4o", group: "OpenAI" },
      { id: "gpt-4-turbo", name: "OpenAI - GPT-4 Turbo", group: "OpenAI" },
      { id: "gpt-3.5-turbo", name: "OpenAI - GPT-3.5 Turbo", group: "OpenAI" },
  
      // xAI Models
      { id: "grok-3-beta", name: "xAI - Grok-3 Beta", group: "xAI" },
      { id: "grok-3-fast-beta", name: "xAI - Grok-3 Fast Beta", group: "xAI" },
      { id: "grok-3-mini-beta", name: "xAI - Grok-3 Mini Beta", group: "xAI" },
      { id: "grok-3-mini-fast-beta", name: "xAI - Grok-3 Mini Fast Beta", group: "xAI" },
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
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(groupedModels).map(([group, groupModels]) => (
            <div key={group}>
              <div className="px-2 py-1.5 text-sm font-semibold text-gray-500">{group}</div>
              {groupModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
              {group !== Object.keys(groupedModels).pop() && <div className="h-px bg-gray-200 my-1"></div>}
            </div>
          ))}
        </SelectContent>
      </Select>
    )
  }

  export default ModelSelector;