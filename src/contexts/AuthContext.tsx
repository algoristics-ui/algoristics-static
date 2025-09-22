import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useUserCache } from '@/hooks/useUserCache';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'org_admin' | 'instructor' | 'learner';
  organization: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, organization?: string) => Promise<boolean>;
  logout: () => void;
  getOrganizationHomePath: () => string;
  isAuthenticated: boolean;
  isLoading: boolean;
  restoreSession: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy users for testing
const DUMMY_USERS: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@algoristicedu.com',
    role: 'super_admin',
    organization: 'Algoristics',
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@university.edu',
    role: 'org_admin',
    organization: 'Stanford University',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@techcorp.com',
    role: 'instructor',
    organization: 'TechCorp Training',
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma@student.edu',
    role: 'learner',
    organization: 'Stanford University',
  },
  {
    id: '5',
    name: 'Jane Smith',
    email: 'jane@citycollege.edu',
    role: 'learner',
    organization: 'City Community College',
  },
  {
    id: '6',
    name: 'Alex Rodriguez',
    email: 'alex@consultant.com',
    role: 'instructor',
    organization: 'Stanford University', // Can be changed via organization dropdown
  },
  {
    id: '7',
    name: 'Prof. Johnson',
    email: 'prof.johnson@stanford.edu',
    role: 'instructor',
    organization: 'Stanford University',
  },
  {
    id: '8',
    name: 'Training Staff',
    email: 'trainee@techcorp.com',
    role: 'learner',
    organization: 'TechCorp Training',
  },
  {
    id: '9',
    name: 'College Teacher',
    email: 'teacher@citycollege.edu',
    role: 'instructor',
    organization: 'City Community College',
  },
  {
    id: '13',
    name: 'City College Admin',
    email: 'admin@citycollege.edu',
    role: 'org_admin',
    organization: 'City Community College',
  },
  {
    id: '14',
    name: 'TechCorp Admin',
    email: 'admin@techcorp.com',
    role: 'org_admin',
    organization: 'TechCorp Training',
  },
  {
    id: '10',
    name: 'Algoristics Learner',
    email: 'learner@algoristics.com',
    role: 'learner',
    organization: 'Algoristics',
  },
  {
    id: '11',
    name: 'Algoristics Instructor',
    email: 'instructor@algoristics.com',
    role: 'instructor',
    organization: 'Algoristics',
  },
  {
    id: '12',
    name: 'Algoristics Admin',
    email: 'admin@algoristics.com',
    role: 'org_admin',
    organization: 'Algoristics',
  },
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const { clearCache } = useUserCache();

  const login = async (email: string, password: string, organization?: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check dummy credentials (password is "algoristic123" for all users)
    const foundUser = DUMMY_USERS.find(u => u.email === email);
    
    if (foundUser && password === 'algoristic123') {
      // For non-super admin users, validate organization if provided
      if (foundUser.role !== 'super_admin' && organization) {
        // Update user organization if it's provided via dropdown
        const userWithOrg = { ...foundUser, organization };
        setUser(userWithOrg);
        localStorage.setItem('auth_user', JSON.stringify(userWithOrg));
      } else {
        setUser(foundUser);
        localStorage.setItem('auth_user', JSON.stringify(foundUser));
      }
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    clearCache(); // Clear user cache on logout
  };

  const getOrganizationHomePath = (): string => {
    if (!user) return '/login';
    
    // Super admin goes to main login
    if (user.role === 'super_admin') {
      return '/login';
    }

    // Organization users go to their organization home page
    const organizationMapping: Record<string, string> = {
      'Stanford University': 'stanford',
      'TechCorp Training': 'techcorp',
      'City Community College': 'citycollege',
      'Algoristics': 'algoristics'
    };

    const orgPath = organizationMapping[user.organization];
    return orgPath ? `/${orgPath}` : '/login';
  };

  // Only restore session when explicitly needed (not on public pages)
  const restoreSession = () => {
    if (!hasInitialized) {
      setHasInitialized(true);
    }
    
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        return true;
      } catch (error) {
        localStorage.removeItem('auth_user');
        return false;
      }
    }
    return false;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    getOrganizationHomePath,
    isAuthenticated: !!user,
    isLoading,
    restoreSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};