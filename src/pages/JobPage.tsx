import {
  useLoaderData,
  LoaderFunctionArgs,
  Link,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { FaMapMarker, FaArrowLeft } from "react-icons/fa";

// Define the Company interface
interface Company {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

// Define the Job interface with a nested Company type
interface Job {
  id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
  company: Company;
}
type JobPageProps = {
  deleteJob: (jobId: string) => void;
};
const JobPage = ({ deleteJob }: JobPageProps) => {
  const navigate = useNavigate();
  const job = useLoaderData() as Job;

  const onDeleteClick = (jobId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this");

    if (!confirm) {
      return;
    }

    deleteJob(jobId);
    toast.success("Job listing deleted succesfully!!");
    navigate("/JobsPage");
  };
  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/JobsPage"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="fas fa-arrow-left mr-2"></FaArrowLeft> Back
            to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></FaMapMarker>
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">{job.company.name}</h2>

                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactPhone}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => onDeleteClick(job.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

// Update the jobLoader to use the correct type from react-router-dom
const jobLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) throw new Error("Job ID is required");

  const res = await fetch(`/api/jobs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch job data");

  const data = await res.json();
  return data;
};

export { JobPage as default, jobLoader };
