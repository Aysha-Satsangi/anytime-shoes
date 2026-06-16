export default function StitchDivider({
  className = "",
}: {
  className?: string;
}) {
  return <hr className={`stitch-line ${className}`} />;
}