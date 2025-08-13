/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useState } from "react";
import { Calendar, MapPin, Clock, CheckCircle, Trash } from "lucide-react";
import Footer from "./components/Footer";
import "./App.css";

interface JobRequest {
  id: string;
  job: string;
  date: string;
  location: string;
  details: string;
  timeSlot: string;
  submittedAt: Date;
}

interface FormData {
  job: string;
  date: string;
  location: string;
  details: string;
  timeSlot: string;
}

const App: React.FC = () => {
  const availableJobs = [
    "Dog Walk (30 min)",
    "Dog Wash (1 hr)",
    "Dog Daycare (4 hr morning)",
    "Dog Daycare (4 hr afternoon)",
    "Dog Daycare (8 hr)",
    "HVAC repair (2 hr)",
    "Grocery Shopping (2 hr)",
  ];

  const timeSlots = ["9AM - 11AM", "1PM - 3PM", "3PM - 5PM"];

  // Define the initial requested job list for display purpose
  const origJobList: JobRequest[] = [
    {
      id: Date.now().toString(),
      job: availableJobs[0],
      date: new Date(2026, 7, 9).toISOString(),
      location: "Vancouver, BC",
      details: "Please bring my pet Howdy for a walk, thank you!",
      timeSlot: timeSlots[1],
      submittedAt: new Date(),
    },
    {
      id: Date.now().toString() + "1",
      job: availableJobs[1],
      date: new Date(2026, 9, 18).toISOString(),
      location: "Burnaby, BC",
      details:
        "Please bath my pet Kiki and keep her clean during the session, thank you!",
      timeSlot: timeSlots[2],
      submittedAt: new Date(),
    },
  ];

  const [jobRequests, setJobRequests] = useState<JobRequest[]>(origJobList);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showRightSection, setShowRightSection] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    job: "",
    date: "",
    location: "",
    details: "",
    timeSlot: "",
  });
  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimeSlotChange = (timeSlot: string): void => {
    setFormData((prev) => ({
      ...prev,
      timeSlot,
    }));
  };

  const handleSubmitRequest = (): void => {
    if (
      !formData.job ||
      !formData.date ||
      !formData.location ||
      !formData.timeSlot
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newRequest: JobRequest = {
      id: Date.now().toString(),
      ...formData,
      submittedAt: new Date(),
    };

    setJobRequests((prev) => [...prev, newRequest]);

    // Reset form
    setFormData({
      job: "",
      date: "",
      location: "",
      details: "",
      timeSlot: "",
    });

    handleToggleRightSection();
  };

  const handleDeleteJobRequest = (id: string): void => {
    console.log(id);
    setJobRequests(jobRequests.filter((job) => job.id !== id));
  };

  const handleNewJobRequest = (): void => {
    setShowRightSection(true);
    setShowForm(true);
  };

  const handleToggleRightSection = (): void => {
    setShowRightSection(!showRightSection);
    if (!showRightSection) {
      setShowForm(false);
    }
  };

  const handleCancel = (): void => {
    handleToggleRightSection();
    setFormData({
      job: "",
      date: "",
      location: "",
      details: "",
      timeSlot: "",
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex relative">
        {/* Toggle Button */}
        {showRightSection && (
          <button
            onClick={handleToggleRightSection}
            className="fixed top-4 right-4 z-50 bg-teal-700 hover:bg-teal-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            tabIndex={0}
            aria-label={
              showRightSection
                ? "Hide job request panel"
                : "Show job request panel"
            }
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={showRightSection ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
              />
            </svg>
          </button>
        )}
        {/* Left Section - Job Requests List */}
        <div
          className={`${showRightSection ? "w-1/2" : "w-full"} p-6 ${
            showRightSection ? "border-r border-gray-200" : ""
          } transition-all duration-500 ease-in-out`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Requested Jobs</h2>
            {!showRightSection && (
              <button
                onClick={handleNewJobRequest}
                className="bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                tabIndex={0}
                aria-label="Create new job request"
              >
                New Job Request
              </button>
            )}
          </div>

          {jobRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">
                No job requests yet
              </div>
              <p className="text-gray-500">
                Click "New Job Request" to submit your first job
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {request.job}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {request.submittedAt.toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      <button
                        onClick={() => {
                          handleDeleteJobRequest(request.id);
                        }}
                        className="bg-red-300 hover:bg-red-500 text-white font-medium py-1 px-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
                        aria-label="Delete job request"
                      >
                        <Trash></Trash>
                      </button>
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(request.date)}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{request.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{request.timeSlot}</span>
                    </div>

                    {request.details && (
                      <div className="flex mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700">
                        <strong>Details:</strong>&nbsp;{request.details}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Footer></Footer>
        </div>

        {/* Right Section - New Request Form */}
        <div
          className={`${
            showRightSection ? "w-1/2 translate-x-0" : "w-1/2 translate-x-full"
          } fixed right-0 top-0 h-full bg-gray-100 transition-transform duration-500 ease-in-out z-40`}
        >
          <div className="p-6 h-full overflow-y-auto">
            {!showForm ? (
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                  Submit a New Job Request
                </h2>
                <button
                  onClick={handleNewJobRequest}
                  className="bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  tabIndex={0}
                  aria-label="Create new job request"
                >
                  New Job Request
                </button>
              </div>
            ) : (
              <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  New Request
                </h2>

                {/* Job Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Job Type *
                  </label>
                  <select
                    value={formData.job}
                    onChange={(e) => {
                      handleInputChange("job", e.target.value);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                    aria-label="Select job type"
                  >
                    <option value="">Choose a job...</option>
                    {availableJobs.map((job) => (
                      <option key={job} value={job}>
                        {job}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => {
                      handleInputChange("date", e.target.value);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                    aria-label="Select date"
                  />
                </div>

                {/* Location */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => {
                      handleInputChange("location", e.target.value);
                    }}
                    placeholder="Please enter the location..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                    aria-label="Enter location"
                  />
                </div>

                {/* Details */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Details
                  </label>
                  <textarea
                    value={formData.details}
                    onChange={(e) => {
                      handleInputChange("details", e.target.value);
                    }}
                    placeholder="Additional details about the job..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                    aria-label="Enter job details"
                  />
                </div>

                {/* Time Slots */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Time Slot *
                  </label>
                  <div className="space-y-3">
                    {timeSlots.map((slot) => (
                      <label
                        key={slot}
                        className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <input
                          type="radio"
                          name="timeSlot"
                          value={slot}
                          checked={formData.timeSlot === slot}
                          onChange={(e) => {
                            handleTimeSlotChange(e.target.value);
                          }}
                          className="sr-only"
                          required
                        />
                        <div className="flex items-center">
                          {formData.timeSlot === slot ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded mr-3" />
                          )}
                          <span className="text-gray-700">{slot}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleSubmitRequest}
                    className="flex-1 bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    tabIndex={0}
                    aria-label="Submit job request"
                  >
                    Submit Request
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    tabIndex={0}
                    aria-label="Cancel request"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
