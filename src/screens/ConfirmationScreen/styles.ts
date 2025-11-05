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
  safe: {flex: 1, backgroundColor: '#fff'},
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  // Success badge
  badge: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 12,
    ...cardShadow,
  },
  badgeCheck: {color: '#fff', fontSize: 34, fontWeight: '900'},

  image: {width: '80%', height: 200, marginTop: 4},

  textWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#065F46',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },

  metaCard: {
    width: '100%',
    marginTop: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 12,
    ...cardShadow,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  metaLabel: {color: '#6B7280', fontSize: 13},
  metaValue: {color: '#111827', fontWeight: '800', fontSize: 13},

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 14,
    padding: 18,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 12,
    ...cardShadow,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {backgroundColor: '#2563EB'},
  primaryTxt: {color: '#fff', fontWeight: '800', fontSize: 16},
  ghost: {backgroundColor: '#E5E7EB'},
  ghostTxt: {color: '#111827', fontWeight: '800', fontSize: 16},
});
