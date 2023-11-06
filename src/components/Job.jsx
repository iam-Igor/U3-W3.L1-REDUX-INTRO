import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Job = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Row
        className="mx-0 mt-3 p-3"
        style={{ border: "1px solid #00000033", borderRadius: 4 }}
      >
        <Col xs={3}>
          <Link to={`/${data.company_name}`}>{data.company_name}</Link>
        </Col>
        <Col xs={9} md={6}>
          <a href={data.url} target="_blank" rel="noreferrer">
            {data.title}
          </a>
        </Col>
        <Col className="text-end d.flex">
          <Button
            variant="outline-warning"
            onClick={() => {
              dispatch({ type: "ADD_TO_FAV", payload: data });
            }}
          >
            <i className="bi bi-star-fill"></i>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Job;
