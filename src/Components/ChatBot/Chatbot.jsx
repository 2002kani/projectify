import { useState, useEffect } from 'react';

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

  return (
    <div style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 1000,
        cursor: isDragging ? 'grabbing' : 'grab',
        width: '300px',
        height: '400px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        backgroundColor: 'white'
      }}
      onMouseDown={handleMouseDown}>

      <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
        Chatbot Header (Zum Ziehen hier klicken)
      </div>
      <div style={{ padding: '10px' }}>
        {/* Hier Chat-Inhalt einfügen */}
        <p>Chat content goes here...</p>
      </div>
    </div>
  );
};

export default ChatBot;