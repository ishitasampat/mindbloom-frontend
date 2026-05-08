import Navbar from "../components/Navbar";

export default function Questionnaire() {
  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-4xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-3">
          Behavioral Questionnaire
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Complete the questionnaire for AI-assisted behavioral assessment.
        </p>

        <div className="bg-white rounded-3xl shadow-sm p-10">

          <div className="mb-8">

            <label className="block text-2xl font-semibold mb-4">
              Does the child maintain eye contact during interaction?
            </label>

            <select className="w-full p-4 rounded-2xl border border-gray-300">
              <option>Select an option</option>
              <option>Always</option>
              <option>Sometimes</option>
              <option>Rarely</option>
              <option>Never</option>
            </select>

          </div>

          <div className="mb-8">

            <label className="block text-2xl font-semibold mb-4">
              Does the child respond when their name is called?
            </label>

            <select className="w-full p-4 rounded-2xl border border-gray-300">
              <option>Select an option</option>
              <option>Always</option>
              <option>Sometimes</option>
              <option>Rarely</option>
              <option>Never</option>
            </select>

          </div>

          <div className="mb-8">

            <label className="block text-2xl font-semibold mb-4">
              Does the child display repetitive behavior patterns?
            </label>

            <select className="w-full p-4 rounded-2xl border border-gray-300">
              <option>Select an option</option>
              <option>Frequently</option>
              <option>Sometimes</option>
              <option>Rarely</option>
              <option>Never</option>
            </select>

          </div>

          <button className="bg-violet-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold">
            Generate Assessment
          </button>

        </div>

      </div>

    </div>
  );
}