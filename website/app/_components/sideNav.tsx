"use client";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter, usePathname } from "next/navigation";

export default function SideNav(props: {
  links: { title: string; path: string; icon?: JSX.Element }[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick(path: string) {
    if (
      pathname === "/dashboard/teacher" ||
      pathname === "/dashboard/student"
    ) {
      router.push(pathname + path);
    } else {
      const tempPath = pathname.split("/");
      tempPath.pop();

      router.push(tempPath.join("/") + path);
    }
  }

  return (
    <Box
      sx={{
        position: { xs: "sticky", lg: "fixed" },
        left: 0,
        bottom: 0,
        width: { xs: "100%", lg: "auto" },
        height: { xs: "auto", lg: "100%" },
        bgcolor: grey[900],
        zindex: 99999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backdropFilter: "blur(50px)",
      }}
    >
      <List
        sx={{
          color: grey[50],
          display: "flex",
          flexDirection: { xs: "row", lg: "column" },
        }}
      >
        {props.links.map((link) =>
          !link.path.endsWith(
            pathname.split("/")[pathname.split("/").length - 1]
          ) ? (
            <ListItem key={link.title}>
              <Button
                onClick={() => handleClick(link.path)}
                sx={{ fontSize: 12 }}
              >
                <Tooltip title={link.title} placement="right">
                  <ListItemIcon
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {link.icon}
                  </ListItemIcon>
                </Tooltip>
                <ListItemText sx={{ display: { lg: "none", xs: "block" } }}>
                  <Typography variant="subtitle1" sx={{ color: grey[50] }}>
                    {link.title}
                  </Typography>
                </ListItemText>
              </Button>
            </ListItem>
          ) : null
        )}
      </List>
    </Box>
  );
}
