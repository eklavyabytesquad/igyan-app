// Icon component using MaterialIcons for Android and web

import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

/**
 * SF Symbols to Material Icons mapping
 * Add your icon mappings here
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'book.fill': 'menu-book',
  'person.fill': 'person',
  'graduationcap.fill': 'school',
  'star.fill': 'star',
  'bell.fill': 'notifications',
  'gear': 'settings',
  'magnifyingglass': 'search',
  'play.circle.fill': 'play-circle-filled',
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name] || 'help'} style={style} />;
}
