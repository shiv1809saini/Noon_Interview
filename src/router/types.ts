export type RootStackParamList = {
  Home: undefined;

  ProductDetails: {
    product: {
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
  };

  Cart: undefined;
  CartReview: undefined;

  ConfirmationScreen:
    | {
        orderId?: string;
        eta?: string;
      }
    | undefined;

  TrackOrder:
    | {
        orderId: string;
        trackingId?: string;
        courier?: string;
        eta?: string;
        address?: string;
        statusIndex: number;
        timestamps?: Record<string, string>;
      }
    | undefined;
};
