import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import CreateNewPassword from "./pages/CreateNewPassword";
import Store from "./pages/Store";
import Discover from "./pages/Discover";
import Support from "./pages/Support";
import ProductMouse from "./pages/ProductMouse";
import ProductKeyboard from "./pages/ProductKeyboard";
import ProductGamepad from "./pages/ProductGamepad";
import ProductHeadphone from "./pages/ProductHeadphone";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import Blog from "./pages/Blog";
import Drivers from "./pages/Drivers";
import Terms from "./pages/Terms";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";

// Admin
import AdminLayout from "./components/admin/AdminLayout";
import AdminGuard from "./components/admin/AdminGuard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminWarranty from "./pages/admin/AdminWarranty";
import AdminDrivers from "./pages/admin/AdminDrivers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminCMS from "./pages/admin/AdminCMS";
import PageTracker from "./components/PageTracker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageTracker />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/create-new-password" element={<CreateNewPassword />} />
              <Route path="/store" element={<Discover />} />
              <Route path="/discover" element={<Store />} />
              <Route path="/support" element={<Support />} />
              <Route path="/product/mouse" element={<ProductMouse />} />
              <Route path="/product/keyboard" element={<ProductKeyboard />} />
              <Route path="/product/gamepad" element={<ProductGamepad />} />
              <Route path="/product/headphone" element={<ProductHeadphone />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<Account />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/events" element={<Events />} />

              {/* Admin routes - role-based guard */}
              <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
                <Route index element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="coupons" element={<AdminCoupons />} />
                <Route path="blogs" element={<AdminBlogs />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="support" element={<AdminSupport />} />
                <Route path="warranty" element={<AdminWarranty />} />
                <Route path="drivers" element={<AdminDrivers />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="cms" element={<AdminCMS />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
