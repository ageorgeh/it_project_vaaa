/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'
import MyBooks from './MyBooks'
import mockAxios from 'axios'
import { render, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

jest.mock('axios')
mockAxios.post.mockImplementation(() => Promise.resolve({ data: { title: 'mock book title' } }))
useAuthState.mockReturnValue([true, false])

it('displays mybooks', () => {
  const component = renderer.create(
    <BrowserRouter>
    <MyBooks />
    </BrowserRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

describe('api calls working', () => {
  // afterEach(jest.clearAllMocks)
  render(<BrowserRouter><MyBooks /></BrowserRouter>)
  // it('gets book title', async () => {
  //   await waitFor(() => {
  //     expect(screen.getByText('mock book title')).toBeInTheDocument()
  //   })
  //   expect(mockAxios.post()).toHaveBeenCalled()
  // })
})
