function OptanonWrapper() {
  const C0002 = OnetrustActiveGroups.includes("C0002");
  if (C0002 == false) {
    window['ga-disable-G-XNW0W43V93'] = true;
  }
}

function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res
}


window['ga-disable-G-XNW0W43V93'] = true;
if (getCookie('OptanonConsent') && getCookie('OptanonConsent').includes("C0002:1") == true) {
  window['ga-disable-G-XNW0W43V93'] = false;
}