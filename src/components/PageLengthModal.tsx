import React from 'react';

interface OverflowInfo {
  overflowPercentage: number;
  overflowContent: string[];
}

interface PageLengthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  overflowInfo: OverflowInfo | null;
}

export const PageLengthModal: React.FC<PageLengthModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  overflowInfo
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2A645E]/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2A645E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg font-semibold leading-6 text-[#2A645E]">
                Resume Length Warning
              </h3>
              <div className="mt-2">
                <p className="text-sm text-[#1C433F] mb-4">
                  Your resume is {overflowInfo?.overflowPercentage}% longer than one page.
                  This might affect its readability and impact.
                </p>
                {overflowInfo?.overflowContent.length ? (
                  <div className="mt-4 text-left bg-[#2A645E]/5 p-4 rounded-lg">
                    <p className="text-sm font-medium text-[#23534F] mb-2">
                      The following sections are going to the next page:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-[#1C433F]">
                      {overflowInfo.overflowContent.map((section, index) => (
                        <li key={index}>{section}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-[#2A645E] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#23534F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A645E] sm:col-start-2"
              onClick={onConfirm}
            >
              Download Anyway
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#1C433F] shadow-sm ring-1 ring-inset ring-[#23534F] hover:bg-[#2A645E]/5 sm:col-start-1 sm:mt-0"
              onClick={onClose}
            >
              Modify Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 