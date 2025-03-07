// TemplateStyles.tsx 
export const TemplateStyles = {
    templateStyles: {
      modern: `
        .resume-container { 
          // max-width: 800px; 
          // margin: 0 auto; 
          // background: #ffffff; 
          border-radius: 8px; 
        }
        h1 { font-size: 28px; color: #000; font-weight: 600; margin-bottom: 8px; letter-spacing: 1px; }
        h2 { font-size: 20px; color: #000; font-weight: 500; margin: 20px 0 10px; border-bottom: 1px solid #e0e7ff; padding-bottom: 4px; }
        h3 { font-size: 18px; color: #000; font-weight: 400; margin: 15px 0 8px; }
        p { margin: 6px 0; line-height: 1.6; color: #4b5563; font-weight: 300; font-size: 14px; }
        ul { padding-left: 20px; margin: 6px 0; }
        li { margin: 4px 0; color: #4b5563; font-weight: 300; font-size: 14px; }
        a { color: #000; text-decoration: none; font-weight: 400; }
        a:hover { color: #f63b3b; text-decoration: underline; }
        hr { border: 0; border-top: 1px dashed #e0e7ff; margin: 15px 0; }
        strong { font-weight: 500; color: #000; }
        em, .date { color: #6b7280; font-style: italic; font-size: 12px; font-weight: 300; }
      `,
      classic: `
        .resume-container { 
          // max-width: 800px; 
          // margin: 0 auto; 
          // background: #ffffff; 
        }
        h1 { font-size: 25px; color: #000000; font-weight: 700; margin-bottom: 10px; }
        h2 { font-size: 22px; color: #000000; font-weight: 600; margin: 25px 0 12px; border-bottom: .5px solid #000000; }
        h3 { font-size: 18px; color: #333333; font-weight: 500; margin: 15px 0 8px; }
        p { margin: 5px 0; line-height: 1.5; color: #333333; font-weight: 400; font-size: 14px; }
        ul { padding-left: 25px; margin: 5px 0; }
        li { margin: 5px 0; color: #333333; font-weight: 400; font-size: 14px; }
        a { color: #000000; text-decoration: underline; font-weight: 400; }
        hr { border: 0; border-top: .5px solid #000000; margin: 20px 0; }
        strong { font-weight: 600; color: #000000; }
        em, .date { color: #666666; font-style: italic; font-size: 12px; font-weight: 400; }
      `,
      minimal: `
        .resume-container { 
          // max-width: 800px; 
          // margin: 0 auto; 
          // background: #ffffff; 
        }
        h1 { font-size: 26px; color: #2d3748; font-weight: 500; margin-bottom: 6px; }
        h2 { font-size: 18px; color: #2d3748; font-weight: 400; margin: 15px 0 8px; }
        h3 { font-size: 16px; color: #4a5568; font-weight: 400; margin: 10px 0 6px; }
        p { margin: 4px 0; line-height: 1.5; color: #4a5568; font-weight: 300; font-size: 13px; }
        ul { padding-left: 15px; margin: 4px 0; }
        li { margin: 3px 0; color: #4a5568; font-weight: 300; font-size: 13px; }
        a { color: #2d3748; text-decoration: none; font-weight: 400; }
        a:hover { text-decoration: underline; }
        hr { border: 0; border-top: 1px dotted #e2e8f0; margin: 10px 0; }
        strong { font-weight: 500; color: #2d3748; }
        em, .date { color: #718096; font-style: italic; font-size: 11px; font-weight: 300; }
      `,
    },
  
    getTemplateCSS: (template: string, fontFamily: string, isPrint = false) => `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@300;400;500;600;700&display=swap');
      .resume-container {
        font-family: '${fontFamily}', sans-serif;
        line-height: 1.6;
        ${isPrint
          ? "width: 180mm; padding: 15mm; background: #ffffff;"
          : "max-width: 800px; padding: 20px 15px; border-radius: 8px;"}
      }
      @media (max-width: 640px) {
        .resume-container {
          padding: 10px 8px;
        }
      }
      ${TemplateStyles.templateStyles[template as keyof typeof TemplateStyles.templateStyles] || TemplateStyles.templateStyles.modern}
      ${isPrint
        ? `
        @page {
          size: A4;
          margin: 15mm 0;
        }
        body {
          margin: 0;
          padding: 0;
          width: 210mm;
          min-height: 297mm;
        }
        .resume-container {
          padding: 0;
          margin: 0;
        }
        .resume-container > * {
          padding: 0 15mm;
        }
        .resume-container > *:first-child {
          padding-top: 15mm;
        }
        .resume-container > *:last-child {
          padding-bottom: 15mm;
        }
        `
        : ""}
    </style>
  `,
};