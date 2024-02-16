/** @jsx hyper */

function hyper(name, attributes, ...args) {
  const children = args.length ? [].concat(...args) : null;
  const result = { name, attributes, children };
  return result;
}

function render(virtualNode) {
  if (
    typeof virtualNode == "string" ||
    typeof virtualNode == "number" ||
    typeof virtualNode == "boolean"
  )
    return document.createTextNode(virtualNode);

  const node = document.createElement(virtualNode.name);

  const attributes = virtualNode.attributes || {};
  Object.keys(attributes).forEach((key) => {
    if (key == "style") {
      Object.keys(attributes[key]).forEach((style) => {
        node.style[style] = attributes[key][style];
      });
    } else {
      node.setAttribute(key, attributes[key]);
    }
  });

  const children = virtualNode.children || [];
  children.forEach((child) => node.appendChild(render(child)));

  return node;
}

const App = () => {
  let value = 555;
  return (
    <div id="container">
      <h1 class="heading">Welcome to JSX Renderer</h1>
      <p>
        Everything you see is rendered through <strong>JSX</strong>
      </p>
      <p>The element tree can be viewed on the right</p>
      <p>This is a javascript variable, value = {value}</p>
      <h2>Let's add some styling too</h2>
      <p style={{ backgroundColor: "red" }}>This is red</p>
    </div>
  );
};

const parent = document.getElementById("root");
const virtualDom = render(App());
parent.appendChild(virtualDom);

let tree = JSON.stringify(App(), null, " ");
// This demonstrates the entire process from JSX -> vDOM -> DOM
document.body.appendChild(
  render(<pre style={{ backgroundColor: "#eee" }}>{tree}</pre>),
);
