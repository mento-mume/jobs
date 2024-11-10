import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

type Job = {
  title: string;
  type: string;
  location: string;
  description: string;
  salary: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
};
type JobWithId = Job & { id: string };

const App = () => {
  const addJob = async (newJob: Job) => {
    try {
      const res = await addDoc(collection(db, "jobs"), newJob);
      console.log("Job added with ID:", res.id);
      return res;
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const jobRef = doc(db, "jobs", id);
      await deleteDoc(jobRef);
      console.log(`Job with ID ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const updateJob = async (job: JobWithId) => {
    try {
      const jobRef = doc(db, "jobs", job.id);
      await updateDoc(jobRef, {
        title: job.title,
        type: job.type,
        location: job.location,
        description: job.description,
        salary: job.salary,
        company: {
          name: job.company.name,
          description: job.company.description,
          contactEmail: job.company.contactEmail,
          contactPhone: job.company.contactPhone,
        },
      });
      console.log(`Job with ID ${job.id} updated successfully`);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/JobsPage" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/JobsPage/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updatedJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
