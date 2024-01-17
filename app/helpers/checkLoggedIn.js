import { useRouter } from "next/router";

export const CheckLoggedIn = ({ user }) => {
  const router = useRouter();

  if (!user?.id) {
    router.push("/home");
  }
};
