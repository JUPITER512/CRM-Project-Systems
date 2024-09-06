import {jwtDecode} from 'jwt-decode';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const decodeJwt = (crmToken, enteredEmail) => {
  try {
    const decoded = jwtDecode(crmToken);
    return decoded.email === enteredEmail;
  } catch (e) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const [state, setState] = useState(null);
  const navigate=useNavigate()
  useEffect(() => {
    const tokenValue = localStorage.getItem('crmSuiteToken');
    const enteredEmail = localStorage.getItem('enteredEmail');
    
    if (!tokenValue || !enteredEmail) {
      setState(false);
      return;
    }

    if (decodeJwt(tokenValue, enteredEmail)) {
      setState(true);
    } else {
      setState(false);
    }
  }, []);

  if (state === null) {
    return <div>Loading...</div>;
  }

  if (state) {
    return <div>{children}</div>; 
  } else {
    return navigate('/Sign-in');
  }
};

export default ProtectedRoute;
