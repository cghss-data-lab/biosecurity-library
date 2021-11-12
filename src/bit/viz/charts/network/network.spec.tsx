import 'regenerator-runtime/runtime'
import React from 'react'
import { render } from '@testing-library/react'
import { BasicNetwork } from './network.composition'
import { AirtableDataSource, DataSource } from './helpers'

it('should render with one canvas element', () => {
  const { container } = render(<BasicNetwork />)
  const canvases: NodeListOf<HTMLCanvasElement> = container.querySelectorAll(
    'canvas'
  )
  expect(canvases.length).toEqual(1)
})

it('should have no circular dependency issues', () => {
  expect(DataSource !== undefined).toStrictEqual(true)
  expect(AirtableDataSource !== undefined).toStrictEqual(true)
})
