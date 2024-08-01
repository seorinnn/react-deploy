import { rest } from 'msw';

const CATEGORIES_RESPONSE_DATA = [
  {
    id: 2920,
    name: '생일',
    description: '감동을 높여줄 생일 선물 리스트',
    color: '#5949a3',
    imageUrl:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
  },
  {
    id: 2930,
    name: '교환권',
    description: '놓치면 후회할 교환권 특가',
    color: '#9290C3',
    imageUrl:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20240131153049_5a22b137a8d346e9beb020a7a7f4254a.jpg',
  },
];

// 모킹 핸들러 설정
export const categoriesMockHandler = [
  rest.get('https://api.example.com/api/categories', (_, res, ctx) => {
    // 모든 /api/categories 요청에 대해 동일한 카테고리 데이터 반환
    return res(ctx.json(CATEGORIES_RESPONSE_DATA));
  }),
];
