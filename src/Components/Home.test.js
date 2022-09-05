/* eslint-disable no-unused-vars */

import renderer from 'react-test-renderer'
import Home from './Home'
import React from 'react'
import { getQueriesForElement } from '@testing-library/dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useAuthState } from './__mocks__/react-firebase-hooks/auth'

it('displays home', () => {
  useAuthState.mockReturnValue([true, false])

  const { getByText } = render(
    <BrowserRouter>
    <Home />
    </BrowserRouter>
  )

  expect(getByText('Home')).not.toBeNull()
})
