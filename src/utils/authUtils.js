import { jwtDecode } from 'jwt-decode';

export const hasRoutePermission = (permissions, currentPath) => {
  return permissions?.some((perm) => currentPath.startsWith(perm.route));
};

// Function to check if token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token); // Decode JWT
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // True if token is expired
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Treat invalid tokens as expired
  }
};

// Function to get token expiration time (for display or logic)
export const getTokenExpiry = (token) => {
  try {
    const decoded = jwtDecode(token);
    return new Date(decoded.exp * 1000); // Convert Unix seconds to Date
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};