import { useState, useRef } from 'react';
import { Plus, X, File, Image, FileText } from 'lucide-react';

export default function FileInput() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (type.includes('text') || type.includes('document')) return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4 p-6 hover:shadow-md transition-shadow">

      <div className="flex justify-between mt-3">
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`
                w-8 h-8 bg-gray-300 border-2 border-gray-100 rounded-xl
                flex items-center justify-center cursor-pointer
                transition-all duration-300 ease-out
                hover:bg-gray-700 hover:border-gray-500 hover:shadow-lg hover:-translate-y-1
                active:translate-y-0 active:shadow-md
                ${isDragging ? 'bg-gray-700 border-blue-500 scale-105' : ''}
              `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Plus
              className={`w-6 h-6 text-gray-400 transition-all duration-300 ${isDragging ? 'text-blue-400 rotate-45' : 'hover:text-white'
                }`}
            />
          </button>
        </div>
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white">
            Archivos seleccionados ({files.length})
          </h3>
          <div className="space-y-2">
            {files.map((fileItem) => (
              <div
                key={fileItem.id}
                className="bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {fileItem.preview ? (
                    <img
                      src={fileItem.preview}
                      alt={fileItem.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                      {getFileIcon(fileItem.type)}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium truncate max-w-xs">
                      {fileItem.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {formatFileSize(fileItem.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(fileItem.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}