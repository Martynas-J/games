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
    }, upgradeSpeed: {
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
