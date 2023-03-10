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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGUxQGdtYWlsLmNvbSIsImlkIjoiMDliZjZjMzYtOWM5My00YmE5LWI1YWUtYWEzNTNlMDgyODI1IiwiaWF0IjoxNjc4NDU4OTQ3LCJleHAiOjE2Nzg0NTkwMDd9.qkwcouIBvVsK1lcGwA6uPSgmer1Wz_9_gKecs1fODUE',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGUxQGdtYWlsLmNvbSIsImlkIjoiMDliZjZjMzYtOWM5My00YmE5LWI1YWUtYWEzNTNlMDgyODI1IiwiaWF0IjoxNjc4NDU4OTQ3LCJleHAiOjE2Nzg0NjI1NDd9.VNTdAlC_13UJLn0hU-GDlUS0SIC5bFYUpbRye95CZeM',
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
    {
      title: 'question',
      author: '09bf6c36-9c93-4ba9-b5ae-aa353e082825',
      surveyType: 'UC',
      surveyId: 'UCb3d2039d-861c-4eb7-b560-5171d8e39b81',
      done: [],
      options: [
        {
          optionTitle: 'name1',
          image: 'ggkjgkj',
          optionId: 'fe13835a-afcc-4620-bbe5-7cc17eeb0a1e',
          checked: '',
        },
        {
          optionTitle: 'name2',
          optionId: '67747cc4-3623-4460-b5d3-59f49f7fd115',
          checked: '',
        },
      ],
    },
  ],
};
