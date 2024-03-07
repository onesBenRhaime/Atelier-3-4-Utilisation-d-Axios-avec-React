import React, { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import FormEvent from "./components/FormEvent";
import FormEditEvent from "./components/FormEditEvent";
const Header = React.lazy(() => import("./components/Header"));
const Events = React.lazy(() => import("./components/Events"));
const EventDetails = React.lazy(() => import("./components/EventDetails"));

function App() {
	return (
		<>
			<Suspense fallback={<h1>Loading</h1>}>
				<Header />
				<Routes>
					<Route path="/events">
						<Route index element={<Events />} />
						<Route path=":id/:title" element={<EventDetails />} />
					</Route>

					<Route path="/add" element={<FormEvent />} />
					<Route path="/edit/:id" element={<FormEditEvent />} />

					<Route path="*" element={<h1>Not Found</h1>} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
