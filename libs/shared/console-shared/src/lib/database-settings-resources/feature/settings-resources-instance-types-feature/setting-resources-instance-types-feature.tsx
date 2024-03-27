import {
  CloudProviderEnum,
  type DatabaseTypeEnum,
  type ManagedDatabaseInstanceTypeResponse,
} from 'qovery-typescript-axios'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { match } from 'ts-pattern'
import { useCloudProviderDatabaseInstanceTypes } from '@qovery/domains/cloud-providers/feature'
import { useCluster } from '@qovery/domains/clusters/feature'
import { useEnvironment } from '@qovery/domains/environments/feature'
import SettingsResourcesInstanceTypes from '../../ui/settings-resources-instance-types/setting-resources-instance-types'

export interface SettingsResourcesInstanceTypesFeatureProps {
  databaseType: DatabaseTypeEnum
  displayWarning: boolean
}

export function SettingsResourcesInstanceTypesFeature({
  databaseType,
  displayWarning,
}: SettingsResourcesInstanceTypesFeatureProps) {
  const { organizationId = '', environmentId = '' } = useParams()

  const { data: environment } = useEnvironment({ environmentId })
  const { data: cluster } = useCluster({ organizationId, clusterId: environment?.cluster_id ?? '' })
  const { data: databaseInstanceTypes } = useCloudProviderDatabaseInstanceTypes(
    match(cluster?.cloud_provider || CloudProviderEnum.AWS)
      .with('AWS', (cloudProvider) => ({
        cloudProvider,
        databaseType,
        region: cluster?.region || '',
      }))
      .with('SCW', (cloudProvider) => ({
        cloudProvider,
        databaseType,
      }))
      .with('GCP', (cloudProvider) => ({
        cloudProvider,
        databaseType,
      }))
      .with('ON_PREMISE', (cloudProvider) => ({
        cloudProvider,
        databaseType,
      }))
      .exhaustive()
  )

  const formatDatabaseInstanceTypes = useMemo(
    () =>
      databaseInstanceTypes?.map((instanceType: ManagedDatabaseInstanceTypeResponse) => ({
        label: instanceType.name,
        value: instanceType.name,
      })),
    [databaseInstanceTypes]
  )

  return (
    <SettingsResourcesInstanceTypes
      databaseInstanceTypes={formatDatabaseInstanceTypes}
      displayWarning={displayWarning}
    />
  )
}

export default SettingsResourcesInstanceTypesFeature
