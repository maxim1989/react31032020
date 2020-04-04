function prepareContent(text: string): Node {
  const element = document.createElement("div");

  element.innerHTML = text;

  return element;
}

document.body.appendChild(prepareContent("Content"));

export default prepareContent;
