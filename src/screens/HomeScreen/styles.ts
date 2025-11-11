import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');
export const CARD_GUTTER = 12;
export const CARD_WIDTH = (width - CARD_GUTTER * 3) / 2;
export const CARD_ASPECT_RATIO = 1;

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  android: {
    elevation: 3,
  },
});

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
    rowGap: CARD_GUTTER,
  },

  headerWrap: {
    paddingHorizontal: CARD_GUTTER,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    ...shadow,
  },
  searchFocused: {
    backgroundColor: '#EEEFF3',
  },
  searchIcon: {width: 18, height: 18, tintColor: '#8E8E93'},
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  clearBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
  },
  clearTxt: {fontSize: 18, lineHeight: 18, color: '#374151'},

  cartButton: {
    marginLeft: 6,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    ...shadow,
  },
  cartIcon: {width: 22, height: 22, tintColor: '#111827'},
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#EF4444',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },

  chipsRow: {
    gap: 8,
    paddingVertical: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
  },
  chipActive: {
    backgroundColor: '#111827',
  },
  chipText: {color: '#111827', fontSize: 13, fontWeight: '600'},
  chipTextActive: {color: '#fff'},

  productCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    ...shadow,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: CARD_ASPECT_RATIO,
    backgroundColor: '#F3F4F6',
  },
  infoContainer: {
    padding: 10,
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  category: {
    fontSize: 12,
    color: '#6B7280',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  strikePrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  discountPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#ECFDF5',
  },
  discountText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#059669',
  },

  skeletonCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingBottom: 10,
  },
  skeletonThumb: {
    width: '100%',
    aspectRatio: CARD_ASPECT_RATIO,
    backgroundColor: '#ECECEC',
  },
  skeletonLine: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ECECEC',
    marginTop: 10,
    marginHorizontal: 10,
  },
  skeletonPriceRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  skeletonPill: {
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ECECEC',
  },

  emptyWrap: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 80,
  },
  emptyImg: {
    width: 160,
    height: 120,
    opacity: 0.9,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  emptySubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7280',
  },
});
