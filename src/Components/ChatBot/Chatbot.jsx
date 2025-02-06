import { useState, useEffect } from 'react';
import "./ChatBot.css";

const ChatBot = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth - 320 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight - 420 : 0
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
    
    // Begrenzung auf Bildschirmgröße
    const boundedX = Math.max(0, Math.min(newX, window.innerWidth - 300));
    const boundedY = Math.max(0, Math.min(newY, window.innerHeight - 400));
    
    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Position im localStorage speichern
    localStorage.setItem('chatbot-position', JSON.stringify(position));
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <div className={isOpen ? "chatbot-max" : "chatbot-mini"}
        onMouseDown={handleMouseDown} 
        style={{left: position.x, top: position.y}}>
      <div className='chatbot-top'>
        <div className='top-headline' style={{cursor: isDragging ? 'grabbing' : 'grab'}}>
            <p> (Hier Klicken zum bewegen) </p>
        </div>
        {!isOpen ? 
        <div className="top-minusplus" onClick={toggleOpen}>
            <p> + </p>
        </div> 
        : <div className="top-minusplus" onClick={toggleOpen}>
            <p> - </p>
        </div>}
      </div>
      <div className='chatbot-content'>
        <p>Chat content goes here...</p>
      </div>
    </div>
  );
};

export default ChatBot;