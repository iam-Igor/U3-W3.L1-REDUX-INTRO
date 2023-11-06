import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Job from "./Job";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);

  const Favlength = useSelector((state) => state.favourites.content.length);
  const location = useNavigate();

  const baseEndpoint =
    "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col
          xs={10}
          className="mx-auto my-3 d-flex alig-items-center justify-content-between"
        >
          <div>
            <h1 className="display-1">Remote Jobs Search</h1>
          </div>
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-warning position-relative"
              onClick={() => {
                location("/Favourites");
              }}
            >
              Favourites
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {Favlength}
                <span className="visually-hidden">Favourites list</span>
              </span>
            </button>
          </div>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="type and press Enter"
            />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {jobs.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
