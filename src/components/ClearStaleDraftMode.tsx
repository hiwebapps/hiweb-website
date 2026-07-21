import { useEffect } from 'react';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';

/** True when the preview is embedded (Presentation iframe). */
function isFramed(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

function hasDraftCookie(): boolean {
  return document.cookie.split('; ').some((part) => part.startsWith(`${perspectiveCookieName}=`));
}

/**
 * Silently clears a leftover draft-mode cookie when browsing the public site
 * (not inside Presentation). No UI — visitors never see a preview exit control.
 */
export default function ClearStaleDraftMode() {
  useEffect(() => {
    if (isFramed() || !hasDraftCookie()) return;

    void fetch('/api/draft-mode/disable?silent=1', {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    }).then((res) => {
      if (res.ok) window.location.reload();
    });
  }, []);

  return null;
}
