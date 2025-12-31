interface filterObjTyep {
  color: string | null;
  fast: string | null;
  hot: string | null;
  like: string | null;
  price: string | null;
  size: string | null;
}

export function areAllValuesNull(obj: filterObjTyep): boolean {
  const values = Object.values(obj);

  return values.every((value) => value === null);
}
