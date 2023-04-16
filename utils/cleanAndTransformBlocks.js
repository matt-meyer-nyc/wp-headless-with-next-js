import {v4 as uuid} from 'uuid';

// INMemoryCache() in client.js makes data returned from GraphQL immutable
// recommended workaround, convert object to stringified JSON, then pass string
// back to a JSON object
// using ApolloClient to utilize InMemoryCache
// without using it, whem making GraphQL request, would've just used cache it has
// allows usag of query already made before from cache

export const cleanAndTransformBlocks = (blocksJSON) => {
	const blocks = JSON.parse(JSON.stringify(blocksJSON));

	const assignId = (b) => {
		b.forEach((block) => {
			block.id = uuid();
			if(block.innerBlocks?.length){
				assignId(block.innerBlocks);
			}
		})
	}

	assignId(blocks);

	return blocks;
}