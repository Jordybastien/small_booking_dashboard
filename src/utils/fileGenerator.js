import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToCsv = (CsvString) => {
  CsvString =
    'data:application/csv,' + encodeURIComponent(CsvString.toString());

  const doc = document.createElement('A');
  doc.setAttribute('href', CsvString.toString());
  doc.setAttribute('download', 'report.csv');
  document.body.appendChild(doc);
  doc.click();
};

export const exportPDF = (title, headers, data, orientation = 'portrait') => {
  const unit = 'pt';
  const size = 'A4';

  const marginLeft = 40;

  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);
  doc.text(title, marginLeft, 40);
  doc.autoTable({
    startY: 50,
    head: headers,
    body: data,
    // theme: 'grid',
  });
  doc.save('report.pdf');
};
