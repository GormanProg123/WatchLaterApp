export enum Platform {
  YOUTUBE = "youtube",
  MOVIES = "movies",
  SERIES = "series",
  OTHER = "other",
}

export enum ItemStatus {
  WANT = "want",
  WATCHING = "watching",
  DONE = "done",
}

export interface CreateItemPayload {
  url: string;
  title?: string;
  description?: string;
  platform?: Platform;
  status?: ItemStatus;
  remindAt?: string;
}

export interface Item {
  id: string;
  url: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  platform: Platform;
  status: ItemStatus;
  remindAt?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  doneAt: string | null;
}
