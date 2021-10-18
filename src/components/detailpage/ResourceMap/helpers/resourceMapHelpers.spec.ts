import * as network from '@mvanmaele/mvanmaele-test.viz.network'
import {
  getResourceMapData,
  getFullResourceMapData,
} from './resourceMapHelpers'
import { MOCK_GRAPH_DATA, MOCK_RESOURCE_DATA } from '../ResourceMap.spec'

describe('getFullResourceMapData', () => {
  it('should always include one node for each resource', () => {
    const fullResourceMapData: network.AppGraphData = getFullResourceMapData(
      [{ data: MOCK_RESOURCE_DATA }],
      ['Auto_other_resources_cited'],
      'Resource_name',
      'Resource_name'
    )
    expect(
      fullResourceMapData.nodes.length === MOCK_GRAPH_DATA.nodes.length
    ).toStrictEqual(true)
  })
})
describe('getResourceMapData', () => {
  it('should always return the resource itself', () => {
    const resourceMapData: network.AppGraphData = getResourceMapData(
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
