import { useState } from "react";
import Upload from "./components/Upload";

function App() {

  const [documentId, setDocumentId] = useState(null);

  return (
    <div>

      <h1>AI Document Q&A System</h1>

      <Upload setDocumentId={setDocumentId} />

      {
        documentId &&
        <p>
          Ready for questions. Document ID: {documentId}
        </p>
      }

    </div>
  );
}

export default App;