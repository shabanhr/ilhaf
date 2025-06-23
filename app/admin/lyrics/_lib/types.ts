import { getLyrics } from './queries';

export type LyricsInTable = Awaited<ReturnType<typeof getLyrics>>['data'][number];
export type getLyricsReturn = { data: LyricsInTable[]; pageCount: number };
