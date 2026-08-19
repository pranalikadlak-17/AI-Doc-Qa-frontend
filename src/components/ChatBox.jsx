import { useState } from "react";
import API from "../services/api";
import ReactMarkdown from "react-markdown";
import "./ChatBox.css";

function ChatBox({ documentId }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askQuestion = async () => {
    if (!question) return;
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const response = await API.post("/ask", { documentId, question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.log(error);
      setError("Couldn't get an answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") askQuestion(); };

  return (
    <section className="chat-panel">
      <h2>Ask a question</h2>
      <div className="question-box">
        <input className="question-input" type="text" placeholder="Ask something about your document"
          value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={handleKeyDown} />
        <button className="ask-btn" onClick={askQuestion} disabled={loading}>Ask</button>
      </div>
      {loading && <div className="answer-box loading"><p>Reading the document…</p></div>}
      {error && !loading && <div className="answer-box error"><p>{error}</p></div>}
      {answer && !loading && !error && (
        <div className="answer-box">
          <span className="answer-label">Answer</span>
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      )}
    </section>
  );
}

export default ChatBox;