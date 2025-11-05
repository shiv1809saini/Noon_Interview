import {StyleSheet, Platform} from 'react-native';

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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  listContent: {paddingHorizontal: 12, paddingBottom: 190},

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    ...cardShadow,
  },
  row: {flexDirection: 'row', gap: 12},
  image: {width: 82, height: 82, borderRadius: 12, backgroundColor: '#F3F4F6'},
  info: {flex: 1},

  title: {fontSize: 16, fontWeight: '800', color: '#111827'},
  category: {marginTop: 2, fontSize: 12, color: '#6B7280'},

  priceRow: {flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6},
  price: {fontSize: 16, fontWeight: '900', color: '#059669'},
  mrp: {fontSize: 12, color: '#9CA3AF', textDecorationLine: 'line-through'},
  offPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#FEF2F2',
  },
  offTxt: {color: '#DC2626', fontWeight: '800', fontSize: 11},

  controlsRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  stepper: {flexDirection: 'row', alignItems: 'center', gap: 10},
  stepBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  stepTxt: {fontSize: 18, fontWeight: '900', color: '#111827'},
  qtyTxt: {
    minWidth: 22,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  removeTxt: {color: '#DC2626', fontWeight: '700'},

  // Empty state
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {fontSize: 18, fontWeight: '900', color: '#111827'},
  emptySub: {marginTop: 6, fontSize: 13, color: '#6B7280'},
  shopBtn: {
    marginTop: 16,
    backgroundColor: '#111827',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  shopBtnTxt: {color: '#fff', fontWeight: '800'},

  // Sticky summary
  summaryWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 14,
    padding: 16,
    backgroundColor: '#fff',
    ...cardShadow,
  },
  breakdown: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 12,
    gap: 6,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineLabel: {color: '#374151', fontSize: 13},
  lineValue: {color: '#111827', fontSize: 13, fontWeight: '700'},
  save: {color: '#059669'},
  divider: {height: 1, backgroundColor: '#E5E7EB', marginVertical: 4},
  totalLabel: {fontSize: 15, fontWeight: '900', color: '#111827'},
  totalValue: {fontSize: 15, fontWeight: '900', color: '#111827'},

  checkoutBtn: {
    marginTop: 10,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
  },
  checkoutTxt: {color: '#fff', fontWeight: '800', fontSize: 16},
});
