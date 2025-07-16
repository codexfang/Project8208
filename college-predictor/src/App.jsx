import './App.css';
import { useState } from "react";

export default function App() {
  const [essay, setEssay] = useState("");
  const [essayFeedback, setEssayFeedback] = useState("");
  const [likelihood, setLikelihood] = useState(null);
  const [view, setView] = useState("stats");

  const [stats, setStats] = useState({
    gpa: "",
    sat: "",
    extracurriculars: "",
    transcript: ""
  });

  const handleAnalyzeEssay = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/analyze_essay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essay }),
      });
      const data = await response.json();
      setEssayFeedback(data.feedback);
    } catch (err) {
      setEssayFeedback("Error analyzing essay. Please try again later.");
    }
  };

  const handlePredict = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/predict_admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      });
      const data = await response.json();
      setLikelihood(data.likelihood);
    } catch (err) {
      setLikelihood(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto shadow-2xl rounded-xl bg-white p-8">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
          🎓 College Admissons Predictor
        </h1>

        <div className="flex justify-center mb-6 gap-4">
          <button
            onClick={() => setView("stats")}
            className={`transition-all px-5 py-2 rounded-full font-medium shadow ${
              view === "stats"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Student Stats
          </button>
          <button
            onClick={() => setView("essay")}
            className={`transition-all px-5 py-2 rounded-full font-medium shadow ${
              view === "essay"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Essay Analysis
          </button>
        </div>

        {view === "stats" && (
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="GPA (e.g., 3.8)"
              value={stats.gpa}
              onChange={(e) => setStats({ ...stats, gpa: e.target.value })}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              placeholder="SAT Score (e.g., 1450)"
              value={stats.sat}
              onChange={(e) => setStats({ ...stats, sat: e.target.value })}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <textarea
              placeholder="Extracurriculars"
              value={stats.extracurriculars}
              onChange={(e) =>
                setStats({ ...stats, extracurriculars: e.target.value })
              }
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <textarea
              placeholder="Transcript details or notes"
              value={stats.transcript}
              onChange={(e) =>
                setStats({ ...stats, transcript: e.target.value })
              }
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handlePredict}
              className="bg-indigo-600 text-white px-6 py-3 mt-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
            >
              🔍 Predict Admission Chance
            </button>

            {likelihood !== null && (
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Estimated Admission Likelihood:
                </p>
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-green-500 h-6 text-white text-sm flex items-center justify-center transition-all"
                    style={{ width: `${likelihood}%` }}
                  >
                    {likelihood}%
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {view === "essay" && (
          <div className="grid grid-cols-1 gap-4">
            <textarea
              placeholder="Paste your college essay here..."
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              className="w-full h-40 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleAnalyzeEssay}
              className="bg-indigo-600 text-white px-6 py-3 mt-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
            >
              ✨ Analyze Essay
            </button>
            {essayFeedback && (
              <div className="mt-4 bg-indigo-50 p-4 rounded-lg border border-indigo-300">
                <p className="text-sm font-semibold mb-2 text-indigo-800">
                  AI Feedback:
                </p>
                <p className="text-gray-800 whitespace-pre-line">{essayFeedback}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}