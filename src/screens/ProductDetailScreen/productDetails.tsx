import React, {useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  ViewToken,
  ViewabilityConfig,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styles from './styles';
import useProductDetails from '../../hooks/useProductDetails';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export type Product = {
  id: number | string;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  images?: string[];
  rating?: number;
  stock?: number;
  discountPercentage?: number;
  description?: string;
};

type RootStackParamList = {
  ProductDetails: {product: Product};
  Cart: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

const {width} = Dimensions.get('window');

const rupee = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

const PressableScale: React.FC<{
  onPress?: () => void;
  children: React.ReactNode;
  style?: any;
}> = ({onPress, children, style}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const bump = (to: number) =>
    Animated.spring(scale, {toValue: to, useNativeDriver: true, friction: 6});
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => bump(0.98)}
      onPressOut={() => bump(1)}
      style={style}
      android_ripple={{color: 'rgba(0,0,0,0.08)'}}>
      <Animated.View style={{transform: [{scale}]}}>{children}</Animated.View>
    </Pressable>
  );
};

const Dot: React.FC<{active: boolean}> = ({active}) => (
  <View style={[styles.dot, active && styles.dotActive]} />
);

const ProductDetails: React.FC<Props> = ({route, navigation}) => {
  const {product} = route.params;

  const {
    cart,
    isInCart,
    handleAddToCart,
    handleRemoveFromCart,
    handleViewCart,
  } = useProductDetails(product);

  const gallery = product.images?.length ? product.images : [product.thumbnail];
  const [index, setIndex] = useState<number>(0);
  const [descOpen, setDescOpen] = useState<boolean>(false);

  const originalPrice = useMemo(() => {
    if (product.discountPercentage != null) {
      const inferred = product.price / (1 - product.discountPercentage / 100);
      if (Number.isFinite(inferred) && inferred > product.price)
        return inferred;
    }
    return product.price + 500;
  }, [product.price, product.discountPercentage]);

  const discountPct = useMemo(() => {
    if (product.discountPercentage != null)
      return Math.round(product.discountPercentage);
    return Math.round(((originalPrice - product.price) / originalPrice) * 100);
  }, [originalPrice, product.price, product.discountPercentage]);

  const rating: number = product.rating ?? 4.5;
  const stock: number = product.stock ?? 12;

  const onViewRef = useRef(
    (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      const first = info.viewableItems[0];
      const i = first?.index ?? 0;
      setIndex(i);
    },
  );

  const viewConfigRef = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 60,
  });

  const toggleDesc = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDescOpen(s => !s);
  };

  const onAddToCart = () => handleAddToCart();
  const onRemoveFromCart = () => handleRemoveFromCart();
  const onViewCart = () => handleViewCart();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back">
          <Text style={styles.headerBack}>{'‹'}</Text>
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Product Details
        </Text>
        <View style={{width: 28}} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.galleryWrap}>
          <FlatList<string>
            data={gallery}
            keyExtractor={(u, i) => `${u}-${i}`}
            renderItem={({item: uri}) => (
              <Image
                source={{uri}}
                style={styles.galleryImage}
                resizeMode="contain"
              />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
          <View style={styles.dotsRow}>
            {gallery.map((_, i) => (
              <Dot key={i} active={i === index} />
            ))}
          </View>
        </View>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>
          <Text style={styles.categoryLabel}>Category:</Text> {product.category}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{rupee.format(product.price)}</Text>
          <Text style={styles.strike}>{rupee.format(originalPrice)}</Text>
          {!!discountPct && (
            <View style={styles.offPill}>
              <Text style={styles.offText}>{discountPct}% OFF</Text>
            </View>
          )}
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.rating}>★ {rating.toFixed(1)}</Text>
          <Text style={styles.separator}>•</Text>
          <Text
            style={[
              styles.stock,
              stock > 0 ? styles.inStock : styles.outStock,
            ]}>
            {stock > 0 ? 'In stock' : 'Out of stock'}
          </Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.freeDel}>Free delivery</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Highlights</Text>
          <View style={styles.bullets}>
            <Text style={styles.bullet}>• Genuine product, brand warranty</Text>
            <Text style={styles.bullet}>• Easy returns within 7 days</Text>
            <Text style={styles.bullet}>• Pay on delivery available</Text>
          </View>
        </View>
        <View style={styles.card}>
          <PressableScale onPress={toggleDesc} style={styles.descHeader}>
            <Text style={styles.cardTitle}>Description</Text>
            <Text style={styles.chev}>{descOpen ? '▲' : '▼'}</Text>
          </PressableScale>
          {descOpen && (
            <Text style={styles.description}>
              {product.description ??
                'High-quality product with excellent performance and reliability.'}
            </Text>
          )}
        </View>

        <View style={{height: 96}} />
      </ScrollView>
      <View style={styles.footer}>
        {isInCart ? (
          <PressableScale
            onPress={onRemoveFromCart}
            style={[styles.ctaBtn, styles.ctaDanger]}>
            <Text style={styles.ctaDangerText}>Remove from Cart</Text>
          </PressableScale>
        ) : (
          <PressableScale
            onPress={onAddToCart}
            style={[styles.ctaBtn, styles.ctaPrimary]}>
            <Text style={styles.ctaPrimaryText}>Add to Cart</Text>
          </PressableScale>
        )}
        <PressableScale
          onPress={onViewCart}
          style={[styles.ctaBtn, styles.ctaGhost]}>
          <Text style={styles.ctaGhostText}>View Cart ({cart.length})</Text>
        </PressableScale>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
