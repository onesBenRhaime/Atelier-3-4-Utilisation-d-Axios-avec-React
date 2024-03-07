import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default function Header(props) {
	console.log(props);
	const id = 1;
	const title = "Test";
	return (
		<>
			<Navbar bg="primary" variant="dark">
				<Navbar.Brand href="/" className="mx-5">
					Atelier 3
				</Navbar.Brand>
				<Nav className="mr-auto">
					<NavLink to="/events" className="nav-link" activeClassName="active">
						MyEvents
					</NavLink>
					<NavLink to="/add" className="nav-link" activeClassName="active">
						Add new
					</NavLink>
					<NavLink
						to={`${id}/${title}`}
						className="nav-link"
						activeClassName="active"
					>
						Event details
					</NavLink>
				</Nav>
			</Navbar>
		</>
	);
}
