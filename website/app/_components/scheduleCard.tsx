import { Card, CardContent, Divider, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { motion } from "framer-motion";

interface ScheduleCardProps {
  day: string;
  start_time: string;
  end_time: string;
  subject: {
    course_description: string;
    course_name: string;
  };
  room: string;
  description: string;
}

export default function ScheduleCard(props: { schedule: ScheduleCardProps }) {
  return (
    <Card
      sx={{
        p: 2,
        width: { md: "400px", xs: "90%" },
        bgcolor: orange[50],
        borderRadius: 10,
        boxShadow: "0px 30px 30px 1px #fff3e0",
        border: "1px solid #ffcc80",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {props.schedule.subject.course_name} |{" "}
            {props.schedule.subject.course_description}
          </Typography>
          <Typography variant="body1">
            {props.schedule.start_time} to {props.schedule.end_time}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">
            {props.schedule.room} | {props.schedule.description}
          </Typography>
        </CardContent>
      </motion.div>
    </Card>
  );
}
