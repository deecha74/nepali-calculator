import { Home, Scale, Handshake } from 'lucide-react';

export function DocIcon({ name, size = 20 }: { name: 'Home' | 'Scale' | 'Handshake'; size?: number }) {
  if (name === 'Home') return <Home size={size} />;
  if (name === 'Scale') return <Scale size={size} />;
  return <Handshake size={size} />;
}
