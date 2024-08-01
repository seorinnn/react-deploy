import { useSuspenseQuery } from '@tanstack/react-query';
import { useServer } from '@/provider/ServerProvider';
import type { ProductOptionsData } from '@/types';

import { fetchInstance } from '../instance';
import type { ProductDetailRequestParams } from './useGetProductDetail';

type Props = ProductDetailRequestParams;

export type ProductOptionsResponseData = ProductOptionsData[];

export const getProductOptionsPath = (serverURL: string, productId: string) =>
  `${serverURL}/api/products/${productId}/options`;

export const getProductOptions = async (
  serverURL: string,
  params: ProductDetailRequestParams
) => {
  const response = await fetchInstance.get<ProductOptionsResponseData>(
    getProductOptionsPath(serverURL, params.productId)
  );
  return response.data;
};

export const useGetProductOptions = ({ productId }: Props) => {
  const { serverURL } = useServer();

  return useSuspenseQuery({
    queryKey: [serverURL, 'product-options', productId],
    queryFn: () => getProductOptions(serverURL, { productId }),
  });
};
