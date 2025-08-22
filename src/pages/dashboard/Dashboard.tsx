import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardHome from '../../components/dashboard/DashboardHome';
import StoreManager from '../../components/dashboard/StoreManager';
import NewStore from '../../components/dashboard/NewStore';
import ProductManager from '../../components/dashboard/ProductManager';
import OrderManager from '../../components/dashboard/OrderManager';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        {/* דף הבית של הדשבורד */}
        <Route path="/" element={<DashboardHome />} />
        
        {/* ניהול חנויות */}
        <Route path="/stores" element={<StoreManager />} />
        <Route path="/stores/new" element={<NewStore />} />

        {/* ניהול מוצרים */}
        <Route path="/products/:storeId" element={<ProductManager />} />
        
        {/* ניהול הזמנות */}
        <Route path="/orders/:storeId" element={<OrderManager />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;