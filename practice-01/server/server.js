import app from "./src/app/app.js";
import config from "./src/config/config.js";
import { connectDB } from "./src/config/db.js";

await connectDB();

const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
