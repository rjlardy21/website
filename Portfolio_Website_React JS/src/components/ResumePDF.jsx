import React from 'react';
import PDFViewer from 'pdf-viewer-reactjs';

function ResumePDF() {
    return (
        <PDFViewer document={{ url: '../img/ReeceLardyResume.pdf' }} />
    );
}

export default ResumePDF;
