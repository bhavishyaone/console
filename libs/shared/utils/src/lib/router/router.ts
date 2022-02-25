export const INDEX_URL = '/'
export const OVERVIEW_URL = '/overview'
export const LOGIN_URL = '/login'
export const ONBOARDING_URL = '/onboarding'
export const ONBOARDING_PERSONALIZE_URL = '/personalize'
export const ONBOARDING_COMPANY_URL = '/company'
export const ONBOARDING_MORE_URL = '/more'
export const ONBOARDING_PRICING_URL = '/pricing'

export interface Route {
  component: React.ReactElement
  path: string
}
