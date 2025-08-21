// src/pages/dashboard/NewStore.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Store, AlertCircle } from "lucide-react";

const NewStore: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name || !description) {
      setError("אנא מלא את כל השדות");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/stores`, {
        name,
        description,
      });
      navigate("/dashboard/stores");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "שגיאה ביצירת החנות");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-2 mb-4">
          <Store className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">צור חנות חדשה</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="ml-2 text-red-800 text-sm">{error}</span>
            </div>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              שם החנות
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="לדוגמה: חנות פרחים"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              תיאור החנות
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="תיאור קצר על החנות שלך"
              rows={3}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "יוצר..." : "צור חנות"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewStore;
