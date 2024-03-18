import { storage } from "@/lib/storage";

export default class Client {
  apiKey: string;
  baseURL: string;
  headers: Record<string, string>;
  params: Record<string, string> | null = null;

  constructor(apiKey: string, config?: BckstgClientConfig) {
    this.apiKey = apiKey;
    this.baseURL = config?.baseURL || "https://bckstg.app/api";
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
    };
    this.params = config?.params || null;
  }

  async get(url: string, params?: any) {
    const urlObject = new URL(this.baseURL + url);

    if (params) {
      Object.keys(params).forEach((key) => urlObject.searchParams.append(key, params[key]));
    }

    if (this.params) {
      Object.keys(this.params).forEach((key) => urlObject.searchParams.append(key, this.params![key]));
    }

    // remove any characters that cannot be in a filename
    const cacheKey = urlObject.toString().replace(/[^a-z0-9]/gi, "_");

    if (await storage.hasItem(cacheKey)) {
      console.log("has " + cacheKey);
      return storage.getItem(cacheKey);
    }

    console.log("no " + cacheKey);

    const response = await fetch(urlObject, {
      headers: this.headers,
    });

    const data = await response.json();
    storage.setItem(cacheKey, data);

    return data;
  }

  async post(url: string, data?: any) {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async put(url: string, data?: any) {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async delete(url: string, data?: any) {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async patch(url: string, data?: any) {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export interface BckstgClientConfig {
  baseURL?: string;
  params?: Record<string, string>;
}
