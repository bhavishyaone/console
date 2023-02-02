import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { CLUSTERS_CREATION_RESOURCES_URL, CLUSTERS_CREATION_URL, CLUSTERS_URL } from '@qovery/shared/routes'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCloudProvider, getClusterState } from '@qovery/domains/organization'
import { ClusterGeneralData } from '@qovery/shared/interfaces'
import { FunnelFlowBody, FunnelFlowHelpCard } from '@qovery/shared/ui'
import { useDocumentTitle } from '@qovery/shared/utils'
import { AppDispatch, RootState } from '@qovery/store'
import StepGeneral from '../../../ui/page-clusters-create/step-general/step-general'
import { useClusterContainerCreateContext } from '../page-clusters-create-feature'

export function StepGeneralFeature() {
  useDocumentTitle('General - Create Cluster')
  const { setGeneralData, generalData, setCurrentStep } = useClusterContainerCreateContext()
  const navigate = useNavigate()
  const { organizationId = '' } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const cloudProvider = useSelector((state: RootState) => getClusterState(state).cloudProvider)

  const funnelCardHelp = (
    <FunnelFlowHelpCard
      title="Cluster"
      items={[
        'A Kubernetes cluster is necessary to run your application and the Qovery services',
        'Since it runs on your cloud provider account, credentials are necessary to create and manage the cluster and the applications that will run on it',
        'The production flag allows to easily identify if you are running your production environment on this cluster',
      ]}
      helpSectionProps={{
        description: 'Need help? You may find these links useful',
        links: [
          {
            link: 'https://hub.qovery.com/docs/using-qovery/configuration/clusters/#managing-your-clusters-with-qovery',
            linkLabel: 'How to configure my cluster',
            external: true,
          },
          { link: 'https://discuss.qovery.com/', linkLabel: 'Still need help? Ask on our Forum', external: true },
        ],
      }}
    />
  )

  useEffect(() => {
    setCurrentStep(1)
  }, [setCurrentStep])

  const methods = useForm<ClusterGeneralData>({
    defaultValues: generalData,
    mode: 'onChange',
  })

  useEffect(() => {
    if (cloudProvider.loadingStatus !== 'loaded') dispatch(fetchCloudProvider())
  }, [cloudProvider.loadingStatus, dispatch, methods])

  const onSubmit = methods.handleSubmit((data) => {
    setGeneralData(data)
    const pathCreate = `${CLUSTERS_URL(organizationId)}${CLUSTERS_CREATION_URL}`
    navigate(pathCreate + CLUSTERS_CREATION_RESOURCES_URL)
  })

  return (
    <FunnelFlowBody helpSection={funnelCardHelp}>
      <FormProvider {...methods}>
        <StepGeneral onSubmit={onSubmit} cloudProviders={cloudProvider.items} />
      </FormProvider>
    </FunnelFlowBody>
  )
}

export default StepGeneralFeature