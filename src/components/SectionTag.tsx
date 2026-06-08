'use client';

interface SectionTagProps {
  children: React.ReactNode;
  light?: boolean;
}

export default function SectionTag({ children, light }: SectionTagProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: light ? 'rgba(255,255,255,0.7)' : 'var(--primary-light)',
        marginBottom: 16,
      }}
    >
      <span
        style={{
          width: 24,
          height: 1.5,
          background: light ? 'rgba(255,255,255,0.4)' : 'var(--primary-200)',
        }}
      />
      {children}
    </div>
  );
}
