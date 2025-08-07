/**
 * Bezel Overlay Module
 * 
 * A lightweight, reusable overlay bezel with 1px border + glow,
 * fully programmatic toggle (true/false), zero focus capture.
 *
 * Usage:
 *   bezelOverlay.toggle(true); // show
 *   bezelOverlay.toggle(false); // hide
 *   bezelOverlay.setColor('#FF69B4'); // optional theme swap
 */

const bezelOverlay = (function() {
    const bezel = document.createElement('div');
    bezel.className = 'bezel glow';
    bezel.style.pointerEvents = 'none';
    bezel.style.position = 'fixed';
    bezel.style.top = '0';
    bezel.style.left = '0';
    bezel.style.right = '0';
    bezel.style.bottom = '0';
    bezel.style.border = '1px solid var(--bezel-color, #7DF9FF)';
    bezel.style.boxSizing = 'border-box';
    bezel.style.zIndex = '9999';
    bezel.style.transition = 'opacity 0.5s ease, border-color 0.5s ease';
    bezel.style.opacity = '0';

    document.body.appendChild(bezel);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes bezel-pulse {
        0%, 100% { box-shadow: 0 0 50px var(--bezel-color, #7DF9FF); }
        50% { box-shadow: 0 0 70px var(--bezel-color, #7DF9FF); }
      }
      .bezel.glow {
        animation: bezel-pulse 6s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    function toggle(show = true) {
        bezel.style.opacity = show ? '1' : '0';
    }

    function setColor(color) {
        document.documentElement.style.setProperty('--bezel-color', color);
    }

    return {
        toggle,
        setColor
    };
})();

// Example initialization (optional):
bezelOverlay.toggle(true);
bezelOverlay.setColor('#FF69B4');