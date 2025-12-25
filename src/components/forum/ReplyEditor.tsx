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
  placeholder = 'Write your reply...',
  initialValue = '',
  isSubmitting = false,
  className,
}: ReplyEditorProps) {
  const { t } = useTranslation({ namespace: 'forum' });
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

  // Debounced validation
  const validateContent = useCallback((text: string) => {
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }

    // Clear errors immediately if content is empty
    if (!text.trim()) {
      setValidationErrors([]);
      setIsValidating(false);
      return;
    }

    setIsValidating(true);
    validationTimeoutRef.current = setTimeout(() => {
      const validation = validateReplyContent(text);
      if (!validation.isValid) {
        const errorMessages = validation.errors.map(error => {
          const key = getValidationErrorMessageKey(error);
          return t(key);
        });
        setValidationErrors(errorMessages);
      } else {
        setValidationErrors([]);
      }
      setIsValidating(false);
    }, 500);
  }, [t]);

  // Validate on content change
  useEffect(() => {
    validateContent(content);
    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, [content, validateContent]);

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
      <div className="flex items-center gap-1 p-2 border border-border rounded-lg bg-secondary/30 flex-wrap">
        {/* Text formatting */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('**', '**')}
          className="h-8 w-8 p-0"
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('*', '*')}
          className="h-8 w-8 p-0"
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('~~', '~~')}
          className="h-8 w-8 p-0"
          title="Strikethrough"
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
          className="h-8 w-8 p-0"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('`', '`')}
          className="h-8 w-8 p-0"
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('```\n', '\n```', true)}
          className="h-8 w-8 p-0"
          title="Code Block"
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
          className="h-8 w-8 p-0"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('1. ', '', true)}
          className="h-8 w-8 p-0"
          title="Numbered List"
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
          className="h-8 w-8 p-0"
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown('## ', '', true)}
          className="h-8 w-8 p-0"
          title="Heading"
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
          className="h-8 w-8 p-0"
          title={showPreview ? "Hide Preview" : "Show Preview"}
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
              <p className="text-muted-foreground italic">Preview will appear here...</p>
            )}
          </div>
        ) : (
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
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
            Markdown is supported. Use the toolbar above for formatting.
          </p>
        )}
        {isValidating && (
          <p className="text-xs text-muted-foreground">
            Validating content...
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {content.length} characters
        </div>
        <div className="flex items-center gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={!content.trim() || isSubmitting || validationErrors.length > 0}
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>
    </form>
  );
}

