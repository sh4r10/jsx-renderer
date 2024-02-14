/** @jsx hyper */

function hyper(name, attributes, ...args) {
  const children = args.length ? [].concat(...args) : null;
  const result = { name, attributes, children };
  return result;
}

function render(virtualNode) {
  if (virtualNode.split) return document.createTextNode(virtualNode);

  const node = document.createElement(virtualNode.name);

  const attributes = virtualNode.attributes || {};
  Object.keys(attributes).forEach((key) =>
    node.setAttribute(key, attributes[key]),
  );

  const children = virtualNode.children || [];
  children.forEach((child) => node.appendChild(render(child)));

  return node;
}

const parent = document.getElementById("root");

let foo = <div id="foo">Hello from rendered jsx</div>;

let res = render(foo);

parent.appendChild(res);
