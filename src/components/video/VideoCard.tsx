import { Link } from 'react-router-dom';
import { Clock, Play, User } from 'lucide-react';
import type { Video } from '@/data/videoLibrary';

interface VideoCardProps {
  video: Video;
}

const levelColors = {
  beginner: 'bg-green-500/20 text-green-400',
  intermediate: 'bg-yellow-500/20 text-yellow-400',
  pro: 'bg-red-500/20 text-red-400'
};

const levelLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  pro: 'Advanced'
};

const formatLabels = {
  lecture: 'Lecture',
  case: 'Case Study',
  analysis: 'Analysis',
  discussion: 'Discussion'
};

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link to={`/video/${video.id}`} className="group">
      <div className="glass-card-hover overflow-hidden">
        <div className="aspect-video relative bg-muted">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="h-6 w-6 text-primary-foreground ml-1" />
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className={`text-xs px-2 py-0.5 rounded-full ${levelColors[video.level]}`}>
              {levelLabels[video.level]}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-background/60 px-2 py-0.5 rounded-full">
              <Clock className="h-3 w-3" />
              {video.duration}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-secondary text-xs">{formatLabels[video.format]}</span>
          </div>
          <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {video.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {video.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
