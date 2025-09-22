import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user, restoreSession } = useAuth();
  const location = useLocation();

  // Try to restore session when accessing protected route
  useEffect(() => {
    if (!isAuthenticated) {
      restoreSession();
    }
  }, [isAuthenticated, restoreSession]);

  if (!isAuthenticated) {
    // If this is an organization route, redirect to organization login
    const orgData = getOrganizationDataFromPath(location.pathname);
    if (orgData.acronym !== 'organization') {
      return <Navigate to={`/${orgData.acronym}/login`} replace />;
    }
    // Otherwise redirect to main login
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
    {/* <div style={{ background: 'yellow', color: 'black', padding: 20, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}> */}
      {/* TEST PROTECTED ROUTE: ProtectedRoute is rendering its children */}
      <div style={{ marginTop: 20 }}>{children}</div>
    </div>
  );
};

export default ProtectedRoute;