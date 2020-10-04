export function ucFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function shuffleArrayElement(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function getCompleteAssetPath(relativePath) {
  return process.env.REACT_APP_FileEndpoint + relativePath;
}

export function getQueryString() {
  return decodeURI(window.location.search)
    .replace("?", "")
    .split("&")
    .map((param) => param.split("="))
    .reduce((values, [key, value]) => {
      values[key] = value;
      return values;
    }, {});
}
