import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NepalCalc — Smart All-in-One Calculators for Nepal',
    short_name: 'NepalCalc',
    description: 'Official online calculators for Nepal: Income Tax FY 2083/84, Land Unit Converter, Vehicle Tax, Gold Rates & Patro.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/nepal-flag.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
