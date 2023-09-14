const UserModel = require('./User')
const StationModel = require('./Station')
const TrainModel = require('./Train')
const SeatBookingModel = require('./SeatBooking')

StationModel.hasMany(TrainModel, {
    foreignKey: "source",
    sourceKey: "stationId"
});

TrainModel.belongsTo(StationModel, {
    foreignKey: "source",
    sourceKey: "stationId"
});

StationModel.hasMany(TrainModel, {
    foreignKey: "destination",
    sourceKey: "stationId"
});

TrainModel.belongsTo(StationModel, {
    foreignKey: "destination",
    sourceKey: "stationId"
});

TrainModel.hasMany(SeatBookingModel, {
    foreignKey: "trainId",
    sourceKey: "trainId"
});

SeatBookingModel.belongsTo(TrainModel, {
    foreignKey: "trainId",
    sourceKey: "trainId"
});

UserModel.hasMany(SeatBookingModel, {
    foreignKey: "userId",
    sourceKey: "userId"
});

SeatBookingModel.belongsTo(UserModel, {
    foreignKey: "userId",
    sourceKey: "userId"
});



const createModels = async () => {
    await UserModel.sync()
    console.log("User model is in sync...")

    await StationModel.sync({force : true})
    console.log("Station Model is in sync...")

    await TrainModel.sync({force : true})
    console.log("Train Model is in sync...")

    await SeatBookingModel.sync({force : true})
    console.log("Seat Booking Model is in sync...")


}

createModels();
