interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
  gold?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  center = true,
  gold = false,
}: Props) {
  return (
    <div className={`mb-10 md:mb-14 ${center ? "text-center" : ""}`}>
      {subtitle && (
        <p className="font-sans text-[10px] tracking-[0.3em] text-gold mb-3 font-medium">
          {subtitle}
        </p>
      )}
      <h2
        className={`font-serif text-3xl md:text-4xl font-bold tracking-tight ${
          gold ? "text-gold" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      <div className={`mt-4 h-px w-12 bg-gold ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
