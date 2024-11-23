import React from 'react'
import ProjectHeading from '../../components/Titles/ProjectHeading'
import ProjectWrapper from '../../components/ProjectWrapper/ProjectWrapper'
import AdminViewCities from "../../components/ViewCities/ViewCities"

function viewCities() {
    return (
        <div className="">
            <ProjectHeading title='View Cities' />
            <ProjectWrapper>
                <AdminViewCities />
            </ProjectWrapper>
        </div>
    )
}

export default viewCities