import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from "next/router";

import { useState, useMemo } from "react";

const Main = () => {
  const router = useRouter();
  const [id, setId] = useState(router.query.id);

  const [scrammed, setScrammed] = useState(false);

  const [data, setData] = useState({
    data: {
      actual_burn_rate: 0,
      fuel: [0, 0],
      waste: [0, 0],
      coolant: [0, 0],
      ev_loss: 0,
      burn_rate: 0,
      heating_rate: 0,
      temperature: 0,
    },
  });
  const dataMemo = useMemo(() => data, [data]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/reactor/${router.query.id}`);
      const json = await response.json();
      setData(json);
      setScrammed(json.data.scrammed);
      const timeout = setTimeout(() => getData(), 100);
      return () => clearTimeout(timeout);
    };
    if (router.query.id) {
      setId(router.query.id);
      getData();
    }
  }, [router.query.id]);

  return (
    id && (
      <div className="fixed text-zinc-300 bg-zinc-900 w-full h-full">
        <div className="m-auto text-center left-0 right-0 border-zinc-500 bg-zinc-800 rounded-2xl w-80 border-2 my-2">
          <p className="text-2xl m-4 font-['Poppins'] text-center">
            Wolfpack Mekanism Reactor Web Stats
          </p>
        </div>
        {scrammed && (
          <div className="m-auto text-center p-2 left-0 right-0 border-zinc-500 bg-zinc-800 rounded-2xl w-96 border-2 my-8">
            <FontAwesomeIcon
              className="text-4xl my-1 text-yellow-200"
              icon={faTriangleExclamation}
            />
            <p>Ruh roh, something happened!</p>
            <p>Please check in-game for SCRAM details.</p>
          </div>
        )}
        {dataMemo != null && (
          <div className="grid justify-center items-center m-auto left-0 right-0 w-1/2 border-zinc-500 border-2 bg-zinc-800 my-8 rounded-3xl">
            {Object.values(dataMemo).map(
              (data, index) =>
                data && (
                  <div key={index} className="text-center">
                    <div className="grid grid-cols-3 m-2 font-['Poppins']">
                      <div className="m-2">
                        <p className="text-xl">
                          <b>Burn Rate</b>
                        </p>
                        <CircularProgressbar
                          className="w-32 h-32 my-4 transition-all"
                          styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0.25,

                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: "butt",

                            // Text size
                            textSize: "48px",

                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,

                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',

                            // Colors
                            textColor: `rgb(${(data.burn_rate / 5) * 150}, ${
                              // inverted percentage
                              Math.abs(1 - data.burn_rate / 5) * 150
                            }, 0)`,
                            trailColor: "rgba(200,200,200,0.8)",
                            backgroundColor: "#3e98c7",
                            pathColor: `rgb(${(data.burn_rate / 5) * 150}, ${
                              // inverted percentage
                              Math.abs(1 - data.burn_rate / 5) * 150
                            }, 0)`,
                          })}
                          value={data.burn_rate}
                          text={`${data.burn_rate}`}
                          maxValue={5}
                        />
                      </div>
                      <div className="m-2">
                        <p className="text-xl">
                          <b>Actual B.R</b>
                        </p>
                        <CircularProgressbar
                          className="w-32 h-32 my-4 transition-all"
                          styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0.25,

                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: "butt",

                            // Text size
                            textSize: "48px",

                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,

                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',

                            // Colors
                            textColor: `rgb(${
                              (data.actual_burn_rate / 5) * 150
                            }, ${
                              // inverted percentage
                              Math.abs(1 - data.actual_burn_rate / 5) * 150
                            }, 0)`,
                            trailColor: "rgba(200,200,200,0.8)",
                            backgroundColor: "#3e98c7",
                            pathColor: `rgb(${
                              (data.actual_burn_rate / 5) * 150
                            }, ${
                              // inverted percentage
                              Math.abs(1 - data.actual_burn_rate / 5) * 150
                            }, 0)`,
                          })}
                          value={data.actual_burn_rate}
                          text={`${data.actual_burn_rate}`}
                          maxValue={5}
                        />
                      </div>
                      <div className="m-2">
                        <p className="text-xl">
                          <b>Fuel</b>
                        </p>
                        <CircularProgressbar
                          className="w-32 h-32 my-4 transition-all"
                          styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0.25,

                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: "butt",

                            // Text size
                            textSize: "24px",

                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,

                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',

                            // Colors
                            textColor: `rgb(${
                              Math.abs(1 - data.fuel[0] / data.fuel[1]) * 150
                            }, ${
                              // inverted percentage
                              (data.fuel[0] / data.fuel[1]) * 150
                            }, 0)`,
                            trailColor: "rgba(200,200,200,0.8)",
                            backgroundColor: "#3e98c7",
                            pathColor: `rgb(${
                              Math.abs(1 - data.fuel[0] / data.fuel[1]) * 150
                            }, ${
                              // inverted percentage
                              (data.fuel[0] / data.fuel[1]) * 150
                            }, 0)`,
                          })}
                          value={data.fuel[0]}
                          text={`${Math.round(
                            (data.fuel[0] / data.fuel[1]) * 100
                          )}%`}
                          maxValue={data.fuel[1]}
                        />
                      </div>
                      <div className="m-2">
                        <p className="text-xl">
                          <b>Waste</b>
                        </p>
                        <CircularProgressbar
                          className="w-32 h-32 my-4 transition-all"
                          styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0.25,

                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: "butt",

                            // Text size
                            textSize: "32px",

                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,

                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',

                            // Colors
                            textColor: `rgb(${
                              (data.waste[0] / data.waste[1]) * 150
                            }, ${
                              // inverted percentage
                              Math.abs(1 - data.waste[0] / data.waste[1]) * 150
                            }, 0)`,
                            trailColor: "rgba(200,200,200,0.8)",
                            backgroundColor: "#3e98c7",
                            pathColor: `rgb(${
                              (data.waste[0] / data.waste[1]) * 150
                            }, ${
                              // inverted percentage
                              Math.abs(1 - data.waste[0] / data.waste[1]) * 150
                            }, 0)`,
                          })}
                          value={data.waste[0]}
                          text={`${Math.round(
                            (data.waste[0] / data.waste[1]) * 100
                          )}%`}
                          maxValue={data.waste[1]}
                        />
                      </div>
                      <div className="m-2">
                        <p className="text-xl">
                          <b>Coolant</b>
                        </p>
                        <CircularProgressbar
                          className="w-32 h-32 my-4 transition-all"
                          styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0.25,

                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: "butt",

                            // Text size
                            textSize: "24px",

                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,

                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',

                            // Colors
                            textColor: `rgb(${
                              Math.abs(1 - data.coolant[0] / data.coolant[1]) *
                              200
                            }, ${
                              // inverted percentage
                              (data.coolant[0] / data.coolant[1]) * 150
                            }, 0)`,
                            trailColor: "rgba(200,200,200,0.8)",
                            backgroundColor: "#3e98c7",
                            pathColor: `rgb(${
                              Math.abs(1 - data.coolant[0] / data.coolant[1]) *
                              200
                            }, ${
                              // inverted percentage
                              (data.coolant[0] / data.coolant[1]) * 150
                            }, 0)`,
                          })}
                          value={data.coolant[0]}
                          text={`${Math.round(
                            (data.coolant[0] / data.coolant[1]) * 100
                          )}%`}
                          maxValue={data.coolant[1]}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 font-['Poppins']">
                      <div className="m-2">
                        <p className="text-2xl">
                          <b>EV Loss</b>
                        </p>
                        <p>{data.ev_loss}</p>
                      </div>
                      <div className="m-2">
                        <p className="text-2xl">
                          <b>Temperature</b>
                        </p>
                        <p>{data.temperature.toFixed(3)}K</p>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    )
  );
};

export default Main;
