import { Box, Container, CssBaseline, Typography } from "@mui/material";
import {  useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboards/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";
// import ActivityList from "../../features/activities/dashboards/ActivityList";


function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {activities, isPending } = useActivities();
 
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((activity) => activity.id === id));
  }
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }
  const handleOpenForm = (id?: string) => {

    if (id) handleSelectActivity(id);
    else
      handleCancelSelectActivity();
    setEditMode(true);

  }
  const handleFormClose = () => {
    setEditMode(false);
  }

  
  
  return (

    <>
      <Box sx={{ bgcolor: '#eeeeee' ,minHeight:'100vh'}}>

        <CssBaseline />
        <NavBar openForm={handleOpenForm} />
        <Container maxWidth="xl" sx={{ marginTop: 4 }}>

          {!activities || isPending ?
            (<Typography> Loading...</Typography>)
            :
            (
              <ActivityDashboard
                activites={activities}
                selectActivity={handleSelectActivity}
                cancelSelectActivity={handleCancelSelectActivity}
                selectedActivity={selectedActivity}
                editMode={editMode}
                openForm={handleOpenForm}
                closeForm={handleFormClose}
              
                
              />

            )

          }



        </Container>
      </Box>
    </>



  )
}

export default App
