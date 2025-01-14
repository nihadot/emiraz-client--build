import React from 'react'
import ProjectHeading from '../../components/Titles/ProjectHeading'
import ProjectWrapper from '../../components/ProjectWrapper/ProjectWrapper'
import AdminAddProject from '../../components/AdminAddProject/AdminAddProject'

function AddProjectPage() {
  return (
    <div>
    <ProjectHeading title='Add Project' />
    <ProjectWrapper>
      <AdminAddProject />
    </ProjectWrapper>
  </div>
  )
}

export default AddProjectPage