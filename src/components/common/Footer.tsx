import React from 'react';
import { Store, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* מידע על החברה */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Store className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">חנויות אונליין</span>
            </div>
            <p className="text-gray-300 mb-4">
              הפלטפורמה המובילה ליצירת חנויות מקוונות בקלות ובמהירות.
              בנה את החנות שלך תוך דקות ותתחיל למכור היום!
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">e0527102442@gmail.com</span>
              </div>
            </div>
          </div>

          {/* קישורים מהירים */}
          <div>
            <h3 className="text-lg font-semibold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  איך זה עובד
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  תמחור
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  דוגמאות חנויות
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  מרכז עזרה
                </a>
              </li>
            </ul>
          </div>

          {/* תמיכה */}
          <div>
            <h3 className="text-lg font-semibold mb-4">תמיכה</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  צור קשר 0547648848
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  תנאי שימוש
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  מדיניות פרטיות
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  שאלות נפוצות
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* זכויות יוצרים */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 חנויות אונליין. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;