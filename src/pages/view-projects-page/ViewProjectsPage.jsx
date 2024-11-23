import React from 'react'
import ProjectHeading from '../../components/Titles/ProjectHeading'
import ProjectWrapper from '../../components/ProjectWrapper/ProjectWrapper'
import AdminViewProjects from "../../components/AdminViewProjects/AdminViewProjects"
function ViewProjectsPage() {
  return (
    <div className="">
    <ProjectHeading title='View Projects' />
    <ProjectWrapper>
        <AdminViewProjects />
    </ProjectWrapper>
</div>
  )
}

export default ViewProjectsPage