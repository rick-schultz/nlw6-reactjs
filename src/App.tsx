import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NewRoom } from "./pages/NewRoom/NewRoom";
import { Room } from "./pages/Room/Room";
import { AuthContextProvider } from './contexts/AuthContext'
import { AdminRoom } from "./pages/AdminRoom/AdminRoom";

export default function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" exact component={NewRoom}/>
        <Route path="/rooms/:id" component={Room}/>
        <Route path="/admin/rooms/:id" component={AdminRoom}/>
      </Switch>
    </AuthContextProvider>
    </BrowserRouter>
  );
}