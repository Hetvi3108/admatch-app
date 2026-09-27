// Channel knowledge base + weighted scoring engine.
// This is the "brain" of Signal — swap in real benchmark data or a
// live pricing feed here without touching the routes or frontend.

export const CHANNELS = [
  {
    id: 'google', name: 'Google Search Ads', type: 'Search · intent-based',
    fit: { awareness: 0.3, consideration: 0.7, leads: 0.85, conversion: 0.95 },
    buyer: { b2c: 0.8, b2b: 0.9 }, minBudget: 500,
    ages: ['18-24', '25-34', '35-44', '45-60', '60+'],
    cpc: '$1–$4 CPC', cac: '$25–$90 CAC',
    pros: [
      'Captures people already searching to buy — highest purchase intent of any channel',
      'Fully measurable: clicks, conversions and cost per acquisition are precise',
    ],
    cons: [
      'Can get expensive fast in competitive categories',
      "Does nothing for people who don't yet know they have the need",
    ],
  },
  {
    id: 'meta', name: 'Meta (Instagram + Facebook)', type: 'Social · interest-based',
    fit: { awareness: 0.85, consideration: 0.85, leads: 0.7, conversion: 0.75 },
    buyer: { b2c: 0.9, b2b: 0.45 }, minBudget: 300,
    ages: ['18-24', '25-34', '35-44', '45-60'],
    cpc: '$0.50–$2 CPC', cac: '$15–$60 CAC',
    pros: [
      'Best all-round platform for visual products and lookalike targeting',
      'Cheap to test creative variations quickly',
    ],
    cons: [
      'iOS privacy changes have weakened tracking accuracy',
      "Algorithm favors engagement, which isn't always buyer intent",
    ],
  },
  {
    id: 'tiktok', name: 'TikTok Ads', type: 'Social · discovery',
    fit: { awareness: 0.9, consideration: 0.65, leads: 0.35, conversion: 0.5 },
    buyer: { b2c: 0.85, b2b: 0.15 }, minBudget: 500,
    ages: ['13-17', '18-24', '25-34'],
    cpc: '$0.30–$1.50 CPC', cac: '$20–$70 CAC',
    pros: [
      'Unmatched reach with under-35 audiences and strong organic-feeling discovery',
      'Native/authentic creative outperforms polished ads here',
    ],
    cons: [
      'Weak for older or B2B audiences',
      'Attention is fleeting — needs frequent new creative to avoid fatigue',
    ],
  },
  {
    id: 'youtube', name: 'YouTube Ads', type: 'Video · broad reach',
    fit: { awareness: 0.9, consideration: 0.7, leads: 0.4, conversion: 0.45 },
    buyer: { b2c: 0.75, b2b: 0.5 }, minBudget: 800,
    ages: ['18-24', '25-34', '35-44', '45-60', '60+'],
    cpc: '$0.10–$0.30 CPV', cac: '$40–$100 CAC',
    pros: [
      'Broadest age reach of any video platform, including older demographics',
      'Good for explaining complex products that need demonstration',
    ],
    cons: [
      'Requires actual video production, raising the cost floor',
      'Weaker direct-response performance than search or social',
    ],
  },
  {
    id: 'linkedin', name: 'LinkedIn Ads', type: 'Professional · B2B',
    fit: { awareness: 0.5, consideration: 0.6, leads: 0.9, conversion: 0.55 },
    buyer: { b2c: 0.1, b2b: 0.95 }, minBudget: 1500,
    ages: ['25-34', '35-44', '45-60'],
    cpc: '$5–$12 CPC', cac: '$80–$250 CAC',
    pros: [
      'Only platform with reliable job-title and company-size targeting',
      'Strong for high-ticket B2B lead generation',
    ],
    cons: [
      'By far the most expensive CPC on this list',
      'Weak fit for any consumer product',
    ],
  },
  {
    id: 'pinterest', name: 'Pinterest Ads', type: 'Social · visual discovery',
    fit: { awareness: 0.6, consideration: 0.75, leads: 0.3, conversion: 0.65 },
    buyer: { b2c: 0.85, b2b: 0.1 }, minBudget: 300,
    ages: ['25-34', '35-44', '45-60'],
    cpc: '$0.40–$1.20 CPC', cac: '$25–$65 CAC',
    pros: [
      'High buyer intent for home, fashion, food and planning-stage purchases',
      'Pins have long organic shelf life compared to other social posts',
    ],
    cons: [
      'Skews strongly female and toward specific categories',
      'Smaller total audience than Meta or TikTok',
    ],
  },
  {
    id: 'micro', name: 'Micro-influencers (10K–100K followers)', type: 'Influencer · niche trust',
    fit: { awareness: 0.75, consideration: 0.8, leads: 0.4, conversion: 0.7 },
    buyer: { b2c: 0.9, b2b: 0.35 }, minBudget: 400,
    ages: ['13-17', '18-24', '25-34', '35-44'],
    cpc: '$50–$500 per post', cac: '$20–$55 CAC',
    pros: [
      'Higher trust and engagement rate per follower than celebrity accounts',
      'Cost-efficient way to reach tightly-defined niche communities',
    ],
    cons: [
      'Takes real time to vet creators and manage relationships',
      'Results vary a lot by individual creator — harder to standardize',
    ],
  },
  {
    id: 'macro', name: 'Macro / celebrity influencers', type: 'Influencer · mass reach',
    fit: { awareness: 0.95, consideration: 0.55, leads: 0.2, conversion: 0.4 },
    buyer: { b2c: 0.85, b2b: 0.15 }, minBudget: 5000,
    ages: ['13-17', '18-24', '25-34', '35-44'],
    cpc: '$5,000+ per post', cac: '$100–$400+ CAC',
    pros: [
      'Fastest way to buy broad awareness and cultural credibility',
      'Content often gets reused across other channels afterward',
    ],
    cons: [
      'Weakest direct conversion return on this list relative to spend',
      'High minimum spend and low targeting precision',
    ],
  },
  {
    id: 'x', name: 'X (Twitter) Ads', type: 'Social · real-time',
    fit: { awareness: 0.55, consideration: 0.5, leads: 0.35, conversion: 0.35 },
    buyer: { b2c: 0.5, b2b: 0.45 }, minBudget: 400,
    ages: ['25-34', '35-44', '45-60'],
    cpc: '$0.50–$2 CPC', cac: '$40–$100 CAC',
    pros: [
      'Good for real-time relevance — news, launches, cultural moments',
      'Reaches media, tech and finance-adjacent audiences well',
    ],
    cons: [
      'Smaller and less predictable reach than it once had',
      'Brand-safety concerns have pushed many advertisers to reduce spend',
    ],
  },
];

