import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


function App() {
const name = 'Reactivities';
 const[activites, setactivites] = useState<Activity[]>([]);
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

  return (
    
<>
      <Typography variant='h3'>{name}</Typography>
      <List>
        {activites.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>

   
   
  )
}

export default App
