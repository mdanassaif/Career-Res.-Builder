// Home.tsx
import { useState } from "react";
import { toast } from "sonner";
import {ResumeHeader} from "@/components/ResumeHeader";
import {ResumeTabs} from "@/components/ResumeTabs";
import { MarkdownConfig } from "@/components/MarkdownConfig";
import { TemplateStyles } from "@/components/TemplateStyles";

export default function Home() {
  const [markdown, setMarkdown] = useState<string>(MarkdownConfig.defaultMarkdown);
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [template, setTemplate] = useState<string>("modern");
  const [fontFamily, setFontFamily] = useState<string>("Roboto");

  const handleExport = () => {
    const printWindow = window.open("", "_blank", "width=800,height=1000");
    if (!printWindow) return toast.error("Pop-ups blocked");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Anas Saif - Resume</title>
        ${TemplateStyles.getTemplateCSS(template, fontFamily, true)}
        <style>
          @media print {
            @page {
              size: A4;
              margin: 0; /* Remove default margins */
              padding-bottom : 20px;
               padding-top : 20px;
            }
            body {
              margin: 0;
              padding: 0;
            }
            /* Attempt to hide headers/footers */
            header, footer, .print-header, .print-footer {
              display: none !important;
            }
          }
        </style>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(() => window.close(), 100);
          }
        </script>
      </head>
      <body>
        <div class="resume-container">
          ${MarkdownConfig.md.render(markdown)}
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    toast.success("PDF exported! Tip: Disable 'Headers and Footers' in print dialog if visible.");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <ResumeHeader
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          template={template}
          setTemplate={setTemplate}
          onExport={handleExport}
        />
        <ResumeTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          markdown={markdown}
          setMarkdown={setMarkdown}
          template={template}
          fontFamily={fontFamily}
        />
      </main>
    </div>
  );
}