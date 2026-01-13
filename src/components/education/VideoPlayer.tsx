import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Loader2, 
  PictureInPicture, Gauge, RotateCcw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface VideoPlayerProps {
  src: string;
  title?: string;
  className?: string;
  videoId?: string;
  nextVideoUrl?: string;
  onEnded?: () => void;
  onError?: (error: Error) => void;
}

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const PROGRESS_SAVE_INTERVAL = 5000; // 5 seconds
const MIN_PROGRESS_TO_SAVE = 0.1; // 10%
const CONTROLS_TIMEOUT = 3000; // 3 seconds

export function VideoPlayer({ 
  src, 
  title, 
  className = '', 
  videoId,
  nextVideoUrl,
  onEnded,
  onError 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prefetchLinkRef = useRef<HTMLLinkElement | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(() => {
    const saved = localStorage.getItem('video_playback_rate');
    return saved ? parseFloat(saved) : 1;
  });
  const [showControls, setShowControls] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [wasPlayingBeforeTabSwitch, setWasPlayingBeforeTabSwitch] = useState(false);

  // Restore saved progress
  useEffect(() => {
    if (!videoId || !videoRef.current) return;
    
    const savedProgress = localStorage.getItem(`video_progress_${videoId}`);
    if (savedProgress) {
      const savedTime = parseFloat(savedProgress);
      if (savedTime > 0 && videoRef.current.duration && savedTime < videoRef.current.duration) {
        videoRef.current.currentTime = savedTime;
      }
    }
  }, [videoId, src]);

  // Restore playback rate
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Prefetch next video
  useEffect(() => {
    if (!nextVideoUrl) return;

    // Remove existing prefetch link if any
    if (prefetchLinkRef.current) {
      document.head.removeChild(prefetchLinkRef.current);
    }

    // Create new prefetch link
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'video';
    link.href = nextVideoUrl;
    document.head.appendChild(link);
    prefetchLinkRef.current = link;

    return () => {
      if (prefetchLinkRef.current && document.head.contains(prefetchLinkRef.current)) {
        document.head.removeChild(prefetchLinkRef.current);
      }
    };
  }, [nextVideoUrl]);

  // Auto-pause on tab switch
  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;

      const autoPauseEnabled = localStorage.getItem('video_auto_pause') !== 'false';
      if (!autoPauseEnabled) return;

      if (document.visibilityState === 'hidden') {
        if (video.paused === false) {
          setWasPlayingBeforeTabSwitch(true);
          video.pause();
        }
      } else if (document.visibilityState === 'visible' && wasPlayingBeforeTabSwitch) {
        // Optionally resume - commented out for now to avoid auto-play issues
        // video.play().catch(() => {});
        setWasPlayingBeforeTabSwitch(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [wasPlayingBeforeTabSwitch]);

  // Save progress with debounce
  const saveProgress = useCallback(() => {
    if (!videoId || !videoRef.current || !videoRef.current.duration) return;

    const currentProgress = videoRef.current.currentTime / videoRef.current.duration;
    
    // Only save if watched more than 10%
    if (currentProgress < MIN_PROGRESS_TO_SAVE) return;

    if (progressSaveTimeoutRef.current) {
      clearTimeout(progressSaveTimeoutRef.current);
    }

    progressSaveTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && videoRef.current.currentTime) {
        localStorage.setItem(`video_progress_${videoId}`, videoRef.current.currentTime.toString());
      }
    }, PROGRESS_SAVE_INTERVAL);
  }, [videoId]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (video.duration) {
        const newProgress = (video.currentTime / video.duration) * 100;
        setProgress(newProgress);
        setCurrentTime(video.currentTime);
        setDuration(video.duration);
        saveProgress();
      }
    };
    const handleLoadedMetadata = () => {
      if (video.duration) {
        setDuration(video.duration);
        // Restore saved progress after metadata loads
        if (videoId) {
          const savedProgress = localStorage.getItem(`video_progress_${videoId}`);
          if (savedProgress) {
            const savedTime = parseFloat(savedProgress);
            if (savedTime > 0 && savedTime < video.duration) {
              video.currentTime = savedTime;
            }
          }
        }
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      // Clear saved progress when video ends
      if (videoId) {
        localStorage.removeItem(`video_progress_${videoId}`);
      }
      onEnded?.();
    };
    const handleError = () => {
      setIsLoading(false);
      const errorMsg = video.error?.message || 'Failed to load video';
      setError(errorMsg);
      onError?.(new Error(errorMsg));
    };
    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };
    const handleEnterPictureInPicture = () => setIsPiP(true);
    const handleLeavePictureInPicture = () => setIsPiP(false);

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('enterpictureinpicture', handleEnterPictureInPicture);
    video.addEventListener('leavepictureinpicture', handleLeavePictureInPicture);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('enterpictureinpicture', handleEnterPictureInPicture);
      video.removeEventListener('leavepictureinpicture', handleLeavePictureInPicture);
    };
  }, [onEnded, onError, saveProgress, videoId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video || !containerRef.current) return;

      // Only handle if video container is focused or video is playing
      if (!containerRef.current.contains(document.activeElement) && !isPlaying) return;

      // Don't handle if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + 10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          video.volume = Math.min(1, video.volume + 0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          video.volume = Math.max(0, video.volume - 0.1);
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          handleFullscreen();
          break;
        default:
          // Handle number keys 0-9 for seeking
          if (e.key >= '0' && e.key <= '9') {
            e.preventDefault();
            const percentage = parseInt(e.key) / 10;
            video.currentTime = percentage * video.duration;
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying]);

  // Controls visibility timeout
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (!isPlaying) return; // Keep controls visible if paused
      setShowControls(false);
    }, CONTROLS_TIMEOUT);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      resetControlsTimeout();
    } else {
      setShowControls(true); // Always show controls when paused
    }
  }, [isPlaying, resetControlsTimeout]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(err => {
        console.error('Error playing video:', err);
        setError('Failed to play video');
      });
    }
    resetControlsTimeout();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    resetControlsTimeout();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    video.muted = newVolume === 0;
    resetControlsTimeout();
  };

  const handlePlaybackRateChange = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = rate;
    setPlaybackRate(rate);
    localStorage.setItem('video_playback_rate', rate.toString());
    resetControlsTimeout();
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if ((container as any).webkitRequestFullscreen) {
      (container as any).webkitRequestFullscreen();
    } else if ((container as any).mozRequestFullScreen) {
      (container as any).mozRequestFullScreen();
    }
    resetControlsTimeout();
  };

  const handlePictureInPicture = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
      resetControlsTimeout();
    } catch (err) {
      console.error('Picture-in-Picture error:', err);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    video.currentTime = percentage * video.duration;
    setCurrentTime(video.currentTime);
    resetControlsTimeout();
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isPiPSupported = useMemo(() => {
    return 'pictureInPictureEnabled' in document && document.pictureInPictureEnabled;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressSaveTimeoutRef.current) {
        clearTimeout(progressSaveTimeoutRef.current);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (prefetchLinkRef.current && document.head.contains(prefetchLinkRef.current)) {
        document.head.removeChild(prefetchLinkRef.current);
      }
    };
  }, []);

  if (error) {
    return (
      <div className={`aspect-video bg-secondary flex items-center justify-center ${className}`}>
        <div className="text-center p-6">
          <p className="text-sm text-destructive mb-2">Error loading video</p>
          <p className="text-xs text-muted-foreground mb-4">{error}</p>
          <Button onClick={handleRetry} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div 
        ref={containerRef}
        className={`relative group ${className}`}
        onMouseMove={resetControlsTimeout}
        onMouseLeave={() => {
          if (isPlaying) {
            setShowControls(false);
          }
        }}
        onClick={resetControlsTimeout}
        tabIndex={0}
        style={{ outline: 'none' }}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain bg-black rounded-lg"
          playsInline
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        )}

        {/* Controls overlay */}
        <div 
          className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity rounded-lg ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="p-4 space-y-2">
            {/* Progress bar */}
            <div
              className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer hover:h-2 transition-all"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Control buttons */}
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlay}
                    className="text-white hover:text-white hover:bg-white/20"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? 'Pause' : 'Play'} (Space)</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                      className="text-white hover:text-white hover:bg-white/20"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`
                      }}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Volume (↑/↓)</p>
                </TooltipContent>
              </Tooltip>

              <div className="flex-1 text-xs text-white/80 px-2">
                {duration > 0 && (
                  <>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </>
                )}
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:text-white hover:bg-white/20"
                      >
                        <Gauge className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-black/90 text-white border-white/20">
                      {PLAYBACK_SPEEDS.map((speed) => (
                        <DropdownMenuItem
                          key={speed}
                          onClick={() => handlePlaybackRateChange(speed)}
                          className={playbackRate === speed ? 'bg-white/20' : ''}
                        >
                          {speed}x {playbackRate === speed && '✓'}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Playback Speed</p>
                </TooltipContent>
              </Tooltip>

              {isPiPSupported && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePictureInPicture}
                      className="text-white hover:text-white hover:bg-white/20"
                    >
                      <PictureInPicture className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Picture-in-Picture</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFullscreen}
                    className="text-white hover:text-white hover:bg-white/20"
                  >
                    <Maximize className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fullscreen (F)</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
