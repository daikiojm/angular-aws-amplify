export const environment = {
  production: false,
  amplify: {
    Auth: {
      identityPoolId: 'ap-northeast-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      region: 'ap-northeast-1',
      userPoolId: 'ap-northeast-1_xxxxxxxxx',
      userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    API: {
      endpoints: [
        {
            name: 'Test',
            endpoint: 'https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev'
        }
      ]
    }
  },
  api: {
    endpoint: 'https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev'
  }
};
