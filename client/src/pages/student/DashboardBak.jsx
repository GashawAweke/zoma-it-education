'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { ScrollArea } from '../../components/ui/scroll-area';
import {
  Search,
  Play,
  Clock,
  CheckCircle,
  Download,
  Share2,
  Heart,
  HeartOff,
  PlayCircle,
  Grid,
  List,
  X,
} from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('learn');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const [favoriteVideos, setFavoriteVideos] = useState(new Set());
  const [watchHistory, setWatchHistory] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [recentlyWatched, setRecentlyWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseVideos, setCourseVideos] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const playerRef = useRef(null);

  // Load course data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch the data from /data/videodata.json
        const response = await fetch('localvideodata.json');
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setCourseVideos(data);

        // Set the first category as expanded by default
        if (data.length > 0) {
          setExpandedCategory(data[0].category);
        }

        // Initialize progress data
        const progressData = {};
        data.forEach((category) => {
          progressData[category.category] = {
            total: category.videos.length,
            completed: 0,
          };
        });
        setCourseProgress(progressData);

        // Simulate loading recently watched videos
        const allVideos = data.flatMap((category) =>
          category.videos.map((video) => ({
            ...video,
            category: category.category,
          }))
        );
        if (allVideos.length > 0) {
          setRecentlyWatched([
            allVideos[0],
            allVideos[allVideos.length > 3 ? 3 : 0],
          ]);
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        toast('Failed to load course data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // Filter videos based on search query and selected category
  const filteredVideos = courseVideos
    .filter(
      (category) =>
        selectedCategory === 'all' || category.category === selectedCategory
    )
    .map((category) => ({
      ...category,
      videos: category.videos.filter(
        (video) =>
          video.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.review.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.videos.length > 0);

  // Calculate overall progress
  const calculateOverallProgress = () => {
    let totalVideos = 0;
    let completedCount = 0;

    Object.values(courseProgress).forEach((progress) => {
      totalVideos += progress.total;
      completedCount += progress.completed;
    });

    return totalVideos > 0
      ? Math.round((completedCount / totalVideos) * 100)
      : 0;
  };

  // Handle video selection
  const handleVideoSelect = (video, category) => {
    setSelectedVideo({
      ...video,
      category,
    });
    setIsPlayerOpen(true);

    // Add to watch history
    const historyEntry = {
      ...video,
      category,
      timestamp: new Date().toISOString(),
    };

    setWatchHistory((prev) => [
      historyEntry,
      ...prev.filter((v) => v.url !== video.url),
    ]);

    // Update recently watched
    setRecentlyWatched((prev) => {
      const newList = [
        { ...video, category },
        ...prev.filter((v) => v.url !== video.url),
      ];
      return newList.slice(0, 4);
    });
  };

  // Mark video as complete
  const handleMarkComplete = (video, category) => {
    const videoId = `${category}-${video.url}`;

    setCompletedVideos((prev) => {
      const newSet = new Set(prev);
      if (!newSet.has(videoId)) {
        newSet.add(videoId);

        // Update progress
        setCourseProgress((prev) => {
          const newProgress = { ...prev };
          if (newProgress[category]) {
            newProgress[category].completed += 1;
          }
          return newProgress;
        });

        toast(`"${video.name}" marked as complete!`, 'success');
      }
      return newSet;
    });
  };

  // Toggle favorite status
  const toggleFavorite = (video, category) => {
    const videoId = `${category}-${video.url}`;

    setFavoriteVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
        toast(`"${video.name}" removed from favorites`, 'info');
      } else {
        newSet.add(videoId);
        toast(`"${video.name}" added to favorites`, 'success');
      }
      return newSet;
    });
  };

  // Close video player
  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedVideo(null);
  };

  // Handle video completion from player
  const handleVideoComplete = () => {
    if (selectedVideo) {
      handleMarkComplete(selectedVideo, selectedVideo.category);
    }
  };

  // Video card component
  const VideoCard = ({ video, category, layout = 'grid' }) => {
    const videoId = `${category}-${video.url}`;
    const isCompleted = completedVideos.has(videoId);
    const isFavorite = favoriteVideos.has(videoId);

    if (layout === 'list') {
      return (
        <div className='flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'>
          <div className='relative flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mr-4'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <PlayCircle className='h-8 w-8 text-primary opacity-80' />
            </div>
          </div>

          <div className='flex-grow'>
            <div className='flex items-center justify-between'>
              <h3 className='font-medium'>{video.name}</h3>
              <div className='flex items-center space-x-1'>
                <Badge variant='outline' className='text-xs'>
                  <Clock className='h-3 w-3 mr-1' />
                  {video.duration}
                </Badge>
                {isCompleted && (
                  <Badge variant='success' className='text-xs'>
                    <CheckCircle className='h-3 w-3 mr-1' />
                    Completed
                  </Badge>
                )}
              </div>
            </div>

            <p className='text-sm text-gray-500 dark:text-gray-400 line-clamp-1'>
              {video.review}
            </p>

            <div className='flex items-center mt-2'>
              <Button
                variant='ghost'
                size='sm'
                className='h-8 px-2 text-xs'
                onClick={() => handleVideoSelect(video, category)}
              >
                <Play className='h-3 w-3 mr-1' />
                Watch
              </Button>

              <Button
                variant='ghost'
                size='sm'
                className='h-8 px-2 text-xs'
                onClick={() => toggleFavorite(video, category)}
              >
                {isFavorite ? (
                  <Heart className='h-3 w-3 mr-1 text-red-500 fill-red-500' />
                ) : (
                  <Heart className='h-3 w-3 mr-1' />
                )}
                {isFavorite ? 'Favorited' : 'Favorite'}
              </Button>

              {!isCompleted && (
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 px-2 text-xs'
                  onClick={() => handleMarkComplete(video, category)}
                >
                  <CheckCircle className='h-3 w-3 mr-1' />
                  Mark Complete
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Card className='overflow-hidden h-full flex flex-col'>
        <div
          className='relative aspect-video bg-gray-200 dark:bg-gray-700 cursor-pointer'
          onClick={() => handleVideoSelect(video, category)}
        >
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center'>
              <Play className='h-6 w-6 text-white' />
            </div>
          </div>

          {isCompleted && (
            <div className='absolute top-2 right-2'>
              <Badge variant='success'>
                <CheckCircle className='h-3 w-3 mr-1' />
                Completed
              </Badge>
            </div>
          )}

          <div className='absolute bottom-2 right-2'>
            <Badge
              variant='outline'
              className='bg-black/70 text-white border-none'
            >
              <Clock className='h-3 w-3 mr-1' />
              {video.duration}
            </Badge>
          </div>
        </div>

        <CardHeader className='p-3 pb-0'>
          <CardTitle className='text-base'>{video.name}</CardTitle>
        </CardHeader>

        <CardContent className='p-3 pt-2 flex-grow'>
          <p className='text-sm text-gray-500 dark:text-gray-400 line-clamp-2'>
            {video.review}
          </p>
        </CardContent>

        <CardFooter className='p-3 pt-0 flex justify-between'>
          <Button
            variant='ghost'
            size='sm'
            className='h-8 px-2'
            onClick={() => toggleFavorite(video, category)}
          >
            {isFavorite ? (
              <Heart className='h-4 w-4 mr-1 text-red-500 fill-red-500' />
            ) : (
              <Heart className='h-4 w-4 mr-1' />
            )}
          </Button>

          {!isCompleted && (
            <Button
              variant='ghost'
              size='sm'
              className='h-8 px-2'
              onClick={() => handleMarkComplete(video, category)}
            >
              <CheckCircle className='h-4 w-4 mr-1' />
              Complete
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto'></div>
          <p className='mt-4'>Loading your learning dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900'>
      <main className='flex-grow'>
        <Tabs
          defaultValue='learn'
          value={activeTab}
          onValueChange={setActiveTab}
          className='w-full'
        >
          <div className='border-b sticky top-0 bg-background z-10'>
            <div className='container mx-auto px-4'>
              <TabsList className='h-14'>
                <TabsTrigger value='learn' className='text-base'>
                  Learn
                </TabsTrigger>
                <TabsTrigger value='progress' className='text-base'>
                  My Progress
                </TabsTrigger>
                <TabsTrigger value='favorites' className='text-base'>
                  Favorites
                </TabsTrigger>
                <TabsTrigger value='settings' className='text-base'>
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className='container mx-auto px-4 py-6'>
            {/* Learn Tab */}
            <TabsContent value='learn' className='mt-0 space-y-6'>
              {/* Welcome Section */}
              <div className='bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white'>
                <div className='flex flex-col md:flex-row md:items-center justify-between'>
                  <div>
                    <h1 className='text-2xl font-bold'>
                      Welcome back, {user?.name || 'Student'}!
                    </h1>
                    <p className='mt-2 opacity-90'>
                      Continue your learning journey. You've completed{' '}
                      {calculateOverallProgress()}% of your courses.
                    </p>
                  </div>
                  <div className='mt-4 md:mt-0'>
                    <Progress
                      value={calculateOverallProgress()}
                      className='w-full md:w-40 h-2 bg-white/20'
                    />
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='relative flex-grow'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <Input
                    placeholder='Search for videos...'
                    className='pl-10'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className='flex gap-2'>
                  <select
                    className='px-3 py-2 rounded-md border border-input bg-background'
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value='all'>All Categories</option>
                    {courseVideos.map((category) => (
                      <option key={category.category} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                  </select>

                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() =>
                      setViewMode(viewMode === 'grid' ? 'list' : 'grid')
                    }
                  >
                    {viewMode === 'grid' ? (
                      <List className='h-4 w-4' />
                    ) : (
                      <Grid className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>

              {/* Recently Watched */}
              {recentlyWatched.length > 0 && (
                <div>
                  <h2 className='text-xl font-bold mb-4'>Continue Learning</h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {recentlyWatched.map((video, index) => (
                      <Card key={index} className='overflow-hidden'>
                        <div
                          className='relative aspect-video bg-gray-200 dark:bg-gray-700 cursor-pointer'
                          onClick={() =>
                            handleVideoSelect(video, video.category)
                          }
                        >
                          <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center'>
                              <Play className='h-6 w-6 text-white' />
                            </div>
                          </div>

                          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3'>
                            <h3 className='text-white font-medium'>
                              {video.name}
                            </h3>
                            <div className='flex items-center mt-1'>
                              <Badge
                                variant='outline'
                                className='bg-black/50 text-white border-none text-xs'
                              >
                                <Clock className='h-3 w-3 mr-1' />
                                {video.duration}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className='p-3'>
                          <Progress value={30} className='h-1 mb-1' />
                          <p className='text-xs text-gray-500'>30% completed</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Categories with Accordion */}
              {filteredVideos.length > 0 ? (
                <div className='space-y-4'>
                  <Accordion
                    type='single'
                    collapsible
                    value={expandedCategory}
                    onValueChange={setExpandedCategory}
                    className='space-y-4'
                  >
                    {filteredVideos.map((category, index) => (
                      <AccordionItem
                        key={index}
                        value={category.category}
                        className='border rounded-lg overflow-hidden'
                      >
                        <AccordionTrigger className='px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800'>
                          <div className='flex items-center justify-between w-full pr-4'>
                            <h2 className='text-xl font-bold'>
                              {category.category}
                            </h2>
                            <div className='flex items-center'>
                              <span className='text-sm mr-2'>
                                {courseProgress[category.category]?.completed ||
                                  0}
                                /{courseProgress[category.category]?.total || 0}{' '}
                                completed
                              </span>
                              <Progress
                                value={
                                  courseProgress[category.category]
                                    ? (courseProgress[category.category]
                                        .completed /
                                        courseProgress[category.category]
                                          .total) *
                                      100
                                    : 0
                                }
                                className='w-24 h-2'
                              />
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className='px-6 pb-6'>
                          {viewMode === 'grid' ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                              {category.videos.map((video, videoIndex) => (
                                <VideoCard
                                  key={videoIndex}
                                  video={video}
                                  category={category.category}
                                />
                              ))}
                            </div>
                          ) : (
                            <Card>
                              <CardContent className='p-0'>
                                <div className='divide-y'>
                                  {category.videos.map((video, videoIndex) => (
                                    <VideoCard
                                      key={videoIndex}
                                      video={video}
                                      category={category.category}
                                      layout='list'
                                    />
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ) : (
                <div className='text-center py-12'>
                  <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4'>
                    <Search className='h-8 w-8 text-gray-400' />
                  </div>
                  <h3 className='text-lg font-medium'>No videos found</h3>
                  <p className='text-gray-500 mt-2'>
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    variant='outline'
                    className='mt-4'
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value='progress' className='mt-0 space-y-6'>
              <h1 className='text-2xl font-bold'>My Learning Progress</h1>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg'>Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold'>
                      {calculateOverallProgress()}%
                    </div>
                    <Progress
                      value={calculateOverallProgress()}
                      className='h-2 mt-2'
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg'>Videos Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold'>
                      {completedVideos.size}
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>
                      Out of{' '}
                      {courseVideos.reduce(
                        (acc, category) => acc + category.videos.length,
                        0
                      )}{' '}
                      total videos
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg'>Learning Streak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold'>3 days</div>
                    <p className='text-sm text-gray-500 mt-1'>Keep it up!</p>
                  </CardContent>
                </Card>
              </div>

              <h2 className='text-xl font-bold mt-8'>Progress by Category</h2>
              <div className='space-y-4'>
                {courseVideos.map((category, index) => {
                  const progress = courseProgress[category.category] || {
                    completed: 0,
                    total: category.videos.length,
                  };
                  const percentage =
                    progress.total > 0
                      ? Math.round((progress.completed / progress.total) * 100)
                      : 0;

                  return (
                    <Card key={index}>
                      <CardContent className='p-4'>
                        <div className='flex items-center justify-between mb-2'>
                          <h3 className='font-medium'>{category.category}</h3>
                          <span className='text-sm font-medium'>
                            {percentage}%
                          </span>
                        </div>
                        <Progress value={percentage} className='h-2 mb-2' />
                        <div className='flex justify-between text-sm text-gray-500'>
                          <span>
                            {progress.completed} of {progress.total} completed
                          </span>
                          <span>
                            {progress.total - progress.completed} remaining
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <h2 className='text-xl font-bold mt-8'>Recently Completed</h2>
              {completedVideos.size > 0 ? (
                <div className='space-y-2'>
                  {Array.from(completedVideos)
                    .slice(0, 5)
                    .map((videoId, index) => {
                      const [categoryName, videoUrl] = videoId.split('-');
                      const category = courseVideos.find(
                        (c) => c.category === categoryName
                      );
                      const video = category?.videos.find(
                        (v) => v.url === videoUrl.substring(1)
                      );

                      if (!video) return null;

                      return (
                        <Card key={index}>
                          <CardContent className='p-4'>
                            <div className='flex items-center'>
                              <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                              <div>
                                <h3 className='font-medium'>{video.name}</h3>
                                <p className='text-sm text-gray-500'>
                                  {categoryName}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              ) : (
                <Card>
                  <CardContent className='p-6 text-center'>
                    <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4'>
                      <CheckCircle className='h-6 w-6 text-gray-400' />
                    </div>
                    <h3 className='font-medium'>No completed videos yet</h3>
                    <p className='text-sm text-gray-500 mt-1'>
                      Start watching videos and mark them as complete
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value='favorites' className='mt-0 space-y-6'>
              <h1 className='text-2xl font-bold'>My Favorite Videos</h1>

              {favoriteVideos.size > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                  {Array.from(favoriteVideos).map((videoId, index) => {
                    const [categoryName, videoUrl] = videoId.split('-');
                    const category = courseVideos.find(
                      (c) => c.category === categoryName
                    );
                    const video = category?.videos.find(
                      (v) => v.url === videoUrl.substring(1)
                    );

                    if (!video) return null;

                    return (
                      <VideoCard
                        key={index}
                        video={video}
                        category={categoryName}
                      />
                    );
                  })}
                </div>
              ) : (
                <Card>
                  <CardContent className='p-8 text-center'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4'>
                      <Heart className='h-8 w-8 text-gray-400' />
                    </div>
                    <h3 className='text-lg font-medium'>
                      No favorite videos yet
                    </h3>
                    <p className='text-gray-500 mt-2'>
                      Mark videos as favorites to access them quickly
                    </p>
                    <Button
                      variant='outline'
                      className='mt-4'
                      onClick={() => setActiveTab('learn')}
                    >
                      Browse videos
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value='settings' className='mt-0 space-y-6'>
              <h1 className='text-2xl font-bold'>Learning Settings</h1>

              <Card>
                <CardHeader>
                  <CardTitle>Video Playback</CardTitle>
                  <CardDescription>
                    Customize your video playback experience
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='font-medium'>Autoplay Videos</h3>
                      <p className='text-sm text-gray-500'>
                        Automatically play the next video
                      </p>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          value=''
                          className='sr-only peer'
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='font-medium'>Default Video Quality</h3>
                      <p className='text-sm text-gray-500'>
                        Choose your preferred video quality
                      </p>
                    </div>
                    <select className='px-3 py-2 rounded-md border border-input bg-background'>
                      <option value='auto'>Auto</option>
                      <option value='1080p'>1080p</option>
                      <option value='720p'>720p</option>
                      <option value='480p'>480p</option>
                      <option value='360p'>360p</option>
                    </select>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='font-medium'>Playback Speed</h3>
                      <p className='text-sm text-gray-500'>
                        Default speed for video playback
                      </p>
                    </div>
                    <select className='px-3 py-2 rounded-md border border-input bg-background'>
                      <option value='0.5'>0.5x</option>
                      <option value='0.75'>0.75x</option>
                      <option value='1' selected>
                        Normal (1x)
                      </option>
                      <option value='1.25'>1.25x</option>
                      <option value='1.5'>1.5x</option>
                      <option value='2'>2x</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Preferences</CardTitle>
                  <CardDescription>
                    Customize your learning experience
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='font-medium'>Show Completion Status</h3>
                      <p className='text-sm text-gray-500'>
                        Display your progress on the dashboard
                      </p>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          value=''
                          className='sr-only peer'
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='font-medium'>Default View Mode</h3>
                      <p className='text-sm text-gray-500'>
                        Choose how videos are displayed
                      </p>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid className='h-4 w-4 mr-1' />
                        Grid
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setViewMode('list')}
                      >
                        <List className='h-4 w-4 mr-1' />
                        List
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='font-medium'>Learning Reminders</h3>
                      <p className='text-sm text-gray-500'>
                        Receive reminders to continue learning
                      </p>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          value=''
                          className='sr-only peer'
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='font-medium'>New Content Alerts</h3>
                      <p className='text-sm text-gray-500'>
                        Get notified when new videos are added
                      </p>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          value=''
                          className='sr-only peer'
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() =>
                      toast('Settings saved successfully!', 'success')
                    }
                  >
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Video Player Modal - Fixed to address the layout issues */}
      {isPlayerOpen && selectedVideo && (
        <div className='fixed inset-0 z-50 bg-background flex items-center justify-center overflow-y-auto'>
          <div className='w-full max-w-5xl mx-auto my-8 relative'>
            <div className='absolute top-4 right-4 z-10 flex space-x-2'>
              <Button
                variant='ghost'
                size='icon'
                className='bg-black/50 text-white hover:bg-black/70'
                onClick={handleClosePlayer}
              >
                <X className='h-5 w-5' />
              </Button>
            </div>

            <div className='bg-background rounded-lg overflow-hidden shadow-xl'>
              <VideoPlayer
                ref={playerRef}
                src={selectedVideo.url}
                poster='/placeholder.svg?height=720&width=1280'
                title={selectedVideo.name}
                onComplete={handleVideoComplete}
                onError={() =>
                  toast('Error loading video. Please try again later.', 'error')
                }
                className='w-full'
              />

              <div className='p-4 md:p-6'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h2 className='text-xl font-bold'>{selectedVideo.name}</h2>
                    <p className='text-sm text-gray-500 mt-1'>
                      {selectedVideo.category}
                    </p>
                  </div>

                  <div className='flex space-x-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        toggleFavorite(selectedVideo, selectedVideo.category)
                      }
                    >
                      {favoriteVideos.has(
                        `${selectedVideo.category}-${selectedVideo.url}`
                      ) ? (
                        <>
                          <HeartOff className='h-4 w-4 mr-1' />
                          Unfavorite
                        </>
                      ) : (
                        <>
                          <Heart className='h-4 w-4 mr-1' />
                          Favorite
                        </>
                      )}
                    </Button>

                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        handleMarkComplete(
                          selectedVideo,
                          selectedVideo.category
                        )
                      }
                      disabled={completedVideos.has(
                        `${selectedVideo.category}-${selectedVideo.url}`
                      )}
                    >
                      {completedVideos.has(
                        `${selectedVideo.category}-${selectedVideo.url}`
                      ) ? (
                        <>
                          <CheckCircle className='h-4 w-4 mr-1 text-green-500' />
                          Completed
                        </>
                      ) : (
                        <>
                          <CheckCircle className='h-4 w-4 mr-1' />
                          Mark Complete
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <Separator className='my-4' />

                <div className='flex flex-col md:flex-row gap-6'>
                  <div className='md:w-2/3'>
                    <h3 className='font-medium mb-2'>About this video</h3>
                    <p className='text-gray-700 dark:text-gray-300'>
                      {selectedVideo.review}
                    </p>

                    <div className='flex items-center mt-4 space-x-4'>
                      <div className='flex items-center'>
                        <Clock className='h-4 w-4 mr-1 text-gray-500' />
                        <span className='text-sm text-gray-500'>
                          {selectedVideo.duration}
                        </span>
                      </div>

                      <Button variant='ghost' size='sm' className='h-8'>
                        <Download className='h-4 w-4 mr-1' />
                        Download
                      </Button>

                      <Button variant='ghost' size='sm' className='h-8'>
                        <Share2 className='h-4 w-4 mr-1' />
                        Share
                      </Button>
                    </div>
                  </div>

                  <div className='md:w-1/3'>
                    <Card>
                      <CardHeader className='pb-2'>
                        <CardTitle className='text-base'>
                          Related Videos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className='p-0'>
                        <ScrollArea className='h-48'>
                          {courseVideos
                            .find((c) => c.category === selectedVideo.category)
                            ?.videos.filter((v) => v.url !== selectedVideo.url)
                            .slice(0, 3)
                            .map((video, index) => (
                              <div
                                key={index}
                                className='flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
                                onClick={() =>
                                  handleVideoSelect(
                                    video,
                                    selectedVideo.category
                                  )
                                }
                              >
                                <div className='relative flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mr-3'>
                                  <div className='absolute inset-0 flex items-center justify-center'>
                                    <PlayCircle className='h-6 w-6 text-primary opacity-80' />
                                  </div>
                                </div>
                                <div>
                                  <h4 className='text-sm font-medium line-clamp-1'>
                                    {video.name}
                                  </h4>
                                  <p className='text-xs text-gray-500'>
                                    {video.duration}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
