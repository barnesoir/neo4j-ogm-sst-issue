import { OGM } from "@neo4j/graphql-ogm";
import neo4j from "neo4j-driver";

const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "password")
);

const typeDefs = `
    type User {
        id: ID
        name: String
    }
`;


export const handler = async (event: any) => {
    let res: any[];
    try {
        const ogm = new OGM({ typeDefs, driver });
        await ogm.init(); // error occurs on this invocation
        res = await ogm.model("User").find();
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: error as string
        }
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            res
        }),
    };
};