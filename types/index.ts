import { Lyrics, LyricsToReciter, Reciter, Topic, Writer, LyricsToTopic, LyricsToWriter } from '@/db/schema';

export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type CardType = {
	slug: string;
	title: string;
	dop: Date;
	type: string;
	oldSlug?: string | null;
};

export interface LyricsWithData extends Lyrics {
	reciters: (LyricsToReciter & {
		reciter: Reciter;
	})[];
	writers: (LyricsToWriter & {
		writer: Writer;
	})[];
	topics: (LyricsToTopic & {
		topic: Topic;
	})[];
}
