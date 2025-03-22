"use client";
import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../Config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log(auth?.currentUser?.email);
    console.log(auth?.currentUser?.photoURL);
  }, []);

  const Signin = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/CRUD");
    } catch (err) {
      console.log(err);
    }
  };

  const SigninWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/CRUD");
    } catch (err) {
      console.log(err);
    }
  };

  const Logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 relative overflow-hidden">
      {/* Background with Slant Line */}
      <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
        <div
          className="w-full md:w-1/2 h-48 md:h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/cyberpunk.jpg')`,
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
          }}
        ></div>
        <div
          className="w-full md:w-1/2 h-48 md:h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/spiderman.jpg')`,
            clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        ></div>
      </div>

      {/* Auth Form */}
      <div className="bg-gray-800 bg-opacity-90 shadow-2xl rounded-lg p-6 sm:p-8 w-full max-w-sm z-10">
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 sm:mb-6">
          Welcome to Gameify Authentication
        </h3>
        <p className="text-center font-bold text-white text-sm sm:text-lg mb-4">
          Created by Arfan Pathan
        </p>

        <input
          className="w-full px-4 py-2 mb-3 border-2 border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white placeholder-purple-400 transition-all hover:border-purple-500"
          placeholder="Email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full px-4 py-2 mb-3 border-2 border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white placeholder-purple-400 transition-all hover:border-purple-500"
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 active:scale-95"
          onClick={Signin}
        >
          Sign In
        </button>

        <button
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg mt-3 hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 active:scale-95"
          onClick={SigninWithGoogle}
        >
          Sign In with Google
        </button>

        <button
          className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 rounded-lg mt-3 hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105 active:scale-95"
          onClick={Logout}
        >
          Logout
        </button>

        {/* Social Links */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center space-y-2 text-gray-400 text-xs sm:text-sm">
          <p className="text-white font-semibold">Follow Me for More:</p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/Arfan2444"
              target="_blank"
              className="text-white hover:text-blue-200 transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/arfan-pathan-82aab2312/"
              target="_blank"
              className="text-white hover:text-blue-200 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
