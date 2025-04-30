'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  FileText,
  Video,
  Download,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';
import { Input } from '../../components/ui/input';
import { useState } from 'react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for resources
  const resources = [
    {
      id: 1,
      title: 'First Aid Manual',
      type: 'document',
      category: 'first-aid',
      format: 'PDF',
      size: '2.4 MB',
      date: '2023-03-15',
    },
    {
      id: 2,
      title: 'Mental Health Support Guide',
      type: 'document',
      category: 'mental-health',
      format: 'PDF',
      size: '1.8 MB',
      date: '2023-04-10',
    },
    {
      id: 3,
      title: 'CPR Training Video',
      type: 'video',
      category: 'first-aid',
      format: 'MP4',
      size: '45 MB',
      date: '2023-02-22',
    },
    {
      id: 4,
      title: 'Nutrition Guidelines for Students',
      type: 'document',
      category: 'nutrition',
      format: 'PDF',
      size: '3.2 MB',
      date: '2023-05-05',
    },
    {
      id: 5,
      title: 'Stress Management Techniques',
      type: 'document',
      category: 'mental-health',
      format: 'PDF',
      size: '1.5 MB',
      date: '2023-04-28',
    },
    {
      id: 6,
      title: 'Allergy Response Protocol',
      type: 'document',
      category: 'first-aid',
      format: 'PDF',
      size: '1.2 MB',
      date: '2023-03-30',
    },
    {
      id: 7,
      title: 'Healthy Eating Webinar',
      type: 'video',
      category: 'nutrition',
      format: 'MP4',
      size: '120 MB',
      date: '2023-05-12',
    },
  ];

  // Filter resources based on search term
  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get icon based on resource type
  const getResourceIcon = (type) => {
    switch (type) {
      case 'document':
        return <FileText className='h-5 w-5 text-blue-500' />;
      case 'video':
        return <Video className='h-5 w-5 text-red-500' />;
      default:
        return <FileText className='h-5 w-5' />;
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Health Resources</h1>

      <Tabs defaultValue='all'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='all'>All Resources</TabsTrigger>
          <TabsTrigger value='first-aid'>First Aid</TabsTrigger>
          <TabsTrigger value='mental-health'>Mental Health</TabsTrigger>
          <TabsTrigger value='nutrition'>Nutrition</TabsTrigger>
        </TabsList>

        <div className='mt-6 mb-4'>
          <div className='flex items-center gap-2'>
            <div className='relative flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search resources...'
                className='pl-8'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant='outline' size='icon'>
              <Filter className='h-4 w-4' />
              <span className='sr-only'>Filter</span>
            </Button>
          </div>
        </div>

        <TabsContent value='all' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>All Health Resources</CardTitle>
              <CardDescription>
                Access all available health resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {filteredResources.map((resource) => (
                  <Card key={resource.id}>
                    <CardHeader className='pb-2'>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center'>
                          {getResourceIcon(resource.type)}
                          <CardTitle className='text-lg ml-2'>
                            {resource.title}
                          </CardTitle>
                        </div>
                        <Badge variant='outline'>{resource.format}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className='pb-2'>
                      <div className='flex items-center text-sm text-muted-foreground'>
                        <Badge variant='secondary' className='mr-2'>
                          {resource.category}
                        </Badge>
                        <span>{resource.date}</span>
                      </div>
                    </CardContent>
                    <CardContent className='pt-0 flex justify-end gap-2'>
                      <Button variant='outline' size='sm'>
                        <ExternalLink className='h-4 w-4 mr-1' />
                        View
                      </Button>
                      <Button size='sm'>
                        <Download className='h-4 w-4 mr-1' />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='first-aid' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>First Aid Resources</CardTitle>
              <CardDescription>
                Access first aid guides and training materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {filteredResources
                  .filter((resource) => resource.category === 'first-aid')
                  .map((resource) => (
                    <Card key={resource.id}>
                      <CardHeader className='pb-2'>
                        <div className='flex items-start justify-between'>
                          <div className='flex items-center'>
                            {getResourceIcon(resource.type)}
                            <CardTitle className='text-lg ml-2'>
                              {resource.title}
                            </CardTitle>
                          </div>
                          <Badge variant='outline'>{resource.format}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className='pb-2'>
                        <div className='flex items-center text-sm text-muted-foreground'>
                          <Badge variant='secondary' className='mr-2'>
                            {resource.category}
                          </Badge>
                          <span>{resource.date}</span>
                        </div>
                      </CardContent>
                      <CardContent className='pt-0 flex justify-end gap-2'>
                        <Button variant='outline' size='sm'>
                          <ExternalLink className='h-4 w-4 mr-1' />
                          View
                        </Button>
                        <Button size='sm'>
                          <Download className='h-4 w-4 mr-1' />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='mental-health' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Mental Health Resources</CardTitle>
              <CardDescription>
                Access mental health support materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {filteredResources
                  .filter((resource) => resource.category === 'mental-health')
                  .map((resource) => (
                    <Card key={resource.id}>
                      <CardHeader className='pb-2'>
                        <div className='flex items-start justify-between'>
                          <div className='flex items-center'>
                            {getResourceIcon(resource.type)}
                            <CardTitle className='text-lg ml-2'>
                              {resource.title}
                            </CardTitle>
                          </div>
                          <Badge variant='outline'>{resource.format}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className='pb-2'>
                        <div className='flex items-center text-sm text-muted-foreground'>
                          <Badge variant='secondary' className='mr-2'>
                            {resource.category}
                          </Badge>
                          <span>{resource.date}</span>
                        </div>
                      </CardContent>
                      <CardContent className='pt-0 flex justify-end gap-2'>
                        <Button variant='outline' size='sm'>
                          <ExternalLink className='h-4 w-4 mr-1' />
                          View
                        </Button>
                        <Button size='sm'>
                          <Download className='h-4 w-4 mr-1' />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='nutrition' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Resources</CardTitle>
              <CardDescription>
                Access nutrition guides and information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {filteredResources
                  .filter((resource) => resource.category === 'nutrition')
                  .map((resource) => (
                    <Card key={resource.id}>
                      <CardHeader className='pb-2'>
                        <div className='flex items-start justify-between'>
                          <div className='flex items-center'>
                            {getResourceIcon(resource.type)}
                            <CardTitle className='text-lg ml-2'>
                              {resource.title}
                            </CardTitle>
                          </div>
                          <Badge variant='outline'>{resource.format}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className='pb-2'>
                        <div className='flex items-center text-sm text-muted-foreground'>
                          <Badge variant='secondary' className='mr-2'>
                            {resource.category}
                          </Badge>
                          <span>{resource.date}</span>
                        </div>
                      </CardContent>
                      <CardContent className='pt-0 flex justify-end gap-2'>
                        <Button variant='outline' size='sm'>
                          <ExternalLink className='h-4 w-4 mr-1' />
                          View
                        </Button>
                        <Button size='sm'>
                          <Download className='h-4 w-4 mr-1' />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resources;
