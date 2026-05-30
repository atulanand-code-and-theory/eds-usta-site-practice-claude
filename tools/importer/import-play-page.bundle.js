/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-play-page.js
  var import_play_page_exports = {};
  __export(import_play_page_exports, {
    default: () => import_play_page_default
  });

  // tools/importer/parsers/hero.js
  function parse(element, { document }) {
    const bgImage = element.querySelector("img");
    const heading = element.querySelector('h1, h2, h3, [class*="title"]');
    const cmpText = element.querySelector('.cmp-text, [id^="text-"]');
    const descriptionParagraphs = cmpText ? Array.from(cmpText.querySelectorAll("p")).filter((p) => {
      const text = p.textContent.replace(/\s+/g, "").trim();
      return text.length > 0;
    }) : [];
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) {
      contentCell.push(heading);
    }
    if (descriptionParagraphs.length > 0) {
      contentCell.push(...descriptionParagraphs);
    }
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/promo-banner.js
  function parse2(element, { document }) {
    const image = element.querySelector(".v-lead-generation-form__icon, .v-lead-generation-form img, img");
    const heading = element.querySelector(".v-lead-generation-form__title, h4, h3, h2, h1");
    const descriptionContainer = element.querySelector(".v-lead-generation-form__cta-text, .v-lead-generation-form p");
    const description = descriptionContainer || element.querySelector("p");
    const ctaButton = element.querySelector(".subscribe-button, .button-primary-style, button");
    let ctaLink = null;
    if (ctaButton) {
      ctaLink = document.createElement("a");
      ctaLink.href = "#";
      ctaLink.textContent = ctaButton.textContent.replace(/^\*\s*/, "").trim();
      const strong = document.createElement("strong");
      strong.appendChild(ctaLink);
      ctaLink = strong;
    }
    const terms = element.querySelector(".v-lead-generation-form__terms-description, .terms-description");
    const cells = [];
    if (image) {
      cells.push([[image]]);
    }
    const contentElements = [];
    if (heading) contentElements.push(heading);
    if (description) contentElements.push(description);
    if (ctaLink) contentElements.push(ctaLink);
    if (terms) contentElements.push(terms);
    if (contentElements.length > 0) {
      cells.push([contentElements]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "promo-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards.js
  function parse3(element, { document }) {
    const cardContainers = element.querySelectorAll(":scope > .aem-Grid > .container.responsivegrid.full-width");
    const cells = [];
    cardContainers.forEach((card) => {
      const image = card.querySelector(".cmp-image__image, img");
      const heading = card.querySelector(".cmp-text h5, .cmp-text h4, .cmp-text h3, .cmp-text h2");
      const paragraphs = Array.from(card.querySelectorAll(".cmp-text p"));
      const description = paragraphs.find((p) => p.textContent.trim() && p.textContent.trim() !== "\xA0");
      const ctaLink = card.querySelector('a.cmp-button, a[class*="button"]');
      const imageCell = [];
      if (image) {
        imageCell.push(image);
      }
      const contentCell = [];
      if (heading) {
        contentCell.push(heading);
      }
      if (description) {
        contentCell.push(description);
      }
      if (ctaLink) {
        const link = document.createElement("a");
        link.href = ctaLink.href;
        link.textContent = ctaLink.textContent.trim();
        contentCell.push(link);
      }
      if (imageCell.length > 0 || contentCell.length > 0) {
        cells.push([imageCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns.js
  function parse4(element, { document }) {
    const grid = element.querySelector(":scope > .aem-Grid") || element;
    const columnContainers = Array.from(
      grid.querySelectorAll(":scope > .container.responsivegrid")
    );
    const cells = [];
    const row = [];
    columnContainers.forEach((col) => {
      const cellContent = [];
      const images = Array.from(col.querySelectorAll("img"));
      images.forEach((img) => cellContent.push(img));
      const headings = Array.from(col.querySelectorAll("h1, h2, h3, h4, h5, h6"));
      headings.forEach((h) => cellContent.push(h));
      const paragraphs = Array.from(col.querySelectorAll(".cmp-text p"));
      paragraphs.forEach((p) => {
        const text = p.textContent.trim().replace(/ /g, "");
        if (text.length > 0) {
          cellContent.push(p);
        }
      });
      const buttons = Array.from(col.querySelectorAll("a.cmp-button, a.button-core"));
      buttons.forEach((btn) => cellContent.push(btn));
      if (cellContent.length > 0) {
        row.push(cellContent);
      } else {
        row.push([col]);
      }
    });
    if (row.length > 0) {
      cells.push(row);
    } else {
      cells.push([[element]]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/usta-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#ot-sdk-btn-floating"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--usta-en-popups-xf"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--usta-en-header-ef"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--usta-en-footer-ef"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".cmp-breadcrumb"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#usntA42Toggle",
        ".skip-to-main-content-link",
        ".pageLanguage",
        "#googlegeocodeapiurl"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".bidtellect",
        "#google-search-results-list"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "iframe"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "link"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "noscript"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#top-of-page"
      ]);
    }
  }

  // tools/importer/transformers/usta-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-play-page.js
  var parsers = {
    "hero": parse,
    "promo-banner": parse2,
    "cards": parse3,
    "columns": parse4
  };
  var PAGE_TEMPLATE = {
    name: "play-page",
    description: "Play landing/hub page with hero, activity cards, and promotional content for USTA tennis programs",
    urls: [
      "https://www.usta.com/en/home/play.html"
    ],
    blocks: [
      {
        name: "hero",
        instances: ["#container-1b53a43ea8"]
      },
      {
        name: "promo-banner",
        instances: [".leadgeneration"]
      },
      {
        name: "cards",
        instances: ["#aa-default-national_play_get_in_the_game"]
      },
      {
        name: "columns",
        instances: ["#container-9fd5c29185", "#container-36d8db448f", "#container-cf58c1a9d4", "#container-f498b06250"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Section",
        selector: "#container-1b53a43ea8",
        style: null,
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Lead Generation",
        selector: ".leadgeneration",
        style: null,
        blocks: ["promo-banner"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Get in The Tennis Game",
        selector: "#aa-default-national_play_get_in_the_game",
        style: null,
        blocks: ["cards"],
        defaultContent: ["#text-fb7006ecfb h2"]
      },
      {
        id: "section-4",
        name: "Tennis for All",
        selector: "#container-9fd5c29185",
        style: null,
        blocks: ["columns"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Youth Tennis",
        selector: "#container-36d8db448f",
        style: "accent-left",
        blocks: ["columns"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "College Tennis",
        selector: "#container-cf58c1a9d4",
        style: null,
        blocks: ["columns"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Adult Tennis",
        selector: "#container-f498b06250",
        style: "accent-left",
        blocks: ["columns"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    transform2
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_play_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_play_page_exports);
})();
