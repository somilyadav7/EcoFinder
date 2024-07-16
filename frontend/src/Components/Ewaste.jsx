import { blogs } from "./Blogs";


const Ewaste = () => {
  return (
    <>
    <div className="section container">
      <h2 className="text-3xl font-bold mb-12 ">E-Waste Education</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md">
            <img
              src={blog.image}
              alt={`Image for ${blog.title}`}
              className="mx-auto"
              width={150}
              height={150}
            />
            <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
            <a
            href={`/education/${blog.id}`}
              className="text-blue-500 hover:underline mt-4 block"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
};

export default Ewaste;
