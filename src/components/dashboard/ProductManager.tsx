import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Image as ImageIcon, Pencil, Trash2 } from 'lucide-react';
import api from '../../lib/api';

interface Product {
  _id: string;
  title: string;
  description?: string;
  priceCents: number;
  imageUrl?: string;
  active: boolean;
}

const ProductManager: React.FC = () => {
  const { storeId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('');
  const [imageUrl, setImageUrl] = useState('');
  const [active, setActive] = useState(true);

  const isEdit = useMemo(() => Boolean(editId), [editId]);

  useEffect(() => {
    const load = async () => {
      if (!storeId) return;
      try {
        const res = await api.get(`/products/store/${storeId}/all`);
        setProducts(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.message || 'שגיאה בטעינת מוצרים');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [storeId]);

  const resetForm = () => {
    setEditId(null);
    setTitle('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setActive(true);
  };

  const openCreate = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditId(p._id);
    setTitle(p.title);
    setDescription(p.description || '');
    setPrice((p.priceCents / 100).toFixed(2));
    setImageUrl(p.imageUrl || '');
    setActive(p.active);
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeId) return;
    if (!title || !price) {
      setError('אנא מלא שם ומחיר');
      return;
    }
    const priceCents = Math.round(Number(price) * 100);
    try {
      if (isEdit && editId) {
        const res = await api.patch(`/products/${editId}`, { title, description, priceCents, imageUrl, active });
        setProducts(prev => prev.map(p => (p._id === editId ? res.data : p)));
      } else {
        const res = await api.post(`/products/${storeId}`, { title, description, priceCents, imageUrl, active });
        setProducts(prev => [res.data, ...prev]);
      }
      setFormOpen(false);
      resetForm();
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'שמירה נכשלה');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('למחוק מוצר?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err: any) {
      console.error(err);
      setError('מחיקה נכשלה');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">מוצרים</h1>
          <button onClick={openCreate} className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> הוסף מוצר
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-700 mb-4">{error}</div>
        )}

        {formOpen && (
          <form onSubmit={handleSubmit} className="bg-white rounded-md shadow p-4 mb-6 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">שם המוצר</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">תיאור</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" rows={3} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">מחיר (₪)</label>
                <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">תמונת מוצר (URL)</label>
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="https://..." />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input id="active" type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
              <label htmlFor="active" className="text-sm text-gray-700">מוצר פעיל</label>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                {isEdit ? 'עדכן' : 'שמור'}
              </button>
              <button type="button" onClick={() => { setFormOpen(false); resetForm(); }} className="px-4 py-2 bg-gray-200 rounded-md">
                בטל
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-gray-500">טוען...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p._id} className="bg-white rounded-md shadow p-4 flex">
                <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded overflow-hidden mr-4">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.title} className="object-cover w-full h-full" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium text-gray-900">{p.title}</div>
                    <div className="text-gray-700">₪{(p.priceCents / 100).toFixed(2)}</div>
                  </div>
                  <div className="text-sm text-gray-500 line-clamp-2 mt-1">{p.description}</div>
                  <div className="flex gap-3 mt-3">
                    <button onClick={() => openEdit(p)} className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                      <Pencil className="h-4 w-4 mr-1" /> ערוך
                    </button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-800 inline-flex items-center">
                      <Trash2 className="h-4 w-4 mr-1" /> מחק
                    </button>
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

export default ProductManager;



