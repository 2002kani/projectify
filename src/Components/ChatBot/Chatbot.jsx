import { useState, useEffect } from 'react';
import "./ChatBot.css";

const ChatbotKey = import.meta.env.VITE_API_KEY_CB;

const ChatBot = () => {
  // Definiere die Größen für beide Modi
  const miniSize = { width: 150, height: 150 };  // passe diese Werte an deine CSS an
  const maxSize = { width: 300, height: 400 };

  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialposition abhängig vom Modus (im Mini-Modus unten rechts)
  const initialSize = isOpen ? maxSize : miniSize;
  const [position, setPosition] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth - initialSize.width-125 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight - initialSize.height-25 : 0
  });
  
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;
    
    // Bestimme aktuell gültige Größe
    const currentSize = isOpen ? maxSize : miniSize;
    
    // Begrenzung auf den sichtbaren Bereich unter Berücksichtigung der aktuellen Größe
    const boundedX = Math.max(0, Math.min(newX, window.innerWidth - currentSize.width));
    const boundedY = Math.max(0, Math.min(newY, window.innerHeight - currentSize.height));
    
    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Speichere die Position im localStorage (optional)
    localStorage.setItem('chatbot-position', JSON.stringify(position));
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset, isOpen, position]);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);

    const newSize = !isOpen ? maxSize : miniSize;
    setPosition({
      x: Math.min(position.x, window.innerWidth - newSize.width),
      y: Math.min(position.y, window.innerHeight - newSize.height)
    });
  };

  

  return (
    <div className={isOpen ? "chatbot-max" : "chatbot-mini"}
         onMouseDown={handleMouseDown} 
         style={{ position: "absolute", left: position.x, top: position.y }}>
      <div className='chatbot-top'>
        <div className='top-headline' style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
          <p>(Hier klicken zum Bewegen)</p>
        </div>
        <div className="top-minusplus" onClick={toggleOpen}>
          <p>{isOpen ? " - " : " + "}</p>
        </div>
      </div>
      <div className='chatbot-content'>
        <p>Chat content goes here...</p>
      </div>
    </div>
  );
};

export default ChatBot;