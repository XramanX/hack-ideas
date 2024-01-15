import React, { useState } from "react";
import { Tag } from "./Tag";

const AddChallengeModal = ({
  isOpen,
  onClose,
  onSubmit,
  newChallenge,
  setNewChallenge,
}) => {
  const [tagInput, setTagInput] = useState("");
  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
    tags: false,
  });

  const handleTagChange = (e) => {
    setTagInput(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, tags: false }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim() !== "") {
      setNewChallenge({
        ...newChallenge,
        tags: [...newChallenge.tags, tagInput.trim()],
        votes: 0,
      });
      setTagInput("");
      setFormErrors((prevErrors) => ({ ...prevErrors, tags: false }));
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setNewChallenge({
      ...newChallenge,
      tags: newChallenge.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  const validateForm = () => {
    const errors = {
      title: newChallenge.title.trim() === "",
      description: newChallenge.description.trim() === "",
      tags: newChallenge.tags.length === 0,
    };

    setFormErrors(errors);

    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e);
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center text-black">
      <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <form>
          <label className="block mb-4">
            Title:
            <input
              className="w-full border border-gray-300 rounded-md p-2"
              type="text"
              value={newChallenge.title}
              onChange={(e) =>
                setNewChallenge({ ...newChallenge, title: e.target.value })
              }
            />
            {formErrors.title && (
              <p className="text-red-500">Please enter a title</p>
            )}
          </label>
          <label className="block mb-4">
            Description:
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              value={newChallenge.description}
              onChange={(e) =>
                setNewChallenge({
                  ...newChallenge,
                  description: e.target.value,
                })
              }
            />
            {formErrors.description && (
              <p className="text-red-500">Please enter a description</p>
            )}
          </label>
          <label className="block mb-4">
            Tags:
            <div className="flex flex-wrap">
              <input
                className="w-full border border-gray-300 rounded-md p-2"
                type="text"
                value={tagInput}
                onChange={handleTagChange}
                onBlur={handleTagAdd}
                onKeyDown={(e) => e.key === "Enter" && handleTagAdd()}
                placeholder="Add tags..."
              />
              {newChallenge?.tags?.map((tag) => (
                <Tag key={tag} tag={tag} onDelete={handleTagDelete} />
              ))}
              {formErrors.tags && (
                <p className="text-red-500">Please add at least one tag</p>
              )}
            </div>
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Add Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChallengeModal;
