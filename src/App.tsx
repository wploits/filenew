import React, { useState } from 'react';
import { AudioPlayer } from './components/AudioPlayer';
import { SearchBar } from './components/SearchBar';
import { FileCard } from './components/FileCard';
import { FadeIn } from './components/animations/FadeIn';
import { motion } from 'framer-motion';

const SAMPLE_FILES = [
  {
    id: 1,
    name: 'undetected.zip(valorantスキンチェンジャー)',
    description: 'valorantのスキンチェンジャー！',
    size: 768000,
    version: '1.0.0',
    status: 'working' as const,
    downloadUrl: '/undetected.zip'
  },
  {
    id: 2,
    name: 'SolaraDependencies.exe',
    description: 'Solaraの必要なファイルをダウンロードするやつ。',
    size: 8000,
    version: '1.0.0',
    status: 'working' as const,
    downloadUrl: '/SolaraDependencies.exe'
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = SAMPLE_FILES.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <AudioPlayer />
      
      <div className="max-w-4xl mx-auto py-12 px-4">
        <FadeIn>
          <motion.div 
            className="text-center mb-12"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-4xl font-bold text-blue-400 mb-4">ふぁいるおきば！</h1>
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mb-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </FadeIn>

        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredFiles.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
            >
              <FileCard
                name={file.name}
                description={file.description}
                size={file.size}
                version={file.version}
                status={file.status}
                downloadUrl={file.downloadUrl}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}