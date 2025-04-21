import React, { useState, useEffect } from 'react';
import { AppHeader } from './components/AppHeader';
import { Editor } from './components/Editor';
import { ResumePreview } from './components/ResumePreview';
import { PageLengthModal } from './components/PageLengthModal';
import { defaultResume } from './lib/defaultResume';
import { Toaster, toast } from 'sonner';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface OverflowInfo {
  overflowPercentage: number;
  overflowContent: string[];
}

function App() {
  const [markdown, setMarkdown] = useState<string>(defaultResume);
  const [theme, setTheme] = useState<string>('elegant');
  const [viewMode, setViewMode] = useState<'split' | 'preview'>('split');
  const [isExporting, setIsExporting] = useState(false);
  const [tipVisible, setTipVisible] = useState(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isPageLengthModalOpen, setIsPageLengthModalOpen] = useState(false);
  const [pendingExport, setPendingExport] = useState<(() => void) | null>(null);
  const [overflowInfo, setOverflowInfo] = useState<OverflowInfo | null>(null);

  const resumeTips = [
    "Use Markdown formatting to structure your resume. Your changes are automatically saved to your browser.",
    "Keep your resume concise and focused on relevant experience. Aim for 1-2 pages maximum.",
    "Use action verbs to describe your achievements (e.g., 'Led', 'Developed', 'Implemented').",
    "Quantify your achievements with specific numbers and metrics when possible.",
    "Tailor your resume for each job application by highlighting relevant skills and experience.",
    "Use consistent formatting and spacing throughout your resume for a professional look.",
    "Include relevant keywords from the job description to help with ATS (Applicant Tracking Systems).",
    "Proofread your resume carefully for spelling and grammar errors.",
    "Use bullet points to make your resume easy to scan and read quickly.",
    "Keep your contact information up to date and professional."
  ];

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % resumeTips.length);
    }, 15000); // Change tip every 15 seconds

    return () => clearInterval(tipInterval);
  }, []);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const { markdown: savedMarkdown, theme: savedTheme, tipVisible: savedTipVisible } = JSON.parse(savedData);
        if (savedMarkdown) setMarkdown(savedMarkdown);
        if (savedTheme) setTheme(savedTheme);
        if (savedTipVisible !== undefined) setTipVisible(savedTipVisible);
      } catch {
        console.error('Failed to parse saved resume data');
      }
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify({ 
      markdown, 
      theme, 
      tipVisible 
    }));
  }, [markdown, theme, tipVisible]);

  const checkPageCount = async (element: HTMLElement): Promise<number> => {
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = '210mm'; // A4 width
    clone.style.padding = '15mm'; // Margins
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    const height = clone.scrollHeight;
    const pageHeight = 297 * 96 / 25.4; // A4 height in pixels (297mm)
    document.body.removeChild(clone);

    return Math.ceil(height / pageHeight);
  };

  const calculateOverflow = (element: HTMLElement): OverflowInfo => {
    const pageHeight = 297 * 96 / 25.4; // A4 height in pixels (297mm)
    const currentHeight = element.scrollHeight;
    const overflowPixels = currentHeight - pageHeight;
    const overflowPercentage = Math.round((overflowPixels / pageHeight) * 100);

    // Find content that's overflowing
    const overflowContent: string[] = [];
    const sections = element.querySelectorAll('h2');

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top - element.getBoundingClientRect().top;
      if (sectionTop >= pageHeight) {
        overflowContent.push(section.textContent || '');
      }
    });

    return {
      overflowPercentage,
      overflowContent
    };
  };

  const generatePDF = async () => {
    setIsExporting(true);
    toast.loading('Generating PDF...');
    
    try {
      const resumeElement = document.getElementById('resume-preview');
      if (!resumeElement) throw new Error('Preview element not found');
      
      // Check page count first
      const pageCount = await checkPageCount(resumeElement);
      
      if (pageCount > 1) {
        const overflow = calculateOverflow(resumeElement);
        setOverflowInfo(overflow);
        setPendingExport(() => generatePDF);
        setIsPageLengthModalOpen(true);
        setIsExporting(false);
        toast.dismiss();
        return;
      }
      
      // Wait for fonts to load
      await document.fonts.ready;
      
      // Create a clone for PDF generation
      const clone = resumeElement.cloneNode(true) as HTMLElement;
      clone.style.width = '210mm'; // A4 width
      clone.style.padding = '15mm'; // Smaller padding for more content space
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      document.body.appendChild(clone);
      
      const canvas = await html2canvas(clone, {
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
        windowWidth: 794, // A4 width in pixels at 96 DPI
        windowHeight: 1123, // A4 height in pixels at 96 DPI
        backgroundColor: '#ffffff' // Ensure white background
      });
      
      // Remove the clone after capturing
      document.body.removeChild(clone);
      
      // Create PDF (A4 size)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate dimensions to fit content to page
      const imgWidth = 210; // A4 width in mm
      const imgHeight = 297; // A4 height in mm
      
      // Add image to PDF, scaling to fit the page
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      
      pdf.save('resume.pdf');
      toast.dismiss();
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.dismiss();
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExport = async () => {
    const resumeElement = document.getElementById('resume-preview');
    if (!resumeElement) {
      toast.error('Preview element not found');
      return;
    }

    try {
      const pageCount = await checkPageCount(resumeElement);
      
      if (pageCount > 1) {
        const overflow = calculateOverflow(resumeElement);
        setOverflowInfo(overflow);
        setPendingExport(() => generatePDF);
        setIsPageLengthModalOpen(true);
      } else {
        await generatePDF();
      }
    } catch (error) {
      console.error('Error checking page count:', error);
      toast.error('Failed to check resume length. Please try again.');
    }
  };

  const handleModalConfirm = async () => {
    setIsPageLengthModalOpen(false);
    if (pendingExport) {
      await pendingExport();
      setPendingExport(null);
    }
  };

  const handleModalClose = () => {
    setIsPageLengthModalOpen(false);
    setPendingExport(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A645E]/5 via-[#23534F]/5 to-[#1C433F]/5">
      <Toaster position="top-right" richColors />
      <PageLengthModal 
        isOpen={isPageLengthModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        overflowInfo={overflowInfo}
      />
      
      <AppHeader 
        theme={theme}
        setTheme={setTheme}
        onExport={handleExport}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isExporting={isExporting}
      />
      
      <main className="container mx-auto px-4 py-6">
        {/* Tips banner */}
        {tipVisible && (
          <div className="mb-6 bg-[#2A645E]/10 border border-[#23534F] rounded-lg p-4 text-sm text-[#1C433F] flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 text-[#23534F]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p>
                <span className="font-medium text-[#2A645E]">Tip:</span> {resumeTips[currentTipIndex]}
              </p>
            </div>
            <button 
              onClick={() => setTipVisible(false)}
              className="ml-4 text-[#23534F] hover:text-[#1C433F] transition-colors"
              aria-label="Dismiss tip"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-200px)]">
          {/* Editor Section */}
          {viewMode === 'split' && (
            <div className="md:w-1/2 h-full bg-white rounded-lg shadow-sm overflow-hidden border border-[#2A645E]">
              <div className="border-b border-[#23534F] bg-[#2A645E]/5 px-4 py-3 flex items-center">
                <h2 className="text-sm font-medium text-[#1C433F] flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#23534F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Markdown Editor
                </h2>
              </div>
              <div className="h-[calc(100%-48px)]">
                <Editor markdown={markdown} setMarkdown={setMarkdown} />
              </div>
            </div>
          )}
          
          {/* Preview Section */}
          <div className={`${viewMode === 'split' ? 'md:w-1/2' : 'w-full max-w-[800px] mx-auto'} h-full bg-white rounded-lg shadow-sm overflow-hidden border border-[#2A645E]`}>
            <div className="border-b border-[#23534F] bg-[#2A645E]/5 px-4 py-3 flex items-center">
              <h2 className="text-sm font-medium text-[#1C433F] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#23534F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Resume Preview
              </h2>
            </div>
            <div className="h-[calc(100%-48px)]">
              <ResumePreview markdown={markdown} theme={theme} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;