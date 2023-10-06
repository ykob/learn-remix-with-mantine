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
    return Object.keys(fakeMemo.records).map((key) => fakeMemo.records[key]);
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
  return memos.sort(sortBy("-createdAt"));
}

export async function createNewMemo(updates: MemoMutation) {
  if (!updates.text) {
    throw new Error(`Memote text is required.`);
  }
  const memo = await fakeMemo.create({ ...updates });
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
    text: "私はその人を常に先生と呼んでいた。だからここでもただ先生と書くだけで本名は打ち明けない。これは世間を憚かる遠慮というよりも、その方が私にとって自然だからである。私はその人の記憶を呼び起すごとに、すぐ「先生」といいたくなる。",
  },
  {
    text: "筆を執っても心持は同じ事である。よそよそしい頭文字などはとても使う気にならない。私が先生と知り合いになったのは鎌倉である。その時私はまだ若々しい書生であった。暑中休暇を利用して海水浴に行った友達からぜひ来いという端書を受け取ったので、私は多少の金を工面して、出掛ける事にした。",
  },
  {
    text: "私は金の工面に二、三日を費やした。ところが私が鎌倉に着いて三日と経たないうちに、私を呼び寄せた友達は、急に国元から帰れという電報を受け取った。電報には母が病気だからと断ってあったけれども友達はそれを信じなかった。友達はかねてから国元にいる親たちに勧まない結婚を強いられていた。",
  },
].forEach((memo) => {
  fakeMemo.create({
    ...memo,
  });
});
