import { useState } from "react";
import API from "../services/api";
import ReactMarkdown from "react-markdown";
import "./ChatBox.css";

function ChatBox({ documentId }) {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);


    const askQuestion = async () => {

        if (!question) {
            return;
        }

        setLoading(true);

        try {

            const response = await API.post("/ask", {
                documentId: documentId,
                question: question
            });

            setAnswer(response.data.answer);

        } catch (error) {

            console.log(error);
            setAnswer("Failed to get answer");

        }finally {

        setLoading(false);
        }

    
    };


    return (
    <div className="chat-container">

        <h2>Ask Questions</h2>

        <div className="question-box">

           <input
             className="question-input"
             type="text"
             placeholder="Ask something about your document"
             value={question}
             onChange={(e)=>setQuestion(e.target.value)}
/>

            <button 
              className="ask-btn"
              onClick={askQuestion}>
              Ask
            </button>

        </div>


        {
          loading &&
    <div className="answer-box">
        <h3>AI Answer:</h3>
        <p>🤖 AI is thinking...</p>
    </div>
}


{
    answer && !loading &&
    <div className="answer-box">

        <h3>AI Answer:</h3>

        <ReactMarkdown>
            {answer}
        </ReactMarkdown>

    </div>
}

    </div>
);

}

export default ChatBox;
