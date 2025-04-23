import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Chip,
  Link,
  Box,
  Divider,
} from "@mui/material";
import { Email, GitHub, LinkedIn, Phone } from "@mui/icons-material";

const skills = [
  "C#",
  "SQL",
  "TypeScript",
  "JavaScript",
  "ASP .NET Core",
  "EF Core",
  "Dapper",
  "SignalR",
  "RabbitMQ",
  "Redis",
  "GraphQL",
  "NodeJS",
  "SQL Server",
  "PostgreSQL",
  "MongoDB",
  "React",
  "Vue",
  "Angular",
  "RxJS",
  "SASS",
  "Docker",
  "Azure",
  "GitHub Actions",
];

export const About: React.FC = () => {
  return (
    <Card
      sx={{ maxWidth: 600, m: "auto", p: 2, borderRadius: 4, boxShadow: 3 }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 64, height: 64 }}>OV</Avatar>
          <Box>
            <Typography variant="h5">Oleksandr Voronkov</Typography>
            <Typography color="text.secondary">Full Stack Developer</Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Phone fontSize="small" />
            <Typography variant="body2">+380668303559</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Email fontSize="small" />
            <Typography variant="body2">
              pubgplayer29112004@gmail.com
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <GitHub fontSize="small" />
            <Link
              href="https://github.com/Alexander-Voronkov"
              target="_blank"
              underline="hover"
            >
              github.com/Alexander-Voronkov
            </Link>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <LinkedIn fontSize="small" />
            <Link href="#" underline="hover">
              Linkedin
            </Link>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Skills
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {skills.map((skill) => (
            <Chip key={skill} label={skill} variant="outlined" />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary">
          Languages: Ukrainian (Native), English (Advanced)
        </Typography>
      </CardContent>
    </Card>
  );
};
