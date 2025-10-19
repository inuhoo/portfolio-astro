// src/utils/strapiParser.js

/**
 * Renders an individual text child node, applying formatting like bold/italic.
 * @param {object} child - The child node object from Strapi JSON.
 * @returns {string} HTML string for the child.
 */
function renderChildNode(child) {
	if (child.type === "text") {
		let text = child.text;

		// Apply formatting properties
		if (child.bold) {
			text = `<strong>${text}</strong>`;
		}
		if (child.italic) {
			text = `<em>${text}</em>`;
		}
		// Add logic for other formats (underline, code, etc.)

		return text;
	}
	if (child.type === "link") {
		const href = child.url || "#";
		const inner = (child.children || []).map(renderChildNode).join("");
		return `<a href="${href}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
	}
	// Add logic for other child types like 'link'
	return "";
}

/**
 * Renders the full array of Strapi blocks into an HTML string.
 * @param {Array<object>} blocks - The array of block objects (e.g., 'bio').
 * @returns {string} The complete HTML string.
 */
export function renderRTF(blocks) {
	let html = "";

	blocks.forEach((block) => {
		// Collect all the children's rendered HTML
		const innerHtml = block.children.map(renderChildNode).join("");

		// Wrap the inner HTML based on the block type
		switch (block.type) {
			case "paragraph":
				html += `<p>${innerHtml}</p>`;
				break;
			case "heading": {
				// Strapi's block editor often includes a level property for headings
				const headingLevel = block.level || 2;
				html += `<h${headingLevel}>${innerHtml}</h${headingLevel}>`;
				break;
			}
			// Add logic for 'list', 'quote', 'image', etc.
			default:
				// Fallback
				html += `<p>${innerHtml}</p>`;
		}
	});

	return html;
}
