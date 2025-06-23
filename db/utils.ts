/**
 * @see https://gist.github.com/rphlmr/0d1722a794ed5a16da0fdf6652902b15
 */

import { type AnyColumn, sql } from 'drizzle-orm';
// import { pgTableCreator } from "drizzle-orm/pg-core";

/**
 * Allows a single database instance for multiple projects.
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const pgTable = pgTableCreator((name) => `${databasePrefix}_${name}`);

export function takeFirstOrNull<TData>(data: TData[]) {
	return data[0] ?? null;
}

export function takeFirstOrThrow<TData>(data: TData[], errorMessage?: string) {
	const first = takeFirstOrNull(data);

	if (!first) {
		throw new Error(errorMessage ?? 'Item not found');
	}

	return first;
}

export function isEmpty<TColumn extends AnyColumn>(column: TColumn) {
	return sql<boolean>`
    case
      when ${column} is null then true
      when ${column} = '' then true
      when ${column}::text = '[]' then true
      when ${column}::text = '{}' then true
      else false
    end
  `;
}

export function isUniqueConstraintError(error: unknown, constraint?: string): boolean {
	if (
		typeof error === 'object' &&
		error !== null &&
		'cause' in error &&
		typeof (error as any).cause?.code === 'string'
	) {
		const code = (error as any).cause.code;
		const errorConstraint = (error as any).cause.constraint;

		// 23505 = unique_violation
		if (code === '23505') {
			// If a specific constraint is provided, check for it
			if (constraint) {
				return errorConstraint === constraint;
			}
			return true;
		}
	}
	return false;
}
