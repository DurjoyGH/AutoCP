import jsPDF from 'jspdf';

export const generateProblemPDF = (problem) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const bottomMargin = 50;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = margin + 5;

  // Helper function to clean text formatting (remove markdown-style formatting)
  const cleanText = (text) => {
    if (!text) return '';
    // Replace `text` or 'text' with just text (remove backticks and single quotes)
    let cleaned = text.replace(/`([^`]+)`/g, '$1');
    cleaned = cleaned.replace(/'([^']+)'/g, '$1');
    // Replace subscript notation like p_i, p_j with plain text
    cleaned = cleaned.replace(/(\w+)_(\w+)/g, '$1$2');
    // Replace **text** with just text (remove bold markdown)
    cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1');
    // Convert LaTeX notation
    cleaned = cleaned.replace(/\\dots/g, '...');
    cleaned = cleaned.replace(/\\ldots/g, '...');
    cleaned = cleaned.replace(/\\cdots/g, '...');
    cleaned = cleaned.replace(/\|([^|]+)\|/g, '$1');  // Remove absolute value bars
    cleaned = cleaned.replace(/\\ge/g, '>=');
    cleaned = cleaned.replace(/\\le/g, '<=');
    cleaned = cleaned.replace(/\\ne/g, '!=');
    cleaned = cleaned.replace(/\\times/g, 'x');
    cleaned = cleaned.replace(/\\div/g, '/');
    cleaned = cleaned.replace(/\\/g, '');  // Remove remaining backslashes
    return cleaned;
  };

  // Helper function to add text with word wrap
  const addText = (text, fontSize = 11, isBold = false, color = [0, 0, 0]) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const cleanedText = cleanText(text);
    const lines = doc.splitTextToSize(cleanedText, maxWidth);
    lines.forEach(line => {
      if (yPosition + 30 > pageHeight - bottomMargin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += fontSize * 0.5;
    });
    yPosition += 5;
  };

  // Helper function to add section with background
  const addSection = (title, content, color = [0, 150, 200]) => {
    // Add section title with background
    doc.setFillColor(...color);
    doc.rect(margin - 5, yPosition - 5, maxWidth + 10, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, yPosition);
    yPosition += 12;

    // Add content
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    
    if (typeof content === 'string') {
      const cleanedContent = cleanText(content);
      const lines = doc.splitTextToSize(cleanedContent, maxWidth);
      lines.forEach(line => {
        if (yPosition + 30 > pageHeight - bottomMargin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += 6;
      });
    } else if (Array.isArray(content)) {
      content.forEach((item, index) => {
        if (yPosition + 30 > pageHeight - bottomMargin) {
          doc.addPage();
          yPosition = margin;
        }
        const bullet = `${index + 1}. `;
        const cleanedItem = cleanText(item);
        const lines = doc.splitTextToSize(cleanedItem, maxWidth - 10);
        doc.text(bullet, margin, yPosition);
        lines.forEach((line, lineIndex) => {
          doc.text(line, margin + 10, yPosition + (lineIndex * 6));
        });
        yPosition += lines.length * 6 + 3;
      });
    }
    yPosition += 8;
  };

  // Title
  doc.setFillColor(0, 50, 100);
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(problem.title || 'Problem', margin, 20);
  yPosition = 40;

  // Problem Info Bar
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPosition, maxWidth, 15, 'F');
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Rating: ${problem.rating}  |  Topics: ${problem.topic || problem.topics?.join(', ') || 'N/A'}`, margin + 5, yPosition + 10);
  yPosition += 25;

  // Problem Description
  if (problem.description) {
    addSection('Problem Statement', problem.description, [0, 120, 180]);
  }

  // Examples
  if (problem.examples && problem.examples.length > 0) {
    doc.setFillColor(100, 180, 100);
    doc.rect(margin - 5, yPosition - 5, maxWidth + 10, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Examples', margin, yPosition);
    yPosition += 12;

    problem.examples.forEach((example, index) => {
      if (yPosition + 30 > pageHeight - bottomMargin) {
        doc.addPage();
        yPosition = margin;
      }

      // Example box
      doc.setDrawColor(100, 180, 100);
      doc.setLineWidth(0.5);
      doc.rect(margin, yPosition, maxWidth, 0);
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`Example ${index + 1}`, margin, yPosition + 7);
      yPosition += 12;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      
      // Input
      doc.setFont('helvetica', 'bold');
      doc.text('Input:', margin + 5, yPosition);
      doc.setFont('helvetica', 'normal');
      const cleanedInput = cleanText(example.input);
      const inputLines = doc.splitTextToSize(cleanedInput, maxWidth - 20);
      inputLines.forEach(line => {
        if (yPosition + 30 > pageHeight - bottomMargin) {
          doc.addPage();
          yPosition = margin;
        }
        yPosition += 5;
        doc.text(line, margin + 20, yPosition);
      });
      yPosition += 7;

      // Output
      doc.setFont('helvetica', 'bold');
      doc.text('Output:', margin + 5, yPosition);
      doc.setFont('helvetica', 'normal');
      const cleanedOutput = cleanText(example.output);
      const outputLines = doc.splitTextToSize(cleanedOutput, maxWidth - 20);
      outputLines.forEach(line => {
        if (yPosition + 30 > pageHeight - bottomMargin) {
          doc.addPage();
          yPosition = margin;
        }
        yPosition += 5;
        doc.text(line, margin + 20, yPosition);
      });
      yPosition += 7;

      // Explanation (if exists)
      if (example.explanation) {
        doc.setFont('helvetica', 'bold');
        doc.text('Explanation:', margin + 5, yPosition);
        doc.setFont('helvetica', 'normal');
        const cleanedExplanation = cleanText(example.explanation);
        const explanationLines = doc.splitTextToSize(cleanedExplanation, maxWidth - 20);
        explanationLines.forEach(line => {
          if (yPosition + 30 > pageHeight - bottomMargin) {
            doc.addPage();
            yPosition = margin;
          }
          yPosition += 5;
          doc.text(line, margin + 20, yPosition);
        });
        yPosition += 7;
      }

      yPosition += 5;
    });
    yPosition += 5;
  }

  // Constraints
  if (problem.constraints) {
    const constraintsText = Array.isArray(problem.constraints) 
      ? problem.constraints.join('\n') 
      : problem.constraints;
    addSection('Constraints', constraintsText, [200, 100, 0]);
  }

  // Complexity
  if (problem.timeComplexity || problem.spaceComplexity) {
    doc.setFillColor(150, 100, 180);
    doc.rect(margin - 5, yPosition - 5, maxWidth + 10, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Complexity Analysis', margin, yPosition);
    yPosition += 12;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    if (problem.timeComplexity) {
      doc.setFont('helvetica', 'bold');
      doc.text('Time Complexity: ', margin, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(problem.timeComplexity, margin + 40, yPosition);
      yPosition += 8;
    }
    if (problem.spaceComplexity) {
      doc.setFont('helvetica', 'bold');
      doc.text('Space Complexity: ', margin, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(problem.spaceComplexity, margin + 40, yPosition);
      yPosition += 8;
    }
    yPosition += 5;
  }

  // Approach
  if (problem.approach) {
    addSection('Approach', problem.approach, [180, 120, 0]);
  }

  // Key Insights
  if (problem.keyInsights && problem.keyInsights.length > 0) {
    addSection('Key Insights', problem.keyInsights, [0, 150, 150]);
  }

  // Hints
  if (problem.hints && problem.hints.length > 0) {
    addSection('Hints', problem.hints, [200, 150, 0]);
  }

  // Add bottom spacing before footer
  yPosition += 10;

  // Footer
  const timestamp = problem.generatedAt || new Date().toLocaleString();
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated by AutoCP | ${timestamp}`, margin, pageHeight - bottomMargin + 10);

  // Save the PDF
  const fileName = `${problem.title?.replace(/[^a-z0-9]/gi, '_') || 'problem'}_${problem.rating}.pdf`;
  doc.save(fileName);
};
