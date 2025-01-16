import React from 'react';
import { setClassName } from '../../app/utils';

const TreeNode = ({ node, onToggle }) => {
  const hasChildren = node.children && node.children.length > 0;
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onToggle(node.id, !isExpanded);
  };

  return (
    <div style={{ paddingLeft: 10 }}>
      <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
        {hasChildren ? (
          isExpanded ? (
            <i className={setClassName('dash-square')}></i>
          ) : (
            <i className={setClassName('plus-square')}></i>
          )
        ) : (
          ''
        )}{' '}
        {node.name}
      </div>
      {isExpanded && hasChildren && (
        <ul>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} onToggle={onToggle} />
          ))}
        </ul>
      )}
    </div>
  );
};

const TreeList = ({ data }) => {
  return (
    <div>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} onToggle={() => {}} />
      ))}
    </div>
  );
};

export default TreeList;
