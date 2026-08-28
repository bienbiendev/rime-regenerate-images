
import type { ParamMatcher } from '@sveltejs/kit';

const slugs = ["pages","medias","staff","medias_directories"] as const;

export const match: ParamMatcher = (param): param is (typeof slugs)[number] =>
  (slugs as readonly string[]).includes(param);