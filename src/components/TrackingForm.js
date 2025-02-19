"use client";
import { useState, useEffect } from "react";
import "./TrackingForm.css";

import { useRouter } from "next/navigation";

const visaDocuments = {
  "(B1/B2) and C1D visa": [
    "Printed copy of the Interview Waiver confirmation",
    "International passport",
    "Passport containing expired visa (if different than the passport used for the current visa application)",
    "DS-160 confirmation page",
    "One (1) 5X5 cm color photograph",
    "For children only: a copy of the parents' valid visa in the same category (if they are not applying together with their parents)"
  ],
  "INTRACOMPANY  (L)": [
    "Printed copy of the Interview Waiver confirmation",
    "International passport",
    "Passport containing expired visa (if different than the passport used for the current visa application)",
    "DS-160 confirmation page",
    "One (1) 5X5 cm color photograph",
    "Copy of I-129S",
    "Copy of valid I-797"
  ],
  "STUDENT ACADEMIC (F)": [
    "Printed copy of the Interview Waiver confirmation",
    "International Passport",
    "Passport containing expired visa (if different than the passport used for the current visa application)",
    "DS-160 confirmation page",
    "Passport Photo",
    "Parent Visa page (if applicable)",
    "Copy of I-20 form (F, M visas)"
  ],
  "EXCHANGE VISITORS": [
    "Printed copy of the Interview Waiver confirmation",
    "International Passport",
    "Passport containing expired visa (if different than the passport used for the current visa application)",
    "DS-160 confirmation page",
    "Passport Photo",
    "Original DS–2019 (for J visas)",
    "For children only: a copy of the parents' valid visa in the same category (if they are not applying together with their parents)"
  ],
  "TEMPORARY WORKER": [
    "Printed copy of the Interview Waiver confirmation",
    "International Passport",
    "Passport containing expired visa (if different than the passport used for the current visa application)",
    "DS-160 confirmation page",
    "Passport Photo",
    "Copy of valid I-797",
    "Copy of principal applicant’s visa, if applying separately"
  ],
  "C1/D VISA": [
    "Printed copy of the Interview Waiver confirmation",
    "International Passport",
    "Passport containing expired visa (if different than the passport used for the current visa application)",
    "DS-160 confirmation page",
    "Passport Photo",
    "Letter from the employer"
  ]
};

