import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { mutations } from '@qovery/domains/services/data-access'
import { ENVIRONMENT_LOGS_URL } from '@qovery/shared/routes'
import { queries } from '@qovery/state/util-queries'

export interface UseDeployAllServicesProps {
  organizationId: string
  projectId: string
}

export function useDeployAllServices({ organizationId, projectId }: UseDeployAllServicesProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation(mutations.deployAllServices, {
    onSuccess(_, { environmentId, payload }) {
      queryClient.invalidateQueries({
        queryKey: queries.services.listStatuses(environmentId).queryKey,
      })
      // NOTE: This is to invalidate deployed git_commit_id cache
      for (const { application_id: serviceId } of payload.applications ?? []) {
        queryClient.invalidateQueries({
          queryKey: queries.services.details({ serviceId, serviceType: 'APPLICATION' }).queryKey,
        })
      }
      for (const { id: serviceId } of payload.containers ?? []) {
        queryClient.invalidateQueries({
          queryKey: queries.services.details({ serviceId, serviceType: 'CONTAINER' }).queryKey,
        })
      }
      for (const id of payload.databases ?? []) {
        queryClient.invalidateQueries({
          queryKey: queries.services.details({ serviceId: id, serviceType: 'DATABASE' }).queryKey,
        })
      }
      for (const { id: serviceId } of payload.helms ?? []) {
        if (serviceId) {
          queryClient.invalidateQueries({
            queryKey: queries.services.details({ serviceId, serviceType: 'HELM' }).queryKey,
          })
        }
      }
      for (const { id: serviceId } of payload.jobs ?? []) {
        if (serviceId) {
          queryClient.invalidateQueries({
            queryKey: queries.services.details({ serviceId, serviceType: 'JOB' }).queryKey,
          })
        }
      }
    },
    meta: {
      notifyOnSuccess(_: unknown, variables: unknown) {
        const { environmentId } = variables as Parameters<typeof mutations.deployAllServices>[0]
        return {
          title: 'Your environment are being updated',
          labelAction: 'See Deployment Logs',
          callback() {
            navigate(ENVIRONMENT_LOGS_URL(organizationId, projectId, environmentId))
          },
        }
      },
      notifyOnError: true,
    },
  })
}

export default useDeployAllServices
