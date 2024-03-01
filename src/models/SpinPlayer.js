import mongoose from "mongoose";

const { Schema } = mongoose;

const playerSchema = new Schema(
  {
    playerName: {
      type: String,
      unique: true,
      required: true,
    },
    spinMoney: {
      type: Number,
      required: true,
    },
    spins: {
      type: Number,
      required: true,
    },
    spinsLeft: {
      type: Number,
      required: true,
    },
    multiplyDbNr: {
      type: Number,
      required: true,
    },
    bestWin: {
      type: Number,
      required: true,
    },
    upgradeX: {
      type: Number,
      required: true,
      default: 0,
    },
    upgradeLucky: {
      type: Number, 
      required: true,
      default: 0,
    },
    upgradeSpeed: {
      type: Number,
      required: true,
      default: 1,
    },
    allTimeMoney: {
      type: Number,
      required: true,
      default: 0,
    },
    ballsNormal: {
      type: Number,
      required: true,
      default: 0,
    },
    ballsRare: {
      type: Number,
      required: true,
      default: 0,
    },
    ballsBlue: {
      type: Number,
      required: true,
      default: 0,
    },
    ballsGold: {
      type: Number,
      required: true,
      default: 0,
    },
    ballsPlatina: {
      type: Number,
      required: true,
      default: 0,
    },
    ballsNova: {
      type: Number,
      required: true,
      default: 0,
    },
    level: {
      type: Number,
      required: true,
      default: 0,
    },
    dailyRewardData: {
      type: Date,
      required: true,
      default: () => new Date("2024-01-01T00:00:00Z"),
    },
    dailyQuestsData: {
      type: {
        date: { type: Date, default: () => new Date("2024-01-01T00:00:00Z") },
        condition: { type: Number, default: 0 },
        question: { type: Number, default: 1 }
      },
      required: true
    },
    
    cardsData: {
      type: {
        JackOfClubs: { type: Number },
        JackOfHearts: { type: Number },
        JackOfDiamonds: { type: Number },
        JackOfSpades: { type: Number },
        QueenOfClubs: { type: Number },
        QueenOfSpades: { type: Number },
        QueenOfHearts: { type: Number },
        QueenOfDiamonds: { type: Number },
        KingOfDiamonds: { type: Number },
        KingOfHearts: { type: Number },
        KingOfClubs: { type: Number },
        KingOfSpades: { type: Number },
        AceOfHearts: { type: Number },
        AceOfDiamonds: { type: Number },
        AceOfClubs: { type: Number },
        AceOfSpades: { type: Number },
      },
      required: true,
      default: {
        JackOfClubs: 0,
        JackOfHearts: 0,
        JackOfDiamonds: 0,
        JackOfSpades: 0,
        QueenOfClubs: 0,
        QueenOfSpades: 0,
        QueenOfHearts: 0,
        QueenOfDiamonds: 0,
        KingOfDiamonds: 0,
        KingOfHearts: 0,
        KingOfClubs: 0,
        KingOfSpades: 0,
        AceOfHearts: 0,
        AceOfDiamonds: 0,
        AceOfClubs: 0,
        AceOfSpades: 0,
      },
    },

    rewards: {
      type: {
        normalReward: { type: Number },
        rareReward: { type: Number },
        blueReward: { type: Number },
        goldReward: { type: Number },
        platinaReward: { type: Number },
        novaReward: { type: Number },
      },
      required: true,
      default: {
        normalReward: 0,
        rareReward: 0,
        blueReward: 0,
        goldReward: 0,
        platinaReward: 0,
        novaReward: 0,
      },
    },
  },

  { timestamps: true }
);

let spinPlayerModel;
try {
  spinPlayerModel = mongoose.model("SpinPlayer");
} catch (error) {
  spinPlayerModel = mongoose.model("SpinPlayer", playerSchema);
}
export default spinPlayerModel;
