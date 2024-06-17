// import { OGM } from "@neo4j/graphql-ogm";
// import neo4jOGM from "@neo4j/graphql-ogm";
// const { OGM } = neo4jOGM;
// import neo4jOGM from "@neo4j/graphql-ogm";
// const { OGM } = neo4jOGM;
// import neo4j from "neo4j-driver";
// import neo4jOGM, { OGM as OGMType } from "@neo4j/graphql-ogm";
// const OGM: typeof OGMType = neo4jOGM.OGM;


import neo4j from "neo4j-driver";
// @ts-ignore
import neo4jOGM, { OGM as OGMType } from "@neo4j/graphql-ogm";
const OGM: typeof OGMType = neo4jOGM.OGM;

export const handler = async (event: any) => {
    const driver = neo4j.driver(
        "bolt://localhost:7687",
        neo4j.auth.basic("neo4j", "P@55word")
    );

    const typeDefs = `
        type User {
            id: ID
            name: String
        }
    `;

    let res: any[];
    try {
        console.log("1");
        const ogm = new OGM({ typeDefs, driver });
        console.log("2");
        await ogm.init(); // error occurs on this invocation
        console.log("3");
        res = await ogm.model("User").find({
            where: {
                id: "1"
            }
        });
        console.log("4");
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