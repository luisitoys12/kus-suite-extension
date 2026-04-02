# KUS Suite Extension

[![Version](https://img.shields.io/badge/version-0.1.0-01696f?style=flat-square)](https://github.com/luisitoys12/kus-suite-extension/releases)
[![Chrome](https://img.shields.io/badge/Chrome-Manifest%20V3-yellow?style=flat-square)]()
[![Firefox](https://img.shields.io/badge/Firefox-MV3%20Compatible-orange?style=flat-square)]()

Extensión oficial de **KUS Creator Suite** para Chrome y Firefox. Herramientas para creadores de contenido: analytics tipo VidIQ/TubeBuddy, editor de miniaturas, SEO de videos y más.

## 🧩 Planes y funciones

| Función | Free | Creator | Influencer |
|---|---|---|---|
| Traductor integrado | ✅ | ✅ | ✅ |
| Analytics básicos YouTube | ❌ | ✅ | ✅ |
| Editor de miniaturas | ❌ | ❌ | ✅ |
| SEO de videos y keywords | ❌ | ❌ | ✅ |
| Análisis de competidores | ❌ | ❌ | ✅ |
| TikTok + Kick + Instagram | ❌ | ❌ | ✅ |
| Skins personalizadas | ❌ | ❌ | ✅ (próximo) |

## 🚀 Instalación (desarrollo)

```bash
npm install
npm run build
```

Luego en Chrome: `chrome://extensions` → Modo desarrollador → Cargar sin empaquetar → selecciona `dist/`

## 📦 Estructura

```
kus-suite-extension/
├── src/
│   ├── manifest.json        # Manifest V3
│   ├── background/
│   │   └── service-worker.js  # Background service worker
│   ├── content/
│   │   ├── youtube.js         # Inyección en YouTube
│   │   ├── tiktok.js          # Inyección en TikTok
│   │   └── kick.js            # Inyección en Kick.com
│   ├── popup/
│   │   ├── popup.html         # UI del popup principal
│   │   ├── popup.css
│   │   └── popup.js
│   ├── panel/
│   │   ├── panel.html         # Panel lateral (sidebar)
│   │   ├── panel.css
│   │   └── panel.js
│   ├── thumbnail-editor/
│   │   ├── editor.html        # Editor de miniaturas (plan Influencer)
│   │   ├── editor.css
│   │   └── editor.js
│   └── license/
│       └── validator.js       # Validación de token offline
├── icons/
├── dist/                    # Build output (no commitear)
├── package.json
├── .env.example
├── CLAUDE.md
└── README.md
```

## 🔑 Activación

Obtén tu token en: https://luisitoys12.github.io/kus-license-panel

---

© 2026 EstacionKUS Medios — KUS Creator Suite
