import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileUp, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  X, 
  Brain,
  Loader2,
  Sparkles
} from 'lucide-react';
import { GlassCard, NeonButton } from '../components/UIElements';
import { useTaskContext } from '../context/TaskContext';

const FileUploadPage = ({ setActivePage }) => {
  const { addTask } = useTaskContext();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionComplete, setExtractionComplete] = useState(false);
  const [error, setError] = useState(null);
  const [extractedCount, setExtractedCount] = useState(0);

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelection(e.dataTransfer.files);
  };

  const handleFileSelection = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map(file => ({
      file, // Store the actual File object
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      id: Math.random(),
      status: 'Ready'
    }));
    setFiles(prev => [...prev, ...newFiles]);
    setError(null);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  
const handleUpload = async () => {
  console.log(import.meta.env);
  console.log(
  "OPENROUTER KEY:",
  import.meta.env.VITE_OPENROUTER_API_KEY
);

  if (files.length === 0) return;

  setIsExtracting(true);
  setError(null);

  try {

    const fileText = await files[0].file.text();

    console.log("FILE TEXT:", fileText);

    
      
const response = await fetch(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
Extract tasks from this text.

Return ONLY valid JSON.

Format:
{
  "tasks": [
    {
      "task": "",
      "deadline": "",
      "priority": ""
    }
  ]
}

TEXT:
${fileText}
          `
        }
      ]
    }),
  }
);

const result = await response.json();

console.log("OPENROUTER RESPONSE:", result);

// Check API errors first
if (!response.ok) {
  throw new Error(
    result.error?.message || "OpenRouter API failed"
  );
}

// Validate response structure
if (
  !result.choices ||
  !result.choices[0] ||
  !result.choices[0].message
) {
  console.error("INVALID RESPONSE:", result);
  throw new Error("Invalid AI response structure");
}

const rawText = result.choices[0].message.content;


    console.log("RAW TEXT:", rawText);

    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    

    console.log("CLEANED TEXT:", cleanedText);

    let data;

    try {
      data = JSON.parse(cleanedText);
    } catch (jsonErr) {
      console.error("JSON PARSE ERROR:", jsonErr);
      throw new Error("Gemini returned invalid JSON");
    }

    console.log("FINAL DATA:", data);

    if (data.tasks && Array.isArray(data.tasks)) {

      setExtractedCount(data.tasks.length);

      for (const task of data.tasks) {

  const newTask = {
    title: task.task || "Untitled Task",
    due_date: task.deadline || "No deadline",
    priority: (task.priority || "medium").toLowerCase(),
    status: "todo",
  };

  await addTask(newTask);
}

      setFiles(files.map(f => ({
        ...f,
        status: 'Extracted'
      })));

      setExtractionComplete(true);

      setTimeout(() => {
        setActivePage('tasks');
      }, 2000);

    } else {

      throw new Error("No tasks found.");
    }

  } catch (err) {

    console.error("FULL GEMINI ERROR:", err);

    setError(err.message);

  } finally {

    setIsExtracting(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-['Outfit'] mb-2">AI Document Intelligence</h1>
        <p className="text-slate-400">Upload documents and let LifeFlow AI extract tasks and deadlines automatically.</p>
      </div>

      <GlassCard 
        className={`h-80 border-2 border-dashed flex flex-col items-center justify-center transition-all duration-500 cursor-pointer
          ${isDragging ? 'border-primary-cyan bg-primary-cyan/5 scale-[0.98]' : 'border-white/10 hover:border-white/20'}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleBrowseClick}
        hover={false}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          multiple 
          onChange={(e) => handleFileSelection(e.target.files)}
        />
        <div className={`p-6 rounded-full mb-6 transition-all duration-500 ${isDragging ? 'bg-primary-cyan/20 text-primary-cyan scale-110' : 'bg-white/5 text-slate-500'}`}>
          <FileUp size={48} className={isDragging ? 'animate-bounce' : ''} />
        </div>
        <h3 className="text-xl font-bold mb-2">Drag & Drop Documents</h3>
        <p className="text-slate-500 text-sm mb-6">Supports PDF, JPEG, PNG and TXT (Max 25MB)</p>
        <NeonButton className="px-8 py-2 text-sm" onClick={handleBrowseClick}>Browse Files</NeonButton>
      </GlassCard>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-2">
              <h3 className="font-bold">Queue ({files.length})</h3>
              <button onClick={() => setFiles([])} className="text-xs text-rose-400 hover:underline">Clear All</button>
            </div>
            
            <div className="grid gap-4">
              {files.map((file) => (
                <GlassCard key={file.id} className="p-4 flex items-center justify-between" hover={false}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-cyan">
                      {file.name.endsWith('.pdf') ? <FileText size={20} /> : <ImageIcon size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{file.name}</p>
                      <p className="text-xs text-slate-500">{file.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {file.status === 'Extracted' ? (
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                        <CheckCircle2 size={16} /> Extracted
                      </div>
                    ) : (
                      <button onClick={() => setFiles(files.filter(f => f.id !== file.id))} className="text-slate-600 hover:text-white">
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3">
                <X size={18} /> {error}
              </div>
            )}

            {!extractionComplete && !isExtracting && (
              <NeonButton 
                onClick={handleUpload}
                className="w-full py-4 flex items-center justify-center gap-2"
                disabled={files.length === 0}
              >
                <Brain size={20} /> Start AI Extraction
              </NeonButton>
            )}

            {isExtracting && (
              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-primary-cyan/20 flex flex-col items-center text-center">
                <Loader2 size={32} className="text-primary-cyan animate-spin mb-4" />
                <h4 className="font-bold text-lg mb-2">Analyzing Patterns...</h4>
                <div className="w-full h-1 bg-white/5 rounded-full max-w-xs mb-4 overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: '100%' }}
                     transition={{ duration: 3 }}
                     className="h-full bg-gradient-to-r from-primary-cyan to-primary-purple shadow-[0_0_8px_rgba(34,211,238,0.5)]" 
                   />
                </div>
                <p className="text-sm text-slate-400">Our neural engine is processing your document to extract tasks, deadlines, and priorities.</p>
              </div>
            )}

            {extractionComplete && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={24} />
                </div>
                <h4 className="text-lg font-bold text-emerald-400 mb-2">Success! Tasks Added.</h4>
                <p className="text-sm text-slate-300 mb-6">LifeFlow AI successfully extracted {extractedCount} new tasks from your documents.</p>
                <div className="flex gap-4 justify-center">
                   <button 
                    onClick={() => setActivePage('tasks')}
                    className="px-6 py-2 rounded-xl bg-emerald-400 text-background font-bold text-sm"
                   >
                    View Tasks
                   </button>
                   <button 
                    onClick={() => setActivePage('dashboard')}
                    className="px-6 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-sm font-medium"
                   >
                    Go to Dashboard
                   </button>
                   <button onClick={() => {setFiles([]); setExtractionComplete(false);}} className="px-6 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-sm font-medium">Dismiss</button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploadPage;
