import { getLyrics } from "./queries";

export type LyricsInTable = Awaited<ReturnType<typeof getLyrics>>
