import React from "react";
import { BiUpvote } from "react-icons/bi";

const ChallengesList = ({ challenges, onVote }) => {
  return (
    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 mt-5">
      {challenges.map((challenge) => (
        <li key={challenge.id} className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-gray-700  text-lg font-semibold mb-2">
            {challenge.title}
          </h3>
          <p className="text-gray-700 mb-2">{challenge?.description}</p>
          <p className="text-gray-600">Tags: {challenge?.tags?.join(", ")}</p>
          <div className="flex gap-10 items-center mt-2">
            <p className="text-gray-600 pr-2">Votes: {challenge.votes}</p>
            <button
              onClick={() => onVote(challenge.id)}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <BiUpvote className="mr-1" />
              Upvote
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChallengesList;
