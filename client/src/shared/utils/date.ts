export const formatToLocaleDateString = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString();
};
