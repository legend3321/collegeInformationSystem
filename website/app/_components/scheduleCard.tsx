import { Card, CardContent, Divider, Typography } from "@mui/material";
import { orange, deepPurple } from "@mui/material/colors";
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

export default function ScheduleCard(props: {
  schedule: ScheduleCardProps;
  extra: boolean;
}) {
  return (
    <Card
      sx={{
        p: 2,
        width: { md: "100%", xs: "90%" },
        bgcolor: props.extra ? deepPurple[200] : orange[50],
        borderRadius: 5,
        boxShadow: props.extra
          ? "0px 30px 40px -10px #b39ddb"
          : "0px 20px 40px -10px #fff3e0",
        border: props.extra ? "1px solid #512da8" : "1px solid #ffcc80",
        mb: 5,
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
