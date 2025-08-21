import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Store, ShoppingCart, Zap, Globe, TrendingUp, Users } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              בנה את החנות המקוונת שלך
              <span className="block text-blue-200">תוך דקות</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              הפלטפורמה הקלה והמהירה ביותר ליצירת חנות מקוונת מקצועית.
              ללא צורך בידע טכני - רק העלה מוצרים ותתחיל למכור!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <Store className="h-5 w-5 mr-2" />
                  לדשבורד שלי
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                  >
                    <Store className="h-5 w-5 mr-2" />
                    התחל עכשיו - חינם
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                  >
                    יש לי כבר חשבון
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              למה לבחור בנו?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              כל מה שאתה צריך כדי להתחיל למכור באינטרנט במקום אחד
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* פיצ'ר 1 */}
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                הקמה מהירה
              </h3>
              <p className="text-gray-600">
                צור חנות מקוונת תוך 5 דקות. פשוט הירשם, העלה מוצרים וקבל קישור לחנות שלך.
              </p>
            </div>

            {/* פיצ'ר 2 */}
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                עגלת קניות חכמה
              </h3>
              <p className="text-gray-600">
                לקוחותיך יוכלו להוסיף מוצרים לעגלה, לנהל כמויות ולבצע הזמנות בקלות.
              </p>
            </div>

            {/* פיצ'ר 3 */}
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                רספונסיבי לחלוטין
              </h3>
              <p className="text-gray-600">
                החנות שלך תיראה מושלם בכל מכשיר - מחשב, טאבלט או סמארטפון.
              </p>
            </div>

            {/* פיצ'ר 4 */}
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ניהול הזמנות
              </h3>
              <p className="text-gray-600">
                קבל הזמנות ישירות למייל שלך עם כל הפרטים הנדרשים ללקוח.
              </p>
            </div>

            {/* פיצ'ר 5 */}
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ללא עמלות
              </h3>
              <p className="text-gray-600">
                התחל בחינם ללא עמלות על מכירות. שלם רק עבור פיצ'רים מתקדמים.
              </p>
            </div>

            {/* פיצ'ר 6 */}
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                עיצוב מקצועי
              </h3>
              <p className="text-gray-600">
                חנויות יפות ומקצועיות שיעשו רושם טוב על הלקוחות שלך.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              איך זה עובד?
            </h2>
            <p className="text-xl text-gray-600">
              3 שלבים פשוטים לחנות מקוונת מוכנה
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* שלב 1 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                הירשם וצור חנות
              </h3>
              <p className="text-gray-600">
                הירשם לפלטפורמה, הזן את פרטי הווצאפ והמייל שלך וצור את החנות הראשונה שלך.
              </p>
            </div>

            {/* שלב 2 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                העלה מוצרים
              </h3>
              <p className="text-gray-600">
                הוסף את המוצרים שלך עם תמונות, תיאורים ומחירים. הכל פשוט ואינטואיטיבי.
              </p>
            </div>

            {/* שלב 3 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                שתף ומכור
              </h3>
              <p className="text-gray-600">
                קבל קישור לחנות שלך ושתף אותו עם לקוחות בווצאפ, פייסבוק או כל מקום אחר.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            מוכן להתחיל למכור?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            הצטרף לאלפי בעלי עסקים שכבר מוכרים באינטרנט עם הפלטפורמה שלנו
          </p>
          {!user && (
            <Link
              to="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Store className="h-5 w-5 mr-2" />
              צור חנות עכשיו - חינם
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;