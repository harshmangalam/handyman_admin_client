import { CircularProgress, Grid } from "@material-ui/core";
import ShortCard from "../components/Home/ShortCard";
import { FaPeopleCarry, FaTag, FaUser } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { AiFillNotification } from "react-icons/ai";
import { RiPagesFill } from "react-icons/ri";

import { SiCodefactor } from "react-icons/si";
import { SupervisorAccount } from "@material-ui/icons";
import useSWR from "swr";

import { useRouter } from "next/router";

export default function Home() {
  const { data, error } = useSWR("/admin");

  const router = useRouter();

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
      title: "Appointment",
      value: 20,

      icon: <AiFillNotification />,
      href: "/appointment",
    },

    {
      title: "Pages",
      value: 20,

      icon: <RiPagesFill />,
      href: "/page",
    },
  ];

  return (
    <section style={{ marginTop: "100px" }}>
      <Grid container spacing={4}>
        {data ? (
          shortCards.map((card) => (
            <Grid item xs={12} md={4} key={card.title}>
              <ShortCard card={card} />
            </Grid>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        )}
      </Grid>
    </section>
  );
}
