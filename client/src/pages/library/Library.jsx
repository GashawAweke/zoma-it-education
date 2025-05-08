'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Grid, List, BookOpen, User, Book } from 'lucide-react';
import BiographiesShelf from './BiographiesShelf';
import ChildrenBookSeriesShelf from './ChildrenBookSeriesShelf';
import ChildrenFictionShelf from './ChildrenFictionShelf';

const Library = ({ userType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('biographies');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getWelcomeMessage = () => {
    switch (userType) {
      case 'student':
        return 'Explore books to enhance your learning journey';
      case 'teacher':
        return 'Find resources for your classroom and professional development';
      case 'health':
        return 'Discover books for therapeutic and educational support';
      default:
        return 'Explore our digital library collection';
    }
  };

  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold mb-6'>Zoma Digital Library</h1>
      <p className='text-muted-foreground mb-8'>{getWelcomeMessage()}</p>

      <div className='flex flex-col md:flex-row gap-4 mb-8'>
        <div className='relative flex-1'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search for books...'
            className='pl-8'
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className='flex gap-2'>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size='icon'
            onClick={() => setViewMode('grid')}
            aria-label='Grid view'
          >
            <Grid className='h-4 w-4' />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size='icon'
            onClick={() => setViewMode('list')}
            aria-label='List view'
          >
            <List className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue='biographies'
        className='w-full'
        onValueChange={setActiveTab}
      >
        <TabsList className='grid w-full grid-cols-3 mb-8'>
          <TabsTrigger value='biographies' className='flex items-center gap-2'>
            <User className='h-4 w-4' />
            <span className='hidden sm:inline'>Biographies</span>
          </TabsTrigger>
          <TabsTrigger
            value='children-series'
            className='flex items-center gap-2'
          >
            <BookOpen className='h-4 w-4' />
            <span className='hidden sm:inline'>Children's Series</span>
          </TabsTrigger>
          <TabsTrigger
            value='children-fiction'
            className='flex items-center gap-2'
          >
            <Book className='h-4 w-4' />
            <span className='hidden sm:inline'>Children's Fiction</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value='biographies'>
          <BiographiesShelf viewMode={viewMode} searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value='children-series'>
          <ChildrenBookSeriesShelf
            viewMode={viewMode}
            searchQuery={searchQuery}
          />
        </TabsContent>

        <TabsContent value='children-fiction'>
          <ChildrenFictionShelf viewMode={viewMode} searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>

      <Card className='mt-8'>
        <CardHeader>
          <CardTitle>Recently Viewed</CardTitle>
          <CardDescription>Books you've viewed recently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {/* Placeholder for recently viewed books */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className='aspect-[2/3] bg-muted rounded-md flex items-center justify-center'
              >
                <span className='text-muted-foreground'>Book {i}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Library;
