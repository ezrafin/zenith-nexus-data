import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Italic, Code, Link as LinkIcon, Send, Strikethrough, Quote, List, ListOrdered, FileCode, Heading2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { validateReplyContent, getValidationErrorMessageKey } from '@/lib/validation/contentValidator';
import { useTranslation } from '@/hooks/useTranslation';
import { MarkdownContent } from '@/components/content/MarkdownContent';

interface ReplyEditorProps {
  onSubmit: (content: string) => Promise<void>;
  onCancel?: () => void;
  placeholder?: string;
  initialValue?: string;
  isSubmitting?: boolean;
  className?: string;
}

export function ReplyEditor({
  onSubmit,
  onCancel,
  placeholder,
  initialValue = '',
  isSubmitting = false,
  className,
}: ReplyEditorProps) {
  const { t } = useTranslation({ namespace: 'forum' });
  const defaultPlaceholder = placeholder || t('editor.writeReply');
  const [content, setContent] = useState(initialValue);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const validationTimeoutRef = useRef<NodeJS.Timeout>();

  // Update content when initialValue changes
  useEffect(() => {
    if (initialValue !== undefined) {
      setContent(initialValue);
    }
  }, [initialValue]);

  // Debounced validation - using ref to avoid recreating callback
  const tRef = useRef(t);
  tRef.current = t;

  // Validate on content change with debounce
  useEffect(() => {
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }

    // Clear errors immediately if content is empty
    if (!content.trim()) {
      setValidationErrors([]);
      setIsValidating(false);
      return;
    }

    setIsValidating(true);
    validationTimeoutRef.current = setTimeout(() => {
      const validation = validateReplyContent(content);
      if (!validation.isValid) {
        const errorMessages = validation.errors.map(error => {
          const key = getValidationErrorMessageKey(error);
          return tRef.current(key);
        });
        setValidationErrors(errorMessages);
      } else {
        setValidationErrors([]);
      }
      setIsValidating(false);
    }, 500);

    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, [content]);

  const insertMarkdown = (before: string, after: string = '', newLine: boolean = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText: string;
    let newCursorPos: number;
    
    if (newLine) {
      // For block elements, add on new line
      const beforeCursor = content.substring(0, start);
      const needsNewLine = beforeCursor.length > 0 && !beforeCursor.endsWith('\n');
      const prefix = needsNewLine ? '\n' : '';
      newText = content.substring(0, start) + prefix + before + selectedText + after + content.substring(end);
      newCursorPos = start + prefix.length + before.length + selectedText.length;
    } else {
      newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
      newCursorPos = start + before.length + selectedText.length;
    }
    
    setContent(newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    // Final validation before submit
    const validation = validateReplyContent(content);
    if (!validation.isValid) {
      const errorMessages = validation.errors.map(error => {
        const key = getValidationErrorMessageKey(error);
        return t(key);
      });
      setValidationErrors(errorMessages);
      return;
    }
    
    await onSubmit(content);
    setContent('');
    setValidationErrors([]);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border border-border rounded-lg bg-secondary/30 flex-wrap overflow-x-auto sm:overflow-visible">
        {/* Text formatting */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('**', '**')}
          className="h-9 w-9 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          title={t('bold', { ns: 'ui' }) + ' (Ctrl+B)'}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('*', '*')}
          className="h-9 w-9 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          title={t('italic', { ns: 'ui' }) + ' (Ctrl+I)'}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('~~', '~~')}
          className="h-9 w-9 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          title={t('strikethrough', { ns: 'ui' })}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* Block elements */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('> ', '', true)}
          className="h-9 w-9 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          title={t('quote', { ns: 'ui' })}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('`', '`')}
          className="h-9 w-9 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          title={t('inlineCode', { ns: 'ui' })}
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('```\n', '\n```', true)}
          className="h-9 w-9 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          title={t('codeBlock', { ns: 'ui' })}
        >
          <FileCode className="h-4 w-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* Lists */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('- ', '', true)}
          className="h-9 w-9 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          title={t('bulletList', { ns: 'ui' })}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('1. ', '', true)}
          className="h-9 w-9 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          title={t('numberedList', { ns: 'ui' })}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* Links & Heading */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('[', '](url)')}
          className="h-9 w-9 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          title={t('insertLink', { ns: 'ui' })}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('## ', '', true)}
          className="h-9 w-9 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          title={t('heading', { ns: 'ui' })}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* Preview Toggle */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          className="h-9 w-9 sm:h-8 sm:w-8 p-0 flex-shrink-0"
          title={showPreview ? t('editor.hidePreview') : t('editor.showPreview')}
        >
          {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>

      {/* Textarea / Preview Toggle */}
      <div className="space-y-2">
        {showPreview ? (
          <div className="min-h-[200px] p-4 rounded-lg border border-border bg-card overflow-auto">
            {content.trim() ? (
              <MarkdownContent content={content} className="text-foreground leading-relaxed" />
            ) : (
              <p className="text-muted-foreground italic">{t('editor.emptyPreview')}</p>
            )}
          </div>
        ) : (
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={defaultPlaceholder}
            rows={6}
            className={cn(
              "resize-none font-mono text-sm min-h-[44px]",
              "focus:ring-2 focus:ring-primary focus:ring-offset-2",
              validationErrors.length > 0 && "border-destructive focus-visible:ring-destructive"
            )}
          />
        )}
        {validationErrors.length > 0 && (
          <div className="flex items-start gap-2 p-2 rounded-md bg-destructive/10 border border-destructive/20">
            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1 space-y-1">
              {validationErrors.map((error, index) => (
                <p key={index} className="text-xs text-destructive">
                  {error}
                </p>
              ))}
            </div>
          </div>
        )}
        {validationErrors.length === 0 && !isValidating && (
          <p className="text-xs text-muted-foreground">
            {t('editor.markdownSupported')}
          </p>
        )}
        {isValidating && (
          <p className="text-xs text-muted-foreground">
            {t('editor.validatingContent')}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {content.length} {t('editor.characters')}
        </div>
        <div className="flex items-center gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              {t('editor.cancel')}
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={!content.trim() || isSubmitting || validationErrors.length > 0}
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? t('editor.submitting') : t('editor.submit')}
          </Button>
        </div>
      </div>
    </form>
  );
}

