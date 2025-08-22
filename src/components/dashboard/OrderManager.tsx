import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingBag, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import api from '../../lib/api';

interface OrderItem {
  productId: string;
  title: string;
  priceCents: number;
  quantity: number;
  imageUrl?: string;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

interface Order {
  _id: string;
  storeId: string;
  items: OrderItem[];
  customer: Customer;
  totals: {
    subtotalCents: number;
    grandTotalCents: number;
  };
  status: string;
  createdAt: string;
}

const OrderManager: React.FC = () => {
  const { storeId } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!storeId) return;
      try {
        const res = await api.get(`/orders/store/${storeId}`);
        setOrders(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.message || 'שגיאה בטעינת הזמנות');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [storeId]);

  if (loading) return <div className="p-6">טוען...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">הזמנות</h1>
          <p className="text-gray-600 mt-1">ניהול הזמנות החנות</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              אין הזמנות עדיין
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              הזמנות יופיעו כאן כאשר לקוחות יבצעו הזמנות
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      הזמנה #{order._id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('he-IL')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status === 'sent' ? 'נשלחה' : order.status}
                  </span>
                </div>

                {/* פרטי לקוח */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    פרטי לקוח
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">{order.customer.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">{order.customer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">{order.customer.phone}</span>
                    </div>
                    {order.customer.address && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">{order.customer.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* פריטי ההזמנה */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-3">פריטי ההזמנה</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center">
                          {item.imageUrl && (
                            <img src={item.imageUrl} alt={item.title} className="w-10 h-10 object-cover rounded mr-3" />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">כמות: {item.quantity}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">
                            ₪{((item.priceCents * item.quantity) / 100).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            ₪{(item.priceCents / 100).toFixed(2)} ליחידה
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* סה"כ */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">סה"כ לתשלום</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ₪{(order.totals.grandTotalCents / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManager;

