// import swaggerJSDoc from 'swagger-jsdoc';

// const PORT = process.env.PORT || 3000;
// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'QLSV API Documentation',
//             version: '1.0.0',
//             description: 'API for student management system',
//         },
//         servers: [
//             {
//                 url: `http://localhost:${PORT}`,
//             },
//         ],
//         components: {
//             securitySchemes: {
//                 bearerAuth: {
//                     type: 'http',
//                     scheme: 'bearer',
//                 },
//             },
//         },
//         security: [
//             {
//                 bearerAuth: [],
//             },
//         ],
//     },
//     // apis: ['./routes/*.ts', './docs/**/*.yaml'],
//     apis: ['./dist/routes/*.js']
// };

// const swaggerSpec = swaggerJSDoc(swaggerOptions);
// export default swaggerSpec;



import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'QLSV API',
            version: '1.0.0',
            description: 'API quản lý sinh viên',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    // ⚠️ Nếu bạn dùng TypeScript thì nên dùng `./src/routes/*.ts`
    apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };