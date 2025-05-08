'use client';

import { useState, useEffect } from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Heart, BookmarkPlus, BookOpen } from 'lucide-react';
import BookViewer from '../../components/BookViewer';

const ChildrenBookSeriesShelf = ({ viewMode, searchQuery }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  // Simulated data for children's book series
  useEffect(() => {
    // In a real app, this would be an API call
    const seriesBooks = [
      {
        id: 1,
        title: "A Campfire Girl's First Council Fire",
        author: 'Stewart, Jane L.',
        coverColor: 'bg-green-100',
        file: 'files/20713.txt',
      },
      {
        id: 2,
        title: "A Campfire Girl's Test of Friendship",
        author: 'Stewart, Jane L.',
        coverColor: 'bg-green-200',
        file: 'files/22652.txt',
      },
      {
        id: 3,
        title: 'A Little Girl in Old Detroit',
        author: 'Douglas, Amanda Minnie, 1831-1916',
        coverColor: 'bg-green-300',
        file: 'files/20721-8.txt',
      },
      {
        id: 4,
        title: 'A Little Girl in Old Salem',
        author: 'Douglas, Amanda Minnie, 1831-1916',
        coverColor: 'bg-green-100',
        file: 'files/20722-8.txt',
      },
      {
        id: 5,
        title: 'A Little Maid of Old Maine',
        author: 'Curtis, Alice Turner',
        coverColor: 'bg-green-200',
        file: 'files/20340-8.txt',
      },
      {
        id: 6,
        title: 'Adventures of Reddy Fox',
        author: 'Burgess, Thornton W. (Thornton Waldo), 1874-1965',
        coverColor: 'bg-green-300',
        file: 'files/1825.txt',
      },
      {
        id: 7,
        title: 'Betty Gordon at Boarding School',
        author: 'Emerson, Alice B., pseud.',
        coverColor: 'bg-green-100',
        file: 'files/10317-8.txt',
      },
      {
        id: 8,
        title: 'Betty Gordon at Mountain Camp',
        author: 'Emerson, Alice B., pseud.',
        coverColor: 'bg-green-200',
        file: 'files/14546-8.txt',
      },
      {
        id: 9,
        title: 'Betty Gordon in Washington',
        author: 'Emerson, Alice B., pseud.',
        coverColor: 'bg-green-300',
        file: 'files/bgwsh10.txt',
      },
      {
        id: 10,
        title: 'Billie Bradley and Her Inheritance',
        author: 'Wheeler, Janet D.',
        coverColor: 'bg-green-100',
        file: 'files/10048.txt',
      },
      {
        id: 11,
        title: 'Billie Bradley at Three Towers Hall',
        author: 'Wheeler, Janet D.',
        coverColor: 'bg-green-200',
        file: 'files/23894-8.txt',
      },
      {
        id: 12,
        title: 'Billie Bradley on Lighthouse Island',
        author: 'Wheeler, Janet D.',
        coverColor: 'bg-green-300',
        file: 'files/25762.txt',
      },
    ];

    setTimeout(() => {
      setBooks(seriesBooks);
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
        <BookOpen className='h-5 w-5 text-green-600' />
        <h2 className='text-2xl font-bold text-green-600'>
          Children's Book Series
        </h2>
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

export default ChildrenBookSeriesShelf;
