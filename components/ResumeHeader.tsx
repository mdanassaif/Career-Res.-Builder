import { FileText, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

interface ResumeHeaderProps {
  fontFamily: string;
  setFontFamily: (value: string) => void;
  template: string;
  setTemplate: (value: string) => void;
  onExport: () => void;
}

export const ResumeHeader = ({
  fontFamily,
  setFontFamily,
  template,
  setTemplate,
  onExport,
}: ResumeHeaderProps) => {
  const fonts = ["Roboto", "Arial", "Lora", "Open Sans", "Georgia"];
  const templates = ["modern", "classic", "minimal"];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <div className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16"><path fill="#6e6f59" d="M8 4.5A1.25 1.25 0 1 0 8 2a1.25 1.25 0 0 0 0 2.5"/><path fill="#6e6f59" d="M8 4.5c.597 0 1.13.382 1.32.949l.087.26a.22.22 0 0 1-.21.291h-2.39a.222.222 0 0 1-.21-.291l.087-.26a1.39 1.39 0 0 1 1.32-.949zm-3 4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m.5 1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/><path fill="#6e6f59" fill-rule="evenodd" d="M2.33 1.64c-.327.642-.327 1.48-.327 3.16v6.4c0 1.68 0 2.52.327 3.16a3.02 3.02 0 0 0 1.31 1.31c.642.327 1.48.327 3.16.327h2.4c1.68 0 2.52 0 3.16-.327a3 3 0 0 0 1.31-1.31c.327-.642.327-1.48.327-3.16V4.8c0-1.68 0-2.52-.327-3.16A3 3 0 0 0 12.36.33C11.718.003 10.88.003 9.2.003H6.8c-1.68 0-2.52 0-3.16.327a3.02 3.02 0 0 0-1.31 1.31m6.87-.638H6.8c-.857 0-1.44 0-1.89.038c-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819c-.037.45-.038 1.03-.038 1.89v6.4c0 .857.001 1.44.038 1.89c.036.438.101.663.18.819c.192.376.498.682.874.874c.156.08.381.145.819.18c.45.036 1.03.037 1.89.037h2.4c.857 0 1.44 0 1.89-.037c.438-.036.663-.101.819-.18c.376-.192.682-.498.874-.874c.08-.156.145-.381.18-.82c.037-.45.038-1.03.038-1.89v-6.4c0-.856-.001-1.44-.038-1.89c-.036-.437-.101-.662-.18-.818a2 2 0 0 0-.874-.874c-.156-.08-.381-.145-.819-.18c-.45-.037-1.03-.038-1.89-.038" clip-rule="evenodd"/></svg>
        <h5 className="text-2xl font-semibold text-[#6e6f59]">Career Res. Builder </h5>
      </div>
      <div className="flex flex-wrap gap-2">
        <Select value={fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger className="w-[140px] bg-white border-gray-200 rounded-md">
            <SelectValue placeholder="Select Font" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem key={font} value={font}>
                <span style={{ fontFamily: font }}>{font}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={template} onValueChange={setTemplate}>
          <SelectTrigger className="w-[140px] bg-white border-gray-200 rounded-md">
            <SelectValue placeholder="Select Template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((temp) => (
              <SelectItem key={temp} value={temp} className="capitalize">
                {temp}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          size="sm"
          className="bg-[#6e6f59] text-white hover:bg-[#585947] rounded-md"
          onClick={onExport}
        >
          <Save className="h-4 w-4 mr-1" /> Export PDF
        </Button>
      </div>
    </div>
  );
};