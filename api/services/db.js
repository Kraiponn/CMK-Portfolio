import mongoose from "mongoose";

const connectedDB = async () => {
  const strConnect =
    process.env.NODE_ENV === "development"
      ? process.env.MONGO_URI_DEV
      : process.env.MONGO_URI_PROD;

  try {
    // const conn = await mongoose.connect(`${strConnect}`, {
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    const conn = await mongoose.connect(strConnect);

    console.log(`Mongodb connected: ${conn.connection.host}`.cyan.bold);
  } catch (error) {
    console.error(`Mongodb error:`.red.underline.bold, error);
  }
};

export default connectedDB;
