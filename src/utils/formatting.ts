export const formatSpread = (spread: number) => {
  return spread > 0 ? `+${spread}` : spread;
};

export const formatOdds = (odds: number) => {
  return odds > 0 ? `+${odds}` : odds;
}; 