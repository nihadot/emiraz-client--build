import React from 'react';

function ProjectWrapper({ children }) {
  return <div className='max-h-[83vh] h-fit overflow-y-auto'>{children}</div>;
}

export default ProjectWrapper;
