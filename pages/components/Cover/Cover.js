// built in image component from next.js
import Image from 'next/image';

export const Cover = ({children, background, alt}) => {
	return (
		<div className="h-screen text-white bg-slate-800 relative min-h-[400px] flex justify-center items-center">
			<Image 
				alt={alt} 
				src={background} 
				layout="fill" 
				objectFit="cover" 
				className='mix-blend-soft-light'
				/>
			<div className="max-width-5xl z-10">{children}</div>
		</div>
	)
};

