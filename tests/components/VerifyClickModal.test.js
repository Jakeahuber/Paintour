import React from 'react';
import VerifyClickModal from '../../components/VerifyClickModal.js';
import { render, screen } from '@testing-library/react-native';

describe('<VerifyClickModal />', () => {
  it('should show the message', () => {
    render(
      <VerifyClickModal 
        modalVisible={true}
        message="Are you sure?"
        onCancel={() => {}}
        onConfirm={() => {}}
        confirmText="Confirm"
      />
    );
    const messageText = screen.getByTestId("messageText");
    expect(messageText.props.children).toBe("Are you sure?");  
  });

  it('should not show the message', () => {
    render(
      <VerifyClickModal 
        modalVisible={false}
        message="Are you sure?"
        onCancel={() => {}}
        onConfirm={() => {}}
        confirmText="Confirm"
      />
    );

    expect(messageText).not.toBeTruthy();
  });
});