import {useState, useEffect, useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
};

type RootState = {
  cart: {cart: any[]};
};

const useHomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [banners, setBanners] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const cart = useSelector((state: RootState) => state.cart.cart);

  const categories = useMemo<string[]>(
    () => [...new Set(products.map(p => p.category))],
    [products],
  );

  const fetchProductsAndBanners = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);

      const bannersData = [
        ...new Set<string>(data.products.map((i: Product) => i.category)),
      ]
        .map((cat: string) =>
          data.products.find((p: Product) => p.category === cat),
        )
        .filter(Boolean) as Product[];
      setBanners(bannersData);
    } catch (error) {
      console.error('Error fetching products and banners:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchProductsAndBanners();
    } catch (error) {
      console.error('Error refreshing products:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const applyFilters = useCallback(() => {
    const q = searchText.trim().toLowerCase();

    let out = products;

    if (activeCategory && activeCategory !== 'All') {
      out = out.filter(p => p.category === activeCategory);
    }

    if (q) {
      out = out.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    setFilteredProducts(out);
  }, [products, activeCategory, searchText]);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    fetchProductsAndBanners();
  }, []);

  const applyCategory = (category: string | null) => {
    setActiveCategory(category ?? null);
  };

  return {
    products,
    filteredProducts,
    searchText,
    cart,
    banners,
    refreshing,
    onRefresh,
    categories,
    activeCategory,
    applyCategory,
    handleSearch,
  };
};

export default useHomeScreen;
