import React from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, AlertCircle } from 'lucide-react';

const ValidationReport = ({ isOpen, onClose, validationData, loading }) => {
  if (!isOpen) return null;

  // Debug: Check what we're receiving
  if (validationData?.validationReport?.testCaseResults?.length > 0) {
    console.log('=== VALIDATION DEBUG ===');
    const results = validationData.validationReport.testCaseResults;
    console.log('Total test cases:', results.length);
    results.forEach((result, idx) => {
      console.log(`Test case ${idx + 1}:`);
      console.log('  Raw result:', result);
      console.log('  isValid:', result.isValid);
      console.log('  Type:', typeof result.isValid);
      console.log('  === true:', result.isValid === true);
      console.log('  === "true":', result.isValid === 'true');
      console.log('  == true:', result.isValid == true);
    });
    console.log('========================');
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'running':
        return <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500"></div>;
      case 'failed':
        return <XCircle className="text-red-500" size={24} />;
      default:
        return <AlertCircle className="text-yellow-500" size={24} />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBarColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#002029] border border-[#005066] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#005066]">
          <div className="flex items-center gap-3">
            {getStatusIcon(validationData?.validationStatus)}
            <h2 className="text-2xl font-bold text-white">Test Case Validation Report</h2>
          </div>
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
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading validation report...</p>
              </div>
            </div>
          ) : validationData?.validationStatus === 'running' ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                <p className="text-cyan-400 text-lg font-semibold">Validation in Progress...</p>
                <p className="text-gray-400 mt-2">AI is analyzing test cases for correctness and quality</p>
              </div>
            </div>
          ) : validationData?.validationStatus === 'failed' ? (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 text-center">
              <XCircle className="mx-auto mb-4 text-red-500" size={48} />
              <h3 className="text-xl font-bold text-red-500 mb-2">Validation Failed</h3>
              <p className="text-gray-400">{validationData?.validationReport?.summary || 'Unable to validate test cases'}</p>
            </div>
          ) : validationData?.validationStatus === 'pending' ? (
            <div className="bg-yellow-500/10 border border-yellow-500 rounded-lg p-6 text-center">
              <AlertCircle className="mx-auto mb-4 text-yellow-500" size={48} />
              <h3 className="text-xl font-bold text-yellow-500 mb-2">Validation Pending</h3>
              <p className="text-gray-400">Test case validation has not started yet. This may happen automatically after problem generation.</p>
            </div>
          ) : validationData?.validationReport ? (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="bg-[#00303d] rounded-lg p-6 border border-[#005066]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Overall Quality Score</h3>
                  <span className={`text-3xl font-bold ${getScoreColor(validationData.validationReport.overallScore || 0)}`}>
                    {validationData.validationReport.overallScore || 0}/100
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <div
                    className={`h-3 rounded-full ${getScoreBarColor(validationData.validationReport.overallScore || 0)} transition-all duration-500`}
                    style={{ width: `${validationData.validationReport.overallScore || 0}%` }}
                  ></div>
                </div>
                <div className="flex items-start gap-3">
                  {validationData.validationReport.isValid ? (
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  ) : (
                    <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                  )}
                  <p className="text-gray-300">{validationData.validationReport.summary || 'No summary available'}</p>
                </div>
              </div>

              {/* Test Case Results */}
              {validationData?.validationReport?.testCaseResults?.length > 0 ? (
                <div className="bg-[#00303d] rounded-lg p-6 border border-[#005066]">
                  <h3 className="text-lg font-bold text-white mb-4">Test Case Validation Results</h3>
                  
                  {/* Summary Stats */}
                  {(() => {
                    const results = validationData.validationReport.testCaseResults;
                    const validCount = results.filter(r => {
                      const val = r.isValid;
                      if (val === null || val === undefined) return false;
                      if (typeof val === 'boolean') return val;
                      if (typeof val === 'string') {
                        const lowerVal = val.toLowerCase().trim();
                        return lowerVal === 'true' || lowerVal === 'yes' || lowerVal === '1';
                      }
                      if (typeof val === 'number') return val === 1 || val > 0;
                      return Boolean(val);
                    }).length;
                    const invalidCount = results.length - validCount;
                    
                    return (
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#002029] rounded-lg p-4 border border-[#005066]">
                          <div className="text-gray-400 text-sm mb-1">Total Tests</div>
                          <div className="text-2xl font-bold text-cyan-400">{results.length}</div>
                        </div>
                        <div className="bg-[#002029] rounded-lg p-4 border border-green-500/20">
                          <div className="text-gray-400 text-sm mb-1">Correct</div>
                          <div className="text-2xl font-bold text-green-500">{validCount}</div>
                        </div>
                        <div className="bg-[#002029] rounded-lg p-4 border border-red-500/20">
                          <div className="text-gray-400 text-sm mb-1">Incorrect</div>
                          <div className="text-2xl font-bold text-red-500">{invalidCount}</div>
                        </div>
                      </div>
                    );
                  })()}
                  
                  <div className="space-y-3">
                    {validationData.validationReport.testCaseResults.map((result, index) => {
                      // Ensure testCaseNumber exists, fallback to index + 1
                      const caseNumber = result.testCaseNumber || (index + 1);
                      
                      // Ensure isValid is a boolean - handle various data types
                      // Check for truthy values: true, 'true', 1, 'yes'
                      // Check for falsy values: false, 'false', 0, null, undefined
                      let isValidBoolean;
                      const val = result.isValid;
                      
                      console.log(`Processing test case ${caseNumber}:`, val, typeof val);
                      
                      if (val === null || val === undefined) {
                        isValidBoolean = false;
                      } else if (typeof val === 'boolean') {
                        isValidBoolean = val;
                      } else if (typeof val === 'string') {
                        const lowerVal = val.toLowerCase().trim();
                        isValidBoolean = lowerVal === 'true' || lowerVal === 'yes' || lowerVal === '1';
                      } else if (typeof val === 'number') {
                        isValidBoolean = val === 1 || val > 0;
                      } else {
                        isValidBoolean = Boolean(val);
                      }
                      
                      console.log(`  -> Interpreted as:`, isValidBoolean);
                      
                      return (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 transition-all ${
                            isValidBoolean
                              ? 'border-green-500/30 bg-green-500/5 hover:border-green-500/50'
                              : 'border-red-500/30 bg-red-500/5 hover:border-red-500/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">Test Case {caseNumber}</h4>
                            {isValidBoolean ? (
                              <span className="text-green-500 text-sm flex items-center gap-1 font-semibold">
                                <CheckCircle size={16} /> Correct
                              </span>
                            ) : (
                              <span className="text-red-500 text-sm flex items-center gap-1 font-semibold">
                                <XCircle size={16} /> Incorrect
                              </span>
                            )}
                          </div>
                          
                          {/* Show summary message */}
                          {isValidBoolean ? (
                            <div className="text-sm text-green-400 bg-green-500/10 rounded px-3 py-2 mb-2">
                              <div className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <div>
                                  {result.explanation ? (
                                    <p className="text-gray-200">{result.explanation}</p>
                                  ) : (
                                    <p className="text-gray-200">Output is correct for the given input</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {result.explanation && (
                                <div className="text-sm bg-red-500/10 rounded px-3 py-2">
                                  <div className="flex items-start gap-2">
                                    <span className="text-red-400 mt-0.5">✗</span>
                                    <p className="text-gray-200">{result.explanation}</p>
                                  </div>
                                </div>
                              )}
                              {result.issues && result.issues.length > 0 && (
                                <div className="bg-red-500/10 rounded px-3 py-2">
                                  <p className="text-xs text-red-400 font-semibold mb-2 uppercase">Detailed Issues:</p>
                                  <ul className="space-y-1">
                                    {result.issues.map((issue, idx) => (
                                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                                        <span className="text-red-400 mt-1">•</span>
                                        <span>{issue}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {!result.explanation && (!result.issues || result.issues.length === 0) && (
                                <div className="text-sm text-red-400 bg-red-500/10 rounded px-3 py-2">
                                  <div className="flex items-start gap-2">
                                    <span className="text-red-400 mt-0.5">✗</span>
                                    <p className="text-gray-200">Output does not match expected result</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : validationData?.validationReport && (
                <div className="bg-[#00303d] rounded-lg p-6 text-center">
                  <AlertCircle className="mx-auto mb-3 text-gray-500" size={32} />
                  <p className="text-gray-400">No individual test case results available</p>
                </div>
              )}

              {/* Validation Timestamp */}
              {validationData.validationReport.validatedAt && (
                <div className="text-center text-sm text-gray-500">
                  Validated on {new Date(validationData.validationReport.validatedAt).toLocaleString()}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <AlertCircle className="mx-auto mb-4 text-gray-500" size={48} />
              <p>Validation pending or no report available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidationReport;
