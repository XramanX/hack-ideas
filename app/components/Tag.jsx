export const Tag = ({ tag, onDelete, isAdding = true }) => (
  <div className="inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    {tag}
    {isAdding ? (
      <button
        type="button"
        onClick={() => onDelete(tag)}
        className="ml-2 focus:outline-none"
      >
        &times;
      </button>
    ) : (
      <></>
    )}
  </div>
);
