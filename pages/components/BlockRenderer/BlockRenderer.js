import { Cover } from '../Cover/';
import { Heading } from '../Heading';

export const BlockRenderer = ({blocks}) => {
	return blocks.map((block) => {
		switch(block.name){
			case 'core/heading': {
				return (
					<Heading 
						key={block.id} 
						textAlign={block.attributes.textAlign} 
						level={block.attributes.level}
						content={block.attributes.content}
					/>
				)
			}
			case 'core/cover': {
				console.log("BLOCK: ", block);
				return (
					<Cover key={block.id} alt={block.attributes.alt} background={block.attributes.url}>
						<BlockRenderer blocks={block.innerBlocks} />
					</Cover>
				);
			}
			default:
				return null;
		}
	})
}