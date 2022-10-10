/* eslint-disable no-unused-vars */

import Home from './Home'
import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

it('displays home', () => {
  // jest.mock('react-firebase-hooks/auth')
  useAuthState.mockReturnValue([true, false])

  const { getByText } = render(
    <BrowserRouter>
    <Home />
    </BrowserRouter>
  )

  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByText('Home')).not.toBeNull()
})
