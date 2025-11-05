import React, {useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Pressable,
  Animated,
  ListRenderItem,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useHomeScreen from '../../hooks/useHomeScreen';
import styles, {CARD_ASPECT_RATIO, CARD_GUTTER, CARD_WIDTH} from './styles';
import BannerCarousel from '../../components/bannerCarousel';

export type Product = {
  id: number | string;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  originalPrice?: number;
  discountPercentage?: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: {product: Product};
  Cart: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type HomeScreenHook = {
  filteredProducts: Product[];
  searchText: string;
  cart: Array<CartItem> | Array<Product>;
  handleSearch: (text: string) => void;
  refreshing: boolean;
  onRefresh: () => void;
  loading?: boolean;
  categories?: string[];
  applyCategory?: (category: string | null) => void;
  activeCategory?: string | null;
  banners?: Product[];
};

const rupee = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});
type PressableScaleProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};
const PressableScale: React.FC<PressableScaleProps> = ({
  children,
  onPress,
  style,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const animate = (to: number) =>
    Animated.spring(scale, {toValue: to, friction: 5, useNativeDriver: true});

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => animate(0.98)}
      onPressOut={() => animate(1)}
      style={style}
      android_ripple={{color: 'rgba(0,0,0,0.06)'}}>
      <Animated.View style={{transform: [{scale}]}}>{children}</Animated.View>
    </Pressable>
  );
};

const SkeletonCard: React.FC = () => (
  <View style={[styles.productCard, styles.skeletonCard, {width: CARD_WIDTH}]}>
    <View style={styles.skeletonThumb} />
    <View style={styles.skeletonLine} />
    <View style={[styles.skeletonLine, {width: '60%'}]} />
    <View style={styles.skeletonPriceRow}>
      <View style={[styles.skeletonPill, {width: 60}]} />
      <View style={[styles.skeletonPill, {width: 40}]} />
    </View>
  </View>
);

type EmptyStateProps = {query?: string};
const EmptyState: React.FC<EmptyStateProps> = ({query}) => (
  <View style={styles.emptyWrap}>
    <Text style={styles.emptyTitle}>No results</Text>
    <Text style={styles.emptySubtitle}>
      {query
        ? `We couldn’t find “${query}”.`
        : 'Try adjusting your search or filters.'}
    </Text>
  </View>
);

type SkeletonItem = {__type: 'skeleton'; id: string};
const isSkeleton = (x: Product | SkeletonItem): x is SkeletonItem =>
  (x as SkeletonItem).__type === 'skeleton';

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {
    filteredProducts,
    searchText,
    cart,
    handleSearch,
    refreshing,
    onRefresh,
    loading = false,
    categories = [],
    applyCategory,
    activeCategory,
    banners = [],
  } = useHomeScreen() as HomeScreenHook;

  const [focus, setFocus] = useState(false);

  const products = useMemo<Product[]>(
    () => filteredProducts ?? [],
    [filteredProducts],
  );

  const renderProductItem: ListRenderItem<Product> = ({item}) => {
    const originalPrice = item.originalPrice ?? item.price + 500;
    const discountPct =
      item.discountPercentage ??
      Math.round(((originalPrice - item.price) / originalPrice) * 100);

    return (
      <PressableScale
        style={{width: CARD_WIDTH, marginBottom: CARD_GUTTER}}
        onPress={() => navigation.navigate('ProductDetails', {product: item})}>
        <View style={styles.productCard}>
          <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.category} numberOfLines={1}>
              {item.category}
            </Text>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>{rupee.format(item.price)}</Text>
              <Text style={styles.strikePrice}>
                {rupee.format(originalPrice)}
              </Text>
              {!!discountPct && (
                <View style={styles.discountPill}>
                  <Text style={styles.discountText}>{discountPct}% OFF</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </PressableScale>
    );
  };

  const cartCount =
    Array.isArray(cart) && cart.length > 0
      ? (cart as any[]).reduce<number>((acc, item) => {
          if ((item as CartItem).quantity)
            return acc + (item as CartItem).quantity;
          return acc + 1;
        }, 0)
      : 0;

  const searchIcon = require('../../../assets/images/search.png');
  const cartIcon = require('../../../assets/images/shoppingCart.png');

  const ListHeader = (
    <View style={styles.headerWrap}>
      <BannerCarousel
        banners={banners}
        onPressBanner={(product: Product) =>
          navigation.navigate('ProductDetails', {product})
        }
      />

      <View style={[styles.searchContainer, focus && styles.searchFocused]}>
        <Image source={searchIcon} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search products or categories"
          value={searchText}
          onChangeText={handleSearch}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          returnKeyType="search"
          placeholderTextColor="#8E8E93"
        />
        {!!searchText && (
          <TouchableOpacity
            onPress={() => handleSearch('')}
            style={styles.clearBtn}>
            <Text style={styles.clearTxt}>×</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
          hitSlop={{top: 8, left: 8, right: 8, bottom: 8}}>
          <View style={styles.iconContainer}>
            <Image source={cartIcon} style={styles.cartIcon} />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartCount > 99 ? '99+' : cartCount}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {Array.isArray(categories) && categories.length > 0 && (
        <FlatList<string>
          data={['All', ...categories]}
          keyExtractor={c => c}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          renderItem={({item: c}) => {
            const active = (activeCategory || 'All') === c;
            return (
              <TouchableOpacity
                style={[styles.chip, active && styles.chipActive]}
                onPress={() =>
                  c === 'All' ? applyCategory?.(null) : applyCategory?.(c)
                }>
                <Text
                  style={[styles.chipText, active && styles.chipTextActive]}>
                  {c}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
  const skeletons: SkeletonItem[] = useMemo(
    () =>
      Array.from({length: 8}, (_, i) => ({__type: 'skeleton', id: `s-${i}`})),
    [],
  );
  const listData: Array<Product | SkeletonItem> = loading
    ? skeletons
    : products;

  const keyExtractor = (item: Product | SkeletonItem) =>
    isSkeleton(item) ? item.id : String(item.id);

  const renderItem: ListRenderItem<Product | SkeletonItem> = info => {
    if (isSkeleton(info.item)) return <SkeletonCard />;
    const productInfo: ListRenderItemInfo<Product> = {
      ...info,
      item: info.item as Product,
    };
    return renderProductItem(productInfo);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlatList<Product | SkeletonItem>
        data={listData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{gap: CARD_GUTTER, paddingHorizontal: CARD_GUTTER}}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={!loading ? <EmptyState query={searchText} /> : null}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => {
          const height = CARD_WIDTH / CARD_ASPECT_RATIO + 110;
          const row = Math.floor(index / 2);
          return {length: height, offset: height * row, index};
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
