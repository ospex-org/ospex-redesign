export interface TeamColorScheme {
  primary: string;
  secondary: string;
  useSecondaryForDonut?: boolean;
  abbreviation: string;
}

export interface LeagueColors {
  [key: string]: TeamColorScheme;
}

// NFL Team Colors
export const NFL_TEAMS: { [key: string]: TeamColorScheme } = {
  'San Francisco 49ers': { primary: '#AA0000', secondary: '#B3995D', abbreviation: 'SF' },
  'Pittsburgh Steelers': { primary: '#FFB612', secondary: '#101820', abbreviation: 'PIT' },
  'Los Angeles Rams': { primary: '#003592', secondary: '#FFA300', abbreviation: 'LAR' },
  'Seattle Seahawks': { primary: '#002244', secondary: '#69BE28', useSecondaryForDonut: true, abbreviation: 'SEA' },
  // ... add other teams as needed
} as const;

// Generic betting colors (for over/under, etc)
export const BETTING_COLORS = {
  AWAY: '#FF9419',  // Amber/orange LED color
  HOME: '#00D973',  // Bright LED green
  OVER: '#FF9419',  // Same as AWAY
  UNDER: '#00D973', // Same as HOME
  DRAW: '#808080',  // Keep neutral color for draws
} as const;

// Helper function to get team color
export function getTeamColor(teamName: string): string {
  const team = NFL_TEAMS[teamName];
  return team ? team.primary : BETTING_COLORS.AWAY; // fallback to default
}

// Helper function to get bet type color
export function getBetTypeColor(type: 'away' | 'home' | 'over' | 'under'): string {
  switch (type) {
    case 'away':
    case 'over':
      return BETTING_COLORS.AWAY;
    case 'home':
    case 'under':
      return BETTING_COLORS.HOME;
    default:
      return BETTING_COLORS.AWAY;
  }
} 