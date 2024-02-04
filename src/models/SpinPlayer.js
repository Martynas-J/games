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
      default: () => new Date('2024-01-01T00:00:00Z'),
    },
    rewards: {
      type: {
        normalReward: {
          type: Number,
        },
        rareReward: {
          type: Number,
        },
        blueReward: {
          type: Number,
        },
        goldReward: {
          type: Number,
        },
        platinaReward: {
          type: Number,
        },
        novaReward: {
          type: Number,
        },
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
