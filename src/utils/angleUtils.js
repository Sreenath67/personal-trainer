
export function getAngle(a, b, c) {
  // Calculate angle at point B between points A-B-C
  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };
  
  const dot = ab.x * cb.x + ab.y * cb.y;
  const magAB = Math.sqrt(ab.x * ab.x + ab.y * ab.y);
  const magCB = Math.sqrt(cb.x * cb.x + cb.y * cb.y);
  
  if (magAB === 0 || magCB === 0) return 0;
  
  const angle = Math.acos(Math.min(1, Math.max(-1, dot / (magAB * magCB))));
  return angle * (180 / Math.PI);
}
