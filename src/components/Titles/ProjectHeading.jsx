import React from 'react';

function ProjectHeading({
  title = 'Default Title',
  titleClassName = '',
  parentClassName = '',
}) {
  return (
    <div
      className={`sticky z-10 top-0 bg-white flex justify-between py-6 ${parentClassName}`}
    >
      <h1 className={`font-medium text-5xl sf-medium ${titleClassName}`}>
        {title}
      </h1>
    </div>
  );
}

export default ProjectHeading;
