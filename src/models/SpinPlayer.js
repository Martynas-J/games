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
    },
    upgradeLucky: {
        type: Number, 
        required: true,
    },
}, {timestamps: true})

let spinPlayerModel
try {
    spinPlayerModel = mongoose.model('SpinPlayer')
} catch (error) {
    spinPlayerModel = mongoose.model('SpinPlayer', playerSchema)
}
export default spinPlayerModel