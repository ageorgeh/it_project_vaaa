import { render, screen } from '@testing-library/react'
import Login from './Login'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

test('should render Login component', () => {
  useAuthState.mockReturnValue([false, false])

  render(
        <BrowserRouter>
        <Login />
        </BrowserRouter>
  )
  expect(screen.getByPlaceholderText('Email')).not.toBeNull()
  expect(screen.getByPlaceholderText('Password')).not.toBeNull()
  expect(screen.getByText('Sign in with Google')).not.toBeNull()
})
