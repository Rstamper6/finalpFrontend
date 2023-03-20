import { Card } from "react-bootstrap";

function Services() {
  return (
    <div>
      <button className="Create-Board-Button">Create Board</button>
      <div className="Services-Cards">
        <Card className="Board-Card">
          {/* <Card.Img id='TapBox-Card-Image' variant="top" src={TapBox} /> */}
          <Card.Body>
            <div className="board-image">yo</div>
            <div className="board-info">
              <h3>Name</h3>
              <p>Nov 20 1930 - December 23 2023</p>
              <button className="View-Board-Button">View Board</button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Services;
