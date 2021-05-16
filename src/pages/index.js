import { Grid } from "@material-ui/core";
import ShortCard from "../components/Home/ShortCard";
import { FaPeopleCarry, FaTag, FaUser } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { RiPagesFill } from "react-icons/ri";
import { useAuthState } from "../context/auth";
import { SiCodefactor } from "react-icons/si";
import { SupervisorAccount } from "@material-ui/icons";
import useSWR from "swr";
import { Skeleton } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data, error } = useSWR("/admin");

  const { isAuthenticated, isLoading } = useAuthState();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, []);

  const shortCards = data && [
    {
      title: "Customer",
      value: data.data.count.customer,

      icon: <FaUser />,
      href: "/customer",
    },
    {
      title: "Tasker",
      value: data.data.count.tasker,

      icon: <FaPeopleCarry />,
      href: "/tasker",
    },
    {
      title: "Admin",
      value: data.data.count.admin,

      icon: <SupervisorAccount fontSize="large" />,

      href: "/admin",
    },

    {
      title: "Bookings",
      value: data.data.count.booking,

      icon: <FaUser />,
      href: "/bookings",
    },

    {
      title: "Regions",
      value: data.data.count.region,

      icon: <BiWorld />,
      href: "/region",
    },
    {
      title: "Categories",
      value: data.data.count.category,

      icon: <FaTag />,
      href: "/category",
    },
    {
      title: "Services",
      value: data.data.count.service,

      icon: <SiCodefactor />,
      href: "/service",
    },

    {
      title: "Pages",
      value: data.data.count.page,

      icon: <RiPagesFill />,
      href: "/page",
    },
  ];

  return (
    <section style={{ marginTop: "100px" }}>
      <Grid container spacing={4}>
        {isLoading || !data
          ? [...new Array(4)].map((i) => (
              <Grid key={i} item xs={12} md={4}>
                <Skeleton variant="rect" height="120px" width="100%" />
              </Grid>
            ))
          : shortCards.map((card) => (
              <Grid item xs={12} md={4} key={card.title}>
                <ShortCard card={card} />
              </Grid>
            ))}
      </Grid>
    </section>
  );
}
