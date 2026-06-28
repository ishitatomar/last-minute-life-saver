export default function AISuggestion({ aiPlan }) {

  return (

    <div className="bg-gradient-to-r from-violet-700 to-indigo-700 rounded-2xl p-6 shadow-xl mt-8">

      <h2 className="text-2xl font-bold mb-4">
        🤖 AI Suggestions
      </h2>

      {aiPlan ? (

        <div className="whitespace-pre-wrap leading-8 text-gray-100">

          {aiPlan}

        </div>

      ) : (

        <p className="text-violet-100">

          Click
          <span className="font-bold">
            {" "}✨ AI Smart Planner{" "}
          </span>
          to receive personalized suggestions.

        </p>

      )}

    </div>

  );

}