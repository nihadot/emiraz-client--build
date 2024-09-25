import AddBlog from "../components/AddBlog";

function AddBlogPage() {
  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">Add Blog</h1>
        </div>
        <div className=" h-[83vh] overflow-scroll">
          <AddBlog />
        </div>
      </div>
    </div>
  );
}

export default AddBlogPage;
