// ToolbarPlugin.tsx
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  FORMAT_TEXT_COMMAND,
} from 'lexical'
import React from 'react'

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext()

  return (
    <div className="flex gap-2">
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className="px-3 py-1 border rounded hover:bg-gray-100 font-bold"
      >
        B
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className="px-3 py-1 border rounded hover:bg-gray-100 italic"
      >
        I
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        className="px-3 py-1 border rounded hover:bg-gray-100 underline"
      >
        U
      </button>
    </div>
  )
}

export default ToolbarPlugin
