import { StepPricing } from '@console/pages/onboarding/ui'
import { Value, Price } from '@console/shared/interfaces'
import { PlanEnum } from '@console/shared/ui'
import { ONBOARDING_PRICING_URL, ONBOARDING_URL, useDocumentTitle } from '@console/shared/utils'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

export interface Plan {
  name: string
  title: string
  text: string
  price?: number
  listPrice: Price[]
  listDeploy: Value[]
}

const DEPLOYS: Value[] = [
  { label: '100/month', value: '100' },
  { label: '200/month', value: '200' },
  { label: '300/month', value: '300' },
  { label: '400/month', value: '400' },
  { label: '500/month', value: '500' },
  { label: '600/month', value: '600' },
  { label: '700/month', value: '700' },
  { label: '800/month', value: '800' },
  { label: '900/month', value: '900' },
  { label: '1000/month', value: '1000' },
  { label: '1100/month', value: '1100' },
  { label: '1200/month', value: '1200' },
  { label: '1300/month', value: '1300' },
  { label: '1400/month', value: '1400' },
  { label: '1500/month', value: '1500' },
  { label: '1600/month', value: '1600' },
  { label: '1700/month', value: '1700' },
  { label: '1800/month', value: '1800' },
  { label: '1900/month', value: '1900' },
  { label: '2000/month', value: '2000' },
  { label: '3000/month', value: '3000' },
  { label: '4000/month', value: '4000' },
]

const PLANS: Plan[] = [
  {
    name: PlanEnum.FREE,
    title: 'Free',
    text: 'Adapted for personnal project',
    price: 0,
    listDeploy: [],
    listPrice: [],
  },
  {
    name: PlanEnum.PRO,
    title: 'Professional',
    text: 'For 5-20 members',
    price: 49,
    listDeploy: [
      { label: '300/month', value: '300' },
      { label: '400/month', value: '400' },
      { label: '500/month', value: '500' },
      { label: '600/month', value: '600' },
      { label: '700/month', value: '700' },
      { label: '800/month', value: '800' },
      { label: '900/month', value: '900' },
      { label: '1000/month', value: '1000' },
      { label: '2000/month', value: '2000' },
      { label: '3000/month', value: '3000' },
    ],
    listPrice: [
      { number: '300', price: '49' },
      { number: '400', price: '99' },
      { number: '500', price: '149' },
      { number: '600', price: '199' },
      { number: '700', price: '249' },
      { number: '800', price: '299' },
      { number: '900', price: '349' },
      { number: '1000', price: '399' },
      { number: '2000', price: '899' },
      { number: '3000', price: '1399' },
    ],
  },
  {
    name: PlanEnum.BUSINESS,
    title: 'Business',
    text: 'For medium compagny',
    price: 399,
    listDeploy: [
      { label: '1000/month', value: '1000' },
      { label: '1100/month', value: '1100' },
      { label: '1200/month', value: '1200' },
      { label: '1300/month', value: '1300' },
      { label: '1400/month', value: '1400' },
      { label: '1500/month', value: '1500' },
      { label: '1600/month', value: '1600' },
      { label: '1700/month', value: '1700' },
      { label: '1800/month', value: '1800' },
      { label: '1900/month', value: '1900' },
      { label: '2000/month', value: '2000' },
      { label: '3000/month', value: '3000' },
      { label: '4000/month', value: '4000' },
    ],
    listPrice: [
      { number: '1000', price: '599' },
      { number: '1100', price: '649' },
      { number: '1200', price: '699' },
      { number: '1300', price: '749' },
      { number: '1400', price: '799' },
      { number: '1500', price: '849' },
      { number: '1600', price: '899' },
      { number: '1700', price: '949' },
      { number: '1800', price: '999' },
      { number: '1900', price: '1049' },
      { number: '2000', price: '1099' },
      { number: '3000', price: '1599' },
      { number: '4000', price: '2099' },
    ],
  },
  {
    name: PlanEnum.ENTERPRISE,
    title: 'Enterprise',
    text: 'For large compagny',
    price: 0,
    listDeploy: [],
    listPrice: [],
  },
]

const PLAN_DEFAULT: string = PlanEnum.FREE
const DEPLOY_DEFAULT: Value = DEPLOYS[0]
const DEFAULT_VALUE = {
  [PlanEnum.PRO]: PLANS.find((p) => p.name === PlanEnum.PRO)?.listDeploy[0],
  [PlanEnum.BUSINESS]: PLANS.find((p) => p.name === PlanEnum.BUSINESS)?.listDeploy[0],
}

const DEFAULT_PRICE = {
  [PlanEnum.FREE]: { disable: false },
  [PlanEnum.PRO]: { number: PLANS.find((p) => p.name === PlanEnum.PRO)?.listPrice[0].number, disable: false },
  [PlanEnum.BUSINESS]: { number: PLANS.find((p) => p.name === PlanEnum.BUSINESS)?.listPrice[0].number, disable: false },
  [PlanEnum.ENTERPRISE]: { disable: false },
}

export function OnboardingPricing() {
  useDocumentTitle('Onboarding Pricing - Qovery')

  const navigate = useNavigate()
  const [select, setSelect] = useState(PLAN_DEFAULT)
  const [currentValue, setCurrentValue] = useState(DEFAULT_PRICE)
  const [currentDeploy, setCurrentDeploy] = useState(DEPLOY_DEFAULT)

  const displayDeploy = select === PlanEnum.PRO || select === PlanEnum.BUSINESS

  useEffect(() => {
    navigate(`${ONBOARDING_URL}${ONBOARDING_PRICING_URL}/${select}`)
  }, [select, navigate])

  const chooseDeploy = (value: Value | null) => {
    if (value) {
      setCurrentDeploy(value)

      if(parseFloat(value.value) > 300) {
        setSelect(PlanEnum.PRO)
        setCurrentValue({
          [PlanEnum.FREE]: { disable: true },
          [PlanEnum.PRO]: { number: value?.value, disable: false },
          [PlanEnum.BUSINESS]: { number: value?.value, disable: false },
          [PlanEnum.ENTERPRISE]: { disable: false },
        })
      } else {
        setCurrentValue({
          [PlanEnum.FREE]: { disable: false },
          [PlanEnum.PRO]: { number: value?.value, disable: false },
          [PlanEnum.BUSINESS]: { number: value?.value, disable: false },
          [PlanEnum.ENTERPRISE]: { disable: false },
        })
      }
    }
  }

  return (
    <StepPricing
      select={select}
      setSelect={setSelect}
      defaultValue={DEFAULT_VALUE}
      currentValue={currentValue}
      plans={PLANS}
      displayDeploy={displayDeploy}
      chooseDeploy={chooseDeploy}
      deploys={DEPLOYS}
      currentDeploy={currentDeploy}
    />
  )
}

export default OnboardingPricing