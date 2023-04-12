

const  getMongoUrl= () => {
    let mongoUrl = '';
    if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
        mongoUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.r2ufcpu.mongodb.net/?retryWrites=true&w=majority`;
        return mongoUrl;
    }
    mongoUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.r2ufcpu.mongodb.net/?retryWrites=true&w=majority`;
    return mongoUrl;
};

module.exports = getMongoUrl;