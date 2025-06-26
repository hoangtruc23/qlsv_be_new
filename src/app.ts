import express from 'express';
import cors from 'cors';
import router from './routes/routes';
import { swaggerUi, specs } from './config/swaggerOptions'; 


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', (req, res) => {
    res.status(200).send('Hello from Express API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
export default app;