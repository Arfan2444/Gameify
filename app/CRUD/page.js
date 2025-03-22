"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Config/firebase";

function CRUD() {
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [gameoftheyear, setGameofTheyear] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const FetchGames = useCallback(async () => {
    try {
      const data = await getDocs(collection(db, "Games"));
      setGames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error Fetching Document", error);
    }
  }, []);

  useEffect(() => {
    FetchGames();
  }, [FetchGames]);

  const AddGame = async () => {
    if (!title || !rating || !gameoftheyear) {
      alert("Please fill all fields");
      return;
    }

    try {
      const image = await fetchGameImage(title);
      setImageUrl(image || "");
      await addDoc(collection(db, "Games"), {
        Title: title,
        Ratings: rating,
        GameOfTheYear: gameoftheyear,
        ImageUrl: image || "",
        Developer: "Arfan Pathan",
      });
      FetchGames();
      setTitle("");
      setRating("");
      setGameofTheyear("");
      setImageUrl("");
    } catch (error) {
      console.error("Error Handling Document", error);
    }
  };

  const UpdateGame = async (id) => {
    if (!title || !rating || !gameoftheyear) {
      alert("Please fill all fields");
      return;
    }

    try {
      const image = await fetchGameImage(title);
      setImageUrl(image || "");
      await updateDoc(doc(db, "Games", id), {
        Title: title,
        Ratings: rating,
        GameOfTheYear: gameoftheyear,
        ImageUrl: image || "",
      });
      FetchGames();
    } catch (err) {
      console.error("Error Updating Field", err);
    }
  };

  const DeleteGame = async (id) => {
    try {
      await deleteDoc(doc(db, "Games", id));
      FetchGames();
    } catch (err) {
      console.error("Error Deleting Document", err);
    }
  };

  const fetchGameImage = async (gameTitle) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?search=${gameTitle}&key=197e8ea5bfe547e0962808c0e3861aa1`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].background_image;
      }
    } catch (err) {
      console.log("Error fetching Image", err);
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black p-4 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-lg shadow-2xl border-2 border-purple-800">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
          Gameify
        </h2>

        {/* Add Game Form */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-purple-300 mb-3">
            Add New Game
          </h3>
          <div className="space-y-3">
            <input
              className="w-full px-4 py-2 border-2 border-purple-700 rounded-lg bg-gray-800 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 border-2 border-purple-700 rounded-lg bg-gray-800 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Rating"
              value={rating}
              type="number"
              onChange={(e) => setRating(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 border-2 border-purple-700 rounded-lg bg-gray-800 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Game of the Year: Yes or No"
              value={gameoftheyear}
              onChange={(e) => setGameofTheyear(e.target.value)}
            />
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 active:scale-95"
              onClick={AddGame}
            >
              Add Game
            </button>
          </div>
        </div>

        {/* Display Games */}
        <div>
          <h3 className="text-lg font-semibold text-purple-300 mb-3">
            Game List
          </h3>
          <div className="space-y-3">
            {games.length > 0 ? (
              games.map((game) => (
                <div
                  key={game.id}
                  className="p-4 border-2 border-purple-800 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
                >
                  {game.ImageUrl && (
                    <div className="w-full h-48 flex justify-center items-center overflow-hidden rounded-lg mb-3">
                      <img
                        src={
                          game.ImageUrl || "https://via.placeholder.com/300x200"
                        }
                        alt={game.Title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    {game.Title}
                  </h3>
                  <p className="text-purple-200 mt-1">
                    Ratings: {game.Ratings}
                  </p>
                  <p className="text-purple-200">
                    Game of the Year: {game.GameOfTheYear}
                  </p>
                  <div className="mt-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 active:scale-95"
                      onClick={() => UpdateGame(game.id)}
                    >
                      Update
                    </button>
                    <button
                      className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 active:scale-95"
                      onClick={() => DeleteGame(game.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-purple-200">No games found. Add a new game!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CRUD;
