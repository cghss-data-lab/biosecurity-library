import React from 'react';

export type NetworkToolsProps = {
  /**
   * a text to be rendered in the component.
   */
  text: string
};

export function NetworkTools({ text }: NetworkToolsProps) {
  return (
    <div>
      {text}
    </div>
  );
}
