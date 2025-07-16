import React from 'react';
// import { AdUnit, AdWrapper } from '@/components/sheard/ads';

interface LyricsContentProps {
	paragraphs?: string[][];
	title?: string;
	len?: string;
	slug?: string;
}

export function LyricsContent({ paragraphs, title, len, slug }: LyricsContentProps) {
	return (
		<>
			{title && <h2 className="text-muted-foreground my-3 text-xs">{`${title} Lyrics${len ? ` in ${len}` : ''}`}</h2>}

			{paragraphs ? (
				paragraphs.map((paragraph, i) => (
					<React.Fragment key={i}>
						<p>
							{paragraph.map((line, j) => (
								<React.Fragment key={j}>
									{line}
									<br />
								</React.Fragment>
							))}
						</p>

						{/* {i === 3 && (
							<AdWrapper uniqeId={`${slug}-${len}-mid-lyrics`}>
								<AdUnit slotId="3518983424" format="square" style={{ width: '300px', height: '250px' }} />
							</AdWrapper>
						)} */}
					</React.Fragment>
				))
			) : (
				<div>Coming Soon!</div>
			)}
		</>
	);
}
