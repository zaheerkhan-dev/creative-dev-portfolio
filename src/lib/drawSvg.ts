import gsap from "gsap";

/**
 * Animate SVG path stroke dashoffset / dasharray to replicate DrawSVG
 */
export function animateDrawSVG(
  path: SVGPathElement,
  fromPercent: number, // 0 to 100
  toPercent: number,   // 0 to 100
  duration: number,
  ease: string = "power2.inOut",
  onComplete?: () => void
) {
  const length = path.getTotalLength ? path.getTotalLength() : 500;
  path.style.strokeDasharray = `${length} ${length}`;

  const fromOffset = length * (1 - fromPercent / 100);
  const toOffset = length * (1 - toPercent / 100);

  gsap.fromTo(
    path,
    { strokeDashoffset: fromOffset },
    {
      strokeDashoffset: toOffset,
      duration,
      ease,
      onComplete,
    }
  );
}
