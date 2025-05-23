import React, { memo } from "react";

interface LyricsContentProps {
    paragraphs?: string[][];
    title?: string;
    len?: string;
}

export const LyricsContent = memo(({ paragraphs, title, len }: LyricsContentProps) => (
    <>
        {title && (
            <h2 className="opacity-75 text-xs font-normal mt-3 mb-1 leading-7">
                {`${title} Lyrics${len ? ` in ${len}` : ""}`}
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
));
