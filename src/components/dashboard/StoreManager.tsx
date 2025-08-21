// src/pages/dashboard/StoreManager.tsx
import React, { useState, useEffect } from "react";
import { Plus, Store, Trash2, ExternalLink, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/api";

const StoreManager: React.FC = () => {
  const [stores, setStores] = useState<Array<{ _id: string; name: string; slug: string }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await api.get('/stores/my-stores');
        setStores(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('למחוק את החנות? פעולה זו בלתי הפיכה')) return;
    try {
      await api.delete(`/stores/${id}`);
      setStores(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
      alert('מחיקה נכשלה');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* כותרת + כפתור */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">החנויות שלי</h1>
          <Link
            to="/dashboard/stores/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            צור חנות חדשה
          </Link>
        </div>

        {/* רשימת חנויות */}
        {loading ? (
          <div className="text-gray-500">טוען...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div
                key={store._id}
                className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Store className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="text-gray-800 font-medium">{store.name}</div>
                    <div className="text-gray-400 text-sm">/{store.slug}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate(`/dashboard/products/${store._id}`)}
                    title="נהל מוצרים"
                    className="text-gray-600 hover:text-blue-700"
                  >
                    <Package className="h-5 w-5" />
                  </button>
                  <a
                    href={`/store/${store.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="פתח חנות"
                    className="text-gray-600 hover:text-blue-700"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => handleDelete(store._id)}
                    title="מחק"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreManager;