export default function TrackingForm({ trackingCode }) {
  const [date, setDate] = useState("");

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkedDocuments, setCheckedDocuments] = useState([]);
  const [visaType, setVisaType] = useState(Object.keys(visaDocuments)[0]);
  const [dropoffType, setDropoffType] = useState("interviewer");
  const [additionalComment, setAdditionalComment] = useState("");
  const router = useRouter();

  const BASE_URL = "https://app.swglobalstaging.com";

  const POST_KEY = "f11e8d98b515c1d53290f3811bd01e5a2416a9315a8974d69cd939a1fce6b253"
  const API_URL = `${BASE_URL}/api/v1/waybill/track/appointments/search`;
  const CREATE_API_URL = `${BASE_URL}/api/v1/waybill/track/appointments/create`;


  console.log("base url", BASE_URL, POST_KEY)
  console.log("api url", API_URL)

  useEffect(() => {
    const fetchTrackingData = async () => {
      if (!trackingCode) return;
      setLoading(true);
      setError(null);

      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("post-key", POST_KEY);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      try {
        const response = await fetch(`${API_URL}?search=${trackingCode}`, requestOptions);
        const data = await response.json();
        if (data.responseCode === 200 && data.success) {
          setFormData(data.data);
        } else {
          setError("No data found...");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch tracking data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, [trackingCode]);



  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckedDocuments((prev) =>
      checked ? [...prev, value] : prev.filter((doc) => doc !== value)
    );
  };

  console.log("checkedDocuments",checkedDocuments)

  const handleSubmit = async (event) => {
    event.preventDefault();


    let validationErrors = [];

  if (!visaType) validationErrors.push("Visa Type is required.");
  // if (!collectionDate) validationErrors.push("Collection Date is required.");
  if (checkedDocuments.length === 0) validationErrors.push("At least one document must be selected.");

  if (validationErrors.length > 0) {
    setError( validationErrors.join("\n"));
    return;
  }
    setLoading(true);
    setError(null);


    const rawData = {
      "application": formData.id,
      "status": "Dropped-Off Sent To Embassy (1 & 3)",
      "checkList": checkedDocuments,  // array of checked document list
      "user": "OIS TEST User",
      "visaType": visaType,            // dropdown value as string format 
    }

    try {
      const response = await fetch(CREATE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "post-key": POST_KEY
        },
        body: JSON.stringify(rawData)
      });

      const result = await response.json();
      if (response.ok) {
        alert("drop off status has been updated successfully.");
        router.push("/dropoff");
      } else {
        setError(result.message || "Failed to manage dropoff.");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setError("An error occurred while submitting the data.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    if (error)
      router.push("/dropoff");
  }


  return (
    <>
      {loading && <div className="loader">Loading...</div>}
      {error && (
        <div className="modal">
          <div className="modal-content">
            <p>{error}</p>
            <button onClick={() => handleClose()}>Close</button>
          </div>
        </div>
      )}
      {!loading && !error && formData && (
        <>
          <h3 style={{ padding: "1rem 0 0 2rem" }}>Application Details</h3>
          <div className="form-container">
            <div className="left-container">
              <div className="top-container">
                <form className="form-grid">

                  <div className="form-group">
                    <label htmlFor="trackingId">TRACKING ID</label>
                    <input type="text" id="trackingId" name="trackingId" value={formData.trackingCode} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Passport Number</label>
                    <input type="text" id="passport" name="passport" value={formData.passportNumber} readOnly />
                  </div>

               
                  <div className="form-group">
                    <label htmlFor="visaType">Visa Type: </label>
                    <select id="visaType" name="visaType" value={visaType} onChange={(e) => setVisaType(e.target.value)}>
                      <option value="">-- Select Visa Type --</option>
                      {Object.keys(visaDocuments).map((type, index) => (
          <option key={type} value={type} >{type}</option>
        ))}
                    </select>
                  </div>
                  <div className="form-group">
              <label>Documents/Drop-off Type:</label>
              <label>
                <input type="radio" name="dropoffType" value="interviewer" checked={dropoffType === "interviewer"} onChange={() => setDropoffType("interviewer")} /> Interviewer Waiver
              </label>
              <label>
              <input type="radio" name="dropoffType" value="additional" checked={dropoffType === "additional"} onChange={() => setDropoffType("additional")} /> Additional Documnets
              </label>
            </div>

            {dropoffType === "additional" && (
              <div className="form-group">
                <label htmlFor="additionalComment">Additional Comments:</label>
                <textarea id="additionalComment" value={additionalComment} onChange={(e) => setAdditionalComment(e.target.value)}></textarea>
              </div>
            )}

                </form>
              </div>
              <div className="bottom-container">
                <div className="btn-container" >
                  <button onClick={handleSubmit} className="submit-btn" type="submit">Submit</button>
                </div>

          

                {/* <div className="document-checklist">
                  <hr></hr>
                  <h4>Document Checklist</h4>
                  {visaType && visaDocuments[visaType]?.map((doc, index) => (
                    <label key={index}>
                      <input type="checkbox" value={doc} onChange={handleCheckboxChange} /> {doc}
                    </label>
                  ))}
                </div> */}
                 {dropoffType === "interviewer" && (
              <div className="document-checklist">
                <h4>Document Checklist</h4>
                {visaDocuments[visaType]?.map((doc, index) => (
                  <label key={index}>
                    <input type="checkbox" value={doc} onChange={handleCheckboxChange} /> {doc}
                  </label>
                ))}
              </div>
            )}
              </div>
            </div>
            <div className="right-container">
              <div className="nav-container">
                <div className="nav-option">
                  <span>EVENT/TRACKING</span>
                  <span>PRINT</span>
                  <span>ATTACHED DOCUMENT</span>
                </div>
              </div>
              <div className="inner-container">Inner containers</div>
              <div className="bottom-container">
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>

  );
}
