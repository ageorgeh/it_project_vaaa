import {render, screen, cleanup} from '@testing-library/react';
import Login from './Login';
import React from 'react'

test('should render Login component', () =>{
    render(<Login/>);
    const loginForm = screen.getByTestId('loginForm');
    expect(loginForm).toBeInTheDocument();
})