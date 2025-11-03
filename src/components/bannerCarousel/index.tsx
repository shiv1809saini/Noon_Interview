import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ViewToken,
  ListRenderItem,
} from 'react-native';

export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  images?: string[];
};

type Props = {
  banners: Product[];
  onPressBanner?: (product: Product) => void;
  height?: number; // allow override
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
};

const {width} = Dimensions.get('window');

const BannerCarousel: React.FC<Props> = ({
  banners,
  onPressBanner,
  height = Math.round(width * 0.42),
  autoPlay = true,
  autoPlayIntervalMs = 3500,
}) => {
  const listRef = useRef<FlatList<Product>>(null);
  const [index, setIndex] = useState(0);

  // track visible item to update dots
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems?.length > 0) {
        const i = viewableItems[0].index ?? 0;
        setIndex(i);
      }
    },
  ).current;

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 60});

  // simple auto-play
  useEffect(() => {
    if (!autoPlay || banners.length <= 1) return;
    const id = setInterval(() => {
      const next = (index + 1) % banners.length;
      listRef.current?.scrollToIndex({index: next, animated: true});
      setIndex(next);
    }, autoPlayIntervalMs);
    return () => clearInterval(id);
  }, [index, autoPlay, autoPlayIntervalMs, banners.length]);

  const renderItem: ListRenderItem<Product> = ({item}) => {
    const uri = item.images?.[0] ?? item.thumbnail;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPressBanner?.(item)}>
        <Image
          source={{uri}}
          style={{width, height, borderRadius: 16}}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  if (!banners?.length) return null;

  return (
    <View>
      <FlatList
        ref={listRef}
        data={banners}
        keyExtractor={p => String(p.id)}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        contentContainerStyle={{paddingVertical: 8}}
      />
      {/* dots */}
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 6,
        }}>
        {banners.map((_, i) => (
          <View
            key={i}
            style={{
              width: i === index ? 18 : 6,
              height: 6,
              borderRadius: 6,
              backgroundColor: i === index ? '#111827' : '#D1D5DB',
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default BannerCarousel;