export const GOAL_LABELS = {
  awareness: 'awareness',
  consideration: 'consideration/traffic',
  leads: 'lead generation',
  conversion: 'direct conversion',
};

export function labelGoal(goal) {
  return GOAL_LABELS[goal] || goal;
}

/**
 * Scores every channel against a company's inputs.
 * Weights: goal fit 45%, buyer-type fit 25%, age-range match 15%,
 * budget adequacy 10%, "already active there" bonus 5%.
 */
export function scoreChannels(inputs) {
  return CHANNELS.map((c) => {
    let s = 0;
    const weight = 100;

    s += (c.fit[inputs.goal] ?? 0.4) * 45;
    s += (c.buyer[inputs.buyer] ?? 0.4) * 25;

    const ageHit = c.ages.includes(inputs.age) ? 1 : 0.25;
    s += ageHit * 15;

    let budgetScore;
    if (inputs.budget >= c.minBudget) {
      budgetScore = Math.min(1, 0.6 + (inputs.budget / c.minBudget) * 0.08);
    } else {
      budgetScore = Math.max(0.1, (inputs.budget / c.minBudget) * 0.5);
    }
    s += budgetScore * 10;

    const known = (inputs.known || []).some((k) => {
      const kLower = k.toLowerCase();
      return (
        c.name.toLowerCase().includes(kLower) ||
        (k === 'Facebook' && c.id === 'meta') ||
        (k === 'Instagram' && c.id === 'meta')
      );
    });
    s += (known ? 1 : 0) * 5;

    const pct = Math.round((s / weight) * 100);
    return {
      ...c,
      score: Math.max(4, Math.min(99, pct)),
      belowMin: inputs.budget < c.minBudget * 0.5,
    };
  }).sort((a, b) => b.score - a.score);
}

export function reasonFor(channel, inputs) {
  const bits = [];
  bits.push(
    `Scores well for ${labelGoal(inputs.goal)} with a ${inputs.buyer === 'b2b' ? 'B2B' : 'consumer'} audience.`
  );
  if (channel.belowMin) {
    bits.push(
      'Your budget is below where this channel typically performs — expect thin, noisy results until spend increases.'
    );
  } else if (inputs.budget < channel.minBudget) {
    bits.push('Workable at your budget, but more headroom would improve consistency.');
  }
  return bits.join(' ');
}
