import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { databasesLoadingStatus, getDatabasesState } from '@qovery/domains/database'
import { type DatabaseEntity, type LoadingStatus } from '@qovery/shared/interfaces'
import { type BaseLink } from '@qovery/shared/ui'
import { type RootState } from '@qovery/state/store'
import PageGeneral from '../../ui/page-general/page-general'

export function PageGeneralFeature() {
  const { databaseId = '' } = useParams()
  const database = useSelector<RootState, DatabaseEntity | undefined>(
    (state) => getDatabasesState(state).entities[databaseId]
  )
  const listHelpfulLinks: BaseLink[] = [
    {
      link: 'https://hub.qovery.com/docs/using-qovery/configuration/database',
      linkLabel: 'How to manage my database',
      external: true,
    },
  ]
  const loadingStatus = useSelector<RootState, LoadingStatus>((state) => databasesLoadingStatus(state))

  return <PageGeneral database={database} listHelpfulLinks={listHelpfulLinks} loadingStatus={loadingStatus} />
}

export default PageGeneralFeature
