exports.onRouteUpdate = () => {
  if (window.OneTrust) {
    window.OneTrust.initializeCookiePolicyHtml()
  }
}