/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroParser from './parsers/hero.js';
import promoBannerParser from './parsers/promo-banner.js';
import cardsParser from './parsers/cards.js';
import columnsParser from './parsers/columns.js';

// TRANSFORMER IMPORTS
import ustaCleanupTransformer from './transformers/usta-cleanup.js';
import ustaSectionsTransformer from './transformers/usta-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero': heroParser,
  'promo-banner': promoBannerParser,
  'cards': cardsParser,
  'columns': columnsParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'play-page',
  description: 'Play landing/hub page with hero, activity cards, and promotional content for USTA tennis programs',
  urls: [
    'https://www.usta.com/en/home/play.html'
  ],
  blocks: [
    {
      name: 'hero',
      instances: ['#container-1b53a43ea8']
    },
    {
      name: 'promo-banner',
      instances: ['.leadgeneration']
    },
    {
      name: 'cards',
      instances: ['#aa-default-national_play_get_in_the_game']
    },
    {
      name: 'columns',
      instances: ['#container-9fd5c29185', '#container-36d8db448f', '#container-cf58c1a9d4', '#container-f498b06250']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Section',
      selector: '#container-1b53a43ea8',
      style: null,
      blocks: ['hero'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Lead Generation',
      selector: '.leadgeneration',
      style: null,
      blocks: ['promo-banner'],
      defaultContent: []
    },
    {
      id: 'section-3',
      name: 'Get in The Tennis Game',
      selector: '#aa-default-national_play_get_in_the_game',
      style: null,
      blocks: ['cards'],
      defaultContent: ['#text-fb7006ecfb h2']
    },
    {
      id: 'section-4',
      name: 'Tennis for All',
      selector: '#container-9fd5c29185',
      style: null,
      blocks: ['columns'],
      defaultContent: []
    },
    {
      id: 'section-5',
      name: 'Youth Tennis',
      selector: '#container-36d8db448f',
      style: 'accent-left',
      blocks: ['columns'],
      defaultContent: []
    },
    {
      id: 'section-6',
      name: 'College Tennis',
      selector: '#container-cf58c1a9d4',
      style: null,
      blocks: ['columns'],
      defaultContent: []
    },
    {
      id: 'section-7',
      name: 'Adult Tennis',
      selector: '#container-f498b06250',
      style: 'accent-left',
      blocks: ['columns'],
      defaultContent: []
    }
  ]
};

// TRANSFORMER REGISTRY
const transformers = [
  ustaCleanupTransformer,
  ustaSectionsTransformer,
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach(blockDef => {
    blockDef.instances.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach(element => {
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

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach(block => {
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

    // 4. Execute afterTransform (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map(b => b.name),
      }
    }];
  }
};
