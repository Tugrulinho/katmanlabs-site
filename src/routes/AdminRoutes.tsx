import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

const AdminLayout = lazy(() => import("../components/AdminLayout"));
const AdminLogin = lazy(() => import("../pages/AdminLogin"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const AdminBlogs = lazy(() => import("../pages/AdminBlogs"));
const AdminBlogForm = lazy(() => import("../pages/AdminBlogForm"));
const AdminContent = lazy(() => import("../pages/AdminContent"));
const AdminClients = lazy(() => import("../AdminClients"));
const AdminServices = lazy(() => import("../pages/AdminServices"));
const AdminPricing = lazy(() => import("../pages/AdminPricing"));
const Messages = lazy(() => import("../pages/Messages"));

function AdminRouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
    </div>
  );
}

export default function AdminRoutes() {
  return (
    <Suspense fallback={<AdminRouteFallback />}>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="blogs/new" element={<AdminBlogForm />} />
          <Route path="blogs/edit/:id" element={<AdminBlogForm />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="messages" element={<Messages />} />
          <Route path="clients" element={<AdminClients />} />
        </Route>
        <Route
          path="/admin-v2"
          element={
            <ProtectedRoute>
              <div>Admin V2 Layout</div>
            </ProtectedRoute>
          }
        >
          <Route index element={<div>Admin V2 Dashboard</div>} />
        </Route>
        <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}
