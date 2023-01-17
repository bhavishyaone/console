import { useLocation, useParams } from 'react-router-dom'
import { ClusterButtonsActions } from '@qovery/shared/console-shared'
import { ClusterEntity } from '@qovery/shared/interfaces'
import { CLUSTER_SETTINGS_URL, CLUSTER_URL } from '@qovery/shared/routes'
import { Header, Icon, IconAwesomeEnum, Skeleton, Tabs, Tag, TagSize } from '@qovery/shared/ui'

export interface ContainerProps {
  children: React.ReactNode
  cluster?: ClusterEntity
}

export function Container(props: ContainerProps) {
  const { children, cluster } = props
  const { organizationId = '', clusterId = '' } = useParams()
  const { pathname } = useLocation()

  const statusLoading = !!cluster?.extendedStatus?.status?.status

  const headerActions = (
    <>
      <Skeleton width={150} height={32} show={!statusLoading}>
        {cluster ? (
          <>
            <ClusterButtonsActions cluster={cluster} noSettings />
            <span className="ml-4 mr-1 mt-2 h-4 w-[1px] bg-element-light-lighter-400"></span>
          </>
        ) : (
          <div />
        )}
      </Skeleton>
      {cluster?.production && (
        <Tag size={TagSize.BIG} className="text-brand-500 border border-brand-500 bg-brand-50 truncate">
          PROD
        </Tag>
      )}
      {cluster?.is_default && (
        <Tag size={TagSize.BIG} className="text-accent2-500 border border-accent2-500 bg-accent2-50 truncate">
          DEFAULT
        </Tag>
      )}
      <Skeleton width={120} height={32} show={!cluster}>
        <Tag size={TagSize.BIG} className="text-text-500 border border-element-light-lighter-400 truncate">
          {cluster?.region}
        </Tag>
      </Skeleton>
      <Skeleton width={120} height={32} show={!cluster}>
        <Tag size={TagSize.BIG} className="text-text-500 border border-element-light-lighter-400 truncate">
          {cluster?.version}
        </Tag>
      </Skeleton>
      <Skeleton width={120} height={32} show={!cluster}>
        <Tag size={TagSize.BIG} className="text-text-500 border border-element-light-lighter-400 truncate">
          {cluster?.instance_type}
        </Tag>
      </Skeleton>
    </>
  )

  const tabsItems = [
    {
      icon: <Icon name={IconAwesomeEnum.WHEEL} className="w-4 mt-0.5" />,
      name: 'Settings',
      active: pathname.includes(CLUSTER_URL(organizationId, clusterId) + CLUSTER_SETTINGS_URL),
      link: `${CLUSTER_URL(organizationId, clusterId)}${CLUSTER_SETTINGS_URL}`,
    },
  ]

  return (
    <>
      <Header title={cluster?.name} icon={cluster?.cloud_provider} iconClassName="w-10 mr-3" actions={headerActions} />
      <Tabs items={tabsItems} />
      <div className="flex-grow flex-col flex">{children}</div>
    </>
  )
}

export default Container