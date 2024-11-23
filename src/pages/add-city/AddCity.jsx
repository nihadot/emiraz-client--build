import React from 'react'
import ProjectHeading from '../../components/Titles/ProjectHeading'
import ProjectWrapper from '../../components/ProjectWrapper/ProjectWrapper'
import AdminAddCities from "../../components/AddCity/AddCity"
function AddCity() {
  return (
    <div className="">
    <ProjectHeading title='Add Cities' />
    <ProjectWrapper>
        <AdminAddCities />
    </ProjectWrapper>
</div>
  )
}

export default AddCity