/**
 * iGyan App - Explore Page Styles
 */

import { StyleSheet } from 'react-native';
import { Spacing, FontSizes } from '../../constants/theme';

export const exploreStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.md,
    paddingTop: Spacing.xl,
  },
  headerTitle: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  trendingContainer: {
    paddingHorizontal: Spacing.md,
  },
  trendingCard: {
    width: 280,
    borderRadius: 16,
    marginRight: Spacing.md,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#E0E0E0',
  },
  trendingContent: {
    padding: Spacing.md,
  },
  trendingTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  trendingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trendingStudents: {
    fontSize: FontSizes.sm,
    opacity: 0.7,
  },
  trendingRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Spacing.sm,
  },
  categoryCard: {
    width: '45%',
    margin: '2.5%',
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  categoryIcon: {
    marginBottom: Spacing.sm,
  },
  categoryTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: FontSizes.sm,
    opacity: 0.6,
    marginTop: Spacing.xs,
  },
  instructorsSection: {
    padding: Spacing.md,
  },
  instructorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  instructorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    marginRight: Spacing.md,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
  },
  instructorSpecialty: {
    fontSize: FontSizes.sm,
    opacity: 0.7,
  },
});
