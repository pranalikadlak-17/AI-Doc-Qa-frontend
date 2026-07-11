import { useState } from "react";
import Upload from "./components/Upload";
import ChatBox from "./components/ChatBox";
import DocumentList from "./components/DocumentList";
function App() {

  const [documentId, setDocumentId] = useState(null);

  return (
    <div>

      <h1>AI Document Q&A System</h1>

      <Upload setDocumentId={setDocumentId} />
        
        <DocumentList />

      {
  documentId &&
  <ChatBox documentId={documentId} />
}

    </div>
  );
}

export default App;