import { Box, Camera, Clock, Heart, Layers, ShieldCheck, Sparkles, Users } from 'lucide-react';
import type { IconKey } from '../types';

const iconMap = {
  camera: Camera,
  layers: Layers,
  users: Users,
  shield: ShieldCheck,
  sparkles: Sparkles,
  box: Box,
  heart: Heart,
  clock: Clock,
};

export const getIconComponent = (icon: IconKey) => {
  return iconMap[icon] ?? Camera;
};

export function enabledItems<T extends { enabled: boolean }>(items: readonly T[]): T[] {
  return items.filter((item): item is T => item.enabled);
}

export const isFilled = (value: string) => {
  return value.trim().length > 0;
};

export const normalizePhoneNumber = (value: string) => {
  return value.replace(/[^0-9]/g, '');
};

export const getWhatsappUrl = (phoneNumber: string, message = 'הגעתי מהאתר שלך, אשמח לפרטים') => {
  const normalizedNumber = normalizePhoneNumber(phoneNumber);
  return normalizedNumber ? `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}` : '';
};

export const uniqueCategories = (items: Array<{ category: string }>) => {
  return Array.from(new Set(items.map((item) => item.category.trim()).filter(Boolean)));
};
