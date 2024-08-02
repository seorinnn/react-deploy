import { useServer } from '@/provider/ServerProvider';
import { fetchInstance } from '../instance';

type WishlistRequestParams = {
  productId: string;
  token: string | null;
};

export const useWishlist = ({ productId, token }: WishlistRequestParams) => {
  const { serverURL } = useServer();

  const addToWishlist = async () => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetchInstance.post(`${serverURL}/api/wishes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId },
      });

      if (response.status === 200) {
        alert('관심 등록 완료');
      } else {
        throw new Error('Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  return { addToWishlist };
};
