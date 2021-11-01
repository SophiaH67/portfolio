const nlKeys = ['nl', 'nl-BE', 'nl-NL']

export const isNL = () => typeof window == "undefined" ? false : nlKeys.includes(navigator.language)
