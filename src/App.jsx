import { useState } from "react";
import Upload from "./components/Upload";
import ChatBox from "./components/ChatBox";
import DocumentList from "./components/DocumentList";
import "./App.css";

function App() {
  const [documentId, setDocumentId] = useState(null);

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="eyebrow">Document Intelligence</span>
        <h1>Ask your documents anything</h1>
        <p className="tagline">
          Upload a PDF and get answers grounded in its content.
        </p>
      </header>

      <main className="app-main">
        <Upload setDocumentId={setDocumentId} />
        <DocumentList />
        {documentId && <ChatBox documentId={documentId} />}
      </main>
    </div>
  );
}

export default App;