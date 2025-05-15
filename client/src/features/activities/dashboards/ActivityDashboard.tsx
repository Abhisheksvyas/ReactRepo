import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
type Props = {
  activites: Activity[]
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  selectedActivity?: Activity;
  openForm: (id?: string) => void;
  closeForm: () => void;
  editMode: boolean;
  
  

};
export default function ActivityDashboard({ activites, cancelSelectActivity,
  selectedActivity, selectActivity, openForm, closeForm, editMode }: Props) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7} >
        <ActivityList activites={activites}
          selectActivity={selectActivity}
         

        />
      </Grid2>
      <Grid2 size={5} >
        {/* {activites[0] && <ActivityDetails activity={activites[0]} />} */}
        {selectedActivity && !editMode &&
          <ActivityDetails SelectedActivity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}

          />}
        {editMode &&
          <ActivityForm 
          closeForm={closeForm}
        activity={selectedActivity} 
         />

          
        }



      </Grid2>




    </Grid2>
  )
}