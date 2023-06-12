export const search = (search: string) => {
  const cookiesArray = document.cookie.split(';');

  const foundCookies = cookiesArray?.reduce((acc, cookie) => {
    const cookieName = cookie.trim().split('=')[0];
    if (cookieName?.includes(search)) {
      return [...acc, cookieName];
    }
    return acc;
  }, []);

  return foundCookies;
};

export const deleteOne = (cookieName: string) => {
  document.cookie =
    cookieName + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;';
};

export const deleteMany = (cookieNames: string[]) => {
  cookieNames?.forEach(deleteOne);
};

export const defineCookieListener = () => {
  let lastCookie = document.cookie;
  // rename document.cookie to document._cookie, and redefine document.cookie
  const previousCookieState = '_cookie';
  const nativeCookie = Object.getOwnPropertyDescriptor(
    Document.prototype,
    'cookie'
  );
  Object.defineProperty(Document.prototype, previousCookieState, nativeCookie);
  Object.defineProperty(Document.prototype, 'cookie', {
    enumerable: true,
    configurable: true,
    get() {
      return this[previousCookieState];
    },
    set(value) {
      this[previousCookieState] = value;
      // check cookie change
      const cookie = this[previousCookieState];
      if (cookie !== lastCookie) {
        try {
          // dispatch cookie-change messages to other same-origin tabs/frames
          const detail = { oldValue: lastCookie, newValue: cookie };
          this.dispatchEvent(new CustomEvent('cookiechange', { detail }));
          channel.postMessage(detail);
        } finally {
          lastCookie = cookie;
        }
      }
    },
  });
  // listen cookie-change messages from other same-origin tabs/frames
  const channel = new BroadcastChannel('cookie-channel');
  channel.onmessage = e => {
    lastCookie = e.data.newValue;
    document.dispatchEvent(
      new CustomEvent('cookiechange', {
        detail: e.data,
      })
    );
  };
};
