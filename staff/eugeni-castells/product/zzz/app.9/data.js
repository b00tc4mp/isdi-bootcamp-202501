const data = {
  uuid: function () {
    return (Math.random() * 10 ** 15).toString(36);
  },
  users: [
    {
      id: "m71tm7l3l5l",
      name: "Eugeni",
      email: "eugeni@castells.com",
      username: "castells",
      password: "123123123",
      createdAt: new Date(2024, 0, 10),
      modifiedAt: null,
    },
    {
      id: "m71tml17ly",
      name: "Bot",
      email: "bot@bot.com",
      username: "bot",
      password: "botbotbot",
      createdAt: new Date(2024, 5, 20),
      modifiedAt: null,
    },
  ],
  userId: null,
  posts: [
    {
      id: "68ubek533s.9",
      author: "m71tm7l3l5l",
      image:
        "https://surtdecasa.cat/sites/default/files/imatges-pujades/2019T1/imatges/slide_20.jpg",
      text: "castell de cardona",
      createdAt: new Date(2024, 2, 20),
      modifiedAt: null,
      likes: [],
    },
    {
      id: "546x0cdqf5.7",
      author: "m71tml17ly",
      image:
        "https://centroeuropeo.com/wp-content/uploads/2020/01/els-6-castells-m%C3%A9s-espectaculars-a-catalunya-3.jpg",
      text: "castell de requesens",
      createdAt: new Date(2024, 8, 10),
      modifiedAt: null,
      likes: [],
    },
  ],
};
