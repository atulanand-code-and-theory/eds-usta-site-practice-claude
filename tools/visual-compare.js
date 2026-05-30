'use strict';

/**
 * Visual comparison tool: captures screenshots + computed styles from both the
 * live USTA play page and the local EDS play page at three breakpoints.
 *
 * Usage: node tools/visual-compare.js
 * Output: drafts/screenshots/{timestamp}/
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const LIVE_URL = 'https://www.usta.com/en/home/play.html';
const LOCAL_URL = 'http://localhost:3000/en/home/play';

const RUN_ID = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const OUT_DIR = path.join(__dirname, '../drafts/screenshots', RUN_ID);

// EDS local selectors (used for per-block screenshots)
const LOCAL_BLOCKS = {
  hero: '.hero-wrapper',
  promoBanner: '.promo-banner-wrapper',
  sectionTitle: '.section-title-wrapper',
  cards: '.cards-wrapper',
  columns1: '.columns-wrapper:nth-of-type(1)',
  columns2: '.columns-wrapper:nth-of-type(2)',
  columns3: '.columns-wrapper:nth-of-type(3)',
  columns4: '.columns-wrapper:nth-of-type(4)',
};

// Computed style extractors — each entry defines selectors + properties to capture
const EXTRACTORS = [
  {
    label: 'hero-outer',
    localSel: '.hero',
    liveSel: '.hero, [class*="Hero"], [class*="hero-section"]',
    props: ['minHeight', 'backgroundColor', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
  },
  {
    label: 'hero-content',
    localSel: '.hero .hero-content',
    liveSel: '.hero .hero-content, [class*="hero-content"], [class*="HeroContent"]',
    props: ['display', 'flexDirection', 'justifyContent', 'alignItems', 'textAlign', 'padding', 'paddingBottom'],
  },
  {
    label: 'hero-h1',
    localSel: '.hero h1',
    liveSel: '.hero h1, [class*="hero"] h1, main h1',
    props: ['fontSize', 'fontFamily', 'fontWeight', 'color', 'textTransform', 'letterSpacing', 'lineHeight'],
  },
  {
    label: 'hero-p',
    localSel: '.hero p',
    liveSel: '.hero p, [class*="hero"] p',
    props: ['fontSize', 'fontFamily', 'color', 'lineHeight'],
  },
  {
    label: 'promo-banner-wrapper',
    localSel: '.promo-banner-wrapper',
    liveSel: '[class*="promo-banner"], [class*="promoBanner"], [class*="PromoSection"]',
    props: ['backgroundColor', 'paddingTop', 'paddingBottom'],
  },
  {
    label: 'promo-banner-inner',
    localSel: '.promo-banner',
    liveSel: '[class*="promo-banner"] > div, [class*="promoBanner"] > div',
    props: ['maxWidth', 'textAlign', 'paddingTop', 'paddingBottom'],
  },
  {
    label: 'promo-banner-h4',
    localSel: '.promo-banner h4, .promo-banner h2',
    liveSel: '[class*="promo-banner"] h2, [class*="promo-banner"] h4, [class*="promoBanner"] h2',
    props: ['fontSize', 'fontFamily', 'fontWeight', 'color', 'lineHeight', 'textTransform'],
  },
  {
    label: 'promo-banner-cta',
    localSel: '.promo-banner .promo-banner-action a',
    liveSel: '[class*="promo-banner"] a[class*="btn"], [class*="promo-banner"] a[class*="button"]',
    props: ['backgroundColor', 'color', 'borderRadius', 'padding', 'fontSize', 'fontFamily', 'textTransform', 'letterSpacing'],
  },
  {
    label: 'section-title-h2',
    localSel: '.section-title h2',
    liveSel: '[class*="section-title"] h2, [class*="SectionTitle"] h2',
    props: ['fontSize', 'fontFamily', 'fontWeight', 'color', 'textTransform', 'letterSpacing'],
  },
  {
    label: 'cards-ul',
    localSel: '.cards ul',
    liveSel: '[class*="cards"] ul, [class*="card-grid"] ul',
    props: ['display', 'gridTemplateColumns', 'gap', 'padding', 'listStyle'],
  },
  {
    label: 'cards-card',
    localSel: '.cards .cards-card',
    liveSel: '[class*="cards"] li, [class*="card-item"]',
    props: ['backgroundColor', 'borderRadius', 'boxShadow', 'padding', 'textAlign', 'display', 'flexDirection'],
  },
  {
    label: 'cards-icon',
    localSel: '.cards .cards-card-image img',
    liveSel: '[class*="cards"] li img, [class*="card-item"] img',
    props: ['width', 'height', 'objectFit'],
  },
  {
    label: 'cards-heading',
    localSel: '.cards .cards-card-body h5, .cards .cards-card-body h4',
    liveSel: '[class*="cards"] li h4, [class*="cards"] li h5',
    props: ['fontSize', 'fontFamily', 'fontWeight', 'color', 'textTransform'],
  },
  {
    label: 'cards-cta',
    localSel: '.cards a.button',
    liveSel: '[class*="cards"] a[class*="btn"], [class*="cards"] a[class*="button"]',
    props: ['backgroundColor', 'color', 'borderRadius', 'padding', 'fontSize', 'textTransform'],
  },
  {
    label: 'columns-container',
    localSel: '.columns > div',
    liveSel: '[class*="columns"] > div:first-child, [class*="two-up"] > div',
    props: ['display', 'flexDirection', 'minHeight'],
  },
  {
    label: 'columns-text-col',
    localSel: '.columns .columns-col:not(.columns-img-col)',
    liveSel: '[class*="columns-text"], [class*="col-text"]',
    props: ['padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'backgroundColor', 'justifyContent', 'alignItems'],
  },
  {
    label: 'columns-h2',
    localSel: '.columns h2',
    liveSel: '[class*="columns"] h2',
    props: ['fontSize', 'fontFamily', 'fontWeight', 'color', 'textTransform', 'lineHeight'],
  },
  {
    label: 'columns-p',
    localSel: '.columns p',
    liveSel: '[class*="columns"] p',
    props: ['fontSize', 'fontFamily', 'color', 'lineHeight'],
  },
  {
    label: 'columns-cta',
    localSel: '.columns a.button',
    liveSel: '[class*="columns"] a[class*="btn"], [class*="columns"] a[class*="button"]',
    props: ['backgroundColor', 'color', 'borderRadius', 'padding', 'fontSize', 'textTransform'],
  },
  {
    label: 'columns-img-col',
    localSel: '.columns .columns-img-col',
    liveSel: '[class*="columns-image"], [class*="col-image"]',
    props: ['minHeight', 'overflow'],
  },
  {
    label: 'section-wrapper',
    localSel: 'main > .section',
    liveSel: 'main > div[class], main > section',
    props: ['backgroundColor', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
  },
  {
    label: 'accent-left-section',
    localSel: 'main > .section[data-style="accent-left"]',
    liveSel: '[class*="accent"], [class*="border-left"]',
    props: ['borderLeft', 'borderLeftColor', 'borderLeftWidth', 'borderLeftStyle'],
  },
];

async function extractStyles(page, extractors, isLive) {
  const results = {};
  for (const ex of extractors) {
    const sel = isLive ? ex.liveSel : ex.localSel;
    try {
      const styles = await page.evaluate(({ selector, props }) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        return props.reduce((acc, p) => { acc[p] = cs[p]; return acc; }, { _selector: selector });
      }, { selector: sel, props: ex.props });
      results[ex.label] = styles;
    } catch (e) {
      results[ex.label] = { error: e.message };
    }
  }
  return results;
}

async function screenshotEl(page, selector, outPath) {
  try {
    const el = page.locator(selector).first();
    if (await el.count() === 0) return false;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await el.screenshot({ path: outPath });
    return true;
  } catch {
    return false;
  }
}

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const allStyles = {};

  for (const vp of VIEWPORTS) {
    console.log(`\n=== ${vp.name} (${vp.width}px) ===`);
    allStyles[vp.name] = {};

    for (const [site, url] of [['live', LIVE_URL], ['local', LOCAL_URL]]) {
      process.stdout.write(`  ${site}... `);
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      });
      const page = await ctx.newPage();

      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
        if (site === 'local') {
          // Wait for EDS blocks to decorate
          await page.waitForFunction(() => document.querySelectorAll('[data-block-status="loaded"]').length > 0, { timeout: 15000 }).catch(() => {});
          await page.waitForTimeout(1500);
        } else {
          await page.waitForTimeout(4000);
        }

        // Dismiss any cookie/consent dialogs
        await page.evaluate(() => {
          document.querySelectorAll('[class*="cookie"], [class*="consent"], [id*="cookie"], [id*="consent"]').forEach((el) => el.remove());
        });

        const vpDir = path.join(OUT_DIR, vp.name, site);
        fs.mkdirSync(vpDir, { recursive: true });

        await page.screenshot({ path: path.join(vpDir, 'full-page.png'), fullPage: true });

        if (site === 'local') {
          for (const [name, sel] of Object.entries(LOCAL_BLOCKS)) {
            await screenshotEl(page, sel, path.join(vpDir, `block-${name}.png`));
          }
        }

        allStyles[vp.name][site] = await extractStyles(page, EXTRACTORS, site === 'live');
        console.log('done');
      } catch (e) {
        console.log(`ERROR: ${e.message}`);
        allStyles[vp.name][site] = { error: e.message };
      }

      await ctx.close();
    }
  }

  await browser.close();

  const stylesPath = path.join(OUT_DIR, 'styles.json');
  fs.writeFileSync(stylesPath, JSON.stringify(allStyles, null, 2));
  console.log(`\nDone. Output: ${OUT_DIR}`);
}

run().catch(console.error);
