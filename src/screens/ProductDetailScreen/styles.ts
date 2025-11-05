import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width} = Dimensions.get('window');

const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  android: {elevation: 3},
});

export default StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#fff'},

  header: {
    height: 48,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  headerBack: {fontSize: 28, color: '#111827', marginRight: 6},
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  content: {paddingBottom: 12},

  galleryWrap: {width, paddingHorizontal: 12, marginTop: 6},
  galleryImage: {
    width: width - 24,
    height: Math.round((width - 24) * 0.75),
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
  },
  dotsRow: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {width: 6, height: 6, borderRadius: 6, backgroundColor: '#D1D5DB'},
  dotActive: {width: 18, backgroundColor: '#111827'},

  title: {
    marginTop: 12,
    paddingHorizontal: 16,
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  category: {
    paddingHorizontal: 16,
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  categoryLabel: {color: '#9CA3AF'},

  priceRow: {
    marginTop: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {fontSize: 22, fontWeight: '900', color: '#059669'},
  strike: {fontSize: 14, color: '#9CA3AF', textDecorationLine: 'line-through'},
  offPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#FEF2F2',
  },
  offText: {fontSize: 12, fontWeight: '800', color: '#DC2626'},

  metaRow: {
    marginTop: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {fontSize: 12, fontWeight: '700', color: '#111827'},
  separator: {color: '#9CA3AF'},
  stock: {fontSize: 12, fontWeight: '600'},
  inStock: {color: '#059669'},
  outStock: {color: '#DC2626'},
  freeDel: {fontSize: 12, color: '#374151'},

  card: {
    marginTop: 12,
    marginHorizontal: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    ...cardShadow,
  },
  cardTitle: {fontSize: 15, fontWeight: '800', color: '#111827'},
  bullets: {marginTop: 8, gap: 6},
  bullet: {fontSize: 13, color: '#374151', lineHeight: 18},

  descHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chev: {fontSize: 12, color: '#6B7280'},
  description: {marginTop: 8, fontSize: 14, lineHeight: 20, color: '#374151'},

  qtyRow: {
    marginTop: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyLabel: {fontSize: 14, fontWeight: '700', color: '#111827'},
  stepper: {flexDirection: 'row', alignItems: 'center', gap: 10},
  stepBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  stepTxt: {fontSize: 18, fontWeight: '800', color: '#111827'},
  qty: {
    minWidth: 22,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    padding: 22,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 12,
    ...cardShadow,
  },
  ctaBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaDanger: {
    backgroundColor: '#DC2626',
  },
  ctaDangerText: {
    color: '#fff',
    fontWeight: '800',
  },
  ctaPrimary: {backgroundColor: '#111827'},
  ctaPrimaryText: {color: '#fff', fontWeight: '800'},
  ctaGhost: {backgroundColor: '#E5E7EB'},
  ctaGhostText: {color: '#111827', fontWeight: '800'},
});
