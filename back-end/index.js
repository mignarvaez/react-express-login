import express from 'express';
import cors from 'cors';
import router from './src/routes/routes.js'

// Initial configuration
const app = express();
app.use(cors());
// We indicate that we are expecting json requests
app.use(express.json());
// We use the custom router
app.use('/auth', router)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server running on " + PORT);
})