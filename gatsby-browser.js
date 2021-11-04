exports.onRouteUpdate = ({ location }) => {
  if (window.OneTrust) {
    window.OneTrust.initializeCookiePolicyHtml()
  }
  if (window.gtag) {
    window.gtag('set', 'page_path', location.pathname)
    window.gtag('event', 'page_view')
  }
}
