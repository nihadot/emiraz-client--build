import React from 'react'
import ProjectHeading from '../../components/Titles/ProjectHeading'
import ProjectWrapper from '../../components/ProjectWrapper/ProjectWrapper'
import ViewDevelopers from "../../components/ViewDevelopers/ViewDevelopers"
function ViewDevelopersPage() {
  return (
    <div className="">
            <ProjectHeading title='View Developers' />
            <ProjectWrapper>
                <ViewDevelopers />
            </ProjectWrapper>
        </div>
  )
}

export default ViewDevelopersPage