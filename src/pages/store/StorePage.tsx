import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/api';
import { useCart } from '../../contexts/CartContext';

interface Store {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

interface Product {
  _id: string;
  title: string;
  description?: string;
  priceCents: number;
  imageUrl?: string;
}

const StorePage: React.FC = () => {
  const { slug } = useParams();
  const { items, addToCart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // checkout form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const s = await api.get(`/stores/by-slug/${slug}`);
        setStore(s.data);
        const p = await api.get(`/products/store/${s.data._id}`);
        setProducts(p.data);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.message || 'שגיאה בטעינת החנות');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const subtotalCents = useMemo(() => Math.round(getTotalPrice() * 100), [items]);

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store) return;
    setSending(true);
    try {
      const payload = {
        items: items.map(i => ({
          productId: i._id,
          title: i.name,
          priceCents: Math.round(i.price * 100),
          quantity: i.quantity,
          imageUrl: i.image
        })),
        customer: { name, email, phone, address },
        totals: { subtotalCents, grandTotalCents: subtotalCents }
      };
      await api.post(`/orders/${store._id}`, payload);
      setSent(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert('שליחת הזמנה נכשלה');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="p-6">טוען...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!store) return <div className="p-6">חנות לא נמצאה</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{store.name}</h1>
        {store.description && <p className="text-gray-600 mt-1">{store.description}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p._id} className="bg-white rounded-md shadow p-4 flex flex-col">
              {p.imageUrl && (
                <img src={p.imageUrl} alt={p.title} className="w-full h-48 object-cover rounded mb-3" />
              )}
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-gray-900">{p.title}</div>
                  <div className="text-sm text-gray-500 mt-1 line-clamp-2">{p.description}</div>
                </div>
                <div className="text-gray-900 font-semibold">₪{(p.priceCents / 100).toFixed(2)}</div>
              </div>
              <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => addToCart({ _id: p._id, name: p.title, price: p.priceCents / 100, image: p.imageUrl || '' })}
              >
                הוסף לסל
              </button>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-white rounded-md shadow p-4">
            <h2 className="text-xl font-bold mb-3">העגלה שלי</h2>
            {items.length === 0 ? (
              <div className="text-gray-500">העגלה ריקה</div>
            ) : (
              <div className="space-y-3">
                {items.map((i) => (
                  <div key={i._id} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{i.name}</div>
                      <div className="text-sm text-gray-500">₪{i.price.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(i._id, i.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                      <span>{i.quantity}</span>
                      <button onClick={() => updateQuantity(i._id, i.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                      <button onClick={() => removeFromCart(i._id)} className="text-red-600">הסר</button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>סה"כ</span>
                  <span>₪{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-md shadow p-4 mt-4">
            <h3 className="font-semibold mb-3">פרטי משלוח</h3>
            {sent ? (
              <div className="text-green-700">הזמנה נשלחה! נחזור אליך במייל.</div>
            ) : (
              <form onSubmit={submitOrder} className="space-y-3">
                <input className="w-full border rounded px-3 py-2" placeholder="שם מלא" value={name} onChange={e => setName(e.target.value)} required />
                <input className="w-full border rounded px-3 py-2" placeholder="אימייל" value={email} onChange={e => setEmail(e.target.value)} required />
                <input className="w-full border rounded px-3 py-2" placeholder="טלפון" value={phone} onChange={e => setPhone(e.target.value)} required />
                <input className="w-full border rounded px-3 py-2" placeholder="כתובת" value={address} onChange={e => setAddress(e.target.value)} />
                <button type="submit" disabled={items.length === 0 || sending} className="w-full px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
                  {sending ? 'שולח...' : 'סיום הזמנה'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;



