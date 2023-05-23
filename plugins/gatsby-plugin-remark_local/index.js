const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

const DOUBLE = '==';

module.exports = async ({ markdownAST }) => {
  visit(markdownAST, 'text', node => {
    // Grab the innerText of the heading node
    let text = toString(node);

    if (
      text.substring(0, 2) !== DOUBLE ||
      text.substring(text.length - 2, text.length) !== DOUBLE
    ) {
      return;
    }

    const html = `
        <mark>
          ${text.substring(2, text.length - 2)}
        </mark>
      `;

    node.type = 'html';
    node.children = undefined;
    node.value = html;
  });

  return markdownAST;
};
