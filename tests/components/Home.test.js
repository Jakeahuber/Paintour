import React from 'react';
import Home from '../../components/Home.tsx';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn()
  })),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('<Home />', () => {

  it('Should show that the user has not uploaded sketch today.', () => {
    jest.mock('valtio', () => ({
      useSnapshot: jest.fn(() => ({
        uploadedToday: false,
      })),
    }));

    render(<Home/>);
    const noSketchToday = screen.queryByTestId("noSketchToday");
    expect(noSketchToday).toBeTruthy();
  });
});