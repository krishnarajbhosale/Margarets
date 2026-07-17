# Legal documents

Drop the client-provided PDFs here. The footer links already point to these
paths (see `src/lib/location.jsx` → `LOCATIONS.mx/us.privacyUrl` & `termsUrl`):

- `privacy-policy.pdf`        → Privacy Policy (Aviso de Privacidad)
- `terms-and-conditions.pdf`  → Terms & Conditions (Términos del Servicio)

Files placed in `public/` are served from the site root, so
`public/legal/privacy-policy.pdf` resolves to `/legal/privacy-policy.pdf`.

If Mexico and USA need different (e.g. Spanish vs English) documents, add
country-specific files here and update the `privacyUrl` / `termsUrl` values in
each location entry in `src/lib/location.jsx`.
