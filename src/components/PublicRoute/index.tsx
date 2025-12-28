import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = localStorage.getItem('access_token');
  
  if (token) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
};

export default PublicRoute;

