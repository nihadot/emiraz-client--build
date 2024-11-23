import React from 'react'
import ProjectHeading from '../../components/Titles/ProjectHeading'
import ProjectWrapper from '../../components/ProjectWrapper/ProjectWrapper'
import AddDeveloper from "../../components/AddDeveloper/AddDeveloper"
function AddDeveloperPage() {
  return (
    <div className="">
      <ProjectHeading title='Add Developer' />
      <ProjectWrapper>
        <AddDeveloper />
      </ProjectWrapper>
    </div>
  )
}

export default AddDeveloperPage