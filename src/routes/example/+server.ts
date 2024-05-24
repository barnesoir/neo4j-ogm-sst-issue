import type { RequestHandler } from "@sveltejs/kit";
import gogm from "@neo4j/graphql-ogm";
const { OGM } = gogm;
import neo4j from "neo4j-driver";

//credentials for deployed don't make a difference; fails document validation before a conneciton attempt is made.
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

const ogm = new OGM({ typeDefs, driver });
await ogm.init(); // error occurs on this invocation

export const GET: RequestHandler = async (request) => {
    const res = await ogm.model("User").find();
    console.log(res)
    return new Response(JSON.stringify(res));
}