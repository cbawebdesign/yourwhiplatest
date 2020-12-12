export const SET_DEEP_LINK_SLUG = 'SET_DEEP_LINK_SLUG';
export const RESET_DEEP_LINK_SLUG = 'RESET_DEEP_LINK_SLUG';

export const setDeepLinkSlug = (slug) => ({
  type: SET_DEEP_LINK_SLUG,
  slug,
});

export const resetDeepLinkSlug = () => ({
  type: RESET_DEEP_LINK_SLUG,
});
