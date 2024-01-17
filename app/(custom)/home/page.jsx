"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  doc,
  query,
  onSnapshot,
  Timestamp,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import ChallengesList from "@/app/components/ChallengesList";
import NavBar from "@/app/components/NavBar";
import AddChallengeModal from "@/app/components/AddChallengeModal";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/store/userSlice";
import { useRouter } from "next/navigation";
import SortComponent from "@/app/components/SortComponent";

const HomePage = () => {
  const router = useRouter();
  const [challengesList, setChallengesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    tags: [],
    votes: {},
  });
  const [storedEmployeeId, setStoredEmployeeId] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [sortOption, setSortOption] = useState("created-desc");

  useEffect(() => {
    const storedId = localStorage.getItem("employeeId");
    const dispName = localStorage.getItem("displayName");

    if (storedId) {
      setStoredEmployeeId(storedId);
      setDisplayName(dispName);
    } else {
      router.push("/");
    }
  }, [router]);

  const addChallenge = async (e) => {
    const storedId = localStorage.getItem("employeeId");
    e.preventDefault();
    try {
      const newChallengeRef = await addDoc(collection(db, "challenges"), {
        ...newChallenge,
        createdAt: Timestamp.fromDate(new Date()),
        votes: { totalVotes: 0, votes: [] },
        createdBy: storedId,
      });

      setNewChallenge({
        title: "",
        description: "",
        tags: [],
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding challenge:", error);
    }
  };

  useEffect(() => {
    if (storedEmployeeId) {
      let items;

      switch (sortOption) {
        case "created-asc":
          items = query(
            collection(db, "challenges"),
            orderBy("createdAt", "asc")
          );
          break;
        case "created-desc":
          items = query(
            collection(db, "challenges"),
            orderBy("createdAt", "desc")
          );
          break;
        case "votes-asc":
          items = query(
            collection(db, "challenges"),
            orderBy("votes.totalVotes", "asc")
          );
          break;
        case "votes-desc":
          items = query(
            collection(db, "challenges"),
            orderBy("votes.totalVotes", "desc")
          );
          break;
        default:
          items = query(
            collection(db, "challenges"),
            orderBy("createdAt", "desc")
          );
      }

      const unsub = onSnapshot(items, (snapshot) => {
        let itemArray = [];
        snapshot.forEach((doc) => {
          itemArray.push({ ...doc.data(), id: doc.id });
        });
        setChallengesList(itemArray);
      });

      return () => unsub();
    }
  }, [storedEmployeeId, sortOption]);

  const handleSortChange = (option) => {
    setSortOption(option);
    console.log(option);
  };

  const handleAddChallengeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onVote = async (id) => {
    try {
      const challengeRef = doc(db, "challenges", id);
      const challenge = challengesList.find((challenge) => challenge.id === id);

      const currentVotes = challenge.votes;

      if (currentVotes.votes.includes(storedEmployeeId)) {
        await updateDoc(challengeRef, {
          votes: {
            totalVotes: currentVotes.totalVotes - 1,
            votes: currentVotes.votes.filter(
              (userId) => userId !== storedEmployeeId
            ),
          },
        });
      } else {
        await updateDoc(challengeRef, {
          votes: {
            totalVotes: currentVotes.totalVotes + 1,
            votes: [...currentVotes.votes, storedEmployeeId],
          },
        });
      }
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };

  return (
    <div className="min-h-screen p-10">
      <NavBar
        onAddChallengeClick={handleAddChallengeClick}
        title="Hack Ideas"
        user={displayName}
      />
      <div className="container mx-auto p-8 w-full lg:w-[800px]  items-center">
        <SortComponent onSort={handleSortChange} />
        <AddChallengeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={addChallenge}
          newChallenge={newChallenge}
          setNewChallenge={setNewChallenge}
        />
        <ChallengesList
          challenges={challengesList}
          onVote={onVote}
          userId={storedEmployeeId}
        />
      </div>
    </div>
  );
};

export default HomePage;
