export const search = (search: string) => {
  const cookiesArray = document.cookie.split(';');
  const foundCookies = cookiesArray.map(cookie => {
    const cookieName = cookie.trim().split('=')[0];
    if (cookieName.includes(search)) {
      return cookieName;
    }
  });

  return foundCookies;
};

export const deleteOne = (cookieName: string) => {
  document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;';
};

export const deleteMany = (cookieNames: string[]) => {
  cookieNames.forEach(deleteOne);
};
