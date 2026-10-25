import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  AlertCircle,
  FileText
} from "lucide-react";
import { mindbloomStorage } from "../utils/mindbloomStorage";

export default function Questionnaire({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    childName: "Aarav M.",
    age: "4",

    playAlone: "yes",
    eyeContact: "yes",
    emotions: "yes",
    conversation: "no",
    respondName: "yes",

    firstWords: "22",
    twoWordPhrases: "32",
    eyeContactAge: "8",
    socialSmileAge: "5",

    socialDelay: 6,
    repetitiveSeverity: 7,

    sensitive: "yes",
    familyHistory: "no",
    jaundice: "no",
  });

  const [assessmentResult, setAssessmentResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateAssessment = () => {
    // 1. Social & Communication score (0 - 100)
    let socialRaw = 0;
    if (formData.playAlone === "yes") socialRaw += 18;
    if (formData.eyeContact === "yes") socialRaw += 22; // avoids eye contact
    if (formData.emotions === "yes") socialRaw += 18; // struggles with emotions
    if (formData.conversation === "yes") socialRaw += 18;
    if (formData.respondName === "yes") socialRaw += 24; // does not respond to name
    const socialScore = Math.min(100, Math.round(socialRaw + (Number(formData.socialDelay) * 3)));

    // 2. Developmental Milestones score (0 - 100)
    let milestoneRaw = 20;
    const fw = Number(formData.firstWords) || 12;
    if (fw > 18) milestoneRaw += 25;
    if (fw > 24) milestoneRaw += 20;

    const tw = Number(formData.twoWordPhrases) || 24;
    if (tw > 28) milestoneRaw += 25;

    const ss = Number(formData.socialSmileAge) || 2;
    if (ss > 4) milestoneRaw += 15;
    const milestoneScore = Math.min(100, milestoneRaw);

    // 3. Behavioral Severity score (0 - 100)
    const rep = Number(formData.repetitiveSeverity) || 5;
    let behaviorRaw = rep * 9;
    if (formData.sensitive === "yes") behaviorRaw += 20;
    const behaviorScore = Math.min(100, behaviorRaw);

    // 4. Medical History score (0 - 100)
    let medRaw = 20;
    if (formData.familyHistory === "yes") medRaw += 35;
    if (formData.jaundice === "yes") medRaw += 25;
    const medScore = Math.min(100, medRaw);

    // Composite Weighted Risk Score (0 - 100%)
    const compositeRisk = Math.round(
      (socialScore * 0.40) +
      (milestoneScore * 0.25) +
      (behaviorScore * 0.25) +
      (medScore * 0.10)
    );

    let riskLevel = "Moderate Risk";
    let badgeColor = "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300";
    if (compositeRisk < 45) {
      riskLevel = "Low Risk / Typical Variation";
      badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300";
    } else if (compositeRisk > 70) {
      riskLevel = "Elevated Risk / Evaluation Recommended";
      badgeColor = "bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300";
    }

    const result = {
      completed: true,
      childName: formData.childName || "Aarav M.",
      age: formData.age || 4,
      riskScore: compositeRisk,
      riskLevel,
      badgeColor,
      domainScores: {
        socialCommunication: socialScore,
        developmentalMilestones: milestoneScore,
        behavioralSeverity: behaviorScore,
        medicalHistory: medScore
      },
      summary: compositeRisk > 65
        ? "AI clinical decision rules detected moderate-to-elevated markers in social response, joint attention, and speech milestone timing. Structured therapy support and developmental consultation are suggested."
        : "Early indicators show mostly typical developmental variation with mild sensitivities. Periodic checkups recommended.",
      answers: formData
    };

    mindbloomStorage.saveQuestionnaire(result);
    setAssessmentResult(result);
    setShowModal(true);
  };

  const YesNoQuestion = ({ label, field, hint }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition">
      <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-1">{label}</h3>
      {hint && <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{hint}</p>}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => handleChange(field, "yes")}
          className={`px-8 py-2.5 rounded-xl font-medium border transition cursor-pointer ${
            formData[field] === "yes"
              ? "bg-violet-600 text-white border-violet-600 shadow-sm"
              : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          Yes
        </button>

        <button
          type="button"
          onClick={() => handleChange(field, "no")}
          className={`px-8 py-2.5 rounded-xl font-medium border transition cursor-pointer ${
            formData[field] === "no"
              ? "bg-violet-600 text-white border-violet-600 shadow-sm"
              : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          No
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 transition-colors duration-300">

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="max-w-5xl mx-auto p-6 md:p-10">

        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
          Behavioral Questionnaire
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          Complete the standardized early developmental screening questions for AI-assisted neurodevelopmental risk assessment.
        </p>

        {/* Progress Bar Indicator */}
        <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-3 mb-10 overflow-hidden">
          <div className="bg-violet-600 h-3 rounded-full w-full"></div>
        </div>

        {/* Child Information Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8 mb-8 border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <Brain className="text-violet-600" size={24} />
            Child Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Child Name / Identification
              </label>
              <input
                type="text"
                placeholder="e.g. Aarav M."
                value={formData.childName}
                onChange={(e) => handleChange("childName", e.target.value)}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Child Age (Years)
              </label>
              <input
                type="number"
                placeholder="e.g. 4"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Social Communication */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Social & Communication Indicators
          </h2>

          <YesNoQuestion
            label="Prefers to play alone rather than engaging with peers?"
            field="playAlone"
            hint="Observes whether child isolates during group play or actively initiates shared interaction."
          />

          <YesNoQuestion
            label="Frequently avoids direct or joint eye contact?"
            field="eyeContact"
            hint="Consistently looks away or finds sustained gaze uncomfortable during social talking."
          />

          <YesNoQuestion
            label="Struggles with understanding or expressing emotional states?"
            field="emotions"
            hint="Difficulty reading caregiver facial cues or expressing distress other than crying/meltdowns."
          />

          <YesNoQuestion
            label="Demonstrates noticeable difficulty in back-and-forth conversation?"
            field="conversation"
            hint="Includes echolalia (repeating words verbatim) or inability to maintain reciprocal verbal turn-taking."
          />

          <YesNoQuestion
            label="Does not respond reliably when their name is called aloud?"
            field="respondName"
            hint="Hearing is normal, but child consistently does not orient or turn toward the speaker."
          />
        </div>

        {/* Development Milestones */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8 mb-8 border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Development Milestones (Age in Months)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age at First Words (typical: 10–14 mos)
              </label>
              <input
                type="number"
                placeholder="Months"
                value={formData.firstWords}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-violet-500"
                onChange={(e) => handleChange("firstWords", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age at 2-Word Phrases (typical: 18–24 mos)
              </label>
              <input
                type="number"
                placeholder="Months"
                value={formData.twoWordPhrases}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-violet-500"
                onChange={(e) => handleChange("twoWordPhrases", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age of Sustained Eye Contact (typical: 4–6 mos)
              </label>
              <input
                type="number"
                placeholder="Months"
                value={formData.eyeContactAge}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-violet-500"
                onChange={(e) => handleChange("eyeContactAge", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age of Social Smile (typical: 2–3 mos)
              </label>
              <input
                type="number"
                placeholder="Months"
                value={formData.socialSmileAge}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-violet-500"
                onChange={(e) => handleChange("socialSmileAge", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Severity Sliders */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-8 mb-8 border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Severity Assessment
          </h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Social Communication Delay Intensity (0 = None, 10 = Severe)
              </label>
              <span className="font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-3 py-1 rounded-lg">
                Score: {formData.socialDelay} / 10
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={formData.socialDelay}
              onChange={(e) => handleChange("socialDelay", e.target.value)}
              className="w-full accent-violet-600 cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-gray-800 dark:text-gray-200">
                Repetitive Behavior / Motor Mannerisms Severity
              </label>
              <span className="font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-3 py-1 rounded-lg">
                Score: {formData.repetitiveSeverity} / 10
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={formData.repetitiveSeverity}
              onChange={(e) => handleChange("repetitiveSeverity", e.target.value)}
              className="w-full accent-violet-600 cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            />
          </div>
        </div>

        {/* Medical History */}
        <div className="space-y-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Medical & Sensory History
          </h2>

          <YesNoQuestion
            label="Highly sensitive to sensory stimuli (loud sounds, bright lights, textures)?"
            field="sensitive"
          />

          <YesNoQuestion
            label="Family history of neurodevelopmental conditions or autism spectrum?"
            field="familyHistory"
          />

          <YesNoQuestion
            label="History of jaundice, neonatal ICU admission, or birth complications?"
            field="jaundice"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={calculateAssessment}
          type="button"
          className="w-full bg-violet-600 text-white py-5 rounded-2xl text-xl font-bold hover:bg-violet-700 transition shadow-lg hover:shadow-violet-200 dark:hover:shadow-none flex items-center justify-center gap-3 cursor-pointer"
        >
          <Sparkles size={24} />
          Generate AI Risk Assessment
        </button>

      </div>

      {/* ================= ASSESSMENT RESULTS MODAL ================= */}
      {showModal && assessmentResult && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-gray-100 dark:border-gray-800 relative">
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-violet-600 dark:text-violet-400 block mb-1">
                  AI Behavioral Assessment Result
                </span>
                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {assessmentResult.childName} (Age {assessmentResult.age})
                </h3>
              </div>
              <span className={`px-4 py-2 rounded-xl text-sm font-bold border ${assessmentResult.badgeColor}`}>
                {assessmentResult.riskLevel}
              </span>
            </div>

            {/* Score Ring / Bar */}
            <div className="bg-slate-50 dark:bg-gray-800/60 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-gray-100 dark:border-gray-700">
              <div className="text-center sm:text-left">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                  Overall Behavioral Risk Probability
                </span>
                <span className="text-6xl font-black text-violet-600 dark:text-violet-400">
                  {assessmentResult.riskScore}%
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm leading-relaxed">
                {assessmentResult.summary}
              </p>
            </div>

            {/* Domain Scores Breakdown */}
            <div className="space-y-3 mb-8">
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Domain Indicator Breakdown
              </h4>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
                  <span>Social & Joint Attention Delay</span>
                  <span>{assessmentResult.domainScores.socialCommunication}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-violet-600 h-2 rounded-full" 
                    style={{ width: `${assessmentResult.domainScores.socialCommunication}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
                  <span>Developmental Milestone Timing</span>
                  <span>{assessmentResult.domainScores.developmentalMilestones}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${assessmentResult.domainScores.developmentalMilestones}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
                  <span>Repetitive & Sensory Behaviors</span>
                  <span>{assessmentResult.domainScores.behavioralSeverity}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-amber-500 h-2 rounded-full" 
                    style={{ width: `${assessmentResult.domainScores.behavioralSeverity}%` }}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 leading-relaxed flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
              This assessment is an early screening decision support aid and does not constitute a formal medical diagnosis.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/reports")}
                className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-3.5 px-6 rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <FileText size={18} />
                View Full AI Clinical Report
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold transition cursor-pointer"
              >
                Close & Edit Answers
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}