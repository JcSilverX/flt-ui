const clamp = (v: number, [min, max]: [number, number]) => {
  return Math.min(max, Math.max(min, v));
};

export { clamp };
