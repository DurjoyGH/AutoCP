import React, { useState, useMemo } from 'react';
import { X, Copy, Check } from 'lucide-react';

const TestcaseModal = ({ isOpen, onClose, testcases, loading }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Categorize test cases by type
  const categorizedTestcases = useMemo(() => {
    if (!testcases || !Array.isArray(testcases)) {
      return { all: [], base: [], edge: [], large: [] };
    }

    return {
      all: testcases,
      base: testcases.filter(tc => tc.type === 'base'),
      edge: testcases.filter(tc => tc.type === 'edge'),
      large: testcases.filter(tc => tc.type === 'large')
    };
  }, [testcases]);

  // Get current filtered testcases based on active tab
  const filteredTestcases = categorizedTestcases[activeTab] || [];

  // Copy to clipboard function
  const handleCopy = async (testcase, index) => {
    const textToCopy = `Input:\n${testcase.input || 'N/A'}\n\nExpected Output:\n${testcase.output || 'N/A'}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Tab configuration
  const tabs = [
    { id: 'all', label: 'All', count: categorizedTestcases.all.length },
    { id: 'base', label: 'Base', count: categorizedTestcases.base.length },
    { id: 'edge', label: 'Edge', count: categorizedTestcases.edge.length },
    { id: 'large', label: 'Large', count: categorizedTestcases.large.length }
  ];

  // Debug logging
  console.log('TestcaseModal - testcases:', testcases);
  console.log('TestcaseModal - isArray:', Array.isArray(testcases));
  console.log('TestcaseModal - length:', testcases?.length);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#002029] border border-[#005066] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#005066]">
          <div>
            <h2 className="text-2xl font-bold text-white">Test Cases</h2>
            {testcases && Array.isArray(testcases) && testcases.length > 0 && (
              <p className="text-sm text-gray-400 mt-1">
                {testcases.length} test case{testcases.length !== 1 ? 's' : ''} available
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-[#005066] rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs Navigation */}
        {!loading && testcases && Array.isArray(testcases) && testcases.length > 0 && (
          <div className="px-6 pt-4 border-b border-[#005066]">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#005066] text-cyan-400 border-b-2 border-cyan-400'
                      : 'text-gray-400 hover:text-white hover:bg-[#00303d]'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-cyan-400/20 text-cyan-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
          ) : filteredTestcases.length > 0 ? (
            <div className="space-y-4">
              {filteredTestcases.map((testcase, index) => (
                <div key={index} className="bg-[#00303d] rounded-lg p-4 border border-[#005066]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-cyan-400 font-semibold">Test Case {index + 1}</h3>
                      {testcase.type && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          testcase.type === 'base' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : testcase.type === 'edge' 
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {testcase.type.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleCopy(testcase, index)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-[#005066] hover:bg-[#006b85] text-cyan-400 rounded-lg transition-colors text-sm font-medium"
                      title="Copy test case"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check size={16} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm font-medium">Input:</span>
                      <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm mt-1 bg-[#001a24] p-3 rounded border border-[#003d52]">
                        {testcase.input || 'N/A'}
                      </pre>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm font-medium">Expected Output:</span>
                      <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm mt-1 bg-[#001a24] p-3 rounded border border-[#003d52]">
                        {testcase.output || 'N/A'}
                      </pre>
                    </div>
                    {testcase.explanation && (
                      <div>
                        <span className="text-gray-400 text-sm font-medium">Explanation:</span>
                        <p className="text-gray-300 text-sm mt-1 bg-[#001a24] p-3 rounded border border-[#003d52]">
                          {testcase.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : testcases && Array.isArray(testcases) && testcases.length > 0 ? (
            <div className="text-center text-gray-400 py-12">
              No {activeTab !== 'all' ? activeTab : ''} test cases available
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
