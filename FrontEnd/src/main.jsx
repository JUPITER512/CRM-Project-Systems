import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProvider ,QueryClient} from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const client=new QueryClient()
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </QueryClientProvider>
);
