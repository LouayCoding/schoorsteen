import stedenData from '@/data/steden.json';

export interface StedenData {
  land: string;
  aantal_gemeenten: number;
  gemeenten: string[];
}

export function getAllSteden(): string[] {
  return stedenData.gemeenten;
}

export function getStadSlug(stad: string): string {
  return stad
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[''`]/g, '')
    .replace(/[()]/g, '')
    .replace(/,/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getStadFromSlug(slug: string): string | null {
  const stad = stedenData.gemeenten.find(
    (s) => getStadSlug(s) === slug
  );
  return stad || null;
}

export function getStadData(stad: string) {
  return {
    naam: stad,
    provincie: getProvincie(stad),
    beschrijving: `Professionele schoorsteenservice in ${stad}`,
  };
}

function getProvincie(stad: string): string {
  const provincieMap: Record<string, string> = {
    'Amsterdam': 'Noord-Holland',
    'Rotterdam': 'Zuid-Holland',
    'Utrecht': 'Utrecht',
    'Eindhoven': 'Noord-Brabant',
    'Groningen': 'Groningen',
    'Maastricht': 'Limburg',
    'Arnhem': 'Gelderland',
    'Leeuwarden': 'Friesland',
    'Zwolle': 'Overijssel',
    'Middelburg': 'Zeeland',
    'Assen': 'Drenthe',
    'Lelystad': 'Flevoland',
  };
  
  return provincieMap[stad] || 'Nederland';
}
