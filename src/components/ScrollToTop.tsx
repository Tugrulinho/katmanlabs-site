import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("scroll çalıştı");

    window.scrollTo(0, 0);

    const el = document.querySelector('*');
    console.log("ilk element:", el);
  }, [pathname]);

  return null;
}
