import express from 'express';
import bodyParser from 'body-parser';
import {
    graphqlHTTP
} from 'express-graphql';
import {
    buildSchema
} from 'graphql';

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type RootQuery{
            events: [String!]! 
        }     
        type RootMutation{
            createEvent(name: String): String
        }

        schema {
            query: RootQuery,
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ["All night Coding", "Romistic", "something"]
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
}))
app.get('/', (req, res) => {
    res.send("data is getting...")
})

app.listen(PORT, () => {
    console.log(`Server is connected: http://localhost:${PORT}`);
});