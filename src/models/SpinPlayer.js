import mongoose from "mongoose";

const {Schema} = mongoose

const playerSchema = new Schema({
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
}, {timestamps: true})

let spinPlayerModel
try {
    spinPlayerModel = mongoose.model('SpinPlayer')
} catch (error) {
    spinPlayerModel = mongoose.model('SpinPlayer', playerSchema)
}
export default spinPlayerModel