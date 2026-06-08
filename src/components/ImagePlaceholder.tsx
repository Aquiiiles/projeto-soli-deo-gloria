'use client';

interface ImagePlaceholderProps {
  label?: string;
  aspectRatio?: string;
  height?: number | string;
  style?: React.CSSProperties;
}

export default function ImagePlaceholder({ label, aspectRatio = '16/9', height, style = {} }: ImagePlaceholderProps) {
  return (
    <div
      className="img-placeholder"
      style={{
        aspectRatio: height ? undefined : aspectRatio,
        height: height || undefined,
        borderRadius: 6,
        ...style,
      }}
    >
      <span style={{ position: 'relative', zIndex: 1, padding: '8px 16px', textAlign: 'center', fontSize: 12 }}>
        {label || 'Imagem'}
      </span>
    </div>
  );
}
