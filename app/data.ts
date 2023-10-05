// @ts-ignore - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type MemoMutation = {
  id?: string;
  text?: string;
};
export type MemoRecord = MemoMutation & {
  id: string;
  createdAt: string;
};

const fakeMemo = {
  records: {} as Record<string, MemoRecord>,

  async getAll(): Promise<MemoRecord[]> {
    return Object.keys(fakeMemo.records)
      .map((key) => fakeMemo.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<MemoRecord | null> {
    return fakeMemo.records[id] || null;
  },

  async create(values: MemoMutation): Promise<MemoRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newMemo = { id, createdAt, ...values };
    fakeMemo.records[id] = newMemo;
    return newMemo;
  },

  async set(id: string, values: MemoMutation): Promise<MemoRecord> {
    const memo = await fakeMemo.get(id);
    invariant(memo, `No memo found for ${id}`);
    const updatedMemo = { ...memo, ...values };
    fakeMemo.records[id] = updatedMemo;
    return updatedMemo;
  },

  destroy(id: string): null {
    delete fakeMemo.records[id];
    return null;
  },
};

export async function getMemos() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let memos = await fakeMemo.getAll();
  return memos.sort(sortBy("last", "createdAt"));
}

export async function createEmptyMemo() {
  const memo = await fakeMemo.create({});
  return memo;
}

export async function getMemo(id: string) {
  return fakeMemo.get(id);
}

export async function updateMemo(id: string, updates: MemoMutation) {
  const memo = await fakeMemo.get(id);
  if (!memo) {
    throw new Error(`No memo found for ${id}`);
  }
  await fakeMemo.set(id, { ...memo, ...updates });
  return memo;
}

export async function deleteMemo(id: string) {
  fakeMemo.destroy(id);
}

[
  {
    text: "Memo 1",
  },
  {
    text: "Memo 2",
  },
  {
    text: "Memo 3",
  },
].forEach((memo) => {
  fakeMemo.create({
    ...memo,
  });
});
