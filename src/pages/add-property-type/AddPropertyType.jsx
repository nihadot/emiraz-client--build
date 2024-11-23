import React from 'react'
import ProjectHeading from '../../components/Titles/ProjectHeading'
import ProjectWrapper from '../../components/ProjectWrapper/ProjectWrapper'
import AdminAddPropertyType from '../../components/AdminAddPropertyType/AdminAddPropertyType'

function AddPropertyType() {
  return (
    <div>
    <ProjectHeading title='Add Property Type' />
    <ProjectWrapper>
      <AdminAddPropertyType />
    </ProjectWrapper>
  </div>
  )
}

export default AddPropertyType