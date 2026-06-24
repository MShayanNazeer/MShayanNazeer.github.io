(() => {
  'use strict';

  const VISIBLE_ROWS = 5;

  const sizeNewsBox = () => {
    const box = document.querySelector('.news-scroll');
    if (!box) return;

    const rows = box.querySelectorAll('.news-table tbody tr');
    if (rows.length <= VISIBLE_ROWS) {
      box.style.maxHeight = '';
      return;
    }

    const boxTop = box.getBoundingClientRect().top;
    const lastVisible = rows[VISIBLE_ROWS - 1];
    const lastBottom = lastVisible.getBoundingClientRect().bottom;

    const styles = getComputedStyle(box);
    const paddingBottom = parseFloat(styles.paddingBottom) || 0;
    const borderBottom = parseFloat(styles.borderBottomWidth) || 0;

    // box uses border-box sizing: max-height spans border + padding + content.
    // (lastBottom - boxTop) already covers the top border/padding and 5 rows.
    const height = (lastBottom - boxTop) + paddingBottom + borderBottom;
    box.style.maxHeight = `${Math.round(height)}px`;
  };

  const run = () => {
    sizeNewsBox();
    window.addEventListener('resize', sizeNewsBox);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  window.addEventListener('load', sizeNewsBox);
})();
