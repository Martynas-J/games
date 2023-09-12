import mongoose from "mongoose";

const {Schema} = mongoose

const playerSchema = new Schema({
    playerName: {
        type: String,
        unique: true,
        required: true,
    },
    playerScore: {
        type: String,
        required: true,
    },
}, {timestamps: true})

let playerModel
try {
    playerModel = mongoose.model('Player')
} catch (error) {
    playerModel = mongoose.model('Player', playerSchema)
}
export default playerModel