"use client";
import React, { useEffect } from "react";
import { auth } from "../Config/firebase";
import { useRouter } from "next/navigation";

function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/"); // Redirect to Auth page if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  return children;
}

export default ProtectedRoute;
