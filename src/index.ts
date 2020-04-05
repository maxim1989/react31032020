function prepareContent(text: string): HTMLDivElement {
  const element: HTMLDivElement = document.createElement('div');

  element.innerHTML = text;

  return element;
}

document.body.appendChild(prepareContent('Content'));

export default prepareContent;
