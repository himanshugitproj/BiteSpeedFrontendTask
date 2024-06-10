import React from 'react';
import { Handle } from 'react-flow-renderer';

const TextNode = ({ data }) => {
  return (
    <div className="text-node">
      <Handle type="target" position="bottom" />
      <div>{data.text}</div>
      <Handle type="source" position="right" />
    </div>
  );
};

export default TextNode;
