import { getRequests } from './queries';

export type RequestsInTable = Awaited<ReturnType<typeof getRequests>>['data'][number];
export type getRequestsReturn = { data: RequestsInTable[]; pageCount: number };
