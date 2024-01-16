"use client"
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  doc,
  query,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import ChallengesList from "@/app/components/ChallengesList";
import NavBar from "@/app/components/NavBar";
import AddChallengeModal from "@/app/components/AddChallengeModal";
import {  useSelector } from "react-redux";
import { selectUser } from "@/app/store/userSlice";
import { useRouter } from "next/navigation";
const HomePage = () => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const [challengesList, setChallengesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    tags: [],
  });
  useEffect(() => {
    if(!user.id) {
      router.push("/signin");
    }
  }, [user]);
  const addChallenge = async (e) => {
    e.preventDefault();
    try {
      const newChallengeRef = await addDoc(collection(db, "challenges"), {
        ...newChallenge,
        createdAt: Timestamp.fromDate(new Date()),
        upvotes: 0,
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
    if(user.id){
      const items = query(collection(db, "challenges"));
      const unsub = onSnapshot(items, (snapshot) => {
        let itemArray = [];
        snapshot.forEach((doc) => {
          itemArray.push({ ...doc.data(), id: doc.id });
        });
        setChallengesList(itemArray);
      });
      return () => unsub();
    }
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
    <div className="p-10">
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
