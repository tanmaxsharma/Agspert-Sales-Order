// auth.js
export const isAuthenticated = () => {
    
    return !!localStorage.getItem('authToken');
};
  
export const login = (password) => {
    
    localStorage.setItem('authToken', password);
};
  
export const logout = () => {
    
    localStorage.removeItem('authToken');
  };
  