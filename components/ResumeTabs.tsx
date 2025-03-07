// ResumeTabs.tsx
import { MarkdownConfig } from "@/components/MarkdownConfig";
import { TemplateStyles } from "@/components/TemplateStyles";

interface ResumeTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  markdown: string;
  setMarkdown: (markdown: string) => void;
  template: string;
  fontFamily: string;
}

export  const ResumeTabs=({
  activeTab,
  setActiveTab,
  markdown,
  setMarkdown,
  template,
  fontFamily,
}: ResumeTabsProps) =>{
  const renderMarkdown = () => {
    return { __html: MarkdownConfig.md.render(markdown) };
  };

  return (
    <div className="mt-6">
      {/* Improved Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-6 py-2 font-medium text-sm transition-colors ${
            activeTab === "edit"
              ? "border-b-2 border-[#51523f] text[#6e6f59]"
              : "text-gray-600 hover:text-[#51523f]"
          }`}
          onClick={() => setActiveTab("edit")}
        >
          Edit
        </button>
        <button
          className={`px-6 py-2 font-medium text-sm transition-colors ${
            activeTab === "preview"
              ? "border-b-2 border-[#51523f] text[#6e6f59]"
              : "text-gray-600 hover:text-[#51523f]"
          }`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "edit" ? (
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[500px] p-4 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-[#51523f] focus:border-transparent resize-y font-mono text-sm"
            placeholder="Write your markdown here..."
          />
        ) : (
          <div className="bg-white  rounded-lg overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: TemplateStyles.getTemplateCSS(template, fontFamily) }} />
            <div className="resume-container p-6" dangerouslySetInnerHTML={renderMarkdown()} />
          </div>
        )}
      </div>
    </div>
  );
}