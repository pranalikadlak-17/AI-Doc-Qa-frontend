import { useEffect, useState } from "react";
import API from "../services/api";
import "./DocumentList.css";

function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await API.get("");
      setDocuments(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id) => {
    try {
      await API.delete(`/${id}`);
      fetchDocuments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchDocuments(); }, []);

  return (
    <section className="document-panel">
      <h2>Your documents</h2>
      {loading && <p className="document-empty">Loading documents…</p>}
      {!loading && documents.length === 0 && (
        <p className="document-empty">No documents yet. Upload a PDF above to get started.</p>
      )}
      {!loading && documents.map((doc) => (
        <div className="document-row" key={doc.id}>
          <div className="document-info">
            <p className="document-name">{doc.fileName}</p>
            <span className="document-type">{doc.fileType}</span>
          </div>
          <button className="delete-btn" onClick={() => deleteDocument(doc.id)}>Delete</button>
        </div>
      ))}
    </section>
  );
}

export default DocumentList;