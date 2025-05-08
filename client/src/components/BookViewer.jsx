'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  Bookmark,
  Share,
  Download,
} from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { fetchBookContent, downloadBook } from '../services/libraryService';

const BookViewer = ({ book, onClose }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [readingMode, setReadingMode] = useState('light');
  const [viewMode, setViewMode] = useState('page');
  const contentRef = useRef(null);

  // Fetch the book content
  useEffect(() => {
    const getBookContent = async () => {
      try {
        setLoading(true);
        const bookContent = await fetchBookContent(book.file);
        setContent(bookContent);
        setTotalPages(Math.ceil(bookContent.length / 3000)); // Rough estimate for pagination
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book content:', error);
        setLoading(false);
      }
    };

    if (book) {
      getBookContent();
    }
  }, [book]);

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      contentRef.current?.scrollTo(0, 0);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      contentRef.current?.scrollTo(0, 0);
    }
  };

  // Calculate content to display based on current page
  const getPageContent = () => {
    const charsPerPage = 3000; // Approximate chars per page
    const startChar = (currentPage - 1) * charsPerPage;
    const endChar = startChar + charsPerPage;
    return content.substring(startChar, endChar);
  };

  // Get background and text colors based on reading mode
  const getThemeColors = () => {
    switch (readingMode) {
      case 'light':
        return { bg: 'bg-white', text: 'text-gray-900' };
      case 'sepia':
        return { bg: 'bg-amber-50', text: 'text-amber-900' };
      case 'dark':
        return { bg: 'bg-gray-900', text: 'text-gray-100' };
      default:
        return { bg: 'bg-white', text: 'text-gray-900' };
    }
  };

  const themeColors = getThemeColors();

  const handleDownload = async () => {
    await downloadBook(book);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='relative w-full max-w-6xl h-[90vh] bg-background rounded-lg shadow-xl flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b'>
          <div>
            <h2 className='text-xl font-bold'>{book.title}</h2>
            <p className='text-sm text-muted-foreground'>{book.author}</p>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() =>
                setReadingMode(readingMode === 'light' ? 'dark' : 'light')
              }
              aria-label={
                readingMode === 'light'
                  ? 'Switch to dark mode'
                  : 'Switch to light mode'
              }
            >
              {readingMode === 'light' ? (
                <Moon className='h-4 w-4' />
              ) : (
                <Sun className='h-4 w-4' />
              )}
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setFontSize(Math.min(fontSize + 2, 24))}
              aria-label='Increase font size'
            >
              <ZoomIn className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setFontSize(Math.max(fontSize - 2, 12))}
              aria-label='Decrease font size'
            >
              <ZoomOut className='h-4 w-4' />
            </Button>
            <Tabs value={viewMode} onValueChange={setViewMode}>
              <TabsList>
                <TabsTrigger value='page'>Page</TabsTrigger>
                <TabsTrigger value='scroll'>Scroll</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant='ghost'
              size='icon'
              onClick={onClose}
              aria-label='Close book viewer'
            >
              <X className='h-5 w-5' />
            </Button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className='flex-1 flex items-center justify-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
          </div>
        ) : (
          <div className='flex-1 flex flex-col'>
            <ScrollArea ref={contentRef} className='flex-1'>
              <div
                className={`p-8 ${themeColors.bg} ${themeColors.text} min-h-full`}
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: '1.6',
                  maxWidth: '800px',
                  margin: '0 auto',
                }}
              >
                {viewMode === 'page' ? (
                  <div className='whitespace-pre-wrap'>{getPageContent()}</div>
                ) : (
                  <div className='whitespace-pre-wrap'>{content}</div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Footer */}
        <div className='p-4 border-t flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              size='icon'
              aria-label='Bookmark this page'
            >
              <Bookmark className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon' aria-label='Share this book'>
              <Share className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={handleDownload}
              aria-label='Download this book'
            >
              <Download className='h-4 w-4' />
            </Button>
          </div>

          {viewMode === 'page' && (
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='icon'
                onClick={goToPrevPage}
                disabled={currentPage <= 1}
                aria-label='Previous page'
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <span className='text-sm'>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant='outline'
                size='icon'
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
                aria-label='Next page'
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          )}

          <div className='w-32'>
            <Slider
              value={[fontSize]}
              min={12}
              max={24}
              step={1}
              onValueChange={(value) => setFontSize(value[0])}
              aria-label='Font size'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookViewer;
