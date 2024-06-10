import { AppGraphData } from '../../../../../../viz/charts/network-tools'
import { getResourceMapData, getFullResourceMapData } from './packageMethods'
import { MOCK_GRAPH_DATA, MOCK_RESOURCE_DATA } from '../ResourceMap.spec'

describe('getFullResourceMapData', () => {
  it('should always include one node for each resource', () => {
    const fullResourceMapData: AppGraphData = getFullResourceMapData(
      [{ data: MOCK_RESOURCE_DATA }],
      ['Resources_cited'],
      'Resource_name',
      'Record_ID_INTERNAL'
    )
    expect(
      fullResourceMapData.nodes.length === MOCK_GRAPH_DATA.nodes.length
    ).toStrictEqual(true)
  })
})
describe('getResourceMapData', () => {
  it('should always return the resource itself', () => {
    const resourceMapData: AppGraphData = getResourceMapData(
      'Test',
      MOCK_GRAPH_DATA
    )
    const testNodeInData: boolean = resourceMapData.nodes
      .map(n => n._id)
      .includes('Test')
    expect(testNodeInData).toStrictEqual(true)
  })
  it('should throw error if defined resource not found', () => {
    expect(() =>
      getResourceMapData('Missing node name', MOCK_GRAPH_DATA)
    ).toThrowError()
  })
})
