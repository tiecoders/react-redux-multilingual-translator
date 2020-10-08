import React from 'react';

/**
 * @param s
 * @param d
 * @returns {*}
 */
export function supplant(s, d) {
  for (var p in d) {
    s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
  }
  return s;
}

/**
 * @param path
 * @param obj
 * @param safe
 * @returns {*}
 */
export function translateKey(path, obj, safe) {
  return path.split('.').reduce((prev, curr) => {
    return !safe ? prev[curr] : prev ? prev[curr] : undefined;
  }, obj);
}

/**
 * @param html
 * @returns {{__html: *}}
 */
export function createHTMLMarkup(html) {
  return { __html: html };
}

/**
 * @param translateFn
 * @param translations
 * @param locale
 * @param key
 * @param placeholders
 * @param isHTML
 * @param options
 * @returns {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>|*}
 */
export function translate(
  translateFn,
  translations,
  locale,
  key,
  placeholders,
  isHTML,
  options = {}
) {
  const result = translateFn(key, translations[locale]['messages']);
  const tagName = options.tagName || 'div';
  if (typeof placeholders === 'undefined') {
    return result;
  }
  const finalResult = supplant(result, placeholders);
  return isHTML
    ? React.createElement(
        tagName,
        { dangerouslySetInnerHTML: createHTMLMarkup(finalResult) },
        null
      )
    : finalResult;
}

/**
 * @param translations
 * @param locale
 * @param key
 * @param placeholders
 * @param isHTML
 * @param options
 * @returns {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>|*}
 */
export function multilingualTranslatorUtil(
  translations,
  locale,
  key,
  placeholders,
  isHTML,
  options = {}
) {
  return translate(
    translateKey,
    translations,
    locale,
    key,
    placeholders,
    isHTML,
    options
  );
}
