
import { Lyrics, Reciter, Topic, Writer } from "@prisma/client";
import { LucideProps } from "lucide-react";

export type IconType = React.ForwardRefExoticComponent<
	Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

export type CardType = {
  title: string;
  slug: string;
  reciter: {
    slug: string
  };
  dop: Date;
}

export interface LyricsWithData extends Lyrics {
  writers: Writer[],
  reciter: Reciter,
  topics: Topic[],
  otherReciters: {
    reciter: Reciter,
  }[]
}