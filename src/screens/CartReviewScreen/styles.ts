import {StyleSheet, Platform} from 'react-native';

const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  android: {elevation: 3},
});

export default StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#fff'},
  container: {flex: 1, paddingHorizontal: 12, paddingBottom: 120},
  header: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    paddingVertical: 10,
  },

  // List
  listContent: {paddingBottom: 12},

  // Item card
  itemCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    ...cardShadow,
  },
  itemThumb: {
    width: 82,
    height: 82,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  itemInfo: {flex: 1},
  itemTitle: {fontSize: 16, fontWeight: '800', color: '#111827'},
  itemCat: {marginTop: 2, fontSize: 12, color: '#6B7280'},

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

  qtyLine: {marginTop: 4, fontSize: 12, color: '#374151'},
  lineTotal: {fontSize: 14, fontWeight: '800', color: '#111827'},

  // Generic card
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    ...cardShadow,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },

  // Payment methods
  methodsRow: {flexDirection: 'row', gap: 10},
  methodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
  },
  methodChipActive: {backgroundColor: '#111827'},
  radio: {width: 10, height: 10, borderRadius: 10, backgroundColor: '#D1D5DB'},
  radioActive: {backgroundColor: '#10B981'},
  methodTxt: {fontSize: 13, fontWeight: '700', color: '#111827'},
  methodTxtActive: {color: '#fff'},
  methodHint: {marginTop: 6, color: '#6B7280', fontSize: 12},

  // Promo
  promoRow: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  promoInput: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  promoPlaceholder: {color: '#6B7280', fontSize: 14},
  applyBtn: {
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
  },
  applyTxt: {color: '#fff', fontWeight: '800'},

  // Summary
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginTop: 4,
    ...cardShadow,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  lineLabel: {color: '#374151', fontSize: 13},
  lineValue: {color: '#111827', fontSize: 13, fontWeight: '700'},
  divider: {height: 1, backgroundColor: '#E5E7EB', marginVertical: 8},
  totalLabel: {fontSize: 16, fontWeight: '900', color: '#111827'},
  totalValue: {fontSize: 16, fontWeight: '900', color: '#111827'},
  save: {color: '#059669'},

  // Empty
  emptyWrap: {alignItems: 'center', paddingVertical: 40, gap: 8},
  emptyTitle: {fontSize: 18, fontWeight: '900', color: '#111827'},
  emptySub: {fontSize: 13, color: '#6B7280'},
  shopBtn: {
    marginTop: 12,
    backgroundColor: '#111827',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  shopBtnTxt: {color: '#fff', fontWeight: '800'},

  // Sticky footer
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    backgroundColor: '#fff',
    ...cardShadow,
  },
  placeOrderBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
  },
  placeOrderTxt: {color: '#fff', fontWeight: '800', fontSize: 16},
});
