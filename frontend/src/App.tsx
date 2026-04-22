import { Routes, Route } from "react-router";
import { IndexPage } from "./pages/index/IndexPage";
import { EntityListPage } from "./pages/EntityList/EntityListPage";
import { EntityDetailPage } from "./pages/EntityDetailPage/EntityDetailPage";
import { CreateEntityPage } from "./pages/CreateEntity/CreateEntityPage";
import { CreatePage } from "./pages/Create/CreatePage";
import { EditEntityPage } from "./pages/EditEntityPage/EditEntityPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/entities/:type" element={<EntityListPage />} />
      <Route path="/entities/:type/:slug" element={<EntityDetailPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/create/:type" element={<CreateEntityPage />} />
      <Route path="/edit/:type/:slug" element={<EditEntityPage />} />
    </Routes>
  );
}

export default App;
