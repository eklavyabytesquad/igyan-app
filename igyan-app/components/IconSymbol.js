// Icon component using MaterialIcons for Android and web

import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

/**
 * Comprehensive SF Symbols to Material Icons mapping
 */
const MAPPING = {
  // Navigation
  'house.fill': 'home',
  'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right',
  'chevron.up': 'expand-less',
  'chevron.down': 'expand-more',
  'chevron.left.forwardslash.chevron.right': 'code',
  'xmark': 'close',
  'xmark.circle.fill': 'cancel',
  'line.3.horizontal': 'menu',

  // Content & Documents
  'book.fill': 'menu-book',
  'books.vertical.fill': 'library-books',
  'doc.fill': 'description',
  'doc.richtext.fill': 'article',
  'doc.text.fill': 'text-snippet',
  'doc.on.doc': 'file-copy',
  'list.bullet': 'format-list-bulleted',
  'list.number': 'format-list-numbered',

  // People & Profile
  'person.fill': 'person',
  'person.2.fill': 'people',
  'person.3.fill': 'groups',
  'person.text.rectangle': 'badge',
  'person.crop.circle.badge.plus': 'person-add',
  'graduationcap.fill': 'school',

  // Communication
  'bell.fill': 'notifications',
  'paperplane.fill': 'send',
  'mic.fill': 'mic',
  'speaker.slash.fill': 'volume-off',

  // Media & Actions
  'play.fill': 'play-arrow',
  'play.circle.fill': 'play-circle-filled',
  'video.fill': 'videocam',
  'eye.fill': 'visibility',

  // Status & Feedback
  'checkmark.circle.fill': 'check-circle',
  'checkmark.seal.fill': 'verified',
  'exclamationmark.triangle.fill': 'warning',
  'info.circle.fill': 'info',
  'questionmark.circle.fill': 'help',

  // Search & Tools
  'magnifyingglass': 'search',
  'gear': 'settings',
  'gearshape.fill': 'settings',
  'cpu': 'memory',
  'sparkles': 'auto-awesome',
  'lightbulb.fill': 'lightbulb',

  // Actions
  'plus': 'add',
  'plus.circle.fill': 'add-circle',
  'trash': 'delete',
  'trash.fill': 'delete',
  'pencil': 'edit',
  'square.and.pencil': 'edit',
  'tray': 'inbox',
  'tray.fill': 'inbox',

  // Arrows & Direction
  'arrow.counterclockwise': 'refresh',
  'arrow.up.right': 'north-east',
  'arrow.down.circle.fill': 'download',
  'rectangle.portrait.and.arrow.right': 'logout',

  // Data & Charts
  'chart.line.uptrend.xyaxis': 'trending-up',
  'star.fill': 'star',
  'flame.fill': 'local-fire-department',
  'link': 'link',

  // Buildings & Places
  'building.2.fill': 'business',
  'building.2': 'business',
  'building.columns.fill': 'account-balance',

  // Layout & Shapes
  'rectangle.stack.fill': 'layers',
  'rectangle.stack': 'layers',
  'square.grid.2x2.fill': 'grid-view',
  'rectangle.grid.1x2.fill': 'view-agenda',

  // Time & Calendar
  'clock.fill': 'schedule',
  'calendar': 'calendar-today',
  'checklist': 'fact-check',

  // Misc
  'cube.box.fill': 'view-in-ar',
  'brain.head.profile': 'psychology',
  'shield.fill': 'shield',
  'envelope.fill': 'email',
  'phone.fill': 'phone',
  'lock.fill': 'lock',
};

/**
 * An icon component that uses Material Icons on Android/web.
 * Maps SF Symbol names to their Material Icon equivalents.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name] || 'help-outline'} style={style} />;
}
