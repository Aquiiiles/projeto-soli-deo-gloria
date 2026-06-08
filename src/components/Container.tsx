'use client';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
  style?: React.CSSProperties;
}

export default function Container({ children, className = '', narrow, style }: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth: narrow ? 800 : 'var(--max-width)',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
