'use client';

import { useState, useEffect } from 'react';
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
import {
  CheckCircle,
  Clock,
  PlayCircle,
  ChevronRight,
  Lock,
} from 'lucide-react';
import axios from 'axios';
import VideoPlayer from '../../components/VideoPlayer';

// // Mock function to load course data - will be replaced with real API fetch
// const loadCourseData = async (gradeLevel) => {
//   // TODO: Real API fetch will go here
//   try {
//     // For now, we're using static imports based on grade level
//     if (gradeLevel === '3-4') {
//       // In a real implementation, this would be a fetch call to an API endpoint
//       const data = await import('../../data/grade-3-4-videodata.json');
//       const courseData = data.default || data;

//       // Process the data to ensure file paths are correct
//       return courseData.map((chapter) => {
//         if (chapter.sections) {
//           return {
//             ...chapter,
//             sections: chapter.sections.map((section) => {
//               return {
//                 ...section,
//                 videos: section.videos.map((video) => {
//                   // Ensure the file path is correct
//                   return {
//                     ...video,
//                     file: video.file.startsWith('/')
//                       ? video.file
//                       : `/assets/${video.file}`,
//                   };
//                 }),
//               };
//             }),
//           };
//         } else if (chapter.videos) {
//           return {
//             ...chapter,
//             videos: chapter.videos.map((video) => {
//               // Ensure the file path is correct
//               return {
//                 ...video,
//                 file: video.file.startsWith('/')
//                   ? video.file
//                   : `/assets/${video.file}`,
//               };
//             }),
//           };
//         }
//         return chapter;
//       });
//     }
//     // Add other grade levels as needed
//     return [];
//   } catch (error) {
//     console.error('Error loading course data:', error);
//     return [];
//   }
// };

