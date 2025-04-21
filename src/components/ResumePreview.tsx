import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { resumeThemes } from '../lib/resumeThemes';

interface ResumePreviewProps {
  markdown: string;
  theme: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ markdown, theme }) => {
  const themeStyles = resumeThemes[theme as keyof typeof resumeThemes] || resumeThemes.modern;
  
  return (
    <div 
      id="resume-preview" 
      className="h-full w-full bg-white overflow-y-auto"
    >
      <div 
        className={`mx-auto resume-content first-page-content`}
        style={{ 
          fontSize: '11px', // Increased from 10px for better readability
          lineHeight: '1.4', // Increased from 1.15 for better readability
          maxWidth: '7.5in',
          padding: '0.75in',
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="h-full"
          components={{
            h1: ({ children }) => (
              <h1 className={`text-[16px] font-bold ${themeStyles.headingColor} mb-4 page-break-inside-avoid text-center`}>
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className={`text-[14px] font-semibold ${themeStyles.headingColor} ${themeStyles.headerStyle} mt-6 mb-3 page-break-inside-avoid`}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className={`text-[12px] font-medium ${themeStyles.subheadingColor} mb-2 page-break-inside-avoid`}>
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className={`text-[11px] font-medium ${themeStyles.subheadingColor} mb-1.5 page-break-inside-avoid`}>
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className={`${themeStyles.textColor} mb-2 text-[11px] leading-[1.4] page-break-inside-avoid`}>
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className={`list-disc pl-5 mb-3 ${themeStyles.textColor} text-[11px] leading-[1.4] page-break-inside-avoid`}>
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className={`list-decimal pl-5 mb-3 ${themeStyles.textColor} text-[11px] leading-[1.4] page-break-inside-avoid`}>
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="mb-1 page-break-inside-avoid">{children}</li>
            ),
            a: ({ href, children }) => (
              <a 
                href={href} 
                className={`${themeStyles.linkColor} hover:underline`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className={`border-l-2 ${themeStyles.dividerColor} pl-3 italic mb-3 text-[11px] page-break-inside-avoid`}>
                {children}
              </blockquote>
            ),
            hr: () => (
              <hr className={`my-4 border-t ${themeStyles.dividerColor}`} />
            ),
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            code: ({ children }) => (
              <code className="bg-gray-100 px-1 rounded text-[11px]">{children}</code>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};