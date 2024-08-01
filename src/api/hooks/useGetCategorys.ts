import { useQuery } from '@tanstack/react-query';
import { useServer } from '@/provider/ServerProvider';

import type { CategoryData } from '@/types';

import { fetchInstance } from '../instance';

export type CategoryResponseData = CategoryData[];

export const useGetCategories = () => {
  const { serverURL } = useServer();

  return useQuery({
    queryKey: [serverURL, 'categories'],
    queryFn: async () => {
      const response = await fetchInstance.get<CategoryResponseData>(
        `${serverURL}/api/categories`
      );
      return response.data;
    },
  });
};
