import React, { useRef } from 'react';

interface EditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ markdown, setMarkdown }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      
      const newValue = markdown.substring(0, start) + '  ' + markdown.substring(end);
      setMarkdown(newValue);
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
    
    // Auto close pairs for markdown syntax
    const pairs: Record<string, string> = {
      '(': ')',
      '[': ']',
      '{': '}',
      '*': '*',
      '_': '_',
      '`': '`'
    };
    
    const char = e.key;
    if (pairs[char]) {
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Only auto-complete if there's selected text or if we're not in the middle of a word
      if (start !== end || 
          start === textarea.value.length || 
          /\s/.test(textarea.value[start] || '')) {
        
        // If text is selected, wrap it with the pair
        if (start !== end) {
          e.preventDefault();
          const selectedText = textarea.value.substring(start, end);
          const newText = char + selectedText + pairs[char];
          
          const newValue = 
            textarea.value.substring(0, start) + 
            newText + 
            textarea.value.substring(end);
          
          setMarkdown(newValue);
          
          // Set selection after inserting the pair
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = start + 1;
              textareaRef.current.selectionEnd = end + 1;
            }
          }, 0);
        }
      }
    }
  };

  return (
    <div className="h-full bg-white">
      <textarea
        ref={textareaRef}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-full p-4 text-black bg-white resize-none focus:outline-none font-mono text-sm leading-relaxed overflow-y-auto"
        placeholder="Start writing your resume in Markdown..."
        spellCheck="false"
        data-gramm="false"
      />
    </div>
  );
};