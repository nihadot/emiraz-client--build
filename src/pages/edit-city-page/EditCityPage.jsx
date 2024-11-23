import ProjectWrapper from "../../components/ProjectWrapper/ProjectWrapper"
import ProjectHeading from "../../components/Titles/ProjectHeading"
import EditCity from "../../components/EditCity/EditCity"

function EditCityPage() {
  return (
    <div className="">
    <ProjectHeading title='Edit Cities' />
    <ProjectWrapper>
      <EditCity />
    </ProjectWrapper>
  </div>
  )
}

export default EditCityPage