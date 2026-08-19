import { useState } from "react";
import API from "../services/api";
import "./Upload.css";

function Upload({ setDocumentId }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setStatus("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file first");
      setStatus("error");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    setMessage("");
    setStatus("");
    try {
      const response = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(`Uploaded "${file.name}" successfully`);
      setStatus("success");
      setDocumentId(response.data.id);
    } catch (error) {
      console.log(error);
      setMessage("Upload failed. Please check the file and try again.");
      setStatus("error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="upload-panel">
      <h2>Upload a document</h2>
      <p className="upload-hint">PDF files only</p>
      <label className="file-drop">
        <input className="file-input" type="file" accept=".pdf" onChange={handleFileChange} />
        <span className="file-drop-label">{file ? file.name : "Choose a PDF file"}</span>
      </label>
      <button className="upload-btn" onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading…" : "Upload"}
      </button>
      {message && <p className={`upload-message ${status}`}>{message}</p>}
    </section>
  );
}

export default Upload;