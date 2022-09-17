import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
// useEffect gonna make a fetch request to restful api everytime this component is rendered.

const Response = () => {
  
  const getResponse = async () => {
    try {
      const response = await axios.get()
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getResponse();
  });

  return (
  <Fragment>
    {/* {" "}
    <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>device_id</th>
        <th>hum</th>
        <th>kpa</th>
        <th>rad</th>
        <th>rain</th>
        <th>temp</th>
        <th>timestamp</th>
        <th>wd</th>
        <th>ws</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> }
    </tbody>
  </table> */}
  </Fragment>
  );
};

export default Response;