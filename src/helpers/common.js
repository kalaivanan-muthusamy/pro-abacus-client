export function ucFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function shuffleArrayElement(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function getCompleteAssetPath(relativePath) {
  return process.env.REACT_APP_FileEndpoint + relativePath;
}
