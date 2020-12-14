import express from 'express';
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql'
import {
    buildSchema
} from 'graphql';

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSch(`
        schema {
            query: 
            mutation:
        }
    `),
    rootValue: {}
}))
app.get('/', (req, res) => {
    res.send("data is getting...")
})

app.listen(PORT, () => {
    console.log(`Server is connected: http://localhost:${PORT}`);
});