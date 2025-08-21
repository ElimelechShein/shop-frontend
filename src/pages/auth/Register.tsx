import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { Mail, Lock, Phone, Store, AlertCircle, CheckCircle } from 'lucide-react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // פונקציית טיפול בשליחת הטופס
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  if (!email || !password || !confirmPassword || !whatsapp) {
    setError('אנא מלא את כל השדות');
    setLoading(false);
    return;
  }

  if (password !== confirmPassword) {
    setError('הסיסמאות אינן תואמות');
    setLoading(false);
    return;
  }

  if (password.length < 6) {
    setError('הסיסמה חייבת להכיל לפחות 6 תווים');
    setLoading(false);
    return;
  }

  const whatsappRegex = /^05\d{8}$/;
  if (!whatsappRegex.test(whatsapp)) {
    setError('מספר הווצאפ חייב להיות בפורמט: 05XXXXXXXX');
    setLoading(false);
    return;
  }

  try {
    const ok = await register(email, password, whatsapp);
    if (ok) {
      navigate('/dashboard');
    } else {
      setError('שגיאה בהרשמה. אנא נסה שוב.');
    }
  } catch (err: any) {
    console.error(err);
    setError('שגיאה בהרשמה. אנא נסה שוב מאוחר יותר.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* כותרת */}
        <div className="text-center">
          <div className="flex justify-center">
            <Store className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            צור חשבון חדש
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            או{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              התחבר לחשבון קיים
            </Link>
          </p>
        </div>

        {/* טופס הרשמה */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* הצגת שגיאות */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="mr-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* שדה אימייל */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                כתובת אימייל
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            {/* שדה ווצאפ */}
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                מספר ווצאפ
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="0501234567"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                מספר הווצאפ ישמש לקבלת הזמנות מהלקוחות שלך
              </p>
            </div>

            {/* שדה סיסמה */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                סיסמה
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="לפחות 6 תווים"
                />
              </div>
            </div>

            {/* שדה אישור סיסמה */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                אישור סיסמה
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {password && confirmPassword && password === confirmPassword ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="הזן שוב את הסיסמה"
                />
              </div>
            </div>
          </div>

          {/* כפתור הרשמה */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'נרשם...' : 'הירשם עכשיו'}
            </button>
          </div>

          {/* תנאי שימוש */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              בהרשמה אתה מסכים ל
              <a href="#" className="text-blue-600 hover:text-blue-500 mx-1">
                תנאי השימוש
              </a>
              ול
              <a href="#" className="text-blue-600 hover:text-blue-500 mx-1">
                מדיניות הפרטיות
              </a>
            </p>
          </div>

          {/* קישור לעמוד הבית */}
          <div className="text-center">
            <Link
              to="/"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              חזור לעמוד הבית
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;