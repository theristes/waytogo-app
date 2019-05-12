import React from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as fsa from 'file-saver';


function GenerateLeaseAgreement( car ) {
    const doc = new Document();
    const paragraph = new Paragraph("Por favor funciona ");
    const institutionText = new TextRun("Nunca te pedi nada").bold();
    paragraph.addRun(institutionText);
    doc.addParagraph(paragraph);

    const packer = new Packer();
    packer.toBlob(doc).then(blob => {
        fsa.saveAs( blob, "example.docx"); 
        console.log("Document created successfully");
    });   

}

export { GenerateLeaseAgreement };