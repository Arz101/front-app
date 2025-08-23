import FileInput from "./InputDesign";


export default function Create() {
  return (
    <div className="bg-white rounded-lg shadow mb-4 p-6 hover:shadow-md transition-shadow">

      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-medium text-xs">
            Tú
          </span>
        </div>
        <div className="flex-1">
          <textarea
            placeholder="Make a Post..."
            className="w-full !resize-none p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            rows="2"
          />
          <FileInput/>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">
              Máximo 500 caracteres
            </span>
            <button
              className="bg-gray-500 rounded hover:bg-gray-600 text-white px-4 py-1.5  text-sm font-medium transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}