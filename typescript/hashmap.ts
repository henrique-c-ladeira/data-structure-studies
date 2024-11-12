type Key = string | number;
type Value = unknown;
type KeyValuePair = {
  key: Key;
  value: unknown;
};

class ListNode {
  pair: KeyValuePair;
  next: ListNode | null;

  constructor(pair: KeyValuePair) {
    this.pair = { value: pair.value, key: pair.key };
    this.next = null;
  }

  append(pair: KeyValuePair) {
    let p;
    for (p = this; p.next !== null; p = p.next) {
      // iterate to get last pointer
    }
    p.next = new ListNode(pair);
  }

  search(key: Key): Value {
    let p;
    for (p = this; p !== null; p = p.next) {
      if (p.pair.key === key) return p.pair.value;
    }
    return null;
  }
}

export class HashMap {
  private size = 1000;
  private hashArray: Array<ListNode>;

  constructor() {
    this.hashArray = new Array(this.size).fill(null);
  }

  private getHash(key: Key): number {
    if (typeof key === "number") return key % this.size;
    if (typeof key === "string") {
      return (
        Number(
          key.split("").reduce((acc, cur) => `${acc}${cur.charCodeAt(0)}`, ""),
        ) % this.size
      );
    }
    return -1;
  }

  get(key: Key): Value {
    return this.hashArray[this.getHash(key)]?.search(key) ?? null;
  }

  set<T>(key: Key, value: T) {
    if (!this.hashArray[this.getHash(key)]) {
      this.hashArray[this.getHash(key)] = new ListNode({ key, value });
    } else {
      this.hashArray[this.getHash(key)].append({
        key,
        value,
      });
    }
  }
}
