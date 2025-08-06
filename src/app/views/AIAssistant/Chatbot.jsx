import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./Bot.css";
import aiIcon from "/assets/images/ai.svg";
import { companyInfo } from "./companyinfo";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion("");

    setChatHistory((prev) => [...prev, { type: "question", content: currentQuestion }]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `
You are TPN Copilot, an expert logistics assistant. Use the following company details to answer the question below:

${JSON.stringify(companyInfo, null, 2)}

Now, using the details provided above, please address this query:
${question}
          `.trim()
                }
              ]
            }
          ]
        }
      });

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setChatHistory((prev) => [...prev, { type: "answer", content: aiResponse }]);
    } catch (error) {
      console.log(error);
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: "⚠️ Sorry - Something went wrong. Please try again!" }
      ]);
    }
    setGeneratingAnswer(false);
  }
  return (
    <div className="chat-container">
      <div className="chat-header">💬 Chat AI</div>

      <div ref={chatContainerRef} className="chat-box">
        {chatHistory.length === 0 ? (
          <div className="welcome-message">
            <p>
              Hi, I'm TPN Copilot – your smart assistant for all things logistics! You can ask me
              things like:
            </p>
            <ul>
              <li>💡 “What’s a half pallet cost?”</li>
              <li>🤔 “What if no one’s home?”</li>
            </ul>
            <p>Just type your question or describe the problem to get started!📦</p>
          </div>
        ) : (
          <>
            {chatHistory.map((chat, index) => (
              <div key={index} className={`message-wrapper ${chat.type}`}>
                {chat.type === "answer" ? (
                  <div className="ai-message-wrapper">
                    <div className="ai-icon-container">
                      <img src={aiIcon} alt="AI" className="ai-icon" />
                    </div>
                    <div className="message ai">
                      <ReactMarkdown>{chat.content}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="message-wrapper question">
                    <div className="message user">
                      <ReactMarkdown>{chat.content}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {generatingAnswer && <div className="message ai typing">Thinking...</div>}
          </>
        )}
      </div>

      <form onSubmit={generateAnswer} className="input-area">
        <textarea
          rows="2"
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              generateAnswer(e);
            }
          }}
          placeholder="Ask me anything..."
        />
        <button type="submit" disabled={generatingAnswer}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
