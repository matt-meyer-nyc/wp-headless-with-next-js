import client from 'client';
import { cleanAndTransformBlocks } from 'utils/cleanAndTransformBlocks';
import { gql } from "@apollo/client";

export default function Page(props) {
	console.log("PAGE PROPS: ", props);
	return <div>page</div>;
}

// with getStaticProps get ability to pass context in getStaticPaths function below
export const getStaticProps = async (context) => {
	console.log("CONTEXT: ", context)
	const uri = `/${context.params.slug.join("/")}/`;
	console.log("URI: ", uri)
	const {data} = await client.query({
		query: gql`
		query PageQuery($uri: String!)  {
			nodeByUri(uri: $uri) {
				... on Page {
					id
					title
					blocks
				}
			}
		}
		`,
		variables: {
			uri 
		}
	}) 

	console.log("DATA: ", data)
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
	console.log("BLOOKS", blocks)
	return {
		props: {
			title: data.nodeByUri.title,
			blocks
		},
	};
}
	


// special function for page components part of next.js
export const getStaticPaths = async () => {
	const {data} = await client.query({
		// not pages query only returns 10 pages
		// order comes back newest to oldest
		// fallback blocking makes sure additional pages are included via SSR
		query: gql`
			query AllPagesQuery {
				pages {
					nodes {
						uri
					}
				}
			}
		`,
	});



	return {
		// need to filter out homepage b/c could potentially come back as part of pages query
		// that page already being rendered via pages/index.js (homepage part of static build)
		paths: data.pages.nodes.filter(page=>page.uri !== "/").map(page => ({
			params: {
				// need to pass slug b/c file named as [...slug]
				slug: page.uri.substring(1, page.uri.length - 1).split("/")
			},
		})),
		// fallback false, any paths not included/returned as part of paths array, next will render 404 page
		// blocking tells next.js to dynamically fetch page via server side rendering
		// trying to access page whose url isn't being returned from paths array
		// b/c at that poing, page doesn't exist as part of static build
		fallback: "blocking",
	}
};