import { Navigate, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PageLoader from "./components/pageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={!authUser ? <LandingPage /> : <ChatPage />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
