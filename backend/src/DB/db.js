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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGUxQGdtYWlsLmNvbSIsImlkIjoiMDliZjZjMzYtOWM5My00YmE5LWI1YWUtYWEzNTNlMDgyODI1IiwiaWF0IjoxNjc4NTM2ODY0LCJleHAiOjE2Nzg1MzY5MjR9.CnbR60g7246jdz9P2FxWEgeTrC1HWFfkJqCrYYAo1HQ',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGUxQGdtYWlsLmNvbSIsImlkIjoiMDliZjZjMzYtOWM5My00YmE5LWI1YWUtYWEzNTNlMDgyODI1IiwiaWF0IjoxNjc4NTM2ODY0LCJleHAiOjE2Nzg1NDA0NjR9.xI2L4ItzWS7SpKFF-LS3qIR2D6i9QuN-RSbC2zp1thU',
    },
    {
      name: 'Jane Doe',
      email: 'example2@gmail.com',
      id: '8765a8f6-710e-4ae4-b583-6a37a87187e2',
      password: '$2b$10$cG7zeyhfkwHYMDqwv5Ls3OF7m56AU0vkMIoFtpWzoIaMRLH/RevyO',
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGUyQGdtYWlsLmNvbSIsImlkIjoiODc2NWE4ZjYtNzEwZS00YWU0LWI1ODMtNmEzN2E4NzE4N2UyIiwiaWF0IjoxNjc4NTM1MDc2LCJleHAiOjE2Nzg1MzUxMzZ9.6mdoyiyR_OjECzQEdKiaG8z8xipElPuQY3ILkGnsdzs',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGUyQGdtYWlsLmNvbSIsImlkIjoiODc2NWE4ZjYtNzEwZS00YWU0LWI1ODMtNmEzN2E4NzE4N2UyIiwiaWF0IjoxNjc4NTM1MDc2LCJleHAiOjE2Nzg1Mzg2NzZ9.CAv1QMpCCMztJLpduTBR3yK1g0W1J4Wf2W3ACT7M5U0',
    },
  ],
  surveys: [
    {
      title: 'question111',
      author: '09bf6c36-9c93-4ba9-b5ae-aa353e082825',
      surveyType: 'UC',
      surveyId: 'UC40308336-6061-49f3-a2cb-e9afce378dce',
      done: [],
      visited: ['09bf6c36-9c93-4ba9-b5ae-aa353e082825'],
      options: [
        {
          optionTitle: 'name1',
          image: 'ggkjgkj',
          optionId: '82a26c53-f89d-4090-b97e-93c4cc83c9a0',
          checked: '',
        },
        {
          optionTitle: 'name2',
          optionId: '52e242b5-16ed-4dbd-bdee-a2568ed75f23',
          checked: '',
        },
      ],
    },
    {
      title: 'question111',
      author: '09bf6c36-9c93-4ba9-b5ae-aa353e082825',
      surveyType: 'UC',
      surveyId: 'UC8e18ff5c-e291-4beb-a96f-f996875df633',
      done: ['09bf6c36-9c93-4ba9-b5ae-aa353e082825'],
      visited: ['09bf6c36-9c93-4ba9-b5ae-aa353e082825'],
      options: [
        {
          optionTitle: 'name1',
          image: 'ggkjgkj',
          optionId: 'd36b3eb5-76d5-4e30-a9c7-b3fc31038975',
          checked: '',
        },
        {
          optionTitle: 'name2',
          optionId: 'fe29d4d4-3aa4-4df7-b4d6-97e4f69917fd',
          checked: '09bf6c36-9c93-4ba9-b5ae-aa353e082825',
        },
      ],
    },
    {
      title: 'question111',
      author: '09bf6c36-9c93-4ba9-b5ae-aa353e082825',
      surveyType: 'MC',
      surveyId: 'MC7004c54e-9365-48c3-9e06-5fbaf106891c',
      done: ['09bf6c36-9c93-4ba9-b5ae-aa353e082825'],
      visited: [],
      options: [
        {
          optionTitle: 'name1',
          image: 'ggkjgkj',
          optionId: '90fee41f-5b42-432a-b075-2012753e9a76',
          checked: ['09bf6c36-9c93-4ba9-b5ae-aa353e082825'],
        },
        {
          optionTitle: 'name2',
          optionId: '5a32025e-829c-4109-b8bf-be29eb35aee6',
          checked: ['09bf6c36-9c93-4ba9-b5ae-aa353e082825'],
        },
      ],
    },
    {
      title: 'question111',
      author: '09bf6c36-9c93-4ba9-b5ae-aa353e082825',
      surveyType: 'SC',
      surveyId: 'SC20b6039e-eff6-4f37-8d98-2cb93c058290',
      done: ['09bf6c36-9c93-4ba9-b5ae-aa353e082825'],
      visited: [],
      options: [
        {
          optionTitle: 'name1',
          image: 'ggkjgkj',
          optionId: '44a189da-02cb-4be4-bbe0-7b4e72ffebe1',
          checked: [],
        },
        {
          optionTitle: 'name2',
          optionId: 'a1d14061-eb3c-4e78-a166-7a0b547f2518',
          checked: ['09bf6c36-9c93-4ba9-b5ae-aa353e082825'],
        },
      ],
    },
    {
      title: 'question222',
      author: '8765a8f6-710e-4ae4-b583-6a37a87187e2',
      surveyType: 'SC',
      surveyId: 'SC52040d44-b473-491c-895c-3e16fa35970f',
      done: [],
      visited: [],
      options: [
        {
          optionTitle: 'name1',
          optionId: '85946ea0-972e-413c-a60c-d93488ebeab7',
          checked: [],
        },
        {
          optionTitle: 'name2',
          optionId: '7331b6c1-ff95-4ac4-b40e-a6348daf694b',
          checked: [],
        },
      ],
    },
  ],
};