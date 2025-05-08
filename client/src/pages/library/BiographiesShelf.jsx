'use client';

import { useState, useEffect } from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Heart, BookmarkPlus, User } from 'lucide-react';
import BookViewer from '../../components/BookViewer';

const BiographiesShelf = ({ viewMode, searchQuery }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  // Simulated data for biographies
  useEffect(() => {
    // In a real app, this would be an API call
    const biographyBooks = [
      {
        id: 1,
        title: 'Andrew Marvell',
        author: 'Birrell, Augustine, 1850-1933',
        coverColor: 'bg-blue-100',
        file: 'files/17388-8.txt',
      },
      {
        id: 2,
        title: 'Bacon',
        author: 'Church, R. W. (Richard William), 1815-1890',
        coverColor: 'bg-blue-200',
        file: 'files/13888-8.txt',
      },
      {
        id: 3,
        title: 'Biographical Notes on the Pseudonymous Bells',
        author: 'Brontë, Charlotte, 1816-1855',
        coverColor: 'bg-blue-300',
        file: 'files/brnte10.txt',
      },
      {
        id: 4,
        title: 'Biographical Study of A.W. Kinglake',
        author: 'Tuckwell, William, 1829-1919',
        coverColor: 'bg-blue-100',
        file: 'files/awkbi10.txt',
      },
      {
        id: 5,
        title: 'Critical Miscellanies - Essay 1: Robespierre',
        author: 'Morley, John, 1838-1923',
        coverColor: 'bg-blue-200',
        file: 'files/20733-8.txt',
      },
      {
        id: 6,
        title: 'Eminent Victorians',
        author: 'Strachey, Giles Lytton, 1880-1932',
        coverColor: 'bg-blue-300',
        file: 'files/mnvct10.txt',
      },
      {
        id: 7,
        title:
          'Eugene Field, a Study in Heredity and Contradictions — Volume 1',
        author: 'Thompson, Slason, 1849-1935',
        coverColor: 'bg-blue-100',
        file: 'files/12984-8.txt',
      },
      {
        id: 8,
        title:
          'Eugene Field, a Study in Heredity and Contradictions — Volume 2',
        author: 'Thompson, Slason, 1849-1935',
        coverColor: 'bg-blue-200',
        file: 'files/12985-8.txt',
      },
      {
        id: 9,
        title: 'Famous Affinities of History — Complete',
        author: 'Orr, Lyndon',
        coverColor: 'bg-blue-300',
        file: 'files/ffntc10.txt',
      },
      {
        id: 10,
        title: 'Famous Men of the Middle Ages',
        author:
          'Poland, Addison B. and Haaren, John H. (John Henry), 1855-1916',
        coverColor: 'bg-blue-100',
        file: 'files/8fmtm10.txt',
      },
      {
        id: 11,
        title: 'Frederick Douglass - A Biography',
        author: 'Chesnutt, Charles W. (Charles Waddell), 1858-1932',
        coverColor: 'bg-blue-200',
        file: 'files/10986-8.txt',
      },
      {
        id: 12,
        title: 'Queen Victoria',
        author: 'Strachey, Giles Lytton, 1880-1932',
        coverColor: 'bg-blue-300',
        file: 'files/1265.txt',
      },
    ];

    setTimeout(() => {
      setBooks(biographyBooks);
      setLoading(false);
    }, 500);
  }, []);

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseViewer = () => {
    setSelectedBook(null);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
      </div>
    );
  }

  return (
    <div>
      <div className='flex items-center gap-2 mb-6'>
        <User className='h-5 w-5 text-blue-600' />
        <h2 className='text-2xl font-bold text-blue-600'>Biographies</h2>
      </div>

      {filteredBooks.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>
            No books found matching your search.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className='overflow-hidden hover:shadow-lg transition-shadow cursor-pointer'
              onClick={() => handleBookClick(book)}
            >
              <div
                className={`aspect-[2/3] ${book.coverColor} flex items-center justify-center`}
              >
                <span className='text-lg font-semibold text-center px-2'>
                  {book.title}
                </span>
              </div>
              <CardFooter className='flex flex-col items-start p-2'>
                <p className='text-sm font-medium line-clamp-1'>{book.title}</p>
                <p className='text-xs text-muted-foreground line-clamp-1'>
                  {book.author}
                </p>
                <div className='flex gap-1 mt-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7'
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle download logic
                    }}
                  >
                    <Download className='h-3 w-3' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7'
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle favorite logic
                    }}
                  >
                    <Heart className='h-3 w-3' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7'
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle bookmark logic
                    }}
                  >
                    <BookmarkPlus className='h-3 w-3' />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className='space-y-2'>
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className='overflow-hidden hover:shadow-sm transition-shadow cursor-pointer'
              onClick={() => handleBookClick(book)}
            >
              <CardHeader className='p-3'>
                <div className='flex justify-between items-start'>
                  <div>
                    <CardTitle className='text-base'>{book.title}</CardTitle>
                    <p className='text-sm text-muted-foreground'>
                      {book.author}
                    </p>
                  </div>
                  <div className='flex gap-1'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8'
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle download logic
                      }}
                    >
                      <Download className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8'
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle favorite logic
                      }}
                    >
                      <Heart className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8'
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle bookmark logic
                      }}
                    >
                      <BookmarkPlus className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Book Viewer */}
      {selectedBook && (
        <BookViewer book={selectedBook} onClose={handleCloseViewer} />
      )}
    </div>
  );
};

export default BiographiesShelf;