const fetchGradeCourses = async (gradeLevel) => {
  // TODO: Real API fetch will go here
  const { data } = await axios.get(`/api/courses?grade=${gradeLevel}`);
  return data.courses;
};

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user progress data
  const [userProgress, setUserProgress] = useState({
    completedVideos: new Set([
      'f5b2d4c1-7b28-44d7-9c0b-a61f9a00c6b1',
      '44e85c61-865b-41be-95c2-c5de0ebd802d',
    ]),
    lastWatched: {
      chapterIndex: 0,
      videoId: '44e85c61-865b-41be-95c2-c5de0ebd802d',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await loadCourseData(user?.grade || '3-4');

        // Process the data to ensure file paths are correct
        const processedData = data.map((chapter) => {
          if (chapter.sections) {
            return {
              ...chapter,
              sections: chapter.sections.map((section) => {
                return {
                  ...section,
                  videos: section.videos.map((video) => {
                    // Ensure the file path is correct
                    return {
                      ...video,
                      file: video.file.startsWith('/')
                        ? video.file
                        : `/assets/${video.file}`,
                    };
                  }),
                };
              }),
            };
          } else if (chapter.videos) {
            return {
              ...chapter,
              videos: chapter.videos.map((video) => {
                // Ensure the file path is correct
                return {
                  ...video,
                  file: video.file.startsWith('/')
                    ? video.file
                    : `/assets/${video.file}`,
                };
              }),
            };
          }
          return chapter;
        });

        setCourseData(processedData);

        // Set initial selected course and chapter
        if (processedData.length > 0) {
          setSelectedCourse(processedData[0]);
          setSelectedChapter(processedData[0]);

          // Find the last watched video or default to first video
          const lastChapterIndex = userProgress.lastWatched.chapterIndex;
          if (lastChapterIndex < processedData.length) {
            const chapter = processedData[lastChapterIndex];
            let videoFound = false;

            // Check if chapter has sections
            if (chapter.sections) {
              for (const section of chapter.sections) {
                for (const video of section.videos) {
                  if (video.id === userProgress.lastWatched.videoId) {
                    setSelectedVideo(video);
                    videoFound = true;
                    break;
                  }
                }
                if (videoFound) break;
              }
            } else if (chapter.videos) {
              // Chapter has direct videos
              for (const video of chapter.videos) {
                if (video.id === userProgress.lastWatched.videoId) {
                  setSelectedVideo(video);
                  videoFound = true;
                  break;
                }
              }
            }

            // If no video found, default to first video
            if (
              !videoFound &&
              chapter.sections &&
              chapter.sections[0]?.videos?.length > 0
            ) {
              setSelectedVideo(chapter.sections[0].videos[0]);
            } else if (
              !videoFound &&
              chapter.videos &&
              chapter.videos.length > 0
            ) {
              setSelectedVideo(chapter.videos[0]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        toast('Failed to load course data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.grade, toast, userProgress.lastWatched]);

  const calculateProgress = (chapter) => {
    let totalVideos = 0;
    let completedVideos = 0;

    if (chapter.sections) {
      for (const section of chapter.sections) {
        for (const video of section.videos) {
          totalVideos++;
          if (userProgress.completedVideos.has(video.id)) {
            completedVideos++;
          }
        }
      }
    } else if (chapter.videos) {
      for (const video of chapter.videos) {
        totalVideos++;
        if (userProgress.completedVideos.has(video.id)) {
          completedVideos++;
        }
      }
    }

    return totalVideos > 0
      ? Math.round((completedVideos / totalVideos) * 100)
      : 0;
  };

  const calculateOverallProgress = () => {
    let totalVideos = 0;
    let completedVideos = 0;

    courseData.forEach((chapter) => {
      if (chapter.sections) {
        for (const section of chapter.sections) {
          for (const video of section.videos) {
            totalVideos++;
            if (userProgress.completedVideos.has(video.id)) {
              completedVideos++;
            }
          }
        }
      } else if (chapter.videos) {
        for (const video of chapter.videos) {
          totalVideos++;
          if (userProgress.completedVideos.has(video.id)) {
            completedVideos++;
          }
        }
      }
    });

    return totalVideos > 0
      ? Math.round((completedVideos / totalVideos) * 100)
      : 0;
  };

  const markVideoComplete = (videoId) => {
    setUserProgress((prev) => {
      const newCompletedVideos = new Set(prev.completedVideos);
      newCompletedVideos.add(videoId);
      return {
        ...prev,
        completedVideos: newCompletedVideos,
      };
    });
    toast('Video marked as complete', 'success');
  };

  const handleVideoSelect = (video, chapter) => {
    setSelectedVideo(video);
    setSelectedChapter(chapter);
    setUserProgress((prev) => ({
      ...prev,
      lastWatched: {
        chapterIndex: courseData.findIndex(
          (c) => c.chapter === chapter.chapter
        ),
        videoId: video.id,
      },
    }));
  };

  const getNextVideo = () => {
    if (!selectedChapter || !selectedVideo) return null;

    let foundCurrent = false;
    let nextVideo = null;

    // Check if chapter has sections
    if (selectedChapter.sections) {
      for (const section of selectedChapter.sections) {
        for (let i = 0; i < section.videos.length; i++) {
          if (foundCurrent) {
            nextVideo = section.videos[i];
            return { video: nextVideo, chapter: selectedChapter };
          }

          if (section.videos[i].id === selectedVideo.id) {
            foundCurrent = true;
          }
        }
      }
    } else if (selectedChapter.videos) {
      // Chapter has direct videos
      for (let i = 0; i < selectedChapter.videos.length; i++) {
        if (foundCurrent) {
          nextVideo = selectedChapter.videos[i];
          return { video: nextVideo, chapter: selectedChapter };
        }

        if (selectedChapter.videos[i].id === selectedVideo.id) {
          foundCurrent = true;
        }
      }
    }

    // If not found in current chapter, check next chapter
    const currentChapterIndex = courseData.findIndex(
      (c) => c.chapter === selectedChapter.chapter
    );
    if (currentChapterIndex < courseData.length - 1) {
      const nextChapter = courseData[currentChapterIndex + 1];

      if (
        nextChapter.sections &&
        nextChapter.sections.length > 0 &&
        nextChapter.sections[0].videos.length > 0
      ) {
        return {
          video: nextChapter.sections[0].videos[0],
          chapter: nextChapter,
        };
      } else if (nextChapter.videos && nextChapter.videos.length > 0) {
        return { video: nextChapter.videos[0], chapter: nextChapter };
      }
    }

    return null;
  };

  const handleNextVideo = () => {
    const next = getNextVideo();
    if (next) {
      handleVideoSelect(next.video, next.chapter);
    }
  };

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: 'First Login',
      description: 'Logged in for the first time',
      date: '2025-04-15',
      icon: '🏆',
    },
    {
      id: 2,
      title: 'Chapter Completed',
      description: 'Completed your first chapter',
      date: '2025-04-15',
      icon: '🎯',
    },
  ]);

  const handleSaveSettings = () => {
    toast('Settings saved successfully!', 'success');
  };

  const getTerrainColor = (terrain) => {
    switch (terrain) {
      case 'desert':
        return 'from-amber-200 to-amber-300';
      case 'grassland':
        return 'from-green-200 to-green-300';
      case 'forest':
        return 'from-emerald-300 to-emerald-400';
      case 'mountain':
        return 'from-gray-300 to-gray-400';
      default:
        return 'from-blue-200 to-blue-300';
    }
  };

  const getStarColor = (terrain) => {
    switch (terrain) {
      case 'desert':
        return 'text-cyan-500';
      case 'grassland':
        return 'text-rose-500';
      case 'forest':
        return 'text-amber-500';
      case 'mountain':
        return 'text-gray-300';
      default:
        return 'text-blue-500';
    }
  };

  const renderStars = (count, terrain) => {
    const starColor = getStarColor(terrain);
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <svg
          key={i}
          xmlns='http://www.w3.org/2000/svg'
          className={`h-5 w-5 ${starColor}`}
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      );
    }
    return <div className='flex justify-center mt-1'>{stars}</div>;
  };

  const handleVideoError = (e) => {
    console.error('Video error:', e);
    toast('Error loading video. Please try again later.', 'error');

    // You could set a fallback image or message here
    e.target.poster =
      '/placeholder.svg?height=720&width=1280&text=Video+Unavailable';
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto'></div>
          <p className='mt-4'>Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900'>
      <main className='flex-grow'>
        <Tabs
          defaultValue='courses'
          value={activeTab}
          onValueChange={setActiveTab}
          className='w-full'
        >
          <div className='border-b'>
            <div className='container mx-auto px-4'>
              <TabsList className='h-14'>
                <TabsTrigger value='courses' className='text-base'>
                  My Courses
                </TabsTrigger>
                <TabsTrigger value='achievements' className='text-base'>
                  Achievements
                </TabsTrigger>
                <TabsTrigger value='settings' className='text-base'>
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className='container mx-auto px-4 py-6'>
            <TabsContent value='courses' className='mt-0'>
              {!selectedVideo ? (
                <div className='space-y-6'>
                  <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold'>My Learning</h1>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-medium'>
                        Overall Progress:
                      </span>
                      <Progress
                        value={calculateOverallProgress()}
                        className='w-40 h-2'
                      />
                      <span className='text-sm font-medium'>
                        {calculateOverallProgress()}%
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-6'>
                    {courseData.map((chapter, index) => (
                      <Card key={index} className='overflow-hidden'>
                        <CardHeader className='bg-gray-50 dark:bg-gray-800 pb-2'>
                          <div className='flex justify-between items-center'>
                            <CardTitle>{chapter.chapter}</CardTitle>
                            <div className='flex items-center gap-2'>
                              <Progress
                                value={calculateProgress(chapter)}
                                className='w-24 h-2'
                              />
                              <span className='text-sm font-medium'>
                                {calculateProgress(chapter)}%
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className='p-0'>
                          {chapter.sections ? (
                            // Chapter with sections
                            <div>
                              {chapter.sections.map((section, sectionIndex) => (
                                <div key={sectionIndex}>
                                  <div className='px-6 py-3 bg-gray-100 dark:bg-gray-700 font-medium'>
                                    {section.title}
                                  </div>
                                  <ul className='divide-y'>
                                    {section.videos.map((video, videoIndex) => (
                                      <li
                                        key={videoIndex}
                                        className='px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800'
                                      >
                                        <button
                                          className='w-full flex items-start gap-3 text-left'
                                          onClick={() =>
                                            handleVideoSelect(video, chapter)
                                          }
                                        >
                                          <div className='flex-shrink-0 mt-0.5'>
                                            {userProgress.completedVideos.has(
                                              video.id
                                            ) ? (
                                              <CheckCircle className='h-5 w-5 text-green-500' />
                                            ) : (
                                              <PlayCircle className='h-5 w-5 text-blue-500' />
                                            )}
                                          </div>
                                          <div>
                                            <div className='font-medium'>
                                              {video.name}
                                            </div>
                                            <div className='text-sm text-gray-500 dark:text-gray-400'>
                                              {userProgress.completedVideos.has(
                                                video.id
                                              )
                                                ? 'Completed'
                                                : 'Video • 5-10 min'}
                                            </div>
                                          </div>
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : (
                            // Chapter with direct videos
                            <ul className='divide-y'>
                              {chapter.videos.map((video, videoIndex) => (
                                <li
                                  key={videoIndex}
                                  className='px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800'
                                >
                                  <button
                                    className='w-full flex items-start gap-3 text-left'
                                    onClick={() =>
                                      handleVideoSelect(video, chapter)
                                    }
                                  >
                                    <div className='flex-shrink-0 mt-0.5'>
                                      {userProgress.completedVideos.has(
                                        video.id
                                      ) ? (
                                        <CheckCircle className='h-5 w-5 text-green-500' />
                                      ) : (
                                        <PlayCircle className='h-5 w-5 text-blue-500' />
                                      )}
                                    </div>
                                    <div>
                                      <div className='font-medium'>
                                        {video.name}
                                      </div>
                                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                                        {userProgress.completedVideos.has(
                                          video.id
                                        )
                                          ? 'Completed'
                                          : 'Video • 5-10 min'}
                                      </div>
                                    </div>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                // Video player view
                <div className='flex flex-col lg:flex-row gap-6'>
                  {/* Left sidebar - course navigation */}
                  <div className='lg:w-1/4 order-2 lg:order-1'>
                    <Card className='sticky top-6'>
                      <CardHeader className='pb-2'>
                        <CardTitle className='text-lg'>
                          {selectedChapter.chapter}
                        </CardTitle>
                        <CardDescription>
                          <div className='flex items-center gap-2'>
                            <Progress
                              value={calculateProgress(selectedChapter)}
                              className='flex-grow h-2'
                            />
                            <span className='text-sm'>
                              {calculateProgress(selectedChapter)}%
                            </span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className='p-0 max-h-[60vh] overflow-y-auto'>
                        {selectedChapter.sections ? (
                          // Chapter with sections
                          <div>
                            {selectedChapter.sections.map(
                              (section, sectionIndex) => (
                                <div key={sectionIndex}>
                                  <div className='px-4 py-2 bg-gray-100 dark:bg-gray-800 font-medium text-sm'>
                                    {section.title}
                                  </div>
                                  <ul className='divide-y'>
                                    {section.videos.map((video, videoIndex) => (
                                      <li
                                        key={videoIndex}
                                        className={`px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm ${
                                          selectedVideo.id === video.id
                                            ? 'bg-blue-50 dark:bg-blue-900/20'
                                            : ''
                                        }`}
                                      >
                                        <button
                                          className='w-full flex items-start gap-2 text-left'
                                          onClick={() =>
                                            handleVideoSelect(
                                              video,
                                              selectedChapter
                                            )
                                          }
                                        >
                                          <div className='flex-shrink-0 mt-0.5'>
                                            {userProgress.completedVideos.has(
                                              video.id
                                            ) ? (
                                              <CheckCircle className='h-4 w-4 text-green-500' />
                                            ) : selectedVideo.id ===
                                              video.id ? (
                                              <PlayCircle className='h-4 w-4 text-blue-500' />
                                            ) : (
                                              <Clock className='h-4 w-4 text-gray-400' />
                                            )}
                                          </div>
                                          <div
                                            className={
                                              selectedVideo.id === video.id
                                                ? 'font-medium'
                                                : ''
                                            }
                                          >
                                            {video.name}
                                          </div>
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          // Chapter with direct videos
                          <ul className='divide-y'>
                            {selectedChapter.videos.map((video, videoIndex) => (
                              <li
                                key={videoIndex}
                                className={`px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm ${
                                  selectedVideo.id === video.id
                                    ? 'bg-blue-50 dark:bg-blue-900/20'
                                    : ''
                                }`}
                              >
                                <button
                                  className='w-full flex items-start gap-2 text-left'
                                  onClick={() =>
                                    handleVideoSelect(video, selectedChapter)
                                  }
                                >
                                  <div className='flex-shrink-0 mt-0.5'>
                                    {userProgress.completedVideos.has(
                                      video.id
                                    ) ? (
                                      <CheckCircle className='h-4 w-4 text-green-500' />
                                    ) : selectedVideo.id === video.id ? (
                                      <PlayCircle className='h-4 w-4 text-blue-500' />
                                    ) : (
                                      <Clock className='h-4 w-4 text-gray-400' />
                                    )}
                                  </div>
                                  <div
                                    className={
                                      selectedVideo.id === video.id
                                        ? 'font-medium'
                                        : ''
                                    }
                                  >
                                    {video.name}
                                  </div>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                      <CardFooter className='border-t p-4'>
                        <Button
                          variant='outline'
                          className='w-full'
                          onClick={() => setSelectedVideo(null)}
                        >
                          Back to Course List
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>

                  {/* Main content - video player */}
                  <div className='lg:w-3/4 order-1 lg:order-2'>
                    <Card>
                      <CardHeader>
                        <div className='flex justify-between items-center'>
                          <CardTitle>{selectedVideo.name}</CardTitle>
                          <div className='text-sm text-gray-500 dark:text-gray-400'>
                            {userProgress.completedVideos.has(
                              selectedVideo.id
                            ) ? (
                              <div className='flex items-center text-green-500'>
                                <CheckCircle className='h-4 w-4 mr-1' />
                                <span>Completed</span>
                              </div>
                            ) : (
                              <div className='flex items-center'>
                                <Clock className='h-4 w-4 mr-1' />
                                <span>5-10 min</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className='p-0'>
                        <div className='aspect-video bg-black relative'>
                          <VideoPlayer
                            src={selectedVideo.file}
                            poster='/placeholder.svg?height=720&width=1280'
                            onComplete={() =>
                              markVideoComplete(selectedVideo.id)
                            }
                            onError={() =>
                              toast(
                                'Error loading video. Please try again later.',
                                'error'
                              )
                            }
                          />
                        </div>
                      </CardContent>
                      <CardFooter className='flex justify-between p-4 border-t'>
                        <Button
                          variant='outline'
                          onClick={() => markVideoComplete(selectedVideo.id)}
                          disabled={userProgress.completedVideos.has(
                            selectedVideo.id
                          )}
                        >
                          {userProgress.completedVideos.has(
                            selectedVideo.id
                          ) ? (
                            <>
                              <CheckCircle className='h-4 w-4 mr-2' />
                              Completed
                            </>
                          ) : (
                            <>
                              <CheckCircle className='h-4 w-4 mr-2' />
                              Mark as Complete
                            </>
                          )}
                        </Button>

                        <Button
                          onClick={handleNextVideo}
                          disabled={!getNextVideo()}
                        >
                          Continue
                          <ChevronRight className='h-4 w-4 ml-2' />
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className='mt-6'>
                      <CardHeader>
                        <CardTitle>About this lesson</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          This lesson covers {selectedVideo.name.toLowerCase()}.
                          Watch the video to learn the concepts and practice
                          along with the instructor.
                        </p>
                        <div className='mt-4'>
                          <h4 className='font-medium mb-2'>
                            Learning Objectives:
                          </h4>
                          <ul className='list-disc pl-5 space-y-1'>
                            <li>
                              Understand the core concepts presented in this
                              lesson
                            </li>
                            <li>
                              Apply the techniques demonstrated in the video
                            </li>
                            <li>
                              Complete the practice exercises to reinforce your
                              learning
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value='achievements' className='mt-0'>
              <div className='space-y-6'>
                <h1 className='text-2xl font-bold'>My Achievements</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {achievements.map((achievement) => (
                    <Card key={achievement.id} className='overflow-hidden'>
                      <div className='bg-primary/10 p-6 flex items-center justify-center'>
                        <span className='text-5xl'>{achievement.icon}</span>
                      </div>
                      <CardHeader>
                        <CardTitle>{achievement.title}</CardTitle>
                        <CardDescription>
                          {achievement.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className='text-sm text-muted-foreground'>
                          Earned on {achievement.date}
                        </p>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Locked achievements */}
                  {[1, 2, 3].map((i) => (
                    <Card
                      key={`locked-${i}`}
                      className='overflow-hidden opacity-60'
                    >
                      <div className='bg-gray-200 dark:bg-gray-700 p-6 flex items-center justify-center'>
                        <Lock className='h-12 w-12 text-gray-400' />
                      </div>
                      <CardHeader>
                        <CardTitle>Locked Achievement</CardTitle>
                        <CardDescription>
                          Complete more lessons to unlock
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className='text-sm text-muted-foreground'>
                          Keep learning to earn more achievements
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value='settings' className='mt-0'>
              <div className='space-y-6 max-w-3xl mx-auto'>
                <h1 className='text-2xl font-bold'>Account Settings</h1>

                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      className='space-y-4'
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveSettings();
                      }}
                    >
                      <div className='space-y-2'>
                        <label htmlFor='name' className='text-sm font-medium'>
                          Full Name
                        </label>
                        <input
                          id='name'
                          type='text'
                          defaultValue={user?.name || 'Student Name'}
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                        />
                      </div>

                      <div className='space-y-2'>
                        <label htmlFor='email' className='text-sm font-medium'>
                          Email
                        </label>
                        <input
                          id='email'
                          type='email'
                          defaultValue={user?.email || 'student@example.com'}
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                        />
                      </div>

                      <div className='space-y-2'>
                        <label htmlFor='grade' className='text-sm font-medium'>
                          Grade Level
                        </label>
                        <select
                          id='grade'
                          defaultValue={user?.grade || '3-4'}
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                        >
                          <option value='1-2'>KG</option>
                          <option value='1-2'>Grades 1-2</option>
                          <option value='3-4'>Grades 3-4</option>
                          <option value='5-6'>Grades 5-6</option>
                          <option value='5-6'>Grades 7-8</option>
                        </select>
                      </div>

                      <Button type='submit'>Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning Preferences</CardTitle>
                    <CardDescription>
                      Customize your learning experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <h4 className='font-medium'>Auto-play Videos</h4>
                          <p className='text-sm text-gray-500'>
                            Automatically play the next video when one finishes
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
                          <h4 className='font-medium'>
                            Show Completion Status
                          </h4>
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
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
