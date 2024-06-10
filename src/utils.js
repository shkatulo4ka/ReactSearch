export const normalizeRequest = (item) => {
  const { __id: id, description, __name: name, type, number: count } = item;

  return { id, name, description, typeName: type[0].name, count };
};
