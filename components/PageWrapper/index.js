import React, { useState } from 'react';

export default function PageWrapper({ children }) {
  const [expandAll, setExpandAll] = useState(null); // true, false, or null

  return (
    <>
        <div className="expand-collapse-buttons">
        <button onClick={() => setExpandAll(true)}>Expand All Tables</button>
        <button onClick={() => setExpandAll(false)}>Collapse All Tables</button>
        </div>
      {/* Pass expand state down to children */}
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { isExpandedAll: expandAll })
          : child
      )}
    </>
  );
}
