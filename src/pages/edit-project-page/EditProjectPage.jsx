import React from 'react'
import ProjectHeading from '../../components/Titles/ProjectHeading'
import ProjectWrapper from '../../components/ProjectWrapper/ProjectWrapper'
import AdminEditProject from "../../components/AdminEditProject/AdminEditProject"
function EditProjectPage() {
  return (
    <div className="">
    <ProjectHeading title='Edit Project' />
    <ProjectWrapper>
        <AdminEditProject />
    </ProjectWrapper>
</div>
  )
}

export default EditProjectPage