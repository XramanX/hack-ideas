import React, { useState, useEffect } from "react";
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";
import { Tag } from "./Tag";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const ChallengesList = ({ challenges, onVote, userId }) => {
  const calculateTimeDifference = (timestamp) => {
    const now = new Date();
    const createdAt = new Date(timestamp.toDate());
    const timeDifference = now - createdAt;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "Just now";
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };

  const [showFullDescription, setShowFullDescription] = useState({});

  const toggleDescription = (challengeId) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [challengeId]: !prev[challengeId],
    }));
  };

  return (
    <ul className="grid gap-3 grid-cols-1 lg:grid-cols-1 mt-5">
      {challenges.map((challenge) => (
        <li
          key={challenge.id}
          className="text-white p-4 rounded-md shadow-md border border-white"
        >
          <div className="flex w-full justify-between">
            <p className="text-md font-bold">{`@${challenge?.createdBy}`}</p>
            <p className="text-xs">
              {calculateTimeDifference(challenge?.createdAt)}
            </p>
          </div>
          <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>

          <p className="mb-2 text-base sm:text-lg">
            {showFullDescription[challenge.id]
              ? challenge?.description
              : truncateDescription(challenge?.description, 100)}
            {challenge?.description.length > 100 && (
              <button
                className="text-blue-500 hover:underline text-sm ml-2"
                onClick={() => toggleDescription(challenge.id)}
              >
                {showFullDescription[challenge.id] ? "Show less" : "Show more"}
              </button>
            )}
          </p>

          <p>
            {challenge?.tags?.map((tag) => (
              <Tag key={tag} tag={tag} isAdding={false} />
            ))}
          </p>
          <div className="flex items-center mt-2">
            <button
              onClick={() => onVote(challenge.id)}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <span className="flex items-center justify-center mx-auto text-gray-600 pr-2 text-sm">
                {challenge.votes.totalVotes}
              </span>
              {challenge.votes.votes.includes(userId) ? (
                <BiSolidUpvote className="mr-1" />
              ) : (
                <BiUpvote className="mr-1" />
              )}
              Upvote
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChallengesList;
