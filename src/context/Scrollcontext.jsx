import { createContext, useContext, useState, useEffect } from 'react';
const ScrollContext = createContext();
export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within ScrollProvider');
  }
  return context;
};
export const ScrollProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'workshop'];
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          localStorage.setItem('activeSection', entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const observedElements = new Set();
    const checkAndObserve = () => {
      sections.forEach((sectionId) => {
        if (!observedElements.has(sectionId)) {
          const element = document.getElementById(sectionId);
          if (element) {
            observer.observe(element);
            observedElements.add(sectionId);
          }
        }
      });
    };
    checkAndObserve();
    const interval = setInterval(checkAndObserve, 500);
    const savedSection = localStorage.getItem('activeSection');
    if (savedSection) {
      setActiveSection(savedSection);
    }
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      localStorage.setItem('activeSection', sectionId);
    }
  };
  return (
    <ScrollContext.Provider value={{ activeSection, scrollToSection, setActiveSection }}>
      {children}
    </ScrollContext.Provider>
  );
};