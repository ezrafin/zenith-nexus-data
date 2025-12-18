import React from 'react';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  // Split content into blocks (paragraphs, lists, code blocks, quotes, etc.)
  const blocks = parseBlocks(content);

  return (
    <div className={`max-w-none ${className}`}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

interface Block {
  type: 'paragraph' | 'list' | 'code' | 'quote' | 'heading';
  content: string;
  level?: number; // for headings
  ordered?: boolean; // for lists
}

function parseBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    
    // Code block (```)
    if (line.trim().startsWith('```')) {
      const codeLines: string[] = [];
      i++; // skip opening ```
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: 'code', content: codeLines.join('\n') });
      continue;
    }

    // Quote block (>)
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      blocks.push({ type: 'quote', content: quoteLines.join('\n') });
      continue;
    }

    // Heading (## or ###)
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({ 
        type: 'heading', 
        content: headingMatch[2], 
        level: headingMatch[1].length 
      });
      i++;
      continue;
    }

    // List items
    if (/^[-*]\s+/.test(line.trim()) || /^\d+\.\s+/.test(line.trim())) {
      const listLines: string[] = [];
      const isOrdered = /^\d+\.\s+/.test(line.trim());
      while (i < lines.length && 
             (/^[-*]\s+/.test(lines[i].trim()) || /^\d+\.\s+/.test(lines[i].trim()))) {
        listLines.push(lines[i].trim());
        i++;
      }
      blocks.push({ 
        type: 'list', 
        content: listLines.join('\n'), 
        ordered: isOrdered 
      });
      continue;
    }

    // Empty line - skip
    if (!line.trim()) {
      i++;
      continue;
    }

    // Paragraph - collect consecutive non-empty lines
    const paragraphLines: string[] = [];
    while (i < lines.length && 
           lines[i].trim() && 
           !lines[i].trim().startsWith('>') && 
           !lines[i].trim().startsWith('```') &&
           !lines[i].trim().match(/^#{1,6}\s+/) &&
           !lines[i].trim().match(/^[-*]\s+/) &&
           !lines[i].trim().match(/^\d+\.\s+/)) {
      paragraphLines.push(lines[i]);
      i++;
    }
    if (paragraphLines.length > 0) {
      blocks.push({ type: 'paragraph', content: paragraphLines.join('\n') });
    }
  }

  return blocks;
}

function renderBlock(block: Block, index: number): React.ReactNode {
  switch (block.type) {
    case 'code':
      return (
        <pre key={index} className="mb-4 p-4 bg-muted/50 rounded-lg border border-border/50 overflow-x-auto">
          <code className="text-sm font-mono text-foreground">{block.content}</code>
        </pre>
      );

    case 'quote':
      return (
        <blockquote key={index} className="mb-4 pl-4 border-l-4 border-primary/50 italic text-muted-foreground">
          {renderInlineMarkdown(block.content)}
        </blockquote>
      );

    case 'heading':
      const HeadingTag = `h${Math.min(block.level || 2, 6)}` as keyof JSX.IntrinsicElements;
      const headingClasses = {
        1: 'text-2xl font-bold mb-4',
        2: 'text-xl font-semibold mb-3',
        3: 'text-lg font-semibold mb-2',
        4: 'text-base font-semibold mb-2',
        5: 'text-sm font-semibold mb-2',
        6: 'text-sm font-medium mb-2',
      };
      return (
        <HeadingTag key={index} className={headingClasses[block.level as keyof typeof headingClasses] || headingClasses[2]}>
          {renderInlineMarkdown(block.content)}
        </HeadingTag>
      );

    case 'list':
      const items = block.content.split('\n').filter(l => l.trim());
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag 
          key={index} 
          className={`mb-4 space-y-1 ${block.ordered ? 'list-decimal' : 'list-disc'} ml-6`}
        >
          {items.map((item, itemIndex) => {
            const itemContent = item.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '');
            return (
              <li key={itemIndex} className="text-foreground/90 leading-relaxed pl-1">
                {renderInlineMarkdown(itemContent)}
              </li>
            );
          })}
        </ListTag>
      );

    case 'paragraph':
    default:
      // Handle line breaks within paragraph
      const lines = block.content.split('\n');
      return (
        <p key={index} className="mb-4 leading-relaxed text-foreground/90">
          {lines.map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {renderInlineMarkdown(line)}
              {lineIndex < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
  }
}

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // Patterns for inline formatting
  const patterns = [
    { regex: /\*\*([^*]+)\*\*/g, type: 'bold' },
    { regex: /(?<!\*)\*([^*\n]+?)\*(?!\*)/g, type: 'italic' },
    { regex: /~~([^~]+)~~/g, type: 'strikethrough' },
    { regex: /`([^`]+)`/g, type: 'code' },
    { regex: /\[([^\]]+)\]\(([^)]+)\)/g, type: 'link' },
  ];

  // Collect all matches
  const matches: Array<{ 
    type: string; 
    start: number; 
    end: number; 
    content: string;
    url?: string;
  }> = [];

  for (const { regex, type } of patterns) {
    let match;
    const regexCopy = new RegExp(regex.source, regex.flags);
    while ((match = regexCopy.exec(text)) !== null) {
      matches.push({
        type,
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
        url: type === 'link' ? match[2] : undefined,
      });
    }
  }

  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start);

  // Remove overlapping matches (prioritize: bold > code > italic > strikethrough > link)
  const filteredMatches: typeof matches = [];
  for (const current of matches) {
    const overlaps = filteredMatches.some(
      (m) => !(current.end <= m.start || current.start >= m.end)
    );
    if (!overlaps) {
      filteredMatches.push(current);
    }
  }

  // Build React nodes
  for (const match of filteredMatches) {
    // Add text before match
    if (match.start > lastIndex) {
      const beforeText = text.substring(lastIndex, match.start);
      if (beforeText) {
        parts.push(beforeText);
      }
    }

    // Add formatted content
    switch (match.type) {
      case 'bold':
        parts.push(
          <strong key={key++} className="font-semibold text-foreground">
            {match.content}
          </strong>
        );
        break;
      case 'italic':
        parts.push(
          <em key={key++} className="italic text-foreground/95">
            {match.content}
          </em>
        );
        break;
      case 'strikethrough':
        parts.push(
          <del key={key++} className="line-through text-muted-foreground">
            {match.content}
          </del>
        );
        break;
      case 'code':
        parts.push(
          <code key={key++} className="px-1.5 py-0.5 bg-muted/80 rounded text-sm font-mono text-foreground border border-border/50">
            {match.content}
          </code>
        );
        break;
      case 'link':
        parts.push(
          <a 
            key={key++} 
            href={match.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {match.content}
          </a>
        );
        break;
    }

    lastIndex = match.end;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      parts.push(remainingText);
    }
  }

  return parts.length > 0 ? parts : [text];
}
