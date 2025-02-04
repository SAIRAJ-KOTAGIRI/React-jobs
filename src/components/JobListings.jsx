// import jobs from '../data/jobs.json'
import React, { useState,useEffect } from 'react'
import JobCard from './JobCard'
import Spinner from './Spinner'

const JobListings = ({isHomePage = false}) => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const url = isHomePage ? '/api/jobs?_limit=3': '/api/jobs'
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(url)
                const data = await res.json();
                setJobs(data)    
            } catch (error) {
                console.log('Error Rendering Jobs ', error)
            } finally {
                setLoading(false)
            }
            
        }

        fetchJobs()
    }, [])
    

    
  return (
    <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHomePage ? 'Recent Jobs': 'Browse Jobs'}
          </h2>
            {loading ? (<Spinner loading={loading}/>): (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobs.length && jobs.map((job) => (
                        <JobCard job={job} key={job.id}/>
                    ))}
                </div>
            )}
        </div>
      </section>
  )
}

export default JobListings