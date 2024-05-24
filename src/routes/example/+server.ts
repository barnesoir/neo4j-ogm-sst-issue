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


// error produced in console.sst.dev - happens regardless of package manager & dep resolution overrides
// error only introduced when OGM is imported and initialized doesn't happen with other graphql packages (tested with apollo-server & graphql-yoga)
// apollo-server & graphql-yoga work until I add a schema Neo4jGraphQL & use it to initialize OGM

/*
Error: Cannot use GraphQLNonNull "String!" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory.If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

    https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior.The data from one
version used in the function from another could produce confusing and
spurious results.
    at instanceOf(file:///var/task/.svelte-kit/svelte-kit-sst/server/lambda-handler/index.mjs:298:2737)
        at isNonNullType(file:///var/task/.svelte-kit/svelte-kit-sst/server/lambda-handler/index.mjs:336:13476)
            at isRequiredArgument(file:///var/task/.svelte-kit/svelte-kit-sst/server/lambda-handler/index.mjs:336:20927)
                at Array.filter(<anonymous>)
    at ProvidedRequiredArgumentsOnDirectivesRule(file:///var/task/.svelte-kit/svelte-kit-sst/server/lambda-handler/index.mjs:545:26404)
                    at file:///var/task/.svelte-kit/svelte-kit-sst/server/lambda-handler/index.mjs:551:9928
                    at Array.map(<anonymous>)
    at validateSDL(file:///var/task/.svelte-kit/svelte-kit-sst/server/lambda-handler/index.mjs:551:9921)
                        at runValidationRulesOnFilteredDocument(file:///var/task/.svelte-kit/svelte-kit-sst/server/lambda-handler/index.mjs:551:12430)
                            at validateDocument(file:///var/task/.svelte-kit/svelte-kit-sst/server/lambda-handler/index.mjs:551:13661)
*/