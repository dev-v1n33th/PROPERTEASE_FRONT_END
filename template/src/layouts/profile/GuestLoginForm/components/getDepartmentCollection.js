

import React, { useEffect, useState } from "react";
import axios from "axios";
const data = () => {

  let result = axios
    .get("http://localhost:8085/bed/getBedsByAllBuildings")
    .then((resp) => {
   return resp.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};
export default data;
