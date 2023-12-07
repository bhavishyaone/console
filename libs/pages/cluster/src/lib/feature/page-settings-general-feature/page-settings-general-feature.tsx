import { type Cluster } from 'qovery-typescript-axios'
import { useEffect } from 'react'
import { type FieldValues, FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useCluster, useEditCluster } from '@qovery/domains/clusters/feature'
import PageSettingsGeneral from '../../ui/page-settings-general/page-settings-general'

export const handleSubmit = (data: FieldValues, cluster: Cluster) => {
  return {
    ...cluster,
    name: data['name'],
    description: data['description'] || '',
    production: data['production'],
  }
}

export function PageSettingsGeneralFeature() {
  const { organizationId = '', clusterId = '' } = useParams()

  const methods = useForm({
    mode: 'onChange',
  })

  const { data: cluster } = useCluster({ organizationId, clusterId })
  const { mutateAsync: editCluster, isLoading: isEditClusterLoading } = useEditCluster()

  const onSubmit = methods.handleSubmit((data) => {
    if (data && cluster) {
      const cloneCluster = handleSubmit(data, cluster)

      editCluster({
        organizationId,
        clusterId,
        clusterRequest: cloneCluster,
      })
    }
  })

  useEffect(() => {
    methods.setValue('name', cluster?.name)
    methods.setValue('description', cluster?.description)
    methods.setValue('production', cluster?.production)
  }, [methods, cluster?.name, cluster?.description, cluster?.production])

  return (
    <FormProvider {...methods}>
      <PageSettingsGeneral onSubmit={onSubmit} loading={isEditClusterLoading} />
    </FormProvider>
  )
}

export default PageSettingsGeneralFeature
