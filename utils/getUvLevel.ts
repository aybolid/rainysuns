const getUvLevel = (
  uv: number
): 'low' | 'medium' | 'high' | 'very high' | 'extreme' => {
  if (uv < 3) return 'low';
  if (uv < 6) return 'medium';
  if (uv < 8) return 'high';
  if (uv < 11) return 'very high';
  return 'extreme';
};

export default getUvLevel;
