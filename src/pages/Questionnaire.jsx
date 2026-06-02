import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Questionnaire() {
  const [formData, setFormData] = useState({
    age: "",

    playAlone: "",
    eyeContact: "",
    emotions: "",
    conversation: "",
    respondName: "",

    firstWords: "",
    twoWordPhrases: "",
    eyeContactAge: "",
    socialSmileAge: "",

    socialDelay: 5,
    repetitiveSeverity: 5,

    sensitive: "",
    familyHistory: "",
    jaundice: "",
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    alert("Assessment generation coming soon!");
  };

  const YesNoQuestion = ({ label, field }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="font-semibold text-lg mb-4">{label}</h3>

      <div className="flex gap-4">
        <button
          onClick={() => handleChange(field, "yes")}
          className={`px-6 py-2 rounded-xl border ${
            formData[field] === "yes"
              ? "bg-violet-600 text-white"
              : "bg-white"
          }`}
        >
          Yes
        </button>

        <button
          onClick={() => handleChange(field, "no")}
          className={`px-6 py-2 rounded-xl border ${
            formData[field] === "no"
              ? "bg-violet-600 text-white"
              : "bg-white"
          }`}
        >
          No
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-3">
          Behavioral Questionnaire
        </h1>

        <p className="text-gray-600 mb-8">
          Complete the screening questionnaire for AI-assisted autism risk assessment.
        </p>

        {/* Progress */}
        <div className="bg-gray-200 rounded-full h-3 mb-10">
          <div className="bg-violet-600 h-3 rounded-full w-full"></div>
        </div>

        {/* Child Information */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Child Information
          </h2>

          <input
            type="number"
            placeholder="Child Age"
            value={formData.age}
            onChange={(e) =>
              handleChange("age", e.target.value)
            }
            className="w-full p-4 border rounded-2xl"
          />
        </div>

        {/* Social Communication */}
        <div className="space-y-6 mb-8">

          <h2 className="text-2xl font-bold">
            Social & Communication
          </h2>

          <YesNoQuestion
            label="Prefers to play alone?"
            field="playAlone"
          />

          <YesNoQuestion
            label="Avoids eye contact?"
            field="eyeContact"
          />

          <YesNoQuestion
            label="Struggles with emotions?"
            field="emotions"
          />

          <YesNoQuestion
            label="Difficulty in conversation?"
            field="conversation"
          />

          <YesNoQuestion
            label="Does not respond when name is called?"
            field="respondName"
          />
        </div>

        {/* Development */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Development Milestones
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="number"
              placeholder="Age at first words"
              className="p-4 border rounded-2xl"
              onChange={(e) =>
                handleChange("firstWords", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Age at 2-word phrases"
              className="p-4 border rounded-2xl"
              onChange={(e) =>
                handleChange("twoWordPhrases", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Age of eye contact"
              className="p-4 border rounded-2xl"
              onChange={(e) =>
                handleChange("eyeContactAge", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Age of social smile"
              className="p-4 border rounded-2xl"
              onChange={(e) =>
                handleChange("socialSmileAge", e.target.value)
              }
            />

          </div>
        </div>

        {/* Severity */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Severity Assessment
          </h2>

          <div className="mb-8">

            <label className="font-medium">
              Social Communication Delay ({formData.socialDelay})
            </label>

            <input
              type="range"
              min="0"
              max="10"
              value={formData.socialDelay}
              onChange={(e) =>
                handleChange("socialDelay", e.target.value)
              }
              className="w-full"
            />
          </div>

          <div>

            <label className="font-medium">
              Repetitive Behavior Severity ({formData.repetitiveSeverity})
            </label>

            <input
              type="range"
              min="0"
              max="10"
              value={formData.repetitiveSeverity}
              onChange={(e) =>
                handleChange(
                  "repetitiveSeverity",
                  e.target.value
                )
              }
              className="w-full"
            />
          </div>

        </div>

        {/* Medical */}
        <div className="space-y-6 mb-10">

          <h2 className="text-2xl font-bold">
            Medical History
          </h2>

          <YesNoQuestion
            label="Sensitive to sound/light?"
            field="sensitive"
          />

          <YesNoQuestion
            label="Family history of autism?"
            field="familyHistory"
          />

          <YesNoQuestion
            label="Jaundice at birth?"
            field="jaundice"
          />

        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-violet-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-violet-700 transition"
        >
          Generate Assessment
        </button>

      </div>

    </div>
  );
}