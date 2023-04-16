import { gql } from '@apollo/client';
import client from 'client';
import { cleanAndTransformBlocks } from 'utils/cleanAndTransformBlocks';
import { BlockRenderer } from './components/BlockRenderer';

export default function Home(props) {
	console.log("PROPS: ", props);
  return ( 
		<div>
			<BlockRenderer blocks={props.blocks}/>
		</div>
	)
}

// function built into Next.js
// context part of Next.js
export const getStaticProps = async () => {
	const {data} = await client.query({
		query: gql`
			query NewQuery {
				nodeByUri(uri: "/") {
					... on Page {
						id
						title
						blocks
					}
				}
			}
		`
	}) 

  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
	return {
		props: {
			blocks,
		},
	};
};
