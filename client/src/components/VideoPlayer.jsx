'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  SkipBack,
  Settings,
} from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { useToast } from '../context/ToastContext';
import { Card } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const VideoPlayer = ({
  src,
  poster,
  onComplete,
  onError,
  className = '',
  title,
  autoPlay = false,
  controls = true,
  width = '100%',
  height = 'auto',
  onEnded,
}) => {
  const { toast } = useToast();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('auto');
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onComplete) onComplete();
      if (onEnded) onEnded();
    };

    const handleError = (e) => {
      console.error('Video error:', e);
      setHasError(true);
      setIsLoading(false);
      if (onError) onError(e);
      toast('Error loading video. Please try again later.', 'error');
    };

    const onVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('volumechange', onVolumeChange);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('volumechange', onVolumeChange);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [onComplete, onError, toast, onEnded]);

  // Auto-hide controls after inactivity
  useEffect(() => {
    if (!controls) return;

    const showControlsTemporarily = () => {
      setShowControls(true);

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', showControlsTemporarily);
      container.addEventListener('mouseenter', showControlsTemporarily);
      container.addEventListener('mouseleave', () => {
        if (isPlaying) {
          setShowControls(false);
        }
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', showControlsTemporarily);
        container.removeEventListener('mouseenter', showControlsTemporarily);
        container.removeEventListener('mouseleave', () => {
          if (isPlaying) {
            setShowControls(false);
          }
        });
      }

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [controls, isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch((error) => {
        console.error('Error playing video:', error);
        toast('Could not play video. Please try again.', 'error');
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMutedState = !isMuted;
    video.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  const handleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`
          );
        });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.min(video.currentTime + 10, video.duration);
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(video.currentTime - 10, 0);
  };

  // Change playback rate
  const changePlaybackRate = (rate) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  // Change quality
  const changeQuality = (q) => {
    setQuality(q);
  };

  return (
    <Card className={className}>
      <div
        ref={containerRef}
        className='relative overflow-hidden rounded-lg bg-black'
        style={{ width, height }}
      >
        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/50 z-10'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
          </div>
        )}

        {hasError && (
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10 text-white p-4 text-center'>
            <span className='text-4xl mb-2'>😕</span>
            <h3 className='text-xl font-bold mb-2'>Video Unavailable</h3>
            <p>Sorry, we couldn't load this video. Please try again later.</p>
          </div>
        )}

        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className='w-full h-full'
          preload='metadata'
          autoPlay={autoPlay}
          playsInline
          onClick={togglePlay}
        />

        {controls && showControls && (
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4'>
            <div className='flex flex-col gap-2'>
              {title && (
                <div className='text-white font-medium text-sm'>{title}</div>
              )}
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                onValueChange={handleSeek}
                className='cursor-pointer'
              />

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={togglePlay}
                    className='text-white hover:bg-white/20'
                  >
                    {isPlaying ? (
                      <Pause className='h-5 w-5' />
                    ) : (
                      <Play className='h-5 w-5' />
                    )}
                  </Button>

                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={skipBackward}
                    className='text-white hover:bg-white/20'
                  >
                    <SkipBack className='h-5 w-5' />
                  </Button>

                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={skipForward}
                    className='text-white hover:bg-white/20'
                  >
                    <SkipForward className='h-5 w-5' />
                  </Button>

                  <span className='text-white text-sm'>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-2 w-24'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={toggleMute}
                      className='text-white hover:bg-white/20'
                    >
                      {isMuted ? (
                        <VolumeX className='h-5 w-5' />
                      ) : (
                        <Volume2 className='h-5 w-5' />
                      )}
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className='cursor-pointer'
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='text-white hover:bg-white/20'
                      >
                        <Settings className='h-5 w-5' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Settings</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <DropdownMenuItem
                          key={rate}
                          onClick={() => changePlaybackRate(rate)}
                          className={playbackRate === rate ? 'bg-accent' : ''}
                        >
                          {rate === 1 ? 'Normal' : `${rate}x`}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Quality</DropdownMenuLabel>
                      {['auto', '1080p', '720p', '480p', '360p'].map((q) => (
                        <DropdownMenuItem
                          key={q}
                          onClick={() => changeQuality(q)}
                          className={quality === q ? 'bg-accent' : ''}
                        >
                          {q}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={handleFullscreen}
                    className='text-white hover:bg-white/20'
                  >
                    <Maximize className='h-5 w-5' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VideoPlayer;
