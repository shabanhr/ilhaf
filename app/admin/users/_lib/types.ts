import { getUsers } from './queries';

export type UsersInTable = Awaited<ReturnType<typeof getUsers>>['data'][number];
export type getUsersReturn = { data: UsersInTable[]; pageCount: number };
