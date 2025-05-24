import { Lyrics, Reciter, Topic, Writer } from '@prisma/client';

export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type CardType = {
	title: string;
	slug: string;
	reciter: {
		slug: string;
	};
	dop: Date;
};

export interface LyricsWithData extends Lyrics {
	writers: Writer[];
	reciter: Reciter;
	topics: Topic[];
	otherReciters: {
		reciter: Reciter;
	}[];
}
