import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboards/ActivityDashboard";
// import ActivityList from "../../features/activities/dashboards/ActivityList";


function App() {

 const[activites, setactivites] = useState<Activity[]>([]);
 const[selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
 const [editMode, setEditMode] = useState(false);
 useEffect(() => {
   axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then((response) => {
        setactivites(response.data);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
     
 }, []);
 console.log(activites);  

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activites.find((activity) => activity.id === id));    
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

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setactivites(activites.map(x => x.id === activity.id ? activity : x))
    } else {
      const newActivity = {...activity, id: activites.length.toString()}
      setSelectedActivity(newActivity);
      setactivites([...activites, newActivity])
    }
    setEditMode(false);
  }
  const handleDeleteActivity = (id: string) => {
    setactivites(activites.filter((activity) => activity.id !== id));
  }
  return (
    
<>
<Box sx={{bgcolor:'#eeeeee'}}>
  
<CssBaseline />
    <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ marginTop: 4 }}>
       <ActivityDashboard activites={activites} 
       
       selectActivity={handleSelectActivity}
       cancelSelectActivity={handleCancelSelectActivity}  
       selectedActivity={selectedActivity}
        editMode={editMode}
        openForm={handleOpenForm}
        closeForm={handleFormClose}
        submitForm={handleSubmitForm}
        deleteActivity={handleDeleteActivity}
       />
        
      </Container>
      </Box>
    </>

   
   
  )
}

export default App
