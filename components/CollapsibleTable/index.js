import React, { useState, useEffect } from 'react';

export default function CollapsibleTable({ title, children, id, isExpandedAll }) {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isExpandedAll != null) {
      setOpen(isExpandedAll);
    }
  }, [isExpandedAll]);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.dataset.theme === 'dark');
    };
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="white-background"
      style={{
        marginBottom: '1em',
        backgroundColor: isDark ? '#18191A' : undefined,
        color: isDark ? '#e0e0e0' : undefined,
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '0.5em',
          backgroundColor: isDark ? '#2a3b4d' : '#c3e9f7',
          color: isDark ? '#fff' : '#000',
          padding: '0.5em',
          borderRadius: '6px',
        }}
      >
        {title} {open ? '▲' : '▼'}
      </div>
      {open && <div>{children}</div>}
    </div>
  );
}
