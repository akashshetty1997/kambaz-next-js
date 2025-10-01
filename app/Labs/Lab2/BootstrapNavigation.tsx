import { Nav, NavItem, NavLink, Card, Button } from "react-bootstrap";
import Image from "next/image";

export default function BootstrapNavigation() {
  return (
    <div>
      <div id="wd-css-navigating-with-tabs">
        <h2>Tabs</h2>
        <Nav variant="tabs">
          <NavItem>
            <NavLink href="#/Labs/Lab2/Active">Active</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Link1">Link 1</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Link2">Link 2</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Disabled" disabled>Disabled</NavLink>
          </NavItem>
        </Nav>
      </div>

      <div id="wd-css-navigating-with-cards">
        <h2>Cards</h2>
        <Card style={{ width: "18rem" }}>
          <Image 
            className="card-img-top" 
            src="/images/stacked.jpg" 
            width={288}
            height={180}
            alt="Stacking Starship" 
            style={{ objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">Stacking Starship</h5>
            <p className="card-text">
              Stacking the most powerful rocket in history. Mars or bust!
            </p>
            <Button variant="primary">Boldly Go</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}