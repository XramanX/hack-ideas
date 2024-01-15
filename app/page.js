"use client";
import Image from "next/image";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { useEffect } from "react";
import HomePage from "./components/homePage";
export default function Home() {
  const addPost = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "challenges"));
  };
  // useEffect(() => {
  //   const items = query(collection(db, "challenges"));
  //   const unsub = onSnapshot(items, (QuerySnapshot) => {
  //     let itemArray = [];
  //     QuerySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   });
  // }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex-col">
        {/* <h1 className="text-4xl p-4 text-center">Hack Ideas</h1> */}
        <HomePage />
      </div>
    </main>
  );
}
