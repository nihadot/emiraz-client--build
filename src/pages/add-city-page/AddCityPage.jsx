import React from 'react'
import ProjectHeading from '../../components/Titles/ProjectHeading'
import ProjectWrapper from '../../components/ProjectWrapper/ProjectWrapper'
import AddCity from "../../components/AddCity/AddCity"
function AddCityPage() {
  return (
    <div className="">
      <ProjectHeading title='Add Cities' />
      <ProjectWrapper>
        <AddCity />
      </ProjectWrapper>
    </div>
  )
}

export default AddCityPage