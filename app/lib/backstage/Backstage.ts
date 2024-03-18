import BackstageClient from "./Client";
import Location from "@/types/Location";
import { env } from "@/lib/env";

const accountId = env("NEXT_PUBLIC_BCKSTG_ACCOUNT_ID");
const apiKey = env("NEXT_PUBLIC_BCKSTG_API_KEY");

/**
 * Backstage API Client
 */
export function client(): BackstageClient {
  if (!apiKey) throw new Error("Missing Backstage api key");
  if (!accountId) throw new Error("Missing Backstage account ID");

  let baseURL = env("NEXT_PUBLIC_BCKSTG_API_URL", "https://bckstg.app/api");
  const params: Record<any, any> = {};

  const client = new BackstageClient(apiKey, {
    baseURL,
    params,
  });

  return client;
}

/**
 * Get the first navigation menu.
 */
export async function getDefaultNavigation() {
  const navigations = await getNavigations();
  return navigations[0];
}

/**
 * Navigation Menus with items
 * @returns {Promise<any>}
 */
export async function getNavigations() {
  const res = await client().get("/navigations?filter[account]=" + accountId);
  const navigations = res.data;

  return Promise.all(
    navigations.map(async (navigation: any) => {
      const res = await client().get("/navigations/" + navigation.id);
      return res.data;
    })
  );
}

export async function getNavigation(id: string) {
  const res = await client().get(`/navigations/${id}`);
  const navigation = res.data;

  const topLevelItems = navigation.items.filter((item: any) => item.parent_id === null);

  topLevelItems.forEach((item: any) => {
    item.children = navigation.items.filter((child: any) => child.parent_id === item.id);
  });

  navigation.items = topLevelItems;

  return navigation;
}

/**
 * Get locations
 */
export async function getLocations(): Promise<Array<Location>> {
  const res = await client().get("/locations?filter[account]=" + accountId);
  let locations = res.data;
  locations = locations.sort((a: any, b: any) => {
    if (a.name < b.name) {
      return -1;
    }
    return 1;
  });
  return locations;
}

/**
 * Get Menus
 * @returns {Promise<any>}
 */
export async function getMenus() {
  const res = await client().get("/menus?filter[account]=" + accountId);
  const menus = res.data;
  return menus;
}

/**
 * Get Pages
 * @returns {Promise<any>}
 */
export async function getPages() {
  const res = await client().get("/pages?filter[account]=" + accountId);
  const pages = res.data;
  return pages;
}

export async function getPress() {
  const res = await client().get("/press?filter[account]=" + accountId);
  const pages = res.data;
  return pages;
}

export async function getPageBySlug(slug: string) {
  const res = await client().get("/pages?filter[account]=" + accountId + "&filter[slug]=" + slug);
  return res.data[0];
}

export async function getHomePage() {
  const res = await client().get("/pages?filter[account]=" + accountId + "&filter[slug]=/");
  return res.data[0];
}

export async function getWebsite() {
  const res = await client().get("/websites?filter[account]=" + accountId);
  return res.data[0];
}

export async function getAlerts() {
  const res = await client().get("/alerts?filter[account]=" + accountId);
  return res.data;
}

export async function getMenu(id: string) {
  const res = await client().get(`/menus?filter[account]=${accountId}&filter[id]=${id}&include=categories.items`);
  const data = res.data;

  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

export async function getLocation(id: string) {
  const res = await client().get(`/locations?filter[account]=${accountId}&filter[id]=${id}`);
  const data = res.data;

  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

export async function getMenuBySlug(slug: string) {
  const res = await client().get(`/menus?filter[account]=${accountId}&filter[slug]=${slug}&include=categories.items`);
  const data = res.data;

  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}

export async function getLocationBySlug(slug: string): Promise<Location> {
  const res = await client().get(`/locations?filter[account]=${accountId}&filter[slug]=${slug}`);
  const data = res.data;

  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
}
