import Cookies from 'js-cookie';

export const search = (search: string): string[] => {
  const cookies = Cookies.get();

  const foundCookies = Object.entries(cookies)?.reduce<string[]>(
    (acc, cookie) => {
      const [cookieName, _] = cookie;
      if (cookieName?.includes(search)) {
        return [...acc, cookieName];
      }
      return acc;
    },
    []
  );

  return foundCookies;
};

export const deleteOne = (cookieName: string) => {
  Cookies.remove(cookieName);
};

export const deleteMany = (cookieNames: string[]) => {
  cookieNames?.forEach(deleteOne);
};
