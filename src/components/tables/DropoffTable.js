"use client";
import React, { useState, useMemo } from "react";
import {
  Table,
  Form,
  Button,
  Container,
  Nav,
  Navbar,
  Pagination,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Search,
  Download,
} from "lucide-react";

// Generate 50 records for pagination
const generateMockData = (count) =>
  Array(count)
    .fill(null)
    .map((_, index) => ({
      id: "1234576980",
      document: "Passport, DS-160, Interview",
      center: "Abuja, Nigeria",
      visaType: "B1/B2 & CID",
      surname: "JONES",
      givenName: "DAVID",
      phoneNumber: "+234 701 234 5678",
      collectionDate: "2024-10-06",
      officer: "B. A. Saidu",
      status: "Dropped-Off",
      statusType: ["dhl", "flag", "globe"][Math.floor(Math.random() * 3)],
    }));

const allData = generateMockData(50);

const StatusIcon = ({ type }) => {
  const getStatusStyle = () => {
    switch (type) {
      case "dhl":
        return { backgroundColor: "#FFD700" };
      case "flag":
        return { backgroundColor: "#28a745" };
      case "globe":
        return { backgroundColor: "#007bff" };
      default:
        return { backgroundColor: "#FFD700" };
    }
  };

  return (
    <span
      className="badge d-flex align-items-center gap-1"
      style={{
        backgroundColor: "#f8f9fa",
        color: "#333",
        padding: "6px 12px",
        borderRadius: "20px",
      }}
    >
      <span
        style={{
          ...getStatusStyle(),
          display: "inline-block",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
        }}
      ></span>
      Dropped-Off
    </span>
  );
};

const DocumentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeTab, setActiveTab] = useState("PICK-UP");

  const recordsPerPage = 10;
  const totalPages = Math.ceil(allData.length / recordsPerPage);

  // Get current records
  const currentRecords = useMemo(() => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    return allData.slice(indexOfFirstRecord, indexOfLastRecord);
  }, [currentPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentRecords.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <Container fluid style={{ padding: "0 40px" }}>
      {/* Navigation */}
      {/* <Nav className="border-bottom mb-4">
        {["PICK-UP", "DROP-OFF", "REPORT", "APPOINTMENT"].map((tab) => (
          <Nav.Item key={tab}>
            <Nav.Link
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              style={{
                borderBottom: activeTab === tab ? "3px solid #fd7e14" : "none",
                color: activeTab === tab ? "#fd7e14" : "#6c757d",
                padding: "1rem 1.5rem",
                fontWeight: 500,
              }}
            >
              {tab}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav> */}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2
          style={{ color: "#004B87", fontSize: "1.5rem", fontWeight: "bold" }}
        >
          Pick-Up
        </h2>
        <div className="d-flex gap-2">
          <Form.Select style={{ width: "auto", padding: "8px 36px 8px 12px" }}>
            <option>Action</option>
            <option>View Details</option>
            <option>Send to Embassy</option>
            <option>Upload DHL Report</option>
          </Form.Select>
          <Form.Select style={{ width: "auto", padding: "8px 36px 8px 12px" }}>
            <option>Filter By Date</option>
            <option> Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Custom Range</option>
          </Form.Select>
        </div>
      </div>

      {/* Search Bar */}
      <hr />
      {/* Table */}
      <div className="table-responsive">
        <Table hover className="align-middle mb-0">
          <thead>
            <tr className="bg-light">
              <th className="border-0 py-3">
                <Form.Check
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === currentRecords.length}
                />
              </th>
              <th className="border-0 py-3">Passport #</th>
              <th className="border-0 py-3">Document</th>
              <th className="border-0 py-3">Center</th>
              <th className="border-0 py-3">Visa Type</th>
              <th className="border-0 py-3">Surname</th>
              <th className="border-0 py-3">Given Name</th>
              <th className="border-0 py-3">Phone Number</th>
              <th className="border-0 py-3">Collection Date</th>
              <th className="border-0 py-3">Officer</th>
              <th className="border-0 py-3">Status</th>
              <th className="border-0 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((row, index) => (
              <tr
                key={index}
                className={`${selectedRows.includes(row.id) ? "bg-light" : ""}`}
                style={{
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  backgroundColor: index === 2 ? "#f0f9ff" : "white",
                }}
              >
                <td className="py-3">
                  <Form.Check
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                  />
                </td>
                <td>
                  <a href="#" className="text-primary text-decoration-none">
                    {row.id}
                  </a>
                </td>
                <td>{row.document}</td>
                <td>{row.center}</td>
                <td>{row.visaType}</td>
                <td>{row.surname}</td>
                <td>{row.givenName}</td>
                <td>{row.phoneNumber}</td>
                <td>{row.collectionDate}</td>
                <td>{row.officer}</td>
                <td>
                  <StatusIcon type={row.statusType} />
                </td>
                <td>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="light"
                      size="sm"
                      className="border-0"
                    >
                      <MoreVertical size={16} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="fw-semibold text-primary">
                        VIEW DETAILS
                      </Dropdown.Item>
                      <Dropdown.Item className="fw-semibold text-primary">
                        SEND TO EMBASSY
                      </Dropdown.Item>
                      <Dropdown.Item className="fw-semibold text-primary">
                        UPLOAD DHL REPORT
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Footer */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <Button variant="light" className="d-flex align-items-center gap-2">
          <Download size={16} className="text-success" />
          <span className="text-success">Export/Download</span>
        </Button>

        <Pagination>
          <Pagination.First onClick={() => setCurrentPage(1)} />
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
            let pageNum = currentPage;
            if (currentPage <= 3) {
              pageNum = idx + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - (4 - idx);
            } else {
              pageNum = currentPage - 2 + idx;
            }

            return (
              <Pagination.Item
                key={idx}
                active={currentPage === pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={
                  currentPage === pageNum ? "bg-success border-success" : ""
                }
              >
                {pageNum}
              </Pagination.Item>
            );
          })}
          <Pagination.Next
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
        </Pagination>
      </div>

      <style jsx global>{`
        .table th {
          font-weight: 600;
          color: #666;
        }
        .table td {
          border-bottom: none;
        }
        .dropdown-toggle::after {
          display: none;
        }
        .form-check-input:checked {
          background-color: #28a745;
          border-color: #28a745;
        }
        .table tbody tr {
          border-bottom: 8px solid #f8f9fa;
        }
        .pagination .page-link {
          border-radius: 4px;
          margin: 0 2px;
          padding: 8px 12px;
        }
        .pagination .active .page-link {
          background-color: #28a745;
          border-color: #28a745;
        }
      `}</style>
    </Container>
  );
};

export default DocumentManagement;
