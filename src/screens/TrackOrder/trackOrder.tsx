import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Animated,
  Easing,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import styles from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../router/types';

type Props = StackScreenProps<RootStackParamList, 'TrackOrder'>;
type StepKey = 'placed' | 'packed' | 'shipped' | 'outForDelivery' | 'delivered';

const STEPS: {key: StepKey; label: string}[] = [
  {key: 'placed', label: 'Placed'},
  {key: 'packed', label: 'Packed'},
  {key: 'shipped', label: 'Shipped'},
  {key: 'outForDelivery', label: 'Out for delivery'},
  {key: 'delivered', label: 'Delivered'},
];

const PRIMARY = '#2563EB';
const MUTED = '#9CA3AF';
const BG = '#F3F4F6';
const OK = '#10B981';

const TrackOrder: React.FC<Props> = ({route, navigation}) => {
  const {
    orderId = '#ORD-12839',
    trackingId = 'TRK-9128-XY',
    courier = 'XpressBees',
    eta = '2–4 days',
    address = '221B Baker Street, London, NW1',
    statusIndex = 0,
    timestamps = {},
  } = route?.params ?? {};

  const clampedIndex = Math.max(0, Math.min(statusIndex, STEPS.length - 1));
  const progressTarget = clampedIndex / (STEPS.length - 1);
  const [supportOpen, setSupportOpen] = useState(false);
  const SUPPORT_NUMBER = '+91 98765 43210'; // put your number here

  const anim = useRef(new Animated.Value(progressTarget)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: progressTarget,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progressTarget, anim]);

  const timelineData = useMemo(
    () =>
      STEPS.map((s, i) => ({
        key: s.key,
        title: s.label,
        done: i <= clampedIndex,
        time: timestamps[s.key] ?? '',
      })).reverse(),
    [clampedIndex, timestamps],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Text style={styles.header}>Track your order</Text>
        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Order ID</Text>
            <Text style={styles.metaValue}>{orderId}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Tracking ID</Text>
            <Text style={styles.metaValue}>{trackingId}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Courier</Text>
            <Text style={styles.metaValue}>{courier}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>ETA</Text>
            <Text style={[styles.metaValue, {color: OK}]}>{eta}</Text>
          </View>
          <View style={[styles.divider, {marginTop: 8}]} />
          <Text style={styles.addrLabel}>Delivering to</Text>
          <Text style={styles.addrValue}>{address}</Text>
        </View>
        <View style={styles.stepperWrap}>
          <View style={styles.track} />

          <Animated.View
            style={[
              styles.trackFill,
              {
                width: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />

          <View style={styles.circlesRow}>
            {STEPS.map((s, i) => {
              const done = i <= clampedIndex;
              const current = i === clampedIndex;
              return (
                <View key={s.key} style={styles.circleWrap}>
                  <View
                    style={[
                      styles.circle,
                      done && {backgroundColor: PRIMARY, borderColor: PRIMARY},
                      current && !done && {borderColor: PRIMARY},
                    ]}>
                    {done ? <Text style={styles.check}>✓</Text> : null}
                  </View>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.stepLabel,
                      done ? styles.stepLabelDone : styles.stepLabelMuted,
                    ]}>
                    {s.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Timeline</Text>
          <FlatList
            data={timelineData}
            keyExtractor={i => i.key}
            renderItem={({item}) => (
              <View style={styles.timelineRow}>
                <View
                  style={[
                    styles.dot,
                    {backgroundColor: item.done ? PRIMARY : MUTED},
                  ]}
                />
                <View style={{flex: 1}}>
                  <Text
                    style={[
                      styles.timelineTitle,
                      item.done && {color: '#111827'},
                    ]}>
                    {item.title}
                  </Text>
                  {!!item.time && (
                    <Text style={styles.timelineTime}>{item.time}</Text>
                  )}
                </View>
                {item.done && <Text style={styles.statusPill}>Done</Text>}
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
          />
        </View>

        <Modal
          visible={supportOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setSupportOpen(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Support</Text>
              <Text style={styles.modalPhone}>{SUPPORT_NUMBER}</Text>

              <TouchableOpacity
                onPress={() => setSupportOpen(false)}
                style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseTxt}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.btn, styles.primary]}
            onPress={() => setSupportOpen(true)}>
            <Text style={styles.primaryTxt}>Contact Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.ghost]}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.ghostTxt}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TrackOrder;
