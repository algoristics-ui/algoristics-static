import { useNavigate } from 'react-router-dom';

export const useScrollNavigation = () => {
  const navigate = useNavigate();

  const navigateWithScroll = (path: string) => {
    // Navigate to the new route
    navigate(path);
    
    // Ensure scroll to top happens after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return navigateWithScroll;
};

export default useScrollNavigation;