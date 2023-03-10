export const DB = {
  users: [
    {
      name: 'Jane Doe',
      email: 'example0@gmail.com',
      id: 'fcc953b4-f6f8-4706-90b8-b509656ce386',
      password: '$2b$10$JK7q3EqKdzr293tj6QXS0.WPFoaTMUiqOzAlXWmM7AdcTi.kLe1iW',
    },
    {
      name: 'Jane Doe',
      email: 'example1@gmail.com',
      id: '09bf6c36-9c93-4ba9-b5ae-aa353e082825',
      password: '$2b$10$qx03cntsVTmYcGxiPB4Nx.ppCrG5RCouH564FujzxgtdBQJBuGy1W',
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGUxQGdtYWlsLmNvbSIsImlkIjoiMDliZjZjMzYtOWM5My00YmE5LWI1YWUtYWEzNTNlMDgyODI1IiwiaWF0IjoxNjc4NDU3MDM2LCJleHAiOjE2Nzg0NTcwOTZ9.mBBHjvmbj478zI_70yPRn9EPwcyy_L7nChAtuDV4T34',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGUxQGdtYWlsLmNvbSIsImlkIjoiMDliZjZjMzYtOWM5My00YmE5LWI1YWUtYWEzNTNlMDgyODI1IiwiaWF0IjoxNjc4NDU3MDM2LCJleHAiOjE2Nzg0NjA2MzZ9.BJJyANihtDiCODzW5bYL8Ffv2SBlxzE23HCKEKTWcxs',
    },
  ],
  surveys: [
    {
      title: 'question',
      author: '09bf6c36-9c93-4ba9-b5ae-aa353e082825',
      surveyType: 'MC',
      surveyId: 'MC1ca6a11f-7bd8-4e5b-a4f6-fc07b555b3ea',
      done: [],
      options: [
        {
          optionTitle: 'name1',
          image: 'ggkjgkj',
          optionId: '035f1387-cc53-4473-8939-a91be7b1849e',
          checked: [],
        },
        {
          optionTitle: 'name2',
          optionId: '6351f7ed-43eb-4b8f-befd-1bd9b9e3e282',
          checked: [],
        },
      ],
    },
  ],
};
