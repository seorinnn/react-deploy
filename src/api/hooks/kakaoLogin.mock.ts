import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.example.com/oauth/kakao/callback', (req, res, ctx) => {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    // Mock 액세스 토큰 응답
    if (code) {
      return res(
        ctx.json({
          access_token: 'mock-access-token',
        })
      );
    }

    return res(ctx.status(400), ctx.json({ error: 'Invalid request' }));
  }),

  // rest.get('https://kapi.kakao.com/v2/user/me', (req, res, ctx) => {
  //   const authHeader = req.headers.get('Authorization');

  //   // Mock 사용자 정보 응답
  //   if (authHeader?.startsWith('Bearer')) {
  //     return res(
  //       ctx.json({
  //         id: 12345,
  //         connected_at: '2024-08-01T12:00:00Z',
  //         properties: {
  //           nickname: 'Mock User',
  //         },
  //       })
  //     );
  //   }

  //   return res(ctx.status(401), ctx.json({ error: 'Unauthorized' }));
  // }),
];
