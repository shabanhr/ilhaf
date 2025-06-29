import React from 'react';

interface LyricsContentProps {
	paragraphs?: string[][];
	title?: string;
	len?: string;
}

export function LyricsContent({ paragraphs, title, len }: LyricsContentProps) {
	return (
		<>
			{title && (
				<h2 className="my-3 text-xs text-muted-foreground">
					{`${title} Lyrics${len ? ` in ${len}` : ''}`}
				</h2>
			)}

			{paragraphs ? (
				paragraphs.map((paragraph, i) => (
					<p key={i}>
						{paragraph.map((line, j) => (
							<React.Fragment key={j}>
								{line}
								<br />
							</React.Fragment>
						))}
					</p>
				))
			) : (
				<div>Coming Soon!</div>
			)}
		</>
	);
}
