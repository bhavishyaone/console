import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Environment } from 'qovery-typescript-axios'
import { APPLICATION_GENERAL_URL, SERVICES_URL } from '@console/shared/router'
import { useDocumentTitle } from '@console/shared/utils'
import {
  deleteEnvironmentActionsCancelDeployment,
  postEnvironmentActionsCancelDeployment,
  postEnvironmentActionsDeploy,
  postEnvironmentActionsRestart,
  postEnvironmentActionsStop,
  selectEnvironmentById,
} from '@console/domains/environment'
import { AppDispatch, RootState } from '@console/store/data'
import { ROUTER_SERVICES } from './router/router'
import { useEffect } from 'react'
import Container from './ui/container/container'

export function PageServices() {
  useDocumentTitle('Services - Qovery')
  const { organizationId = '', projectId = '', environmentId = '' } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const environment = useSelector<RootState, Environment | undefined>((state) =>
    selectEnvironmentById(state, environmentId)
  )

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (location.pathname === SERVICES_URL(organizationId, projectId, environmentId)) {
      navigate(`${SERVICES_URL(organizationId, projectId, environmentId)}${APPLICATION_GENERAL_URL}`)
    }
  }, [location, navigate, organizationId, projectId, environmentId])

  const statusActions = [
    {
      name: 'redeploy',
      action: () => dispatch(postEnvironmentActionsRestart({ projectId, environmentId })),
    },
    {
      name: 'deploy',
      action: () => dispatch(postEnvironmentActionsDeploy({ projectId, environmentId })),
    },
    {
      name: 'stop',
      action: () => dispatch(postEnvironmentActionsStop({ projectId, environmentId })),
    },
    {
      name: 'cancel-deployment',
      action: () => dispatch(postEnvironmentActionsCancelDeployment({ projectId, environmentId })),
    },
    {
      name: 'delete',
      action: () => dispatch(deleteEnvironmentActionsCancelDeployment({ projectId, environmentId })),
    },
  ]

  return (
    <Container environment={environment} statusActions={statusActions}>
      <Routes>
        {ROUTER_SERVICES.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </Container>
  )
}

export default PageServices