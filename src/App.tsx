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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
