'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Card } from './ui/card';
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
  title,
  autoPlay = false,
  controls = true,
  width = '100%',
  height = 'auto',
  onEnded,
  className,
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('auto');
  const controlsTimeoutRef = useRef(null);

  // Initialize video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial values
    setDuration(video.duration || 0);
    setVolume(video.volume);
    setIsMuted(video.muted);

    // Add event listeners
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onDurationChange = () => setDuration(video.duration);
    const onVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('durationchange', onDurationChange);
    video.addEventListener('volumechange', onVolumeChange);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('durationchange', onDurationChange);
      video.removeEventListener('volumechange', onVolumeChange);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
    };
  }, [onEnded]);

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

  // Handle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  // Handle seeking
  const handleSeek = (value) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  // Handle volume change
  const handleVolumeChange = (value) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = value[0];
    setVolume(value[0]);

    if (value[0] === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
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

  // Skip forward/backward
  const skip = (seconds) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(
      0,
      Math.min(video.duration, video.currentTime + seconds)
    );
  };

  // Change playback rate
  const changePlaybackRate = (rate) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '00:00';

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <Card className={className}>
      <div
        ref={containerRef}
        className='relative overflow-hidden rounded-lg bg-black'
        style={{ width, height }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className='w-full h-full'
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
                min={0}
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
                    onClick={() => skip(-10)}
                    className='text-white hover:bg-white/20'
                  >
                    <SkipBack className='h-5 w-5' />
                  </Button>

                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => skip(10)}
                    className='text-white hover:bg-white/20'
                  >
                    <SkipForward className='h-5 w-5' />
                  </Button>

                  <div className='text-white text-xs'>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-2 w-24'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={toggleMute}
                      className='text-white hover:bg-white/20'
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className='h-5 w-5' />
                      ) : (
                        <Volume2 className='h-5 w-5' />
                      )}
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      min={0}
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
                          onClick={() => setQuality(q)}
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
                    onClick={toggleFullscreen}
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
