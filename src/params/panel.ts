import type { ParamMatcher } from '@sveltejs/kit';

const slugs = ['panel'] as const;

export const match: ParamMatcher = (param): param is (typeof slugs)[number] =>
  (slugs as readonly string[]).includes(param);
