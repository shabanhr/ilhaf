"use server";
import { prisma } from "@/prisma"
import { LyricsType } from "@prisma/client";
import { SearchParams } from "next/dist/server/request/search-params";

const getQueryData = (searchParams: SearchParams) => {

  let sort: { id: string; desc: boolean }[] = [];
  if (searchParams["sort"]) {
    try {
      const parsedSort = JSON.parse(searchParams["sort"] as string);
      if (Array.isArray(parsedSort)) {
        sort = parsedSort;
      } else {
        console.warn("Invalid sort parameter: not an array.");
      }
    } catch (error) {
      console.warn("Failed to parse sort parameter:", error);
    }
  }

  const orderBy = sort.length > 0
    ? sort.map((item) => ({ [item.id]: item.desc ? "desc" : "asc" }))
    : [{ dop: "desc" }];


  const title = searchParams["title"];
  const status = searchParams["status"] as string | undefined;
  let p: boolean | undefined = undefined;
  if (status) {
    if (status !== "published,draft") {
      p = status === "published";
    }
  };

  const type = searchParams["type"] as string | undefined;
  let types: string[] = [];
  if (type) {
    if (type.includes(",")) {
      types = type.split(",");
    } else {
      types = [type];
    }
  }


  // Construct where filter
  const where = {
    p,
    type: types.length > 0 ? {
      in: types as LyricsType[]
    } : undefined,
    title: title ? {
      contains: title as string,
    } : {},
  };


  return { where, orderBy }
}

export async function getLyrics(searchParams: SearchParams) {
  try {
    const page = Number(searchParams["page"]) || 1;
    const take = Number(searchParams["perPage"]) || 10;
    const skip = (page - 1) * take;
    const { where, orderBy } = getQueryData(searchParams);


    const lyrics = await prisma.lyrics.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        p: true,
        type: true,
        dop: true,
        updatedAt: true,
        reciter: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy,
      skip,
      take,
    });

    const data = lyrics.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      reciterName: item.reciter.name,
      reciterSlug: item.reciter.slug,
      status: item.p ? "published" : "draft",
      type: item.type,
      dop: item.dop,
      updatedAt: item.updatedAt,
    }));

    // Total count of items for pagination
    const total = await prisma.lyrics.count({ where });

    const pageCount = Math.ceil(total / take);

    return { data, pageCount };
  } catch (err) {
    console.error("Error fetching lyrics:", err);
    return { data: [], pageCount: 0 };
  }
}


export const getLyricsCardDetails = async () => {
  const newDate = new Date();
  const twentyEightDaysAgo = newDate.setDate(newDate.getDate() - 28);
  const sevenDaysAgo = newDate.setDate(newDate.getDate() - 7);

  const Lastx28xDays = await prisma.lyrics.count({
    where: {
      dop: {
        gte: new Date(twentyEightDaysAgo),
      },
    },
  });

  const Lastx7xDays = await prisma.lyrics.count({
    where: {
      dop: {
        gte: new Date(sevenDaysAgo),
      },
    },
  });
  const PublishedxLyrics = await prisma.lyrics.count({
    where: {
      p: true
    },
  });

  const TotalxLyrics = await prisma.lyrics.count();

  return { TotalxLyrics, Lastx28xDays, Lastx7xDays, PublishedxLyrics };
}

// return await unstable_cache(
//   async () => {
//   },
//   [JSON.stringify(input)],
//   {
//     revalidate: 3600,
//     tags: ["tasks"],
//   }
// )()