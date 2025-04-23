import { useAuth } from "@/entities/auth";
import { UserDetailsDto } from "@/shared/api";
import httpClient from "@/shared/api/httpClient";

import {
  Box,
  Skeleton,
  Typography,
  Card,
  CardContent,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PersonIcon from "@mui/icons-material/Person";

const fetchUser = async () => {
  const { data } = await httpClient.get<UserDetailsDto>("/users/me");
  return data;
};

export const ProfilePage = () => {
  const { user } = useAuth();

  const {
    data: detailedUser,
    isLoading,
    isError,
  } = useQuery<UserDetailsDto>({
    queryFn: fetchUser,
    queryKey: ["user", user?.id],
  });

  if (isError) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="error">
          Ошибка при загрузке данных пользователя
        </Typography>
      </Box>
    );
  }

  if (isLoading || !detailedUser) {
    return (
      <Card sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 2 }}>
        <CardContent>
          <Skeleton variant="circular" width={60} height={60} />
          <Skeleton variant="text" width={200} height={30} sx={{ mt: 2 }} />
          <Skeleton variant="text" width={300} height={30} sx={{ mt: 1 }} />
          <Skeleton variant="text" width={250} height={30} sx={{ mt: 1 }} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          p: 2,
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
              <PersonIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {detailedUser.username}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                ID: {detailedUser.id}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> {detailedUser.email}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
