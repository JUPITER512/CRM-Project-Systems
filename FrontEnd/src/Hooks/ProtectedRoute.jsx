import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const decodeJwt = (crmToken, enteredEmail) => {
  try {
    const decoded = jwtDecode(crmToken);
    return decoded.email === enteredEmail;
  } catch (e) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenValue = localStorage.getItem('accessToken');
    const enteredEmail = localStorage.getItem('enteredEmail');

    if (!tokenValue || !enteredEmail) {
      setIsAuthenticated(false);
      navigate('/Sign-in');
      return;
    }

    if (decodeJwt(tokenValue, enteredEmail)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/Sign-in');
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
