import { renderHook } from '@testing-library/react-hooks'
import { useApplications } from 'libs/domains/application/src/lib/provider/applications-provider'

describe('Applications Provider', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useApplications())

    expect(result).toBeTruthy()
  })
})