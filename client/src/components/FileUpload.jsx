'use client';
import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {
  FileText,
  ImageIcon,
  Upload,
  X,
  File,
  CheckCircle,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from '../context/ToastContext';

const FileUpload = ({
  onUpload,
  maxSize = 5, // in MB
  allowedTypes = ['image/*', 'application/pdf', '.doc', '.docx'],
  multiple = false,
  className,
}) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const processFiles = (selectedFiles) => {
    // Filter files by size and type
    const validFiles = selectedFiles.filter((file) => {
      // Check file size
      const isValidSize = file.size <= maxSize * 1024 * 1024;

      // Check file type
      const isValidType = allowedTypes.some((type) => {
        if (type.includes('*')) {
          return file.type.startsWith(type.split('*')[0]);
        }
        return file.type === type || file.name.endsWith(type);
      });

      return isValidSize && isValidType;
    });

    if (validFiles.length !== selectedFiles.length) {
      toast.warning('Some files were rejected', {
        description: 'Files must meet size and type requirements.',
      });
    }

    if (multiple) {
      setFiles((prev) => [...prev, ...validFiles]);
    } else {
      setFiles(validFiles.slice(0, 1));
    }

    // Initialize progress for each file
    validFiles.forEach((file) => {
      setUploadProgress((prev) => ({
        ...prev,
        [file.name]: 0,
      }));

      setUploadStatus((prev) => ({
        ...prev,
        [file.name]: 'pending',
      }));
    });

    // Simulate upload for each file
    validFiles.forEach((file) => {
      simulateUpload(file);
    });
  };

  const simulateUpload = (file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setUploadStatus((prev) => ({
          ...prev,
          [file.name]: 'complete',
        }));

        if (onUpload) {
          onUpload(file);
        }

        toast.success('Upload complete', {
          description: `${file.name} has been uploaded successfully.`,
        });
      }

      setUploadProgress((prev) => ({
        ...prev,
        [file.name]: progress,
      }));
    }, 300);
  };

  const removeFile = (fileName) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
    setUploadStatus((prev) => {
      const newStatus = { ...prev };
      delete newStatus[fileName];
      return newStatus;
    });

    toast.info('File removed', {
      description: `${fileName} has been removed.`,
    });
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className='h-6 w-6 text-blue-500' />;
    } else if (file.type === 'application/pdf') {
      return <FileText className='h-6 w-6 text-red-500' />;
    } else if (
      file.type.includes('word') ||
      file.name.endsWith('.doc') ||
      file.name.endsWith('.docx')
    ) {
      return <FileText className='h-6 w-6 text-blue-700' />;
    } else {
      return <File className='h-6 w-6 text-gray-500' />;
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          className='hidden'
          multiple={multiple}
          accept={allowedTypes.join(',')}
        />
        <div className='flex flex-col items-center gap-2'>
          <Upload className='h-10 w-10 text-muted-foreground' />
          <div className='space-y-1'>
            <p className='font-medium'>
              {isDragging
                ? 'Drop files here'
                : 'Click to upload or drag and drop'}
            </p>
            <p className='text-sm text-muted-foreground'>
              {multiple ? 'Upload multiple files' : 'Upload a file'}
            </p>
            <p className='text-xs text-muted-foreground'>
              Max size: {maxSize}MB • Allowed types: {allowedTypes.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className='space-y-2'>
          <h3 className='font-medium'>Files ({files.length})</h3>
          <div className='space-y-2'>
            {files.map((file) => (
              <div
                key={file.name}
                className='flex items-center gap-3 rounded-md border p-3'
              >
                {getFileIcon(file)}
                <div className='flex-1 min-w-0'>
                  <p className='font-medium truncate'>{file.name}</p>
                  <div className='flex items-center gap-2'>
                    <Progress
                      value={uploadProgress[file.name] || 0}
                      className='h-1.5 flex-1'
                    />
                    <span className='text-xs text-muted-foreground whitespace-nowrap'>
                      {uploadStatus[file.name] === 'complete' ? (
                        <span className='text-green-500 flex items-center gap-1'>
                          <CheckCircle className='h-3 w-3' /> Complete
                        </span>
                      ) : (
                        `${Math.round(uploadProgress[file.name] || 0)}%`
                      )}
                    </span>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 text-muted-foreground hover:text-foreground'
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.name);
                  }}
                >
                  <X className='h-4 w-4' />
                  <span className='sr-only'>Remove file</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
