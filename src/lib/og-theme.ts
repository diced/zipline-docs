/** OG image palette — keep in sync with `src/app/global.css` */
export const ogColors = {
  gray50: '#eeeff1',
  gray100: '#dddfe4',
  gray200: '#bbbec8',
  gray300: '#999ead',
  gray400: '#777e92',
  gray500: '#5b6071',
  gray700: '#373a44',
  gray800: '#24262d',
  gray900: '#121317',
  gray950: '#0a0b0d',
  blue400: '#558adb',
  blue500: '#2f6cc8',
  blue700: '#1b4189',
  blue950: '#091020',
} as const;

export function truncateOgText(text: string, maxLength: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;

  return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`;
}
