import React, { useState } from 'react';
import { Download, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatFileSize } from '../lib/utils';

interface FileCardProps {
  name: string;
  description: string;
  size: number;
  version: string;
  status: 'working' | 'updating' | 'patched';
  downloadUrl: string;
}

export function FileCard({ name, description, size, version, status, downloadUrl }: FileCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig = {
    working: { bgColor: 'bg-green-900/50', textColor: 'text-green-400', label: 'WORKING' },
    updating: { bgColor: 'bg-orange-900/50', textColor: 'text-orange-400', label: 'UPDATING' },
    patched: { bgColor: 'bg-red-900/50', textColor: 'text-red-400', label: 'PATCHED' }
  };

  const { bgColor, textColor, label } = statusConfig[status];

  return (
    <motion.div 
      className="bg-gray-800 border border-gray-700 rounded overflow-hidden"
      whileHover={{ borderColor: 'rgba(156, 163, 175, 0.5)' }}
      layout
    >
      <motion.div
        className="p-3 cursor-pointer flex items-center gap-2 hover:bg-gray-750"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </motion.div>
        <h3 className="font-medium text-gray-200">{name}</h3>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <motion.div 
                className="space-y-2 text-sm text-gray-400"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <p>{description}</p>
                <div className="flex items-center gap-4 text-xs">
                  <motion.span 
                    className="bg-gray-700 px-2 py-1 rounded"
                    whileHover={{ scale: 1.05 }}
                  >
                    バージョン {version}
                  </motion.span>
                  <motion.span 
                    className="bg-gray-700 px-2 py-1 rounded"
                    whileHover={{ scale: 1.05 }}
                  >
                    {formatFileSize(size)}
                  </motion.span>
                  <motion.span 
                    className={`px-2 py-1 rounded ${bgColor} ${textColor}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {label}
                  </motion.span>
                </div>
                <motion.a
                  href={downloadUrl}
                  download
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: '#3B82F6' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  ダウンロード
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}