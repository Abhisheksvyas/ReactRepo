import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

import { useActivities } from "../../../lib/hooks/useActivities";


type Props = { 
    SelectedActivity: Activity  
    cancelSelectActivity: () => void;
    openForm: (id?: string) => void;

} 
    // Define the type of the props you need here
// Define the type of the props you need here
// Define any props you need here 

export default function ActivityDetails({ SelectedActivity ,cancelSelectActivity,openForm}: Props) {
    
    const { activities } = useActivities();
    const activity = activities?.find((activity) => activity.id === SelectedActivity.id);

    if (!activity) return <Typography>Loading...</Typography>;
    return (
        <Card sx={{ borderRadius: 3 }}>
            
            <CardMedia
                component="img"
                src={`/images/categoryImages/${activity.category}.jpg`}
               />

            <CardContent>
                <Typography variant="h5">
                    {activity.title}
                </Typography>
                <Typography variant="subtitle1" fontWeight='light' >
                    {activity.date}

                </Typography>
                <Typography variant="body1" fontWeight='light' >
                    {activity.description}

                </Typography>

            </CardContent>

            <CardActions>
                <Button color="primary" onClick={() => openForm(activity.id)} variant="contained">  
                    Edit    
                </Button>
                <Button onClick={cancelSelectActivity} color="inherit" variant="outlined">
                    Cancel  
                      
                </Button>
            </CardActions>
        </Card>
    )
}