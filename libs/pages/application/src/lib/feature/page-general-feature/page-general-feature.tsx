import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useEnvironment } from '@qovery/domains/environments/feature'
import { useService } from '@qovery/domains/services/feature'
import { type BaseLink } from '@qovery/shared/ui'
import { MetricsWebSocketListener } from '@qovery/shared/util-web-sockets'
import PageGeneral from '../../ui/page-general/page-general'

// XXX: Prevent web-socket invalidations when re-rendering
const WebSocketListenerMemo = memo(MetricsWebSocketListener)

export function PageGeneralFeature() {
  const { applicationId = '', organizationId = '', projectId = '', environmentId = '' } = useParams()
  const { data: service } = useService({ environmentId, serviceId: applicationId })
  const listHelpfulLinks: BaseLink[] = [
    {
      link: 'https://hub.qovery.com/docs/using-qovery/configuration/application',
      linkLabel: 'How to manage my application',
    },
  ]

  const { data: environment } = useEnvironment({ environmentId })

  return (
    <>
      <PageGeneral
        isCronJob={service?.serviceType === 'JOB' && service.job_type === 'CRON'}
        listHelpfulLinks={listHelpfulLinks}
      />
      {service && environment && (
        <WebSocketListenerMemo
          organizationId={organizationId}
          clusterId={environment.cluster_id}
          projectId={projectId}
          environmentId={environmentId}
          serviceId={applicationId}
          serviceType={service.serviceType}
        />
      )}
    </>
  )
}

export default PageGeneralFeature
