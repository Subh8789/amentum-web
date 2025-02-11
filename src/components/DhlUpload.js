"use client"

import { useState } from "react";
import "./DhlUpload.css"

export default function DHLUpload() {
  const [documents, setDocuments] = useState([{ id: 1, selectedDocument: "", uploadedFile: null }]);

  const handleFileUpload = (event, index) => {
    const newDocuments = [...documents];
    newDocuments[index].uploadedFile = event.target.files[0];
    setDocuments(newDocuments);
  };

  const handleSelectChange = (event, index) => {
    const newDocuments = [...documents];
    newDocuments[index].selectedDocument = event.target.value;
    setDocuments(newDocuments);
  };

  const addDocument = () => {
    setDocuments([...documents, { id: documents.length + 1, selectedDocument: "", uploadedFile: null }]);
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <h2>DHL Upload</h2>
          <span className="close">&times;</span>
        </div>
        <div className="modal-body">
          {documents.map((doc, index) => (
            <div key={doc.id} className="document-section">
              <label htmlFor={`document-${doc.id}`}>Select Document</label>
              <select
                id={`document-${doc.id}`}
                value={doc.selectedDocument}
                onChange={(e) => handleSelectChange(e, index)}
              >
                <option value="">Select</option>
                <option value="letter">Letter from Embassy</option>
                <option value="bank">Bank Statement</option>
                <option value="birth">Birth Certificate</option>
              </select>

              <label>Upload Document</label>
              <div className="upload-box" onClick={() => document.getElementById(`fileInput-${doc.id}`).click()}>
                <input id={`fileInput-${doc.id}`} type="file" onChange={(e) => handleFileUpload(e, index)} hidden />
                <span>{doc.uploadedFile ? doc.uploadedFile.name : "Click to upload"}</span>
              </div>
            </div>
          ))}
          <button className="add-document" onClick={addDocument}>+ Add Document</button>
          <button className="save-button">SAVE</button>
        </div>
      </div>
    </div>
  );
}
