import React, { createContext, useContext, useState, useEffect } from 'react';

// הגדרת ממשק לפריט בעגלה
interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// הגדרת ממשק לקונטקסט העגלה
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // טעינת העגלה מהזיכרון המקומי בעת טעינת הדף
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // שמירת העגלה בזיכרון המקומי בכל שינוי
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // הוספת מוצר לעגלה
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      
      if (existingItem) {
        // אם המוצר כבר קיים, הגדל את הכמות
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // אם המוצר לא קיים, הוסף אותו עם כמות 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // הסרת מוצר מהעגלה
  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  // עדכון כמות מוצר
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // ניקוי העגלה
  const clearCart = () => {
    setItems([]);
  };

  // חישוב המחיר הכולל
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // חישוב כמות הפריטים הכוללת
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook לשימוש בקונטקסט העגלה
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};