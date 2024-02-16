// The following annotation tells the transpiler to call the hyper function
// for each node
/** @jsx hyper */

/** Called for each JSX node by the transpiler
 * @param {string} name - The html tag
 * @param {any} attributes - An object containing the attributes
 * @param {any} ...args - represents child nodes
 * @returns An object with the structure {name, attributes, children}
 */
function hyper(name, attributes, ...args) {
  const children = args.length ? [].concat(...args) : null;
  const result = { name, attributes, children };
  return result;
}

/** Used to convert elements returned by hyper into DOM elements, this creates
the virtual DOM
 * @param {node} virtualNode - The node returned by the hyper function
 * @returns The actual HTML element created as per the node config
 */
function render(virtualNode) {
  // Treat strings, numbers and booleans as text nodes
  if (
    typeof virtualNode == "string" ||
    typeof virtualNode == "number" ||
    typeof virtualNode == "boolean"
  )
    return document.createTextNode(virtualNode);

  // create an element with the specified node name
  const node = document.createElement(virtualNode.name);

  // if no attributes exist, initialize to an empty object
  const attributes = virtualNode.attributes || {};

  // loop through attributes and set them onto the node element
  Object.keys(attributes).forEach((key) => {
    // if element type is style, loop through each style and set it
    if (key == "style") {
      Object.keys(attributes[key]).forEach((style) => {
        node.style[style] = attributes[key][style];
      });
    } else {
      node.setAttribute(key, attributes[key]);
    }
  });

  // recursively call the render function for any and all children
  const children = virtualNode.children || [];
  children.forEach((child) => node.appendChild(render(child)));

  return node;
}

/** Returns JSX which is transpiled by babel and passed through the hyper 
function */
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
      <p style={{ color: "red" }}>This is red</p>
    </div>
  );
};

// get the root element which serves as the parent for this app
const parent = document.getElementById("root");
// generate the virtualDOM using the render function
const virtualDom = render(App());
// append the virtualDOM onto the actual DOM
parent.appendChild(virtualDom);

let tree = JSON.stringify(App(), null, " ");
// This demonstrates the entire process from JSX -> vDOM -> DOM in one step
document.body.appendChild(
  render(<pre style={{ backgroundColor: "#eee" }}>{tree}</pre>),
);
