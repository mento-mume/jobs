import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, limit } from "firebase/firestore";

interface Job {
  id: string;
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
}

interface JobsListingProps {
  isHome: boolean;
}

const JobListings = ({ isHome = false }: JobsListingProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); // Show loading spinner during data fetch

      try {
        const jobsCollection = collection(db, "jobs");

        // If on the home page, limit the number of jobs retrieved
        const jobsQuery = isHome
          ? query(jobsCollection, limit(3))
          : jobsCollection;

        const querySnapshot = await getDocs(jobsQuery);

        const jobData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Job[];

        setJobs(jobData);
      } catch (error) {
        console.log("Error fetching data from Firestore:", error);
      } finally {
        setLoading(false); // Hide loading spinner once data is fetched
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
