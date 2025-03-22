import React from "react";
import CRUD from "../CRUD/page";
import ProtectedRoute from "../components/ProtectedRoute";

function CRUDPage() {
  return (
    <ProtectedRoute>
      <CRUD></CRUD>
    </ProtectedRoute>
  );
}

export default CRUDPage;
