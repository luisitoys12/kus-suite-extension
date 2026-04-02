// KUS Suite — Token Validator (offline)
// Validates KUS token format and expiry without internet connection

export function validateToken(token) {
  if (!token || typeof token !== 'string') {
    return { valid: false, reason: 'Token vac\u00edo', plan: 'free' };
  }

  const parts = token.split('.');
  if (parts.length !== 4 || parts[0] !== 'KUS') {
    return { valid: false, reason: 'Formato inv\u00e1lido', plan: 'free' };
  }

  try {
    const payload = JSON.parse(atob(parts[2].replace(/-/g, '+').replace(/_/g, '/')));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      return { valid: false, reason: 'Token expirado', plan: 'free', expiredAt: payload.exp };
    }

    const validPlans = ['free', 'creator', 'influencer'];
    if (!validPlans.includes(payload.plan)) {
      return { valid: false, reason: 'Plan desconocido', plan: 'free' };
    }

    return {
      valid: true,
      plan: payload.plan,
      device: payload.device,
      expiresAt: payload.exp,
      issuedAt: payload.iat,
      daysLeft: Math.ceil((payload.exp - now) / 86400)
    };
  } catch (e) {
    return { valid: false, reason: 'Token corrupto', plan: 'free' };
  }
}

export function getPlanFeatures(plan) {
  const features = {
    free: {
      translator: true, youtubeBasic: false, thumbnailEditor: false,
      seoTools: false, competitorAnalysis: false, multiPlatform: false, skins: false
    },
    creator: {
      translator: true, youtubeBasic: true, thumbnailEditor: false,
      seoTools: false, competitorAnalysis: false, multiPlatform: false, skins: false
    },
    influencer: {
      translator: true, youtubeBasic: true, thumbnailEditor: true,
      seoTools: true, competitorAnalysis: true, multiPlatform: true, skins: true
    }
  };
  return features[plan] || features.free;
}
