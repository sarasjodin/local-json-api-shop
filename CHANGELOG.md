## 2025-07-02
### Security
- Added Subresource Integrity (SRI) to external CDN resources:
  - `lightbox-plus-jquery.min.js` (JS)
  - `lightbox.min.css` (CSS preload and noscript fallback)
- Prevents browser from executing tampered or malicious third-party scripts/styles
- Resolves GitHub CodeQL alert: `js/functionality-from-untrusted-source`
