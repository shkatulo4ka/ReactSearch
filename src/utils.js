export const normalizeRequest = (item) => {
  const { description, __name: name, type, number: count } = item;

  return { name, description, typeName: type[0].name, count };
};
