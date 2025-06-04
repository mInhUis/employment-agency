import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashBoardPage from './pages/DashBoardPage';
import ProtectedRoute from './pages/components/ProtectedRoute';
import { jwtDecode } from 'jwt-decode';

function App() {

  const token = localStorage.getItem("token");
    let userRole = "";

  if (token) {
    const decoded = jwtDecode(token);
    userRole = decoded.role;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<LoginPage />} />
        <Route
          path="/v2"
          element={userRole === "employer" ? <EmDashBoardPage /> : <Navigate to="/unauthorized" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;