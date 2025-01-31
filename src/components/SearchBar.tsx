import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div 
      className="relative"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      <motion.input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ファイルを検索..."
        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-gray-600 text-gray-200 placeholder-gray-500"
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}