import { useSuspenseQuery } from '@tanstack/react-query';
import { useServer } from '@/provider/ServerProvider';

import type { ProductData } from '@/types';

import { fetchInstance } from '../instance';

export type ProductDetailRequestParams = {
  productId: string;
};

type Props = ProductDetailRequestParams;

export type GoodsDetailResponseData = ProductData;

export const getProductDetailPath = (serverURL: string, productId: string) =>
  `${serverURL}/api/products/${productId}`;

export const getProductDetail = async (
  serverURL: string,
  params: ProductDetailRequestParams
) => {
  const response = await fetchInstance.get<GoodsDetailResponseData>(
    getProductDetailPath(serverURL, params.productId)
  );

  return response.data;
};

export const useGetProductDetail = ({ productId }: Props) => {
  const { serverURL } = useServer();

  return useSuspenseQuery({
    queryKey: [serverURL, 'product', productId],
    queryFn: () => getProductDetail(serverURL, { productId }),
  });
};
