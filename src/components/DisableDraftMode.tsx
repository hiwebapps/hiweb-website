import { useEffect, useState } from 'react';

/** True when the preview is embedded (Presentation iframe). */
function isFramed(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

/**
 * Exit draft mode when browsing the site in a normal tab with a leftover
 * preview cookie. Hidden inside Presentation (Studio iframe).
 */
export default function DisableDraftMode() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!isFramed());
  }, []);

  if (!show) return null;

  return (
    <a
      href="/api/draft-mode/disable"
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 50,
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        backgroundColor: '#101112',
        color: '#fff',
        fontSize: '0.875rem',
        textDecoration: 'none',
      }}
    >
      Salir del preview
    </a>
  );
}
