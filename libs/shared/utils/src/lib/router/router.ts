export const INDEX_URL = '/'
export const OVERVIEW_URL = '/overview'
export const LOGIN_URL = '/login'
export const ONBOARDING_URL = '/onboarding'
export const ONBOARDING_PERSONALIZE_URL = '/personalize'
export const ONBOARDING_COMPANY_URL = '/company'
export const ONBOARDING_MORE_URL = '/more'
export const ONBOARDING_PRICING_URL = '/pricing'
export const ONBOARDING_PRICING_FREE_URL = `${ONBOARDING_PRICING_URL}/free`
export const ONBOARDING_PRICING_PRO_URL = `${ONBOARDING_PRICING_URL}/professional`
export const ONBOARDING_PRICING_BUSINESS_URL = `${ONBOARDING_PRICING_URL}/business`
export const ONBOARDING_PRICING_ENTERPRISE_URL = `${ONBOARDING_PRICING_URL}/enterprise`
export const ONBOARDING_PROJECT_URL = '/project'

export interface Route {
  component: React.ReactElement
  path: string
}
