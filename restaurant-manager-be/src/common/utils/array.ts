export const haveCommonItems = <T>(arr1: T[], arr2: T[]): boolean => {
  return arr1.some((item) => arr2.includes(item));
};
