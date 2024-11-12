import { expect } from "jsr:@std/expect";
import { HashMap } from "./hashmap.ts";
import { getRandomInteger } from "./utils.ts";

const DEFAULT_HASHMAP_SIZE = 1000;

const makeSut = () => {
  const sut = new HashMap();
  return { sut };
};

Deno.test("Hashmap starts empty", () => {
  const { sut } = makeSut();
  const anyKey = getRandomInteger(DEFAULT_HASHMAP_SIZE);
  expect(sut.get(anyKey)).toBeNull();
});

Deno.test("Hashmap sets a pair of key/value", () => {
  const { sut } = makeSut();
  const key1 = getRandomInteger(DEFAULT_HASHMAP_SIZE);
  const value1 = "anyValue";
  const key2 = getRandomInteger(DEFAULT_HASHMAP_SIZE);
  const value2 = "anyValue2";
  sut.set(key1, value1);
  sut.set(key2, value2);
  expect(sut.get(key1)).toBe(value1);
  expect(sut.get(key2)).toBe(value2);
});

Deno.test("Hashmap sets a pair of key/value when key is string", () => {
  const { sut } = makeSut();
  const key1 = "anyKey";
  const value1 = "anyValue";
  const key2 = "anyKey2";
  const value2 = "anyValue2";
  sut.set(key1, value1);
  sut.set(key2, value2);
  expect(sut.get(key1)).toBe(value1);
  expect(sut.get(key2)).toBe(value2);
});

Deno.test("Hashmap handles collision", () => {
  const { sut } = makeSut();
  const key1 = getRandomInteger(DEFAULT_HASHMAP_SIZE);
  const value1 = "anyValue";
  const key2 = key1 + DEFAULT_HASHMAP_SIZE;
  const value2 = "anyValue2";
  sut.set(key1, value1);
  sut.set(key2, value2);
  expect(sut.get(key1)).toBe(value1);
  expect(sut.get(key2)).toBe(value2);
});
