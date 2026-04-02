# KUS Suite Extension — Reglas del proyecto

## Contexto
Extensión Chrome/Firefox para creadores de contenido. Parte de KUS Creator Suite.

## Stack
- Manifest V3 (Chrome + Firefox compatible)
- Vanilla JS (no framework en content scripts)
- CSS con variables custom
- Build con esbuild o rollup

## Reglas
- No usar `eval()` ni `innerHTML` con datos externos (CSP)
- Toda lógica de licencia pasa por `src/license/validator.js`
- El `service-worker.js` es el único punto de verdad para el plan activo
- Los content scripts solo leen el plan, nunca lo modifican
- Usar `chrome.storage.local` para estado persistente
- No hardcodear claves o tokens en el código

## Planes y acceso
- `free`: solo traductor
- `creator`: analytics básicos YouTube
- `influencer`: todas las funciones

## Convenciones
- Archivos: kebab-case
- IDs en HTML: kebab-case con prefijo `kus-`
- Mensajes entre scripts: tipo UPPER_SNAKE_CASE
