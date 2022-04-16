import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Box>
      <Navbar />
      <Stack direction="row" justifyContent="space-between">
        <Sidebar />
        <Feed />
      </Stack>
    </Box>
  );
};

export default App;
