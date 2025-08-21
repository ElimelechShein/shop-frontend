import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Store, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Plus,
  ExternalLink 
} from 'lucide-react';
import api from '../../lib/api';

// הגדרת ממשקים
interface StoreStats {
  totalStores: number;
  totalProducts: number;
  totalOrders: number;
  recentOrders: any[];
}

// API base is handled by api instance

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<StoreStats>({
    totalStores: 0,
    totalProducts: 0,
    totalOrders: 0,
    recentOrders: []
  });
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // טעינת נתונים בעת טעינת הקומפוננטה
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // פונקציה לטעינת נתוני הדשבורד
  const fetchDashboardData = async () => {
    try {
      const storesResponse = await api.get(`/stores/my-stores`);
      setStores(storesResponse.data);
      const storesData = storesResponse.data as any[];
      const [productsCounts, ordersCounts] = await Promise.all([
        Promise.all(storesData.map(s => api.get(`/products/store/${s._id}/all`).then(r => r.data.length).catch(() => 0))),
        Promise.all(storesData.map(s => api.get(`/orders/store/${s._id}`).then(r => r.data.length).catch(() => 0)))
      ]);
      const totalProducts = productsCounts.reduce((a, b) => a + b, 0);
      const totalOrders = ordersCounts.reduce((a, b) => a + b, 0);
      setStats({
        totalStores: storesData.length,
        totalProducts,
        totalOrders,
        recentOrders: []
      });
    } catch (error) {
      console.error('שגיאה בטעינת נתוני הדשבורד:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* כותרת ברוכים הבאים */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Store className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mr-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  ברוך הבא, {user?.email}
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  ניהול החנויות המקוונות שלך
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* כרטיסי סטטיסטיקות */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* סך החנויות */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Store className="h-6 w-6 text-gray-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    סך החנויות
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalStores}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/dashboard/stores"
                className="font-medium text-blue-700 hover:text-blue-900"
              >
                נהל חנויות
              </Link>
            </div>
          </div>
        </div>

        {/* סך המוצרים */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    סך המוצרים
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalProducts}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/dashboard/products"
                className="font-medium text-blue-700 hover:text-blue-900"
              >
                נהל מוצרים
              </Link>
            </div>
          </div>
        </div>

        {/* סך ההזמנות */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingBag className="h-6 w-6 text-gray-400" />
              </div>
              <div className="mr-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    סך ההזמנות
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalOrders}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/dashboard/orders"
                className="font-medium text-blue-700 hover:text-blue-900"
              >
                צפה בהזמנות
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* החנויות שלי */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              החנויות שלי
            </h3>
            <Link
              to="/dashboard/stores"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              צור חנות חדשה
            </Link>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          {stores.length === 0 ? (
            <div className="text-center py-12">
              <Store className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                אין לך חנויות עדיין
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                התחל על ידי יצירת החנות הראשונה שלך
              </p>
              <div className="mt-6">
                <Link
                  to="/dashboard/stores"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  צור חנות חדשה
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stores.map((store) => (
                <div
                  key={store._id}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
                >
                  <div className="flex-shrink-0">
                    <Store className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="focus:outline-none">
                      <span className="absolute inset-0" />
                      <p className="text-sm font-medium text-gray-900">
                        {store.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {store.slug}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href={`/store/${store.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* פעולות מהירות */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            פעולות מהירות
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/dashboard/stores"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Store className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">
                  נהל חנויות
                </span>
              </div>
            </Link>
            
            <Link
              to="/dashboard/products"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Package className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium text-gray-900">
                  הוסף מוצרים
                </span>
              </div>
            </Link>
            
            <Link
              to="/dashboard/orders"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">
                  צפה בהזמנות
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;