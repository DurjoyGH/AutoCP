import React from 'react';
import { X } from 'lucide-react';

const TestcaseModal = ({ isOpen, onClose, testcases, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#002029] border border-[#005066] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#005066]">
          <h2 className="text-2xl font-bold text-white">Test Cases</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-[#005066] rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
          ) : testcases ? (
            <div className="space-y-4">
              {Array.isArray(testcases) ? (
                testcases.map((testcase, index) => (
                  <div key={index} className="bg-[#00303d] rounded-lg p-4">
                    <h3 className="text-cyan-400 font-semibold mb-2">Test Case {index + 1}</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-400 text-sm">Input:</span>
                        <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm mt-1">
                          {testcase.input || 'N/A'}
                        </pre>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Output:</span>
                        <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm mt-1">
                          {testcase.output || 'N/A'}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-[#00303d] rounded-lg p-4">
                  <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                    {typeof testcases === 'string' ? testcases : JSON.stringify(testcases, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              No test cases available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestcaseModal;
