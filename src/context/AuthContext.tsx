import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';
import { useToast } from './ToastContext';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  availableUsers: User[];
  hasPermission: (module: string, action?: 'view' | 'create' | 'edit' | 'delete') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Role-based access control table
const ROLE_PERMISSIONS: Record<UserRole, Record<string, { view: boolean; create: boolean; edit: boolean; delete: boolean }>> = {
  'Super Admin': {
    Dashboard: { view: true, create: true, edit: true, delete: true },
    Projects: { view: true, create: true, edit: true, delete: true },
    CRM: { view: true, create: true, edit: true, delete: true },
    HRM: { view: true, create: true, edit: true, delete: true },
    'Finance & Accounts': { view: true, create: true, edit: true, delete: true },
    Recruitment: { view: true, create: true, edit: true, delete: true },
    Admin: { view: true, create: true, edit: true, delete: true },
    Reports: { view: true, create: true, edit: true, delete: true },
  },
  'HR Manager': {
    Dashboard: { view: true, create: true, edit: true, delete: false },
    Projects: { view: true, create: false, edit: false, delete: false },
    CRM: { view: true, create: false, edit: false, delete: false },
    HRM: { view: true, create: true, edit: true, delete: true },
    'Finance & Accounts': { view: true, create: false, edit: true, delete: false }, // for payroll
    Recruitment: { view: true, create: true, edit: true, delete: true },
    Admin: { view: false, create: false, edit: false, delete: false },
    Reports: { view: true, create: true, edit: true, delete: false },
  },
  'Project Manager': {
    Dashboard: { view: true, create: false, edit: false, delete: false },
    Projects: { view: true, create: true, edit: true, delete: true },
    CRM: { view: true, create: true, edit: true, delete: false },
    HRM: { view: true, create: false, edit: false, delete: false },
    'Finance & Accounts': { view: false, create: false, edit: false, delete: false },
    Recruitment: { view: false, create: false, edit: false, delete: false },
    Admin: { view: false, create: false, edit: false, delete: false },
    Reports: { view: true, create: false, edit: false, delete: false },
  },
  'Accountant': {
    Dashboard: { view: true, create: false, edit: false, delete: false },
    Projects: { view: true, create: false, edit: false, delete: false },
    CRM: { view: true, create: false, edit: false, delete: false },
    HRM: { view: true, create: false, edit: false, delete: false },
    'Finance & Accounts': { view: true, create: true, edit: true, delete: true },
    Recruitment: { view: false, create: false, edit: false, delete: false },
    Admin: { view: false, create: false, edit: false, delete: false },
    Reports: { view: true, create: true, edit: true, delete: false },
  },
  'Recruiter': {
    Dashboard: { view: true, create: false, edit: false, delete: false },
    Projects: { view: false, create: false, edit: false, delete: false },
    CRM: { view: false, create: false, edit: false, delete: false },
    HRM: { view: true, create: false, edit: false, delete: false },
    'Finance & Accounts': { view: false, create: false, edit: false, delete: false },
    Recruitment: { view: true, create: true, edit: true, delete: true },
    Admin: { view: false, create: false, edit: false, delete: false },
    Reports: { view: true, create: false, edit: false, delete: false },
  },
  'Employee': {
    Dashboard: { view: true, create: false, edit: false, delete: false },
    Projects: { view: true, create: false, edit: false, delete: false },
    CRM: { view: false, create: false, edit: false, delete: false },
    HRM: { view: true, create: false, edit: false, delete: false },
    'Finance & Accounts': { view: false, create: false, edit: false, delete: false },
    Recruitment: { view: false, create: false, edit: false, delete: false },
    Admin: { view: false, create: false, edit: false, delete: false },
    Reports: { view: false, create: false, edit: false, delete: false },
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]); // Default logged in as Super Admin
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const { showToast } = useToast();

  const login = async (email: string, role?: UserRole): Promise<boolean> => {
    let matchedUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!matchedUser && role) {
      matchedUser = mockUsers.find((u) => u.role === role);
    }
    if (!matchedUser) {
      matchedUser = mockUsers[0]; // fallback
    }

    setCurrentUser(matchedUser);
    setIsAuthenticated(true);
    showToast(`Welcome back, ${matchedUser.name}!`, 'success', 'Signed In');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('You have been logged out successfully.', 'info', 'Logged Out');
  };

  const switchRole = (role: UserRole) => {
    const targetUser = mockUsers.find((u) => u.role === role) || mockUsers[0];
    setCurrentUser(targetUser);
    setIsAuthenticated(true);
    showToast(`Switched active profile to ${targetUser.name} (${targetUser.role})`, 'info', 'Role Switch');
  };

  const hasPermission = (module: string, action: 'view' | 'create' | 'edit' | 'delete' = 'view'): boolean => {
    if (!currentUser) return false;
    const userRole = currentUser.role;
    const perms = ROLE_PERMISSIONS[userRole]?.[module];
    if (!perms) return true; // default permit if unlisted
    return perms[action] ?? false;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        switchRole,
        availableUsers: mockUsers,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
