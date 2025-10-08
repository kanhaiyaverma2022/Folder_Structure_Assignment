import React, { useState, useRef, useEffect } from 'react';

const InlineInput = ({ value, onSave, onCancel, placeholder = "Enter folder name", maxLength = 100 }) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleSave = () => {
    // Prevent duplicate calls while processing
    if (isProcessingRef.current) return;
    
    const trimmed = inputValue.trim();
    if (!trimmed) {
      onCancel();
      return;
    }

    // Mark as processing
    isProcessingRef.current = true;
    
    // Call onSave
    onSave(trimmed);
    
    // Reset the processing flag after a short delay
    // This allows the user to retry if validation fails
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  };

  const handleBlur = (e) => {
    // Don't trigger blur if we're clicking on the alert
    // or if we just processed a save
    if (isProcessingRef.current) return;
    
    handleSave();
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value.slice(0, maxLength))}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      placeholder={placeholder}
      className="flex-1 px-2 py-1 text-sm border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      maxLength={maxLength}
    />
  );
};

export default InlineInput;