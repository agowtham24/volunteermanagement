import "./performance.css";
import { api } from "../../utils/apiconfig";
import { Header } from "../header/header";
import { useState, useEffect } from "react";
import { Task } from "../../admin/viewTasks/viewTasks";
import ReactApexChart from "react-apexcharts";

export function Performance() {
  const [data, setData] = useState<number[]>([
    2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2,
  ]);
  const [categories, setCategories] = useState<string[]>([
    "1-04-24",
    "2-04-24",
    "3-04-24",
    "4-04-24",
    "5-04-24",
    "6-04-24",
    "7-04-24",
  ]);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 0,
      name: "task1",
      description: "task1",
      file: "file1",
      organization: "org1",
      volunteer: "vol1",
      date: "date1",
    },
  ]);
  let state: any = {
    series: [
      {
        name: "Tasks Completed",
        data: data,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: categories,
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val + "%";
          },
        },
      },
      title: {
        text: "Daily Tasks Count",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  };

  const fetchTasksByVolunteer = async () => {
    const volunteer = JSON.parse(sessionStorage.getItem("volunteer") || "{}");
    const response = await api.get(`/volunteer/tasks/${volunteer.id}`);
    setTasks(response.data);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchTasksByVolunteer();
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <>
      <Header />
      <div className="container admin">
        <div
          className="h5 text-center"
          style={{
            marginTop: "60px",
          }}
        >
          Performance Tracking
        </div>
        <div id="chart">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </>
  );
}
