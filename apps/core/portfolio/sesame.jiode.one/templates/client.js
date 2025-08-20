function initReadMoreToggles() {
    function handleToggleClick(evt) {
      const toggle = evt.currentTarget;
      const targetId = toggle.dataset.target;
      const summary = document.getElementById(targetId);
      if (!summary) return;

      const expanded = summary.classList.toggle('expanded');
      toggle.textContent = expanded ? 'Show less' : 'Read more';
    }

    document.querySelectorAll('.read-more-toggle').forEach((toggle) => {
      toggle.removeEventListener('click', handleToggleClick);
      toggle.addEventListener('click', handleToggleClick);
    });

    document.querySelectorAll('.summary').forEach((summary) => {
      if (summary.scrollHeight <= summary.clientHeight) {
        const toggle = summary.nextElementSibling;
        if (toggle && toggle.classList.contains('read-more-toggle')) {
          toggle.style.display = 'none';
        }
      }
    });
  }

  function handleMouseMove(e) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }

  function showSnackbar(message = '✅ Link copied!') {
    const bar = document.getElementById('snackbar');
    if (!bar) return;
    bar.textContent = message;
    bar.classList.add('show');
    setTimeout(() => bar.classList.remove('show'), 2500);
  }

  // Helper: Cross-platform copy-to-clipboard with legacy fallback
  async function copyLinkToClipboard(url) {
    // Try modern Clipboard API first (requires HTTPS + user gesture)
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch (e) {
        // fall through to legacy path
      }
    }

    // Legacy fallback for iOS/Safari quirks
    const input = document.createElement('input');
    input.value = url;
    input.setAttribute('readonly', '');
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);

    // Preserve selection
    const selection = document.getSelection();
    const range = selection && selection.rangeCount ? selection.getRangeAt(0) : null;

    input.select();
    input.setSelectionRange(0, input.value.length);
    const ok = document.execCommand && document.execCommand('copy');

    document.body.removeChild(input);
    if (range) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
    return !!ok;
  }

  function initShareButton() {
    const shareBtn = document.querySelector('.share');
    if (!shareBtn) return;

    let handling = false; // guard against double-fire on touchend + click

    async function doShare(evt) {
      if (handling) return;
      handling = true;
      const shareData = {
        url: window.location.href
      };

      // Prefer native share when available (iOS Safari shows sheet on touch)
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          handling = false;
          return; // success or user completed share — nothing else to do
        } catch (err) {
          // If user cancels, do nothing (don’t claim success)
          const msg = String(err && (err.name || err.message || err));
          if (/Abort|cancel/i.test(msg)) {
            handling = false;
            return;
          }
          // Otherwise, attempt clipboard copy
        }
      }

      const ok = await copyLinkToClipboard(shareData.url);
      if (ok) {
        showSnackbar('✅ Link copied!');
      } else {
        showSnackbar('⚠️ Couldn’t copy link. Tap and hold to copy, or share manually.');
      }
      handling = false;
    }

    // iOS sometimes ties clipboard permission more strongly to touch events — wire both
    shareBtn.addEventListener('touchend', doShare, { passive: true });
    shareBtn.addEventListener('click', doShare);
  }


  function initPage() {
    initReadMoreToggles();
    initShareButton();
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', initPage);
