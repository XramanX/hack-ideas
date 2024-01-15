export const Tag = ({ tag, onDelete }) => (
  <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
    {tag}
    <button
      type="button"
      onClick={() => onDelete(tag)}
      className="ml-2 focus:outline-none"
    >
      &times;
    </button>
  </div>
);
