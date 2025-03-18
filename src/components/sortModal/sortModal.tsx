import React from 'react';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSortChange: (type: 'alphabet' | 'birthday') => void;
}

const SortModal: React.FC<SortModalProps> = ({ isOpen, onClose, onSortChange }) => {
  if (!isOpen) return null;

  return (
    <div>
      <button onClick={() => onSortChange('alphabet')}>Sort by Alphabet</button>
      <button onClick={() => onSortChange('birthday')}>Sort by Birthday</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SortModal;