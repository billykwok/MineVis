import d3 from "d3";

import fillMissing from "./fillMissing";

const schema = [
  { key: "day",
    options: Array.apply(null, new Array(28)).map((elm, i) => i + 1) },
  { key: "serverId",
    options: Array.apply(null, new Array(14)).map((elm, i) => i + 1) },
  { key: "event",
    options: [ "BlockBreak", "BlockPlace", "Chat", "CraftedItems",
    "Death", "Kicks", "KilledBy", "Logins" ] },
  { key: "totalCount" },
  { key: "perPlayerCount" }
];

function loadData(cb) {
  const grpByServer = d3.nest().key(d => d.serverId);
  const grpByDay = d3.nest().key(d => d.day);
  const stack = d3.layout.stack()
    .offset("silhouette")
    .values(d => d.values)
    .x(d => d.day)
    .y(d => d.totalCount);

  d3.csv(require("../data/by_day_server_event_proportion.csv"))
    .row(row => ({
        day: +row.day,
        serverId: +row.server_name,
        event: row.key,
        totalCount: +row.total_count,
        perPlayerCount: +row.proportion
      }))
    .get((error, data) => {
      const fullData = fillMissing(data, schema);
      const barChartData = grpByDay.entries(fullData)
        .map(d => ({
          key: +d.key,
          values: grpByServer.entries(d.values)
        }));
      const streamGraphData = stack(grpByServer.entries(fullData)
        .map(d => ({
          key: +d.key,
          values: grpByDay.entries(d.values)
            .map(t => t.values.reduce((acc, cur) => ({
              day: +t.key,
              serverId: +d.key,
              totalCount: acc.totalCount + cur.totalCount
            })), 0)
          })).reverse()).reverse();
      if (!error) cb({ barChartData, streamGraphData });
    });
}

export default loadData;
