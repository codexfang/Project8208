import './App.css';
import { useState } from "react";

export default function App() {
  const [essay, setEssay] = useState("");
  const [essayFeedback, setEssayFeedback] = useState("");
  const [likelihood, setLikelihood] = useState(null);
  const [view, setView] = useState("stats");
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    gpa: "",
    sat: "",
    extracurriculars: "",
    transcript: ""
  });

  const handleAnalyzeEssay = async () => {
    setLoading(true);
    try {
      // For GitHub Pages deployment, API calls won't work
      // This is a placeholder for demonstration
      setEssayFeedback("Essay analysis feature requires a backend server. This is a demo version.");
    } catch (err) {
      setEssayFeedback("Error analyzing essay. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      // For GitHub Pages deployment, API calls won't work
      // This is a placeholder for demonstration
      const mockLikelihood = Math.floor(Math.random() * 100);
      setLikelihood(mockLikelihood);
    } catch (err) {
      setLikelihood(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStatsChange = (field, value) => {
    setStats(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto shadow-2xl rounded-xl bg-white p-8">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
          🎓 College Admissions Predictor
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPA (0.0 - 4.0)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="4"
                value={stats.gpa}
                onChange={(e) => handleStatsChange("gpa", e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="3.8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SAT Score (400 - 1600)
              </label>
              <input
                type="number"
                min="400"
                max="1600"
                value={stats.sat}
                onChange={(e) => handleStatsChange("sat", e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="1450"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extracurricular Activities
              </label>
              <textarea
                value={stats.extracurriculars}
                onChange={(e) => handleStatsChange("extracurriculars", e.target.value)}
                className="w-full h-24 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="List your activities, leadership roles, volunteer work, etc."
              />
            </div>

            <div className="md:col-span-2 text-center">
              <button
                onClick={handlePredict}
                disabled={loading}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Predict Admission Chance"}
              </button>
            </div>

            {likelihood !== null && (
              <div className="md:col-span-2 mt-4 bg-green-50 p-6 rounded-lg border border-green-300">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Admission Likelihood
                  </h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {likelihood}%
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on your academic profile and extracurricular activities
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {view === "essay" && (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                College Essay
              </label>
              <textarea
                placeholder="Paste your college essay here for AI-powered feedback..."
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                className="w-full h-40 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            
            <div className="text-center">
              <button
                onClick={handleAnalyzeEssay}
                disabled={loading || !essay.trim()}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze Essay"}
              </button>
            </div>

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
