import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  query,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import ChallengesList from "./ChallengesList";
import NavBar from "./NavBar";
import AddChallengeModal from "./AddChallengeModal";

const HomePage = () => {
  const [challengesList, setChallengesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    tags: [],
  });

  const addChallenge = async (e) => {
    e.preventDefault();
    try {
      const newChallengeRef = await addDoc(collection(db, "challenges"), {
        ...newChallenge,
        createdAt: Timestamp.fromDate(new Date()),
        upvotes: 0,
      });

      // setChallengesList((prevChallenges) => [
      //   ...prevChallenges,
      //   {
      //     ...newChallenge,
      //     id: newChallengeRef.id,
      //     createdAt: new Date(),
      //     upvotes: 0,
      //   },
      // ]);

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
    const items = query(collection(db, "challenges"));
    const unsub = onSnapshot(items, (snapshot) => {
      let itemArray = [];
      snapshot.forEach((doc) => {
        itemArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(itemArray);
      setChallengesList(itemArray);
    });
    return () => unsub();
  }, []);

  const handleAddChallengeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onVote = async (id) => {
    try {
      const challengeRef = doc(db, "challenges", id);
      await updateDoc(challengeRef, {
        votes:
          challengesList.find((challenge) => challenge.id === id).votes + 1,
      });
    } catch (error) {
      console.error("Error updating upvotes:", error);
    }
  };
  return (
    <div>
      <NavBar
        onAddChallengeClick={handleAddChallengeClick}
        title="Hack Ideas"
      />
      <AddChallengeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={addChallenge}
        newChallenge={newChallenge}
        setNewChallenge={setNewChallenge}
      />
      <ul>
        <ChallengesList challenges={challengesList} onVote={onVote} />
      </ul>
    </div>
  );
};

export default HomePage;
