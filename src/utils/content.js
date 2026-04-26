import siteContentJson from '../data/siteContent.json';

const SITE_CONTENT_KEY = 'lundun_audio_site_content_v3';
const SITE_PREV_KEY = 'lundun_audio_site_prev_v3';

/**
 * Initializes site content in localStorage from json if not already present.
 */
export const initContent = () => {
  const existing = localStorage.getItem(SITE_CONTENT_KEY);
  if (!existing) {
    localStorage.setItem(SITE_CONTENT_KEY, JSON.stringify(siteContentJson));
  }
};

/**
 * Gets all site content from localStorage.
 */
export const getSiteContent = () => {
  initContent();
  const contentString = localStorage.getItem(SITE_CONTENT_KEY);
  if (!contentString) return siteContentJson;
  
  const content = JSON.parse(contentString);
  // Merge missing top-level keys from JSON into localStorage content
  let modified = false;
  for (const key in siteContentJson) {
    if (!content[key]) {
      content[key] = siteContentJson[key];
      modified = true;
    }
  }
  if (modified) saveSiteContent(content);
  return content;
};

/**
 * Gets content for a specific page.
 */
export const getPageContent = (pageKey) => {
  const content = getSiteContent();
  return content[pageKey] || siteContentJson[pageKey];
};

/**
 * Saves entire site content to localStorage.
 */
export const saveSiteContent = (contentObj) => {
  localStorage.setItem(SITE_CONTENT_KEY, JSON.stringify(contentObj));
};

/**
 * Saves a page's content snapshot (previous state) BEFORE overwriting.
 * Enables one-step undo per page.
 */
const saveSnapshot = (pageKey, currentPageData) => {
  const prevAll = localStorage.getItem(SITE_PREV_KEY);
  const prev = prevAll ? JSON.parse(prevAll) : {};
  prev[pageKey] = JSON.parse(JSON.stringify(currentPageData));
  localStorage.setItem(SITE_PREV_KEY, JSON.stringify(prev));
};

/**
 * Returns true if a previous snapshot exists for the given page.
 */
export const hasPreviousSnapshot = (pageKey) => {
  const prevAll = localStorage.getItem(SITE_PREV_KEY);
  if (!prevAll) return false;
  const prev = JSON.parse(prevAll);
  return !!prev[pageKey];
};

export const savePageContent = (pageKey, pageData) => {
  const content = getSiteContent();
  // Snapshot the current saved state before overwriting
  if (content[pageKey]) saveSnapshot(pageKey, content[pageKey]);
  content[pageKey] = pageData;
  saveSiteContent(content);
};

/**
 * Reverts a specific page to its previously saved state (before last save).
 */
export const revertPageToPrevious = (pageKey) => {
  const prevAll = localStorage.getItem(SITE_PREV_KEY);
  if (!prevAll) return null;
  const prev = JSON.parse(prevAll);
  if (!prev[pageKey]) return null;

  const content = getSiteContent();
  const restoredData = prev[pageKey];

  // The current "saved" becomes the new snapshot so you can undo the undo
  saveSnapshot(pageKey, content[pageKey]);

  content[pageKey] = restoredData;
  saveSiteContent(content);
  return restoredData;
};

/**
 * Resets a specific page's content to the original JSON defaults.
 */
export const resetPageToDefault = (pageKey) => {
  const content = getSiteContent();
  // Snapshot before resetting so you can revert the reset
  if (content[pageKey]) saveSnapshot(pageKey, content[pageKey]);
  content[pageKey] = JSON.parse(JSON.stringify(siteContentJson[pageKey]));
  saveSiteContent(content);
  return content[pageKey];
};
