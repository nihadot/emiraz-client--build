import ManageBlog from "../components/ManageBlog.jsx"

function ManageBlogPage() {
  return (
    <div>
        <div className="">
            <div className="flex justify-between my-6">
                <h1 className="sf-medium font-medium text-5xl">Manage Blog</h1>
            </div>
            <ManageBlog />
      </div>
    </div>
  )
}

export default ManageBlogPage