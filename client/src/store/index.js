import { reactive, readonly } from "vue";

const state = reactive({
  name: "",
  players: [],
  categories: [],
});

const methods = {
  setName(name) {
    state.name = name;
  },
  setPlayers(players) {
    state.players = players;
  },
  setCategories(categories) {
    state.categories = categories;
  },
};

methods.setPlayers([
  {
    id: 0,
    name: "player0",
    url:
      "https://avataaars.io/?accessoriesType=Round&avatarStyle=Circle&clotheColor=Heather&clotheType=ShirtScoopNeck&eyeType=Default&eyebrowType=UpDown&facialHairColor=BlondeGolden&facialHairType=Blank&hairColor=Red&hatColor=PastelYellow&mouthType=Sad&skinColor=Pale&topType=LongHairFrida",
  },
  {
    id: 1,
    name: "player1",
    url:
      "https://avataaars.io/?accessoriesType=Prescription01&avatarStyle=Circle&clotheColor=Pink&clotheType=ShirtScoopNeck&eyeType=Dizzy&eyebrowType=RaisedExcited&facialHairColor=Blonde&facialHairType=MoustacheMagnum&hairColor=PastelPink&hatColor=PastelBlue&mouthType=Grimace&skinColor=Yellow&topType=WinterHat2",
  },
  {
    id: 2,
    name: "player2",
    url:
      "https://avataaars.io/?accessoriesType=Prescription01&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtCrewNeck&eyeType=Side&eyebrowType=SadConcernedNatural&facialHairColor=Blonde&facialHairType=BeardMagestic&hairColor=Platinum&hatColor=Red&mouthType=Smile&skinColor=DarkBrown&topType=ShortHairDreads02",
  },
  {
    id: 3,
    name: "player3",
    url:
      "https://avataaars.io/?accessoriesType=Prescription01&avatarStyle=Circle&clotheColor=Blue03&clotheType=ShirtCrewNeck&eyeType=Happy&eyebrowType=FlatNatural&facialHairColor=Auburn&facialHairType=BeardMedium&hairColor=Platinum&hatColor=PastelRed&mouthType=ScreamOpen&skinColor=Light&topType=WinterHat3",
  },
  {
    id: 4,
    name: "player4",
    url:
      "https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=Gray01&clotheType=Overall&eyeType=Dizzy&eyebrowType=FlatNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=BrownDark&hatColor=Blue02&mouthType=ScreamOpen&skinColor=Yellow&topType=WinterHat3",
  },
  {
    id: 5,
    name: "player5",
    url:
      "https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=Gray01&clotheType=Overall&eyeType=Dizzy&eyebrowType=FlatNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=BrownDark&hatColor=Blue02&mouthType=ScreamOpen&skinColor=Yellow&topType=WinterHat3",
  },
]);

methods.setCategories([
    {id: 1, name: "Państwa"},
    {id: 2, name: "Miasta"},
    {id: 3, name: "Imie Męskie"},
    {id: 4, name: "Zwierze"},
    {id: 5, name: "Roślina"},
])

export default {
  state: readonly(state),
  methods,
};
