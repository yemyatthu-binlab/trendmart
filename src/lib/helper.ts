export const formatDate = (timestamp: string | number) =>
  new Date(Number(timestamp)).toLocaleDateString();
