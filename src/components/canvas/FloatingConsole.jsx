import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const codeLines = [
  "import numpy as np",
  "import pandas as pd",
  "from sklearn.ensemble import RandomForestClassifier",
  "from sklearn.model_selection import train_test_split",
  "df = pd.read_csv('dataset.csv')",
  "X = df.drop('target', axis=1)",
  "y = df['target']",
  "X_train, X_test, y_train, y_test = train_test_split(X, y)",
  "model = RandomForestClassifier(n_estimators=100)",
  "model.fit(X_train, y_train)",
  "predictions = model.predict(X_test)",
  "print(f'Accuracy: {model.score(X_test, y_test):.2f}')"
];

const Highlight = ({ text }) => {
  // Simple syntax highlighting
  const parts = text.split(/(\s+|[(),.=[\]:{}])/g);
  return (
    <span>
      {parts.map((part, i) => {
        let color = "text-gray-300"; // Default
        if (["import", "from", "as", "print", "def", "return", "if", "else"].includes(part)) color = "text-pink-500";
        else if (["numpy", "pandas", "sklearn", "train_test_split", "StandardScaler", "RandomForestClassifier"].includes(part)) color = "text-cyan-400";
        else if (["np", "pd", "plt", "df", "X", "y", "model", "scaler"].includes(part)) color = "text-blue-300";
        else if (part.startsWith("'") || part.startsWith('"')) color = "text-green-400";
        else if (!isNaN(parseFloat(part))) color = "text-orange-400";
        else if (["fit", "transform", "predict", "score", "read_csv", "drop"].includes(part)) color = "text-yellow-300";
        
        return <span key={i} className={color}>{part}</span>;
      })}
    </span>
  );
};

const FloatingConsole = () => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) {
      // Loop: clear and restart after a pause
      const timeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    const currentLine = codeLines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines.length === 0 || newLines.length <= currentLineIndex) {
            newLines.push(currentLine.substring(0, currentCharIndex + 1));
          } else {
            newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          }
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 30 + Math.random() * 50); // Random typing speed
      return () => clearTimeout(timeout);
    } else {
      // Line finished, wait before next line
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <div className="flex flex-col bg-primary/90 backdrop-blur-md border border-accent-cyan/50 rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.15),inset_0_0_10px_rgba(0,255,255,0.05)] overflow-hidden
                    w-[300px] h-[220px] xs:w-[340px] md:w-[380px] md:h-[260px] lg:w-[500px] lg:h-[340px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-accent-cyan/20 bg-black/20">
        <span className="text-[10px] font-bold text-accent-cyan/80 uppercase tracking-widest">Python Kernel</span>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
        </div>
      </div>

      {/* Code Area */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto font-mono text-[11px] lg:text-sm leading-relaxed text-gray-300 scrollbar-hide">
        {displayedLines.map((line, index) => (
          <div key={index} className="whitespace-nowrap">
            <span className="text-gray-600 mr-3 select-none text-[10px]">{index + 1}</span>
            <Highlight text={line} />
            {index === currentLineIndex && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[2px] h-[1em] bg-accent-cyan ml-1 align-middle"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingConsole;
