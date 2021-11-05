import React from 'react'
import { render } from '@testing-library/react'
import TEST_DATA from '../../../tests/testData'
import ResourceSetSection from './ResourceSetSection'

describe('ResourceSetSection', () => {
  it('should not render if there are no sets to show', () => {
    const resWithoutSets = TEST_DATA.find(d => d.Resource_sets === null)
    const { container } = render(
      <ResourceSetSection sets={resWithoutSets?.Resource_sets || null} />
    )
    expect(container.childElementCount).toStrictEqual(0)
  })
  it('should not render a set if it has only one member', () => {
    const resWithSets = getResWithSets(false)
    if (resWithSets === undefined || resWithSets?.Resource_sets === null) return
    const debugSet = [...resWithSets?.Resource_sets][0]

    const { container } = render(
      <ResourceSetSection
        sets={[
          {
            data: {
              ...debugSet.data,
              Resources_in_set: [debugSet.data.Resources_in_set[0]],
            },
          },
          {
            data: {
              ...debugSet.data,
              Resources_in_set: [
                debugSet.data.Resources_in_set[0],
                {
                  data: {
                    ...debugSet.data.Resources_in_set[0].data,
                    Record_ID_INTERNAL: 'TestID',
                  },
                },
              ],
            },
          },
        ]}
      />
    )
    expect(container.querySelectorAll('[data-title]').length).toStrictEqual(1)
  })
  it('should render one list item for each set member', () => {
    const resWithSets = getResWithSets()
    if (resWithSets?.Resource_sets === null) return

    const totalDocs = resWithSets?.Resource_sets.map(d =>
      d.data.Resources_in_set.map(dd => dd.data.Resource_name)
    ).flat().length
    const { container } = render(
      <ResourceSetSection sets={resWithSets?.Resource_sets || null} />
    )
    expect(container.querySelectorAll('[data-member]').length).toStrictEqual(
      totalDocs
    )
  })
  it('should render one description per set that has a description', () => {
    const resWithSets = getResWithSets(true)
    if (resWithSets?.Resource_sets === null) return
    const totalDescs = resWithSets?.Resource_sets.filter(
      s => s.data.Description !== null && s.data.Description !== ''
    ).length
    const { container } = render(
      <ResourceSetSection sets={resWithSets?.Resource_sets || null} />
    )
    expect(container.querySelectorAll('[data-desc]').length).toStrictEqual(
      totalDescs
    )
  })
  it('should render one title per set', () => {
    const resWithSets = getResWithSets()
    if (resWithSets?.Resource_sets === null) return
    const totalTitles = resWithSets?.Resource_sets.length
    const { container } = render(
      <ResourceSetSection sets={resWithSets?.Resource_sets || null} />
    )
    expect(container.querySelectorAll('[data-title]').length).toStrictEqual(
      totalTitles
    )
  })
})

/**
 * Returns a resource that has sets
 * @param requireDesc True if a non-null set description is required
 * @param requireOnlyMember True if resource must be the only member of at
 * least one of its sets
 * @returns The resource
 */
function getResWithSets(
  requireDesc: boolean = false,
  requireOnlyMember: boolean = false
) {
  const resWithSets = TEST_DATA.find(
    d =>
      d.Resource_sets !== null &&
      d.Resource_sets.length > 0 &&
      (!requireDesc ||
        d.Resource_sets.some(
          s => s.data.Description !== null && s.data.Description !== ''
        )) &&
      (!requireOnlyMember ||
        d.Resource_sets.some(s => s.data.Resources_in_set.length === 1))
  )

  if (
    resWithSets?.Resource_sets === null ||
    resWithSets?.Resource_sets.length === 0
  )
    throw new Error(
      'This test requires a resource with non-null `Resource_sets`.'
    )
  return resWithSets
}
