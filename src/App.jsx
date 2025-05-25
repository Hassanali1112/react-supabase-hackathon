import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/AllEvents";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404";
import SignUp from "./components/Signup";
import RootPage from "./pages/RootPage";
import Signin from "./components/Signin";
import { supabase } from "./lib/config";
import NewEventForm from "./pages/NewEventForm";
import AllEvents from "./pages/AllEvents";
import ViewEvent from "./pages/ViewEvent";

export default function App() {
  console.log(supabase)
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/user-dashboard" element={<DashboardLayout />}>
        <Route index path="/user-dashboard" element={<AllEvents />} />
        <Route path="/user-dashboard/new-event" element={<NewEventForm />} />
        <Route path="/user-dashboard/view-event" element={<ViewEvent />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
