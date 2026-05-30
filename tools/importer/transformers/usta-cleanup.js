/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: USTA site-wide cleanup
 * Removes non-authorable content (header, footer, nav, cookie consent, tracking pixels, modals).
 * All selectors verified against captured DOM of https://www.usta.com/en/home/play.html
 * Site: usta.com
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove OneTrust cookie consent SDK (blocks parsing due to overlay)
    // Found in captured HTML: <div id="onetrust-consent-sdk">
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#ot-sdk-btn-floating',
    ]);

    // Remove popups experience fragment (system error modals)
    // Found in captured HTML: <div class="cmp-experiencefragment cmp-experiencefragment--usta-en-popups-xf">
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--usta-en-popups-xf',
    ]);
  }

  if (hookName === H.after) {
    // Remove header experience fragment (entire navigation/header)
    // Found in captured HTML: <div class="cmp-experiencefragment cmp-experiencefragment--usta-en-header-ef">
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--usta-en-header-ef',
    ]);

    // Remove footer experience fragment
    // Found in captured HTML: <div class="cmp-experiencefragment cmp-experiencefragment--usta-en-footer-ef">
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--usta-en-footer-ef',
    ]);

    // Remove breadcrumb navigation
    // Found in captured HTML: <div class="breadcrumb aem-GridColumn...">
    WebImporter.DOMUtils.remove(element, [
      '.cmp-breadcrumb',
    ]);

    // Remove accessibility toggle, skip link, page language, geocode API
    // Found in captured HTML: <div id="usntA42Toggle">, <a class="skip-to-main-content-link">,
    // <div class="pageLanguage">, <div id="googlegeocodeapiurl">
    WebImporter.DOMUtils.remove(element, [
      '#usntA42Toggle',
      '.skip-to-main-content-link',
      '.pageLanguage',
      '#googlegeocodeapiurl',
    ]);

    // Remove tracking pixels and third-party elements
    // Found in captured HTML: <div class="bidtellect">, <table id="google-search-results-list">
    WebImporter.DOMUtils.remove(element, [
      '.bidtellect',
      '#google-search-results-list',
    ]);

    // Remove iframes (tracking, consent, Adobe ID syncing)
    // Found in captured HTML: <iframe title="GPP Locator">, <iframe title="Adobe ID Syncing iFrame">,
    // <iframe class="ot-text-resize">, <iframe src="javascript:false">
    WebImporter.DOMUtils.remove(element, [
      'iframe',
    ]);

    // Remove link elements (stylesheets)
    // Found in captured HTML: <link href="/etc.clientlibs/...">
    WebImporter.DOMUtils.remove(element, [
      'link',
    ]);

    // Remove noscript elements
    WebImporter.DOMUtils.remove(element, [
      'noscript',
    ]);

    // Remove #top-of-page screen reader element
    // Found in captured HTML: <div id="top-of-page" class="sr-only">
    WebImporter.DOMUtils.remove(element, [
      '#top-of-page',
    ]);
  }
}
