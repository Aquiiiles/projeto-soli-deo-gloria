'use client';

interface SectionProps {
  children: React.ReactNode;
  bg?: string;
  style?: React.CSSProperties;
  id?: string;
}

export default function Section({ children, bg, style, id }: SectionProps) {
  return (
    <section
      id={id}
      style={{
        padding: 'var(--section-padding) 0',
        background: bg || 'transparent',
        ...style,
      }}
    >
      {children}
    </section>
  );
}
